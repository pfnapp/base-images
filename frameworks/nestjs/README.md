# NestJS Base Images (`frameworks/nestjs`)

Production-ready, hardened runtime images for **NestJS enterprise backend applications** on Alpine Linux, running **100% as non-root (UID 10001 / GID 10001)** with `dumb-init` signal handling on port **8080**.

---

## 🔒 Key Architecture & Features

- **Execution User**: Non-root `appuser:appgroup` (UID `10001` / GID `10001`).
- **Process Supervisor**: `dumb-init` handles PID 1 responsibilities, ensuring graceful signal forwarding (`SIGTERM`, `SIGINT`) and preventing zombie processes.
- **Smart Runtime Auto-Resolution**:
  1. Detects `"start:prod"` in `package.json` and executes `npm run start:prod`.
  2. Fallback to `"start"` script if `"start:prod"` is not present.
  3. Direct compiled resolution for compiled output: `dist/main.js`, `dist/src/main.js`, or `main.js`.
  4. Automatic lightweight HTTP health check endpoint when no application code is mounted.
- **Security Hardening**:
  - SUID and SGID permissions stripped at build time.
  - Ephemeral `/app` directory pre-owned by `appuser:appgroup`.

---

## 📁 Versions Available & Image Footprint

| Version | Base Runtime | Compressed (Download) | Uncompressed (Disk) | Status | Pull Tag |
|---|---|---|---|---|---|
| **22** | Node.js 22 LTS (Alpine) | **~63 MB** | **181 MB** | Active (Default / `latest`) | `ghcr.io/pfnapp/base/frameworks/nestjs:22-alpine`, `ghcr.io/pfnapp/base/frameworks/nestjs:22`, `ghcr.io/pfnapp/base/frameworks/nestjs:latest` |
| **20** | Node.js 20 LTS (Alpine) | **~54 MB** | **151 MB** | Supported (LTS) | `ghcr.io/pfnapp/base/frameworks/nestjs:20-alpine`, `ghcr.io/pfnapp/base/frameworks/nestjs:20` |
| **18** | Node.js 18 LTS (Alpine) | **~51 MB** | **143 MB** | Maintenance | `ghcr.io/pfnapp/base/frameworks/nestjs:18-alpine`, `ghcr.io/pfnapp/base/frameworks/nestjs:18` |

---

## 🚀 Platform-Managed Deployment Templates

Developers do not need to maintain a Dockerfile in their NestJS repositories. The platform encapsulates dependency installation, TypeScript compilation, and production pruning:

### 1. Node.js Engine Template (`templates/Dockerfile.managed`)

Supports `npm`, `pnpm`, and `yarn` lockfiles:

```bash
docker build \
  -f frameworks/nestjs/templates/Dockerfile.managed \
  --build-arg NODE_VERSION=22 \
  -t my-nest-app:latest .
```

### 2. Bun Engine Template (`templates/Dockerfile.managed-bun`)

For teams running NestJS under Bun:

```bash
docker build \
  -f frameworks/nestjs/templates/Dockerfile.managed-bun \
  --build-arg BUN_VERSION=1.4 \
  -t my-nest-app:latest .
```

---

## 🛠️ Usage in Custom Dockerfile

Extend the base NestJS runner manually in your application:

```dockerfile
# Stage 1: Build NestJS
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM ghcr.io/pfnapp/base/frameworks/nestjs:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY --from=builder --chown=10001:10001 /app/dist ./dist

EXPOSE 8080
USER 10001:10001
CMD ["npm", "run", "start:prod"]
```
