# PFNApp — Hermes Agent Hardened Image

**Upstream:** `docker.io/nousresearch/hermes-agent:v2026.9.24`
**PFNApp:** `ghcr.io/pfnapp/hermes-agent:v2026.9.24`

## What changed

- OS packages upgraded via `apt-get upgrade`
- Build toolchain removed from runtime image (`gcc`, `g++`, `cpp`, `make`, `cmake`, `python3-dev`, `libffi-dev`, `libc6-dev`, `linux-libc-dev`, `binutils`)

## Services exposed by the sample compose

The sample is **personal-dashboard-first**: one published port, on host
loopback, behind basic auth. The API server is opt-in **and off by default**.

| Service | Container port | Sample publish | Enabled by |
| --- | --- | --- | --- |
| Web dashboard (s6 longrun) | 9119 | `127.0.0.1:9119:9119` (host loopback) | `HERMES_DASHBOARD=1` + an auth provider |
| OpenAI-compatible API server (`/v1`, `GET /health`) | 8642 | **not published** | opt-in only — see [API server (optional)](#api-server-optional) |

Why "off" needs more than a flag: in this upstream build `API_SERVER_ENABLED`
is declarative — the gateway really gates that adapter on a usable
`API_SERVER_KEY`, and the image's first-boot `stage2` hook **generates one**
into the data volume (0600, per volume, never committed) precisely so
upstream's loopback control plane starts. The sample therefore pins
`platforms.api_server.enabled: false` in `config.yaml` on **every start** via
the compose `command` prelude while `API_SERVER_ENABLED=false` (the default).
Result: no listener on 8642 at all, and no 8642 publish rule — verified in an
isolated project (see [API server (optional)](#api-server-optional) for the
reverse).

Dashboard-internal cron keeps working with the API pinned off — the gateway
runs its own cron ticker. Only the optional **external Chronos/NAS cron-fire
callback** (NAS → dashboard `/api/cron/fire` → gateway loopback) and
**relay-fronted manual runs** need the loopback API; set
`API_SERVER_ENABLED=true` if you use either.

### Health

The container healthcheck and runtime probes target the unauthenticated dashboard liveness endpoint:
`GET /api/health` on port 9119 (returns HTTP 200 `{"ok":true,"version":"...","auth_required":true}`).
Connection refused, `4xx` or `5xx` marks the container unhealthy. Meanwhile, browser requests to `GET /`
answer the login redirect (`302` with `Location: …/login`) when non-loopback authentication is engaged.
Two consequences worth knowing:

- The probe covers the dashboard, not the gateway daemon process.
- With `HERMES_DASHBOARD=0` nothing listens on 9119, so the container can
  **never** become healthy — drop or repoint the `healthcheck` block if you
  deliberately run without the dashboard.

## Web dashboard

Upstream behaviour that the sample accounts for:

- The dashboard is an s6 supervised service. With `HERMES_DASHBOARD` unset or
  falsy it exits immediately and nothing listens on 9119.
- It binds `0.0.0.0` by default, which is a **non-loopback** bind: upstream
  engages its auth gate there and **fails closed** (`SystemExit`) unless an
  auth provider is registered. `HERMES_DASHBOARD_INSECURE` is accepted but
  ignored — it no longer disables the gate.
- The bundled provider needs `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` **and** a
  password (`HERMES_DASHBOARD_BASIC_AUTH_PASSWORD`, or a pre-hashed
  `..._PASSWORD_HASH`). OAuth via `HERMES_DASHBOARD_OAUTH_CLIENT_ID` is the
  alternative.

The sample therefore enables the dashboard with a placeholder basic-auth pair
and publishes it on **host loopback only**, so it is authenticated and not
network-reachable out of the box:

```bash
# 1. local credentials (git-ignored)
cp .env.example .env          # then edit the values

# 2. start (existing named volume is reused; data is untouched)
docker compose up -d

# 3. verify — the dashboard is gated, not served anonymously:
curl -sI http://127.0.0.1:9119/ | head -1        # 302 -> /login (gate up)
curl -s -o /dev/null -w '%{http_code}\n' -H 'Content-Type: application/json' \
  -d '{"provider":"basic","username":"admin","password":"<your dashboard password>"}' \
  http://127.0.0.1:9119/auth/password-login       # 200 ok / 401 wrong password
# then open http://127.0.0.1:9119/ in a browser and sign in with the same pair

# 4. confirm the API is off (no listener, nothing published):
docker compose exec hermes-agent sh -c \
  'curl -fsS --max-time 2 http://127.0.0.1:8642/health'   # fails: connection refused
docker compose port hermes-agent 9119                     # 127.0.0.1:9119 only
```

To expose the dashboard beyond the host: replace the placeholder password
first, then either front it with a reverse proxy (recommended) or widen the
publish rule to `9119:9119` / `0.0.0.0:9119:9119`. `HERMES_DASHBOARD=0` in
`.env` turns the dashboard off entirely — remember the healthcheck caveat
above.

## API server (optional)

Pinned off and unpublished in the sample; enable it only if something really
needs it (a local Open WebUI/LibreChat frontend, an external Chronos/NAS
cron-fire callback, or relay-fronted manual runs):

```bash
# .env — real values, git-ignored
API_SERVER_ENABLED=true                          # boot prelude stops pinning it off
HERMES_API_SERVER_HOST=0.0.0.0                    # required for a published port
HERMES_API_SERVER_KEY=$(openssl rand -hex 32)     # optional: pin your own key;
                                                  # otherwise stage2's generated
                                                  # per-volume key is used
```

```yaml
# docker-compose.yml — uncomment the publish rule
      - "127.0.0.1:8642:8642"
```

Then `docker compose up -d` (the container restarts with the pin removed) and
check `curl -fsS http://127.0.0.1:8642/health` — plus
`Authorization: Bearer <your key>` anywhere under `/v1`. Without a usable key
(>= 16 characters, deny-listed placeholders rejected) the gateway refuses to
start the adapter at all. Set `API_SERVER_ENABLED=false` again and restart to
re-pin it off.

Manual equivalent of the prelude (what the sample automates):

```bash
docker compose exec hermes-agent hermes config set platforms.api_server.enabled false
docker compose restart hermes-agent     # or unset ... to re-enable
```

Bringing an existing deployment up on this compose recreates the container
(boot prelude, env and healthcheck changed) but keeps the same `hermes-data`
volume (`docker compose down` retains named volumes; `docker compose down -v` destroys them),
so stored data survives across normal recreation; re-supply `HERMES_API_SERVER_KEY` and
re-publish 8642 in `.env`/compose if existing API clients still need it.

Credentials are never committed: `docker-compose.yml` only carries
local-only placeholders behind `${...}` interpolation (and an empty API key —
the generated key lives in the git-ignored data volume, not the repository),
and real values live in `.env` (git-ignored).

## Security architecture & root bootstrap

- **Root bootstrap:** The container entrypoint is s6-overlay (`/opt/hermes/docker/entrypoint-dispatch.sh`).
  Supported startup requires root bootstrap (`runAsUser: 0`, `runAsGroup: 0`, `readOnlyRoot: false`)
  so s6 preinit and stage2 cont-init (`/etc/cont-init.d/01-hermes-setup`) can manage runtime dirs,
  sync bundled skills, and chown/seed `/opt/data` to `hermes:hermes`.
- **Privilege drop:** All supervised application processes (web dashboard and gateway daemon)
  drop privileges and run as unprivileged user `hermes` (UID 1000, GID 1000) via `s6-setuidgid hermes`.
- **Kubernetes securityContext:** Enforcing strict `runAsNonRoot: true` or an arbitrary non-root
  UID (such as 10001) in Kubernetes Pod securityContext is unsupported by upstream s6-overlay and breaks
  startup. Run container as root, allowing s6 to drop privileges to UID 1000.

## Kubernetes deployment excerpt

The following excerpt demonstrates how to configure Hermes Agent in a Kubernetes Pod/Deployment.
Note: this is a partial excerpt requiring platform Service, Ingress, and PVC wiring.
The runtime manifest describes this contract; it does not generate the Pod's `args`,
PVC, or startup probe. The platform renderer must preserve these settings:


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hermes-agent
  labels:
    app.kubernetes.io/name: hermes-agent
spec:
  securityContext:
    runAsUser: 0
    runAsGroup: 0
    fsGroup: 1000
  containers:
    - name: hermes-agent
      image: ghcr.io/pfnapp/hermes-agent:v2026.9.24
      # Preserve s6 supervisor ENTRYPOINT by providing args instead of overriding command
      args:
        - sh
        - -c
        - |
          if [ "$API_SERVER_ENABLED" = "true" ]; then
              hermes config unset platforms.api_server.enabled >/dev/null 2>&1 || true
          else
              hermes config set platforms.api_server.enabled false >/dev/null 2>&1 || true
          fi
          exec hermes gateway run
      securityContext:
        readOnlyRootFilesystem: false
      env:
        - name: API_SERVER_ENABLED
          value: "false"
        - name: AWS_EC2_METADATA_DISABLED
          value: "true"
        - name: HERMES_HOME
          value: "/opt/data"
        - name: HERMES_UID
          value: "1000"
        - name: HERMES_GID
          value: "1000"
        - name: HERMES_DASHBOARD
          value: "1"
        - name: HERMES_DASHBOARD_HOST
          value: "0.0.0.0"
        - name: HERMES_DASHBOARD_PORT
          value: "9119"
        - name: HERMES_DASHBOARD_BASIC_AUTH_USERNAME
          valueFrom:
            secretKeyRef:
              name: hermes-dashboard-auth
              key: username
        - name: HERMES_DASHBOARD_BASIC_AUTH_PASSWORD
          valueFrom:
            secretKeyRef:
              name: hermes-dashboard-auth
              key: password
      ports:
        - name: dashboard
          containerPort: 9119
          protocol: TCP
      startupProbe:
        httpGet:
          path: /api/health
          port: 9119
        initialDelaySeconds: 10
        periodSeconds: 5
        failureThreshold: 30
        timeoutSeconds: 5
      livenessProbe:
        httpGet:
          path: /api/health
          port: 9119
        periodSeconds: 15
        timeoutSeconds: 5
      readinessProbe:
        httpGet:
          path: /api/health
          port: 9119
        periodSeconds: 10
        timeoutSeconds: 5
      volumeMounts:
        - name: hermes-data
          mountPath: /opt/data
  volumes:
    - name: hermes-data
      persistentVolumeClaim:
        claimName: hermes-data-pvc
```

## Simulation coverage

The patched `v2026.9.24` image was tested with a fresh, dedicated Compose volume:
health/login routes were reachable on both the published host port and container IP,
invalid password login returned 401, and valid login returned dashboard HTML and
configuration through the authenticated HTTP API. The supervisor ran as root while
the dashboard and gateway ran as UID 1000.

A harmless `dashboard.theme` setting saved through the CLI survived both restart
and forced container recreation, and was readable through the authenticated config
API. Browser rendering, saving provider credentials through the UI, actual model
inference, and Kubernetes deployment were not tested. Retain the named volume;
application-state persistence does not imply browser sessions survive when the
optional dashboard signing secret changes.

## CVE reduction

> Run `make scan-hermes-agent` to see current delta vs upstream.

Tested result: **-2.521 system CVEs (-75%)** from upgrade + build toolchain removal.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
