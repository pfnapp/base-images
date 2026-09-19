# PFN Base Images (`pfnapp/base-images`)

Hardened, unprivileged container base images designed for multi-tenant Kubernetes platforms and modern microservices.

[![Build and Audit PHP Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-php.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-php.yml)
[![Build and Audit Laravel Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-laravel.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-laravel.yml)
[![Build and Audit Node Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-node.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-node.yml)
[![Build and Audit Bun Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-bun.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-bun.yml)
[![Build and Audit Next.js Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-nextjs.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-nextjs.yml)
[![Build and Audit Vite Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-vite.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-vite.yml)
[![Build and Audit NestJS Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-nestjs.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-nestjs.yml)
[![Nightly CVE Audit](https://github.com/pfnapp/base-images/actions/workflows/nightly-cve-audit.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/nightly-cve-audit.yml)
[![Security: Aqua Trivy](https://img.shields.io/badge/Security-Aqua%20Trivy%20Gated-blue.svg)](https://github.com/aquasecurity/trivy)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🔒 Security Principles

Every image in this repository enforces zero-trust container security:

1. **100% Non-Root Execution (UID 10001)**: All processes run under dedicated unprivileged user `appuser` (UID `10001` / GID `10001`). Never executes `sudo`, `su`, or `chown` at runtime.
2. **Unprivileged Networking**: All HTTP ingress binds to port **`8080`** (ports `< 1024` are strictly avoided).
3. **Read-Only RootFS & Ephemeral Buffer Friendly**: Process IDs and temporary buffers reside in `/tmp/`.
4. **Mandatory Aqua Trivy CVE Gate**: Images are scanned in CI and gated against `CRITICAL` and `HIGH` vulnerabilities before publication to public registries.
5. **Zero Private Infrastructure Load**: Publicly published to GitHub Container Registry (`ghcr.io`) with zero bandwidth or storage costs on private registries.

---

## 📁 Repository Taxonomy

```text
languages/      ──► Foundational, raw runtime environments (OS + language core)
frameworks/     ──► Opinionated, application-specific runners (pre-configured servers)
```

| Layer | Path | Documentation | Target Runtimes |
|---|---|---|---|
| **Languages** | [`languages/php/`](languages/php/) | [PHP Guide](languages/php/README.md) | PHP 8.5, 8.4, 8.3, 8.2, 8.1, 7.4 (Alpine + Nginx + PHP-FPM) |
| **Languages** | [`languages/node/`](languages/node/) | [Node.js Guide](languages/node/README.md) | Node.js 22, 20, 18 (Alpine) |
| **Languages** | [`languages/bun/`](languages/bun/) | [Bun Guide](languages/bun/README.md) | Bun 1.4, 1.2 (Alpine) |
| **Languages** | `languages/python/` | *Coming soon* | Python 3.11, 3.12 (Slim) |
| **Frameworks** | [`frameworks/laravel/`](frameworks/laravel/) | [Laravel Guide](frameworks/laravel/README.md) | Laravel 8.4, 8.3, 8.2, 8.1, 7.4 (Web, Worker, Horizon, Cron) |
| **Frameworks** | [`frameworks/nextjs/`](frameworks/nextjs/) | [Next.js Guide](frameworks/nextjs/README.md) | Next.js Standalone Runner (Node.js 22, 20, 18) |
| **Frameworks** | [`frameworks/vite/`](frameworks/vite/) | [Vite Guide](frameworks/vite/README.md) | Vite Static SPA Runner (Alpine + Unprivileged Nginx) |
| **Frameworks** | [`frameworks/nestjs/`](frameworks/nestjs/) | [NestJS Guide](frameworks/nestjs/README.md) | NestJS Enterprise Runner (Node.js 22, 20, 18) |

---

## 📊 Published Images & Footprint

All images are ultra-lean, hardened Alpine Linux containers built for rapid cold starts, minimal disk footprint, and fast CI/CD transfer speeds:

### 1. Languages (Foundational Runtimes)
| Runtime | Base OS | Compressed (Download) | Uncompressed (Disk) | Status | Primary Pull Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PHP 8.5** | Alpine 3.24 | **~81 MB** | **225 MB** | Active | `ghcr.io/pfnapp/base/languages/php:8.5-alpine` |
| **PHP 8.4** | Alpine 3.24 | **~79 MB** | **214 MB** | Active (`latest`) | `ghcr.io/pfnapp/base/languages/php:8.4-alpine` |
| **PHP 8.3** | Alpine 3.24 | **~76 MB** | **210 MB** | Active | `ghcr.io/pfnapp/base/languages/php:8.3-alpine` |
| **PHP 8.2** | Alpine 3.24 | **~75 MB** | **199 MB** | Active | `ghcr.io/pfnapp/base/languages/php:8.2-alpine` |
| **PHP 8.1** | Alpine 3.21 | **~76 MB** | **199 MB** | Active | `ghcr.io/pfnapp/base/languages/php:8.1-alpine` |
| **PHP 7.4** | Alpine 3.16 | **~65 MB** | **179 MB** | Active (Legacy) | `ghcr.io/pfnapp/base/languages/php:7.4-alpine` |
| **Node.js 22** | Alpine 3.21 | **~63 MB** | **181 MB** | Active (`latest`) | `ghcr.io/pfnapp/base/languages/node:22-alpine` |
| **Node.js 20** | Alpine 3.21 | **~54 MB** | **151 MB** | Active (LTS) | `ghcr.io/pfnapp/base/languages/node:20-alpine` |
| **Node.js 18** | Alpine 3.21 | **~51 MB** | **143 MB** | Active (Maintenance) | `ghcr.io/pfnapp/base/languages/node:18-alpine` |
| **Bun 1.4** | Alpine 3.22 | **~48 MB** | **102 MB** | Active (`latest`) | `ghcr.io/pfnapp/base/languages/bun:1.4-alpine` |
| **Bun 1.2** | Alpine 3.20 | **~51 MB** | **125 MB** | Active (LTS) | `ghcr.io/pfnapp/base/languages/bun:1.2-alpine` |

### 2. Frameworks (Application Runners)
| Framework | Base Version | Compressed (Download) | Uncompressed (Disk) | Status | Primary Pull Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Laravel 8.4** | PHP 8.4 + Node.js | **~109 MB** | **295 MB** | Active (`latest`) | `ghcr.io/pfnapp/base/frameworks/laravel:8.4-alpine` |
| **Laravel 8.3** | PHP 8.3 + Node.js | **~106 MB** | **284 MB** | Active | `ghcr.io/pfnapp/base/frameworks/laravel:8.3-alpine` |
| **Laravel 8.2** | PHP 8.2 + Node.js | **~106 MB** | **280 MB** | Active | `ghcr.io/pfnapp/base/frameworks/laravel:8.2-alpine` |
| **Laravel 8.1** | PHP 8.1 + Node.js | **~104 MB** | **276 MB** | Active | `ghcr.io/pfnapp/base/frameworks/laravel:8.1-alpine` |
| **Laravel 7.4** | PHP 7.4 + Node.js | **~89 MB** | **240 MB** | Active (Legacy) | `ghcr.io/pfnapp/base/frameworks/laravel:7.4-alpine` |
| **Next.js 22** | Node.js 22 | **~63 MB** | **181 MB** | Active (`latest`) | `ghcr.io/pfnapp/base/frameworks/nextjs:22-alpine` |
| **Next.js 20** | Node.js 20 | **~54 MB** | **151 MB** | Active (LTS) | `ghcr.io/pfnapp/base/frameworks/nextjs:20-alpine` |
| **Next.js 18** | Node.js 18 | **~51 MB** | **143 MB** | Active (Maintenance) | `ghcr.io/pfnapp/base/frameworks/nextjs:18-alpine` |
| **Vite Static SPA** | Alpine + Nginx | **~10 MB** | **19.1 MB** | Active (`latest`) | `ghcr.io/pfnapp/base/frameworks/vite:alpine` |
| **NestJS 22** | Node.js 22 | **~63 MB** | **181 MB** | Active (`latest`) | `ghcr.io/pfnapp/base/frameworks/nestjs:22-alpine` |
| **NestJS 20** | Node.js 20 | **~54 MB** | **151 MB** | Active (LTS) | `ghcr.io/pfnapp/base/frameworks/nestjs:20-alpine` |
| **NestJS 18** | Node.js 18 | **~51 MB** | **143 MB** | Active (Maintenance) | `ghcr.io/pfnapp/base/frameworks/nestjs:18-alpine` |

---

## 🚀 Quick Pull

All images are published to **GitHub Container Registry (GHCR)**:

```bash
# Pull PHP 8.4 Alpine Base Image
docker pull ghcr.io/pfnapp/base/languages/php:8.4-alpine
docker pull ghcr.io/pfnapp/base/languages/php:8.4
docker pull ghcr.io/pfnapp/base/languages/php:latest

# Pull Laravel 8.4 Alpine Framework Image
docker pull ghcr.io/pfnapp/base/frameworks/laravel:8.4-alpine
docker pull ghcr.io/pfnapp/base/frameworks/laravel:8.4
docker pull ghcr.io/pfnapp/base/frameworks/laravel:latest

# Pull Node.js 22 Alpine Base Image
docker pull ghcr.io/pfnapp/base/languages/node:22-alpine
docker pull ghcr.io/pfnapp/base/languages/node:22
docker pull ghcr.io/pfnapp/base/languages/node:latest

# Pull Bun 1.4 Alpine Base Image
docker pull ghcr.io/pfnapp/base/languages/bun:1.4-alpine
docker pull ghcr.io/pfnapp/base/languages/bun:1.4
docker pull ghcr.io/pfnapp/base/languages/bun:latest

# Pull Next.js 22 Alpine Framework Image
docker pull ghcr.io/pfnapp/base/frameworks/nextjs:22-alpine
docker pull ghcr.io/pfnapp/base/frameworks/nextjs:22
docker pull ghcr.io/pfnapp/base/frameworks/nextjs:latest

# Pull Vite Alpine Framework Image
docker pull ghcr.io/pfnapp/base/frameworks/vite:alpine
docker pull ghcr.io/pfnapp/base/frameworks/vite:latest

# Pull NestJS 22 Alpine Framework Image
docker pull ghcr.io/pfnapp/base/frameworks/nestjs:22-alpine
docker pull ghcr.io/pfnapp/base/frameworks/nestjs:22
docker pull ghcr.io/pfnapp/base/frameworks/nestjs:latest
```

---

## 🛠️ Local Development & Automation

This repository includes a `Makefile` for testing and scanning images locally:

```bash
# Language Images (PHP)
make build               # Build local/php:8.4-test
make test                # Run container, test port 8080 health, and verify UID 10001
make scan                # Run Aqua Security Trivy vulnerability scan locally

# Framework Images (Laravel)
make build-laravel       # Build local/laravel:8.4-test
make test-laravel        # Verify web, worker, and scheduler roles for Laravel
make scan-laravel        # Run Aqua Security Trivy scan on Laravel image

# Language Images (Node.js)
make build-node          # Build local/node:22-test
make test-node           # Verify Node.js runtime, port 8080, UID 10001
make scan-node           # Run Aqua Security Trivy scan on Node.js image

# Language Images (Bun)
make build-bun           # Build local/bun:1.4-test
make test-bun            # Verify Bun runtime, port 8080, UID 10001
make scan-bun            # Run Aqua Security Trivy scan on Bun image

# Framework Images (Next.js)
make build-nextjs        # Build local/nextjs:22-test
make test-nextjs         # Verify Next.js standalone runner, port 8080, UID 10001
make scan-nextjs         # Run Aqua Security Trivy scan on Next.js image

make clean               # Remove test containers and images
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
