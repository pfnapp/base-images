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
│  Composer 2, Node.js & npm, pcntl, exif, git, unzip, bash   │
│   Laravel storage, Role-based Supervisor (Web/Worker/Cron)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│            ghcr.io/pfnapp/base/languages/php                │
│  Alpine Linux, Nginx (8080), PHP-FPM, core extensions,     │
│       supervisord, non-root user appuser (UID 10001)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Available Tags & Image Footprint

Published to **GitHub Container Registry (`ghcr.io`)**:

| PHP Version | Base Image Tag | Compressed (Download) | Uncompressed (Disk) | Pull Command | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **8.5** | `php8.5-alpine` | **~110 MB** | **298 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:php8.5-alpine` | Active |
| **8.4** | `php8.4-alpine` / `latest` | **~109 MB** | **295 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:php8.4-alpine` | Active (Default) |
| **8.3** | `php8.3-alpine` | **~106 MB** | **284 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:php8.3-alpine` | Active |
| **8.2** | `php8.2-alpine` | **~106 MB** | **280 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:php8.2-alpine` | Active |
| **8.1** | `php8.1-alpine` | **~104 MB** | **276 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/laravel:php8.1-alpine` | Active (Legacy) |

---

## 🚀 Platform-Managed Integration (Zero-Config PaaS Pattern)

In the PFN App Hosting platform and enterprise CI/CD, the build process is **100% managed by the platform**:

- **No Dockerfile in application repositories**: Application developers maintain clean Laravel code without worrying about Dockerfile maintenance, base image updates, or security patches.
- **Unified Zero-Config Containerization**: The platform wraps standard Laravel repositories using a single, unified template [`templates/Dockerfile.managed`](templates/Dockerfile.managed).
  - Handles both **API backends** and **Fullstack applications** (Vite, Tailwind, Inertia, Vue, React).
  - Because `ghcr.io/pfnapp/base/frameworks/laravel` includes both Composer and Node.js/npm natively, asset compilation happens **in-place** inside the Laravel project context.
  - **Zero brittle multi-stage juggling**: Tailwind/Vite can scan `resources/`, `routes/`, and `vendor/` natively without cross-container copies, and output directories (`public/build`, `public/css`, `public/dist`) are respected automatically.
  - **Automatic pruning**: After frontend compilation, `node_modules` and npm cache are removed in the same layer to keep production images slim.

### Platform Build Invocation

When deploying, the platform hosting engine runs:

```bash
# Unified build for both API-only and Fullstack (Vite/npm) applications
docker build \
  -f templates/Dockerfile.managed \
  --build-arg PHP_VERSION=8.4 \
  -t my-laravel-app:latest .
```

### Optional: Clean 2-Stage Multi-Stage Build

While `templates/Dockerfile.managed` is the zero-config default that handles both backend and fullstack builds, if a team explicitly requires a separated build environment (e.g. build cache isolation without carrying any build-time artifacts into the final runtime), it can be achieved cleanly without brittle cross-stage juggling:

```dockerfile
# Stage 1: Build dependencies & frontend in-place
FROM ghcr.io/pfnapp/base/frameworks/laravel:php8.4-alpine AS builder
WORKDIR /var/www/html
COPY --chown=10001:10001 . /var/www/html
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader \
    && if [ -f package.json ]; then \
         npm ci --prefer-offline 2>/dev/null || npm install --no-audit; \
         npm run build; \
       fi

# Stage 2: Clean runtime container
FROM ghcr.io/pfnapp/base/frameworks/laravel:php8.4-alpine
WORKDIR /var/www/html
COPY --from=builder --chown=10001:10001 /var/www/html /var/www/html
# node_modules can be excluded or removed before copying
USER 10001:10001
```

---

## ⚖️ Architecture Comparison: Legacy Infrastructure vs. Modern App Hosting

| Feature | Legacy Infrastructure (`php-laravel`) | Modern App Hosting (`frameworks/laravel`) |
| :--- | :--- | :--- |
| **Base OS** | Ubuntu / Debian (heavyweight) | **Alpine Linux (minimal attack surface)** |
| **Security Execution** | Root container with `su www-data` | **100% Non-root UID 10001 (`appuser`) throughout build & runtime** |
| **Ingress Port** | Port 80 (privileged) | **Port 8080 (unprivileged)** |
| **Permission Management** | Runtime `chmod 775` & `chown` in build | **Pre-configured UID 10001 ownership and permissions** |
| **Process Model** | Monolithic (Web + Cron + Worker as root) | **Role-based (`CONTAINER_ROLE=app\|worker\|scheduler\|horizon`)** |
| **Scheduler (Cron)** | System cron daemon (`/usr/sbin/cron`) as root | **Unprivileged `schedule:work` daemon (no root cron needed)** |
| **Frontend Assets** | Debian Bullseye/Bookworm OpenSSL hacks | **Native Node.js/npm in Alpine base with automated in-place Vite/Mix compilation** |
| **Vulnerability Gating** | Unscanned base images | **Automated Aqua Trivy scanning in CI (zero CRITICAL/HIGH)** |

---

## 🔒 Security & Non-Root Execution

1. **Non-Root User (UID 10001)**: All processes run strictly under `appuser:appgroup` (`UID 10001` / `GID 10001`). No runtime `sudo`, `su`, or `chown`.
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

### 4. Reverse Proxy & HTTPS (Mixed Content Prevention)

When deploying behind an external reverse proxy (Cloudflare, AWS ALB, Traefik, or host Nginx), SSL termination typically happens upstream while traffic reaches the container via HTTP (port 8080).

The base image automatically maps upstream `X-Forwarded-Proto: https` to FastCGI `HTTPS=on` and `REQUEST_SCHEME=https`, enabling Laravel to automatically detect HTTPS and generate secure URLs for assets (`asset()`, `vite()`, `route()`).

For standard Laravel configurations:
- **Laravel 11+** (`bootstrap/app.php`):
  ```php
  ->withMiddleware(function (Middleware $middleware) {
      $middleware->trustProxies(at: '*');
  })
  ```
- **Laravel 10 and below** (`app/Http/Middleware/TrustProxies.php`):
  ```php
  protected $proxies = '*';
  ```
- **Force HTTPS Scheme** (Optional reinforcement in `app/Providers/AppServiceProvider.php`):
  ```php
  use Illuminate\Support\Facades\URL;

  public function boot(): void
  {
      if ($this->app->environment('production') || request()->header('X-Forwarded-Proto') === 'https') {
          URL::forceScheme('https');
      }
  }
  ```

---

## 🛠️ Local Orchestration with Docker Compose

The [`examples/docker-compose.yml`](examples/docker-compose.yml) demonstrates orchestrating a full microservice stack (Web, Queue Worker, Scheduler, Redis, MySQL) using the platform-managed Dockerfile:

```bash
# Start all services using the managed Dockerfile template
docker compose -f examples/docker-compose.yml up --build
```

In `examples/docker-compose.yml`:
- The `web` service builds the application using `templates/Dockerfile.managed`.
- The `queue-worker` service runs the same built image with `CONTAINER_ROLE=worker`.
- The `scheduler` service runs the same built image with `CONTAINER_ROLE=scheduler`.
- Redis and MySQL provide caching, queuing, and persistence.

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
