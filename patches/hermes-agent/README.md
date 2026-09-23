# PFNApp — Hermes Agent Hardened Image

**Upstream:** `docker.io/nousresearch/hermes-agent:v2026.9.14`  
**PFNApp:** `ghcr.io/pfnapp/hermes-agent:v2026.9.14`

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

The container healthcheck is a **dashboard availability probe**, not an API
probe. It does what a browser does: unauthenticated `GET /` on 9119 must
answer the login redirect (`302` with `Location: …/login`), or return `200`
(e.g. on a loopback bind where the gate is off). Connection refused, `4xx` or
`5xx` marks the container unhealthy. Two consequences worth knowing:

- The probe covers the dashboard, not the gateway daemon process.
- With `HERMES_DASHBOARD=0` nothing listens on 9119, so the container can
  **never** become healthy — drop or repoint the `healthcheck` block if you
  deliberately run without the dashboard.

Upstream also exposes an unauthenticated `GET /api/health` on 9119 (its own
"process liveness" endpoint) if you need a plain `200` to point a generic
uptime checker at.

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
volume, so stored data survives; re-supply `HERMES_API_SERVER_KEY` and
re-publish 8642 in `.env`/compose if existing API clients still need it.

Credentials are never committed: `docker-compose.yml` only carries
local-only placeholders behind `${...}` interpolation (and an empty API key —
the generated key lives in the git-ignored data volume, not the repository),
and real values live in `.env` (git-ignored).

## CVE reduction

> Run `make scan-hermes-agent` to see current delta vs upstream.

Tested result: **-2.521 system CVEs (-75%)** from upgrade + build toolchain removal.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
