# PFNApp — Hermes Agent Hardened Image

**Upstream:** `docker.io/nousresearch/hermes-agent:v2026.9.14`  
**PFNApp:** `ghcr.io/pfnapp/hermes-agent:v2026.9.14`

## What changed

- OS packages upgraded via `apt-get upgrade`
- Build toolchain removed from runtime image (`gcc`, `g++`, `cpp`, `make`, `cmake`, `python3-dev`, `libffi-dev`, `libc6-dev`, `linux-libc-dev`, `binutils`)

## Services exposed by the sample compose

| Service | Container port | Sample publish | Enabled by |
| --- | --- | --- | --- |
| OpenAI-compatible API server (`/v1`, `GET /health`) | 8642 | `8642:8642` (all interfaces) | `API_SERVER_ENABLED=true` + `gateway run` |
| Web dashboard (s6 longrun) | 9119 | `127.0.0.1:9119:9119` (host loopback) | `HERMES_DASHBOARD=1` + an auth provider |

The container healthcheck probes the API server only (`/health` on 8642), so a
dashboard problem never marks the gateway unhealthy.

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

# API gateway stays as before
curl -fsS http://127.0.0.1:8642/health
```

To expose the dashboard beyond the host: replace the placeholder password
first, then either front it with a reverse proxy (recommended) or widen the
publish rule to `9119:9119` / `0.0.0.0:9119:9119`. `HERMES_DASHBOARD=0` in
`.env` turns the dashboard off entirely; port 8642 keeps working either way.

Bringing an existing deployment up on this compose recreates the container
(dashboard env is new) but keeps the same `hermes-data` volume and — unless you
override it — the same API key, so stored data and existing API clients are
unaffected.

Credentials are never committed: `docker-compose.yml` only carries
local-only placeholders behind `${...}` interpolation, and real values live in
`.env` (git-ignored).

## CVE reduction

> Run `make scan-hermes-agent` to see current delta vs upstream.

Tested result: **-2.521 system CVEs (-75%)** from upgrade + build toolchain removal.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
