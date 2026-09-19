# Vite Static Base Image (`frameworks/vite`)

High-performance, unprivileged **Nginx static web server** on Alpine Linux, pre-configured specifically for **Vite and modern SPA frameworks** (React, Vue, Svelte, Solid, vanilla JS/TS). Runs **100% as non-root (UID 10001 / GID 10001)** with `dumb-init` signal handling on unprivileged port **8080**.

---

## 🔒 Key Architecture & Features

- **Execution User**: Non-root `appuser:appgroup` (UID `10001` / GID `10001`).
- **Web Server**: Unprivileged Nginx running with worker processes and temporary paths strictly in `/tmp/nginx`.
- **SPA Routing Engine**: `try_files $uri $uri/ /index.html;` ensures client-side routing (React Router, Vue Router) operates seamlessly on direct URLs and hard browser refreshes without 404 errors.
- **Static Asset Optimization**:
  - Fingerprinted assets (`/assets/*`, `.js`, `.css`, fonts, images) served with `Cache-Control: public, max-age=31536000, immutable`.
  - Gzip compression enabled for HTML, CSS, JS, JSON, XML, and SVG.
- **Security Hardening**:
  - Security headers enforced (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`).
  - SUID and SGID binaries stripped at build time.
  - Hidden files (`.git`, `.env`) blocked by default.
- **Built-in Health Check**: `/healthz` endpoint returning `200 OK` JSON for Kubernetes liveness/readiness probes and PaaS routing checks.

---

## 📦 Pull Tags

| Image | Description | Compressed (Download) | Uncompressed (Disk) | Pull Tag |
|---|---|---|---|---|
| **Vite SPA (Nginx)** | Production Nginx SPA runner | **~10 MB** | **19.1 MB** | `ghcr.io/pfnapp/base/frameworks/vite:latest`, `ghcr.io/pfnapp/base/frameworks/vite:alpine` |

---

## 🚀 Platform-Managed Deployment Templates

Developers do not need to create or maintain Dockerfiles in their Vite frontend repositories. The platform manages compilation and assembly via dedicated templates:

### 1. Node.js Engine Template (`templates/Dockerfile.managed`)

Supports `npm`, `pnpm`, and `yarn` lockfiles:

```bash
docker build \
  -f frameworks/vite/templates/Dockerfile.managed \
  -t my-vite-app:latest .
```

### 2. Bun Engine Template (`templates/Dockerfile.managed-bun`)

Accelerates builds using Bun's high-speed package manager:

```bash
docker build \
  -f frameworks/vite/templates/Dockerfile.managed-bun \
  -t my-vite-app:latest .
```

---

## 🛠️ Usage in Custom Dockerfile

Extend the base Vite runner manually in your application:

```dockerfile
# Multi-stage build
FROM oven/bun:1.4-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb* bun.lock* ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM ghcr.io/pfnapp/base/frameworks/vite:latest
WORKDIR /app
COPY --from=builder --chown=10001:10001 /app/dist /app

EXPOSE 8080
USER 10001:10001
```
