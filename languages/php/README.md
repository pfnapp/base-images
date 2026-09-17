# PHP Base Images (`languages/php`)

Production-ready, hardened PHP runtime images with integrated Nginx and PHP-FPM managed by Supervisor, running **100% as non-root (UID 10001)**.

---

## 📁 Versions Available

| Version | Base OS | Status | Pull Tag |
|---|---|---|---|
| **8.5** | Alpine 3.24 | Active | `ghcr.io/pfnapp/base/languages/php:8.5-alpine`, `ghcr.io/pfnapp/base/languages/php:8.5` |
| **8.4** | Alpine 3.24 | Active (Default / `latest`) | `ghcr.io/pfnapp/base/languages/php:8.4-alpine`, `ghcr.io/pfnapp/base/languages/php:8.4`, `ghcr.io/pfnapp/base/languages/php:latest` |
| **8.3** | Alpine 3.24 | Active | `ghcr.io/pfnapp/base/languages/php:8.3-alpine`, `ghcr.io/pfnapp/base/languages/php:8.3` |
| **8.2** | Alpine 3.24 | Active | `ghcr.io/pfnapp/base/languages/php:8.2-alpine`, `ghcr.io/pfnapp/base/languages/php:8.2` |
| **8.1** | Alpine 3.21 | Active | `ghcr.io/pfnapp/base/languages/php:8.1-alpine`, `ghcr.io/pfnapp/base/languages/php:8.1` |
| **7.4** | Alpine 3.16 | Active (Legacy Patched) | `ghcr.io/pfnapp/base/languages/php:7.4-alpine`, `ghcr.io/pfnapp/base/languages/php:7.4` |

---

## 🔒 Security & Non-Root Design

- **Execution User**: `appuser:appgroup` (UID `10001` / GID `10001`).
- **Listen Port**: `8080` (unprivileged).
- **Temporary Buffers**: PIDs and Nginx client buffers write to `/tmp/`.
- **Dynamic Config**: Runtime configuration overrides generate cleanly into `/etc/php/conf.d/custom/` without requiring `root` or `chown`.

---

## 📦 Installed Extensions & Tools

- **Core Extensions**: `pdo_mysql`, `zip`, `gd`, `intl`, `bcmath`, `opcache`, `redis`
- **Web Server**: `nginx` (unprivileged master and worker processes)
- **Process Supervisor**: `supervisor`
- **System Utilities**: `curl`, `ca-certificates`, `tzdata`

---

## ⚙️ Runtime Configuration & Environment Variables

Tune PHP and PHP-FPM dynamically at container startup using environment variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PHP_MEMORY_LIMIT` | `256M` | Maximum memory allocation per PHP worker |
| `PHP_UPLOAD_MAX_FILESIZE` | `64M` | Maximum allowed file upload size |
| `PHP_POST_MAX_SIZE` | Matches upload size | Maximum size of POST data accepted |
| `PHP_MAX_EXECUTION_TIME` | `60` | Maximum execution time in seconds |
| `PHP_TIMEZONE` | `Asia/Jakarta` | Default server and PHP timezone |
| `PHP_FPM_PM` | `dynamic` | Process manager strategy (`dynamic`, `static`, `ondemand`) |
| `PHP_FPM_MAX_CHILDREN` | `50` | Maximum concurrent PHP-FPM workers |
| `PHP_FPM_START_SERVERS` | `5` | Number of child processes spawned at startup |
| `PHP_FPM_MIN_SPARE_SERVERS` | `5` | Minimum idle child processes |
| `PHP_FPM_MAX_SPARE_SERVERS` | `35` | Maximum idle child processes |
| `PHP_FPM_MAX_REQUESTS` | `500` | Requests handled before recycling a worker process |

### Custom Overrides:
- **PHP Config**: Mount custom `.ini` files to `/etc/php/conf.d/custom/` (e.g. `my-tuning.ini`).
- **Nginx Route/Location Overrides**: Mount custom route configs to `/etc/nginx/conf.d/custom/routes-*.conf` (e.g. `routes-api.conf` with custom location / proxy-pass blocks).
- **Nginx Server Overrides**: Mount custom server configs to `/etc/nginx/conf.d/custom/server-*.conf`.
- **Enterprise Reverse Proxy & Real IP**: Pre-configured in `/etc/nginx/conf.d/proxy.conf` with RFC1918 and Cloudflare CIDR support, restoring true client IPs via `X-Forwarded-For`.
- **ACME Challenge**: Built-in support for `/.well-known/acme-challenge/` returning HTTP 200.
- **Static Asset Caching**: 1-year immutable caching for CSS, JS, images, and webfonts.
- **HTTPoxy Mitigation**: Strips untrusted `HTTP_PROXY` FastCGI headers automatically.

---

## 🚀 Usage & Extending in Your Application

Use this base image to build your application container:

```dockerfile
FROM ghcr.io/pfnapp/base/languages/php:8.4-alpine

# Set working directory (owned by appuser 10001)
WORKDIR /var/www/html

# Copy application files with proper ownership
COPY --chown=10001:10001 . /var/www/html/

# Public web root must be at /var/www/html/public
EXPOSE 8080
```

### Running Standalone:
```bash
docker run -d \
  --name my-php-app \
  -p 8080:8080 \
  -e PHP_MEMORY_LIMIT=512M \
  -e PHP_TIMEZONE=Asia/Jakarta \
  ghcr.io/pfnapp/base/languages/php:8.4-alpine
```

### Health Check:
- **Nginx Native Ping**: `GET http://localhost:8080/healthz` &rarr; `200 OK`
- **Default Application Status**: If `/var/www/html/public/index.php` is not mounted, the container responds with runtime status JSON on `/`.
