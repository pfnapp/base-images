# PFN Base Images (`pfnapp/base-images`)

Hardened, secure, and production-ready container base images designed for modern cloud-native microservices, Kubernetes clusters, and container platforms.

[![Build and Audit PHP Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-php.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-php.yml)
[![Nightly CVE Audit](https://github.com/pfnapp/base-images/actions/workflows/nightly-cve-audit.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/nightly-cve-audit.yml)
[![Security: Aqua Trivy](https://img.shields.io/badge/Security-Aqua%20Trivy%20Gated-blue.svg)](https://github.com/aquasecurity/trivy)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🔒 Security Principles

Every base image in this repository strictly enforces zero-trust container security practices:

1. **100% Non-Root Execution (UID 10001 / GID 10001)**:
   - Dedicated unprivileged system user `appuser` and group `appgroup`.
   - All master and child processes (`supervisord`, `nginx`, `php-fpm`) run exclusively as UID `10001`.
   - Never runs `sudo`, `su`, or `chown` at container runtime.
2. **Unprivileged Networking**:
   - HTTP ingress listens on port **`8080`** (never privileged ports < 1024).
3. **Ephemeral and Read-Only Filesystem Friendly**:
   - Process IDs (`nginx.pid`, `php-fpm.pid`, `supervisord.pid`) reside in `/tmp/`.
   - Nginx temporary buffers (`client_body_temp_path`, `proxy_temp_path`, etc.) operate inside `/tmp/nginx/`.
   - Runtime configuration overrides generate cleanly into `/etc/php/conf.d/custom/`.
4. **CVE Governance with Aqua Trivy**:
   - Built images are scanned automatically on every build.
   - Gated in CI (`exit-code: 1` on any actionable `CRITICAL` or `HIGH` CVEs).
   - Audited daily via automated nightly security workflows.

---

## 📁 Repository Structure

```
.
├── .github/
│   └── workflows/
│       ├── build-php.yml           # CI build, Trivy scan gate, and GHCR publishing
│       └── nightly-cve-audit.yml   # Scheduled daily CVE scanner for GHCR images
├── languages/
│   └── php/
│       ├── shared/
│       │   ├── nginx/
│       │   │   ├── nginx.conf      # Non-root unprivileged Nginx core configuration
│       │   │   └── default.conf    # Virtual host listening on 8080 with FastCGI pass
│       │   ├── php.ini             # Hardened production php.ini
│       │   ├── php-fpm.conf        # Non-root PHP-FPM pool with ${VAR} expansion
│       │   ├── supervisord.conf    # Supervisor daemon orchestrating Nginx & PHP-FPM
│       │   └── entrypoint.sh       # Dynamic non-root runtime entrypoint
│       └── 8.4/
│           └── Dockerfile.alpine   # Alpine-based PHP 8.4 hardened image definition
├── Makefile                        # Local automation (build, test, scan, clean)
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 🐘 PHP 8.4 Alpine Specification

### Installed Extensions & Tools
- **Core Extensions**: `pdo_mysql`, `zip`, `gd`, `intl`, `bcmath`, `opcache`, `redis`
- **Web Server**: `nginx` (unprivileged worker & master)
- **Process Supervisor**: `supervisor` (Python 3)
- **Diagnostic Tools**: `curl`, `ca-certificates`, `tzdata`

### Health Check Endpoints
- **Nginx Native Ping**: `GET http://localhost:8080/healthz` -> `200 OK`
- **Application Health**: If `/var/www/html/public/index.php` is missing, `entrypoint.sh` automatically provisions a fallback JSON endpoint reporting runtime metrics, UID/GID status, and timestamp.

---

## ⚙️ Runtime Configuration & Environment Variables

Runtime configuration can be customized dynamically using environment variables without modifying image files:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PHP_MEMORY_LIMIT` | `256M` | Maximum memory allocation per PHP worker |
| `PHP_UPLOAD_MAX_FILESIZE` | `64M` | Maximum allowed file upload size |
| `PHP_POST_MAX_SIZE` | Matches upload size | Maximum size of POST data accepted |
| `PHP_MAX_EXECUTION_TIME` | `60` | Maximum execution time in seconds |
| `PHP_TIMEZONE` | `Asia/Jakarta` | Default PHP and server timezone |
| `PHP_FPM_PM` | `dynamic` | Process manager strategy (`dynamic`, `static`, `ondemand`) |
| `PHP_FPM_MAX_CHILDREN` | `50` | Maximum concurrent PHP-FPM worker processes |
| `PHP_FPM_START_SERVERS` | `5` | Number of child processes created on startup |
| `PHP_FPM_MIN_SPARE_SERVERS` | `5` | Minimum number of idle child processes |
| `PHP_FPM_MAX_SPARE_SERVERS` | `35` | Maximum number of idle child processes |
| `PHP_FPM_MAX_REQUESTS` | `500` | Number of requests handled before recycling a worker |

### Custom Configuration Overrides
- **Custom PHP Settings**: Mount or copy `.ini` files into `/etc/php/conf.d/custom/` (e.g. `/etc/php/conf.d/custom/my-tuning.ini`).
- **Custom Nginx Settings**: Mount or copy `.conf` files into `/etc/nginx/conf.d/custom/`.

---

## 🚀 Quickstart & Usage

### 1. Pulling the Image
```bash
docker pull ghcr.io/pfnapp/base/languages/php:8.4-alpine
# or using version / latest alias:
docker pull ghcr.io/pfnapp/base/languages/php:8.4
docker pull ghcr.io/pfnapp/base/languages/php:latest
```

### 2. Running Standalone
```bash
docker run -d \
  --name my-php-app \
  -p 8080:8080 \
  -e PHP_MEMORY_LIMIT=512M \
  -e PHP_TIMEZONE=Asia/Jakarta \
  ghcr.io/pfnapp/base/languages/php:8.4-alpine
```

Verify endpoint:
```bash
curl -i http://localhost:8080/healthz
curl -i http://localhost:8080/
```

### 3. Using in Downstream Applications (Dockerfile)
```dockerfile
FROM ghcr.io/pfnapp/base/languages/php:8.4-alpine

# Set working directory (defaults to /var/www/html)
WORKDIR /var/www/html

# Copy application source code with non-root ownership
COPY --chown=10001:10001 . /var/www/html

# The base image already declares:
# EXPOSE 8080
# USER 10001:10001
# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
```

---

## 🛠 Local Development & Testing

A `Makefile` is provided to simplify local building, testing, and vulnerability scanning:

```bash
# Build the local Docker image
make build

# Run automated runtime tests (port 8080 verification, UID 10001 assertion)
make test

# Scan the image with Aqua Trivy for CVEs
make scan

# Run build, test, and scan sequentially
make all

# Clean up test artifacts and images
make clean
```

---

## 🛡️ CI/CD & Governance Pipeline

1. **`build-php.yml`**:
   - Automatically triggered on push to `languages/php/**` and scheduled weekly.
   - Builds image with Docker Buildx.
   - Executes Aqua Trivy vulnerability scanner (`exit-code: 1` on CRITICAL/HIGH).
   - Validates non-root runtime and HTTP responses.
   - Authenticates and publishes tagged releases to GitHub Container Registry (`ghcr.io`).
2. **`nightly-cve-audit.yml`**:
   - Runs on a daily schedule (`0 0 * * *`).
   - Re-scans published GHCR base images against up-to-date vulnerability databases.
   - Raises alerts if newly disclosed zero-day vulnerabilities emerge.

---

## 📄 License

This project is licensed under the MIT License.
