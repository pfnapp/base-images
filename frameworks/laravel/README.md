# Laravel Base Images (`frameworks/laravel`)

Production-ready, hardened, unprivileged container image for modern Laravel applications. Built on top of `ghcr.io/pfnapp/base/languages/php:${PHP_VERSION}-alpine`, running **100% as non-root (UID 10001)** with built-in multi-role execution for Web, Queue Worker, Horizon, and Scheduler microservices.

---

## 🏗️ Layered Architecture

This framework image sits on top of our foundational PHP language base images:

```text
┌─────────────────────────────────────────────────────────────┐
│                   Application Container                     │
│        (Your Laravel code, vendors, compiled Vite assets)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│           ghcr.io/pfnapp/base/frameworks/laravel            │
│  Composer 2, pcntl, exif, git, unzip, bash, Laravel storage │
│   Role-based Supervisor entrypoint (Web / Worker / Cron)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│            ghcr.io/pfnapp/base/languages/php                │
│  Alpine Linux, Nginx (8080), PHP-FPM, core extensions,     │
│       supervisord, non-root user appuser (UID 10001)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Available Tags

Published to **GitHub Container Registry (`ghcr.io`)**:

| PHP Version | Base Image Tag | Pull Command | Status |
| :--- | :--- | :--- | :--- |
| **8.4** | `8.4-alpine` / `latest` | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:8.4-alpine` | Active (Default) |
| **8.3** | `8.3-alpine` | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:8.3-alpine` | Active |
| **8.2** | `8.2-alpine` | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:8.2-alpine` | Active |
| **8.1** | `8.1-alpine` | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:8.1-alpine` | Active |
| **7.4** | `7.4-alpine` | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:7.4-alpine` | Active (Legacy) |

---

## 🔒 Security & Non-Root Execution

1. **Non-Root User (UID 10001)**: All processes run under `appuser:appgroup` (`UID 10001` / `GID 10001`). No runtime `sudo`, `su`, or `chown`.
2. **Unprivileged Ingress (Port 8080)**: Nginx and internal endpoints bind strictly to unprivileged ports `> 1024`.
3. **Pre-Initialized Storage**: `/var/www/html/storage` and `/var/www/html/bootstrap/cache` are pre-created with `775` permissions and `10001:10001` ownership.
4. **Read-Only RootFS Compatible**: Temporary PID files and buffers write to `/tmp/`.
5. **Aqua Trivy Scanned**: Automatically gated in CI against actionable `CRITICAL` and `HIGH` CVEs.

---

## 🎭 Role-Based Container Execution (`CONTAINER_ROLE`)

Deploy the **exact same container image** across your entire infrastructure by simply adjusting the `CONTAINER_ROLE` environment variable:

| Role | Aliases | Running Services | Description |
| :--- | :--- | :--- | :--- |
| `app` *(default)* | `web` | Nginx (8080) + PHP-FPM | Handles public HTTP traffic and health checks (`/healthz`). |
| `worker` | `queue` | Laravel Queue Worker (`queue:work`) | Runs asynchronous queue jobs. Disables Nginx & PHP-FPM. |
| `horizon` | — | Laravel Horizon (`horizon`) | Runs Redis queue supervisor via Horizon. Disables Nginx & PHP-FPM. |
| `scheduler` | `cron` | Laravel Scheduler (`schedule:work`) | Periodically runs scheduled tasks every 60s as non-root. Disables Nginx & PHP-FPM. |
| `all` | — | Nginx + PHP-FPM + Worker + Scheduler | Monolithic runner for local dev, testing, or small single-instance deployments. |

---

## ⚙️ Configuration & Environment Variables

### 1. Role & Worker Tuning

| Variable | Default | Role | Description |
| :--- | :--- | :--- | :--- |
| `CONTAINER_ROLE` | `app` | All | Operating role (`app`, `worker`, `horizon`, `scheduler`, `all`). |
| `LARAVEL_QUEUE_ENABLE` | `false` | `app` | If `true` when in `app` role, also runs a queue worker (monolith mode). |
| `LARAVEL_HORIZON_ENABLE` | `false` | `app`, `all` | If `true`, runs `php artisan horizon`. |
| `LARAVEL_SCHEDULE_ENABLE` | `false` | `app` | If `true` when in `app` role, also runs the scheduler (monolith mode). |
| `LARAVEL_QUEUE_CONNECTION`| `default`| `worker`, `all` | Queue connection name (e.g., `redis`, `database`). |
| `LARAVEL_QUEUE_NAME` | `default` | `worker`, `all` | Specific queue names to process (comma-separated, e.g. `high,default`). |
| `LARAVEL_QUEUE_NUMPROCS` | `2` | `worker`, `all` | Number of worker processes to spawn in Supervisor. |
| `LARAVEL_QUEUE_SLEEP` | `3` | `worker`, `all` | Sleep duration (seconds) when no job is available. |
| `LARAVEL_QUEUE_TRIES` | `3` | `worker`, `all` | Number of attempts before failing a job. |
| `LARAVEL_QUEUE_TIMEOUT` | `60` | `worker`, `all` | Maximum seconds a job may run before timeout. |
| `LARAVEL_QUEUE_MEMORY` | `128` | `worker`, `all` | Memory limit (MB) before worker restarts. |
| `LARAVEL_QUEUE_MAX_JOBS` | *(none)* | `worker`, `all` | Number of jobs to process before worker worker recycles. |
| `LARAVEL_QUEUE_MAX_TIME` | *(none)* | `worker`, `all` | Maximum seconds worker stays alive before recycling. |

### 2. Startup Automations

| Variable | Default | Description |
| :--- | :--- | :--- |
| `LARAVEL_STORAGE_LINK` | `true` | Runs `php artisan storage:link` if public symlink does not exist. |
| `LARAVEL_RUN_MIGRATIONS` | `false` | Runs `php artisan migrate --force` at startup. |
| `LARAVEL_RUN_OPTIMIZE` | `false` | Runs `php artisan optimize` (or config/route/view caches) at startup. |

### 3. PHP Runtime Overrides

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PHP_MEMORY_LIMIT` | `256M` | PHP memory limit (applied to CLI & FPM via `99-overrides.ini`). |
| `PHP_UPLOAD_MAX_FILESIZE` | `64M` | Maximum allowed file upload size. |
| `PHP_POST_MAX_SIZE` | Matches upload | Maximum allowed POST body size. |
| `PHP_MAX_EXECUTION_TIME` | `60` | Max script execution timeout in seconds. |
| `PHP_TIMEZONE` | `Asia/Jakarta` | PHP & OS timezone. |

---

## 🚀 Migration Guide (From Old Jenkins Monolith)

In legacy setups (such as `pfnapp/Jenkins/builds/php/entrypoint.sh`), Laravel deployments were monolithic and ran as `root`:
- Queue workers ran with `user=root` directly inside web containers.
- Schedulers required system `cron` daemon (`/usr/sbin/cron -f`) writing to `/etc/cron.d/`, demanding root privileges.
- Nginx ran on privileged port 80.

### What Changed:
1. **Separation of Concerns**: Instead of running web, workers, and cron together as root in a single bloated container, separate deployments/services are created from the **exact same container image** using `CONTAINER_ROLE=app`, `CONTAINER_ROLE=worker`, and `CONTAINER_ROLE=scheduler`.
2. **Cron Without Root**: Laravel 8+ native `schedule:work` is used (with non-root 60s fallback daemon). No root `/usr/sbin/cron` or `/etc/cron.d` needed!
3. **Graceful Worker Termination**: Worker configs include `stopwaitsecs=3600` and `killasgroup=true`, preventing job data loss during Kubernetes pod termination.
4. **Port 8080**: Service and ingress configs target port `8080` instead of port `80`.

---

## 🛠️ Usage Examples

See the [`examples/`](examples/) directory for complete, ready-to-use manifests:

- [Multi-stage Dockerfile](examples/Dockerfile.example) with Vite asset compilation.
- [Docker Compose](examples/docker-compose.yml) demonstrating Web, Worker, Scheduler, Redis, and MySQL.
- [Production Kubernetes Deployment](examples/k8s-deployment.yaml) with Ingress, Service, Probes, and non-root securityContext.

---

## 🧪 Direct Artisan / CLI Passthrough

The image entrypoint transparently handles direct CLI commands without starting Supervisor:

```bash
# Run migrations on demand
docker run --rm -e DB_HOST=... my-app:latest php artisan migrate --force

# Open interactive Tinker REPL
docker run --rm -it my-app:latest php artisan tinker

# Inspect Composer dependencies
docker run --rm my-app:latest composer show
```
