# Application Patch Runtime-Manifest Audit

Inventory source: Every directory below `patches/` containing `Dockerfile`.
Result: 16 templates: `9router`, `dozzle`, `filebrowser`, `hermes-agent`, `homepage`, `linkding`, `memos`, `nginx-proxy-manager`, `omniroute`, `openclaw`, `pocketbase`, `shlink`, `stirling-pdf`, `uptime-kuma`, `vaultwarden`, and `wordpress-fpm`.

## Evidence and Classification

The patch Dockerfiles select an upstream image and apply OS-level security hardening (upgrading packages or stripping build tools) or re-publish as-is where package managers are absent. Each template directory contains:
- `Dockerfile`: PFNApp hardened image definition.
- `runtime-manifest.json`: Specification matching `languages/php/runtime-manifest.json` schema style, declaring ports, security (UID/GID), health probes, and required vs. optional tunable environment variables with descriptions, types, and defaults.
- `docker-compose.yml`: Fully working, reproducible test sample.

| Template | Upstream Image | Runtime Type | Ports | Volumes | DB Dependency |
|---|---|---|---|---|---|
| `9router` | `decolua/9router:0.5.75` | Node.js / Next.js | 20128 | `/app/data` | None (SQLite) |
| `dozzle` | `amir20/dozzle:v11.1.1` | Go (distroless/scratch) | 8080 | `/var/run/docker.sock` (optional) | None |
| `filebrowser` | `filebrowser/filebrowser:v2.63.23` | Go | 80 (mapped 8080:80) | `/srv`, `/database` | None (SQLite) |
| `hermes-agent` | `nousresearch/hermes-agent:v2026.9.14` | Python / s6-overlay | 8642 (API), 9119 (dashboard) | `/opt/data` | None (SQLite) |
| `homepage` | `gethomepage/homepage:v2.4.0` | Node.js | 3000 (mapped 3005:3000) | `/app/config` | None |
| `linkding` | `sissbruecker/linkding:1.47.0` | Python / Django | 9090 | `/etc/linkding/data` | None (SQLite) |
| `memos` | `neosmemo/memos:0.31.0` | Go / React | 5230 | `/var/opt/memos` | None (SQLite) |
| `nginx-proxy-manager` | `jc21/nginx-proxy-manager:2.15.1` | Node.js / OpenResty | 81 (mapped 8081:81) | `/data`, `/etc/letsencrypt` | MariaDB 11 |
| `omniroute` | `diegosouzapw/omniroute:3.8.50` | Node.js / Next.js | 20128 (mapped 20129:20128) | `/app/data` | None (SQLite) |
| `openclaw` | `openclaw/openclaw:2026.9.5` | Node.js | 18789 | `/home/node/.openclaw` | None (SQLite) |
| `pocketbase` | `muchobien/pocketbase:0.40.4` | Go | 8090 | `/pb/pb_data`, `/pb/pb_public` | None (SQLite) |
| `shlink` | `shlinkio/shlink:5.1.6` | PHP (Swoole/RoadRunner) | 8080 (mapped 8082:8080) | None | MariaDB 11 |
| `stirling-pdf` | `stirlingtools/stirling-pdf:2.14.3` | Java (Spring Boot) | 8080 (mapped 8083:8080) | `/configs`, `/customFiles` | None (H2 embedded) |
| `uptime-kuma` | `louislam/uptime-kuma:2.5.5` | Node.js / Vue | 3001 | `/app/data` | None (SQLite) |
| `vaultwarden` | `vaultwarden/server:1.37.3` | Rust | 80 (mapped 8084:80) | `/data` | None (SQLite) |
| `wordpress-fpm` | `library/wordpress:7.1.1-php8.3-fpm-alpine` | PHP-FPM 8.3 | 9000 (FastCGI) | `/var/www/html` | MariaDB 11 |

## Environment Variables Breakdown (Required vs Optional)

### 1. 9router
- **Required:** None.
- **Optional:**
  - `PORT`: Server port (default: 20128).
  - `HOSTNAME`: Bind host (default: "0.0.0.0").
  - `DATA_DIR`: SQLite persistent data directory (default: "/app/data").
  - `NODE_ENV`: Execution mode (default: "production").
  - `NEXT_TELEMETRY_DISABLED`: Disable Next.js telemetry (default: true).

### 2. dozzle
- **Required:** None.
- **Optional:**
  - `DOZZLE_PORT`: Server listening port (default: 8080).
  - `DOZZLE_BASE`: Sub-path prefix (default: "/").
  - `DOZZLE_LEVEL`: Logging verbosity (default: "info").

### 3. filebrowser
- **Required:** None.
- **Optional:**
  - `UID`: Container user ID (default: 1000).
  - `GID`: Container group ID (default: 1000).

### 4. hermes-agent
- **Required (when API server is enabled):**
  - `API_SERVER_ENABLED`: Enable OpenAI-compatible HTTP API server (boolean).
  - `API_SERVER_HOST`: Bind address (must be `0.0.0.0` for container networking).
  - `API_SERVER_KEY`: Bearer token (string, minimum 16 characters required by security guard).
  - `HERMES_HOME`: State directory (default: "/opt/data").
- **Optional:**
  - `PYTHONUNBUFFERED`: Flush stdout/stderr immediately (default: true).
  - `PYTHONDONTWRITEBYTECODE`: Disable .pyc writes (default: true).
  - `HERMES_WRITE_SAFE_ROOT`: Security boundary directory (default: "/opt/data").
  - `HERMES_DISABLE_LAZY_INSTALLS`: Deterministic dependency isolation (default: true).
  - `HERMES_DASHBOARD`: Web dashboard enable (default: false, port 9119).

### 5. homepage
- **Required:**
  - `HOMEPAGE_ALLOWED_HOSTS`: Comma-separated allowed host headers (e.g. `localhost:3005,127.0.0.1:3005`).
- **Optional:**
  - `PUID`: Host user ID mapping (default: 1000).
  - `PGID`: Host group ID mapping (default: 1000).

### 6. linkding
- **Required:** None.
- **Optional:**
  - `LD_SERVER_PORT`: Server port (default: 9090).
  - `LD_CONTEXT_PATH`: Sub-path prefix.
  - `LD_SUPERUSER_NAME`: Initial administrator username.
  - `LD_SUPERUSER_PASSWORD`: Initial administrator password.

### 7. memos
- **Required:** None.
- **Optional:**
  - `MEMOS_MODE`: Environment mode (default: "prod").
  - `MEMOS_PORT`: HTTP listener port (default: 5230).
  - `MEMOS_DATA`: SQLite storage directory (default: "/var/opt/memos").

### 8. nginx-proxy-manager
- **Required:**
  - `DB_MYSQL_HOST`: Database hostname (e.g. `db`).
  - `DB_MYSQL_USER`: Database username (e.g. `npm`).
  - `DB_MYSQL_PASSWORD`: Database password.
  - `DB_MYSQL_NAME`: Database name (e.g. `npm`).
- **Optional:**
  - `DB_MYSQL_PORT`: Database port (default: 3306).
  - `DISABLE_IPV6`: Disable IPv6 binding (default: false).

### 9. omniroute
- **Required:**
  - `JWT_SECRET`: Session and cookie signing secret (string, minimum 32 characters).
  - `API_KEY_SECRET`: Encryption key for API keys stored at rest (string, minimum 32 characters).
  - `INITIAL_PASSWORD`: First-time admin dashboard password (string).
  - `DATA_DIR`: SQLite persistent directory (default: "/app/data").
  - `PORT`: HTTP port (default: 20128).
  - `HOSTNAME`: Bind host (default: "0.0.0.0").
- **Optional:**
  - `NODE_ENV`: Execution mode (default: "production").
  - `OMNIROUTE_MEMORY_MB`: Memory budget in MB (default: 1024).
  - `NODE_OPTIONS`: Node.js V8 heap allocation (default: "--max-old-space-size=1024").

### 10. openclaw
- **Required:**
  - `OPENCLAW_GATEWAY_TOKEN`: Bearer token for client authentication (required for non-loopback bind in container mode).
- **Optional:**
  - `OPENCLAW_GATEWAY_PORT`: Port to listen on (default: 18789).
  - `OPENCLAW_GATEWAY_BIND`: Bind interface (`auto`, `lan`, `0.0.0.0`).
  - `NODE_ENV`: Execution mode (default: "production").

### 11. pocketbase
- **Required:** None.
- **Optional:**
  - `PB_DATA_DIR`: Database directory (default: "/pb/pb_data").
  - `PB_PUBLIC_DIR`: Public assets directory (default: "/pb/pb_public").

### 12. shlink
- **Required:**
  - `DEFAULT_DOMAIN`: Shortener domain hostname (e.g. `localhost:8082`).
  - `DB_HOST`: Database host (e.g. `db`).
  - `DB_NAME`: Database name (e.g. `shlink`).
  - `DB_USER`: Database user (e.g. `shlink`).
  - `DB_PASSWORD`: Database password.
- **Optional:**
  - `DB_DRIVER`: Database type (`maria`, `mysql`, `postgres`, default: "maria").
  - `DB_PORT`: Database port (default: 3306).
  - `IS_HTTPS_ENABLED`: Force HTTPS short links (default: false).

### 13. stirling-pdf
- **Required:** None.
- **Optional:**
  - `SYSTEM_DEFAULTLOCALE`: Default UI locale (default: "en-US").
  - `SYSTEM_CONNECTIONTIMEOUTMILLISECONDS`: Timeout in ms (default: 120000).
  - `DOCKER_ENABLE_SECURITY`: Enable login authentication (default: false).

### 14. uptime-kuma
- **Required:** None.
- **Optional:**
  - `UPTIME_KUMA_HOST`: Bind address (default: "0.0.0.0").
  - `UPTIME_KUMA_PORT`: Server port (default: 3001).
  - `UPTIME_KUMA_DB_TYPE`: Database backend (default: "sqlite").
  - `DATA_DIR`: Data directory (default: "/app/data/").

### 15. vaultwarden
- **Required:** None.
- **Optional:**
  - `DOMAIN`: Public URL domain (e.g. `http://localhost:8084`).
  - `SIGNUPS_ALLOWED`: Allow public registration (default: true).
  - `WEBSOCKET_ENABLED`: Enable WebSockets (default: false).
  - `ADMIN_TOKEN`: Protected admin page token.

### 16. wordpress-fpm
- **Required:**
  - `WORDPRESS_DB_HOST`: Database host and port (e.g. `db:3306`).
  - `WORDPRESS_DB_USER`: Database username (e.g. `wordpress`).
  - `WORDPRESS_DB_PASSWORD`: Database password.
- **Optional:**
  - `WORDPRESS_DB_NAME`: Database name (default: "wordpress").
  - `WORDPRESS_CONFIG_EXTRA`: PHP configuration statements injected into `wp-config.php`.

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
| `nginx-proxy-manager` | PASS | PASS | `healthy` | HTTP 200 on port 8081 (mapped to 81) with MariaDB 11 | PASS |
| `omniroute` | PASS | PASS | `healthy` | HTTP 307 on port 20129 -> `/dashboard`; `/healthz` HTTP 200 `ok` | PASS |
| `openclaw` | PASS | PASS | `healthy` | HTTP 200 `{"ok":true,"status":"live"}` on `/healthz` | PASS |
| `pocketbase` | PASS | PASS | `healthy` | HTTP 200 `{"code":200,"message":"API is healthy."}` on `/api/health` | PASS |
| `shlink` | PASS | PASS | `healthy` | HTTP 200 `{"status":"pass","version":"5.1.6"}` on `/rest/health` | PASS |
| `stirling-pdf` | PASS | PASS | `healthy` | HTTP 200 / 401 on port 8083 (Spring Boot started) | PASS |
| `uptime-kuma` | PASS | PASS | `healthy` | HTTP 302 on port 3001 (redirect to setup) | PASS |
| `vaultwarden` | PASS | PASS | `healthy` | HTTP 200 on port 8084 on `/alive` | PASS |
| `wordpress-fpm` | PASS | PASS | `healthy` | FastCGI TCP 9000 ready with MariaDB 11 healthy | PASS |
