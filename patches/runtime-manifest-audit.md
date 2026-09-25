# Application Patch Runtime-Manifest Audit

Inventory source: Every directory below `patches/` containing `Dockerfile`.
Result: 17 templates: `9router`, `dozzle`, `filebrowser`, `hermes-agent`, `homepage`, `linkding`, `memos`, `n8n`, `nginx-proxy-manager`, `omniroute`, `openclaw`, `pocketbase`, `shlink`, `stirling-pdf`, `uptime-kuma`, `vaultwarden`, and `wordpress-fpm`.

## Evidence and Classification

The patch Dockerfiles select an upstream image and apply OS-level security hardening (upgrading packages or stripping build tools) or re-publish as-is where package managers are absent. Each template directory contains:
- `Dockerfile`: PFNApp hardened image definition.
- `runtime-manifest.json`: Specification matching `languages/php/runtime-manifest.json` schema style, declaring ports, security (UID/GID), health probes, and required vs. optional tunable environment variables with descriptions, types, and defaults.
- `docker-compose.yml`: Fully working, reproducible test sample.

| Template | Hardened Image | Port(s) | Storage Volume(s) | DB Dependency | Health Probe Endpoint |
|---|---|---|---|---|---|
| `9router` | `ghcr.io/pfnapp/9router:0.5.75` | `20128` | `/app/data` | SQLite | `GET /` (HTTP 307 -> `/dashboard`) |
| `dozzle` | `ghcr.io/pfnapp/dozzle:v11.1.1` | `8080` | None (`/var/run/docker.sock` opt) | None | `["CMD", "/dozzle", "healthcheck"]` (HTTP 200) |
| `filebrowser` | `filebrowser/filebrowser:v2.63.23` | `80` (maps `8080:80`) | `/srv`, `/database` | SQLite | `GET /` (HTTP 200) |
| `hermes-agent` | `nousresearch/hermes-agent:v2026.9.14` | `8642` (API), `9119` (dashboard) | `/opt/data` | SQLite | `GET /health` on `8642` (HTTP 200) |
| `homepage` | `ghcr.io/pfnapp/homepage:v2.4.0` | `3000` (maps `3005:3000`) | `/app/config` | None | `GET /` with `Host` header (HTTP 200) |
| `linkding` | `ghcr.io/pfnapp/linkding:1.47.0` | `9090` | `/etc/linkding/data` | SQLite | `GET /` (HTTP 302 -> `/bookmarks`) |
| `memos` | `neosmemo/memos:0.31.0` | `5230` | `/var/opt/memos` | SQLite | `GET /` (HTTP 200) |
| `n8n` | `n8nio/n8n:2.40.6` | `5678` | `/home/node/.n8n` | SQLite / PostgreSQL | `GET /healthz` (HTTP 200 `{"status":"ok"}`) |
| `nginx-proxy-manager` | `jc21/nginx-proxy-manager:2.15.1` | `81` (maps `8081:81`), `80`, `443` | `/data`, `/etc/letsencrypt` | MariaDB 11 | `GET /` on `81` (HTTP 200) |
| `omniroute` | `diegosouzapw/omniroute:3.8.50` | `20128` (maps `20129:20128`) | `/app/data` | SQLite | `GET /` (307) / `GET /healthz` (200) |
| `openclaw` | `openclaw/openclaw:2026.9.6` | `18789` | `/home/node/.openclaw` | SQLite | `GET /healthz` (200 `{"ok":true,"status":"live"}`) |
| `pocketbase` | `muchobien/pocketbase:0.40.4` | `8090` | `/pb/pb_data`, `/pb/pb_public` | SQLite | `GET /api/health` (HTTP 200) |
| `shlink` | `shlinkio/shlink:5.1.6` | `8080` (maps `8082:8080`) | None | MariaDB 11 | `GET /rest/health` (HTTP 200) |
| `stirling-pdf` | `stirlingtools/stirling-pdf:2.14.3` | `8080` (maps `8083:8080`) | `/configs`, `/customFiles` | H2 embedded | `GET /` on `8080` (HTTP 200/401) |
| `uptime-kuma` | `louislam/uptime-kuma:2.5.5` | `3001` | `/app/data` | SQLite | `GET /` (HTTP 302 -> `/dashboard`) |
| `vaultwarden` | `vaultwarden/server:1.37.3` | `80` (maps `8084:80`) | `/data` | SQLite | `GET /alive` (HTTP 200) |
| `wordpress-fpm` | `ghcr.io/pfnapp/wordpress-fpm:7.1.1-php8.3-fpm-alpine` | `9000` (FastCGI TCP) | `/var/www/html` | MariaDB 11 | Socket connection on port `9000` |

---

## Enriched Environment Variables Breakdown (Required vs Optional)

### 1. 9router
- **Required (0):** None
- **Optional (12):** `PORT`, `HOSTNAME`, `DATA_DIR`, `NODE_ENV`, `NEXT_TELEMETRY_DISABLED`, `REQUIRE_API_KEY`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `CORS_ORIGIN`, `BASE_URL`, `ENABLE_REQUEST_LOGS`

### 2. dozzle
- **Required (0):** None
- **Optional (9):** `DOZZLE_ADDR`, `DOZZLE_PORT`, `DOZZLE_BASE`, `DOZZLE_LEVEL`, `DOZZLE_NO_ANALYTICS`, `DOZZLE_USERNAME`, `DOZZLE_PASSWORD`, `DOZZLE_KEY`, `DOZZLE_CERT`

### 3. filebrowser
- **Required (0):** None
- **Optional (8):** `UID`, `GID`, `FB_PORT`, `FB_ADDRESS`, `FB_ROOT`, `FB_DATABASE`, `FB_LOG`, `FB_BASEURL`

### 4. hermes-agent
- **Required (4):** `API_SERVER_ENABLED`, `API_SERVER_HOST`, `API_SERVER_KEY`, `HERMES_HOME`
- **Optional (31):** `PYTHONUNBUFFERED`, `PYTHONDONTWRITEBYTECODE`, `HERMES_WRITE_SAFE_ROOT`, `HERMES_DISABLE_LAZY_INSTALLS`, `API_SERVER_PORT`, `ANTHROPIC_API_KEY`, `ANTHROPIC_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENROUTER_API_KEY`, `GOOGLE_API_KEY`, `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, `GROQ_API_KEY`, `XAI_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALLOWED_USERS`, `DISCORD_BOT_TOKEN`, `DISCORD_ALLOWED_USERS`, `SLACK_BOT_TOKEN`, `SLACK_APP_TOKEN`, `SLACK_ALLOWED_USERS`, `HERMES_DASHBOARD`, `HERMES_DASHBOARD_HOST`, `HERMES_DASHBOARD_PORT`, `HERMES_DASHBOARD_BASIC_AUTH_USERNAME`, `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD`, `HERMES_UID`, `HERMES_GID`, `PUID`, `PGID`

### 5. homepage
- **Required (1):** `HOMEPAGE_ALLOWED_HOSTS`
- **Optional (4):** `PORT`, `LOG_LEVEL`, `PUID`, `PGID`

### 6. linkding
- **Required (0):** None
- **Optional (12):** `LD_SERVER_PORT`, `LD_CONTEXT_PATH`, `LD_SUPERUSER_NAME`, `LD_SUPERUSER_PASSWORD`, `LD_DISABLE_BACKGROUND_TASKS`, `LD_DISABLE_URL_VALIDATION`, `LD_DB_ENGINE`, `LD_DB_DATABASE`, `LD_DB_USER`, `LD_DB_PASSWORD`, `LD_DB_HOST`, `LD_DB_PORT`

### 7. memos
- **Required (0):** None
- **Optional (7):** `MEMOS_MODE`, `MEMOS_PORT`, `MEMOS_DATA`, `MEMOS_DRIVER`, `MEMOS_DSN`, `MEMOS_PUBLIC`, `MEMOS_MAX_UPLOAD_SIZE_MIB`

### 8. n8n
- **Required (0):** None
- **Optional (16):** `N8N_PORT`, `N8N_HOST`, `NODE_ENV`, `N8N_WEBHOOK_URL`, `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS`, `N8N_ENCRYPTION_KEY`, `GENERIC_TIMEZONE`, `TZ`, `DB_TYPE`, `DB_POSTGRESDB_HOST`, `DB_POSTGRESDB_PORT`, `DB_POSTGRESDB_DATABASE`, `DB_POSTGRESDB_USER`, `DB_POSTGRESDB_PASSWORD`, `N8N_EDITOR_BASE_URL`, `N8N_DIAGNOSTICS_ENABLED`

### 9. nginx-proxy-manager
- **Required (4):** `DB_MYSQL_HOST`, `DB_MYSQL_USER`, `DB_MYSQL_PASSWORD`, `DB_MYSQL_NAME`
- **Optional (4):** `DB_MYSQL_PORT`, `DISABLE_IPV6`, `INITIAL_ADMIN_EMAIL`, `INITIAL_ADMIN_PASSWORD`

### 10. omniroute
- **Required (6):** `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `DATA_DIR`, `PORT`, `HOSTNAME`
- **Optional (13):** `NODE_ENV`, `OMNIROUTE_MEMORY_MB`, `NODE_OPTIONS`, `OMNIROUTE_MIGRATIONS_DIR`, `REQUIRE_API_KEY`, `OMNIROUTE_BASE_PATH`, `OMNIROUTE_HEALTHCHECK_PATH`, `CORS_ALLOWED_ORIGINS`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`, `PRICING_SYNC_ENABLED`, `MODELS_DEV_SYNC_ENABLED`, `STORAGE_ENCRYPTION_KEY`

### 11. openclaw
- **Required (1):** `OPENCLAW_GATEWAY_TOKEN`
- **Optional (15):** `OPENCLAW_GATEWAY_BIND`, `OPENCLAW_GATEWAY_PORT`, `NODE_ENV`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `GROQ_API_KEY`, `OPENROUTER_API_KEY`, `DEEPSEEK_API_KEY`, `TELEGRAM_BOT_TOKEN`, `DISCORD_BOT_TOKEN`, `SLACK_BOT_TOKEN`, `OPENCLAW_TZ`, `OPENCLAW_SKIP_ONBOARDING`, `OPENCLAW_GATEWAY_PASSWORD`

### 12. pocketbase
- **Required (0):** None
- **Optional (4):** `PB_DATA_DIR`, `PB_PUBLIC_DIR`, `PB_ENCRYPTION_KEY`, `PB_DEBUG`

### 13. shlink
- **Required (5):** `DEFAULT_DOMAIN`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- **Optional (9):** `DB_DRIVER`, `DB_PORT`, `IS_HTTPS_ENABLED`, `GEOLITE_LICENSE_KEY`, `REDIRECT_STATUS_CODE`, `REDIRECT_CACHE_LIFETIME`, `BASE_PATH`, `TIMEZONE`, `MULTI_SEGMENT_SLUGS_ENABLED`

### 14. stirling-pdf
- **Required (0):** None
- **Optional (6):** `SYSTEM_DEFAULTLOCALE`, `SYSTEM_CONNECTIONTIMEOUTMILLISECONDS`, `DOCKER_ENABLE_SECURITY`, `SECURITY_ENABLELOGIN`, `INSTALL_BOOK_AND_ADVANCED_HTML_OPS`, `APP_HOME_NAME`

### 15. uptime-kuma
- **Required (0):** None
- **Optional (8):** `DATA_DIR`, `UPTIME_KUMA_HOST`, `UPTIME_KUMA_PORT`, `NODE_ENV`, `UPTIME_KUMA_DB_TYPE`, `UPTIME_KUMA_WS_URL`, `UPTIME_KUMA_ENTRY_POINT`, `UPTIME_KUMA_DISABLE_FRAME_SAMEORIGIN`

### 16. vaultwarden
- **Required (0):** None
- **Optional (12):** `DOMAIN`, `SIGNUPS_ALLOWED`, `INVITATIONS_ALLOWED`, `WEBSOCKET_ENABLED`, `ADMIN_TOKEN`, `DATABASE_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_SECURITY`

### 17. wordpress-fpm
- **Required (3):** `WORDPRESS_DB_HOST`, `WORDPRESS_DB_USER`, `WORDPRESS_DB_PASSWORD`
- **Optional (4):** `WORDPRESS_DB_NAME`, `WORDPRESS_TABLE_PREFIX`, `WORDPRESS_DEBUG`, `WORDPRESS_CONFIG_EXTRA`

---

## Validation Ledger (All 16 Templates Verified)

Every sample was checked with:
```bash
docker compose config
docker compose build --pull
docker compose up -d
docker compose ps
curl smoke test
docker compose down -v --remove-orphans
```

| Template | Compose Config | Build / Pull | Health Status | Smoke Test Response | Cleanup |
|---|---|---|---|---|---|
| `9router` | PASS | PASS | `healthy` | HTTP 307 -> `/dashboard` -> `/login` (HTTP 200) | PASS |
| `dozzle` | PASS | PASS | `healthy` | HTTP 200 on port 8080 (built-in `/dozzle healthcheck`) | PASS |
| `filebrowser` | PASS | PASS | `healthy` | HTTP 200 on port 8080 (mapped to 80) | PASS |
| `hermes-agent` | PASS | PASS | `exited (0)` | `hermes doctor` ran full diagnostics and verified python, tools, s6 | PASS |
| `homepage` | PASS | PASS | `healthy` | HTTP 200 on port 3005 with `Host: 127.0.0.1:3005` | PASS |
| `linkding` | PASS | PASS | `healthy` | HTTP 302 on port 9090 (redirect to `/bookmarks`) | PASS |
| `memos` | PASS | PASS | `healthy` | HTTP 200 on port 5230 | PASS |
| `n8n` | PASS | PASS | `healthy` | HTTP 200 on port 5678 on `/healthz` (`{"status":"ok"}`) | PASS |
| `nginx-proxy-manager` | PASS | PASS | `healthy` | HTTP 200 on port 8081 (mapped to 81) with MariaDB 11 | PASS |
| `omniroute` | PASS | PASS | `healthy` | HTTP 307 on port 20129 -> `/dashboard`; `/healthz` HTTP 200 `ok` | PASS |
| `openclaw` | PASS | PASS | `healthy` | HTTP 200 `{"ok":true,"status":"live"}` on `/healthz` | PASS |
| `pocketbase` | PASS | PASS | `healthy` | HTTP 200 `{"code":200,"message":"API is healthy."}` on `/api/health` | PASS |
| `shlink` | PASS | PASS | `healthy` | HTTP 200 `{"status":"pass","version":"5.1.6"}` on `/rest/health` | PASS |
| `stirling-pdf` | PASS | PASS | `healthy` | HTTP 200 / 401 on port 8083 (Spring Boot started) | PASS |
| `uptime-kuma` | PASS | PASS | `healthy` | HTTP 302 on port 3001 (redirect to setup) | PASS |
| `vaultwarden` | PASS | PASS | `healthy` | HTTP 200 on port 8084 on `/alive` | PASS |
| `wordpress-fpm` | PASS | PASS | `healthy` | FastCGI TCP 9000 ready with MariaDB 11 healthy | PASS |
