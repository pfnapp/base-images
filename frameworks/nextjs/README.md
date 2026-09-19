# Next.js Standalone Base Images (`frameworks/nextjs`)

Production-ready, hardened, unprivileged container runner for Next.js applications in standalone output mode. Built on top of `ghcr.io/pfnapp/base/languages/node:${NODE_VERSION}-alpine`, running **100% as non-root (UID 10001)** with `dumb-init` UNIX signal forwarding and zombie PID 1 reaping.

---

## 🏗️ Layered Architecture

This framework runner sits on top of our foundational Node.js language base images:

```text
┌─────────────────────────────────────────────────────────────┐
│                   Application Container                     │
│       (Next.js .next/standalone, .next/static, public/)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│           ghcr.io/pfnapp/base/frameworks/nextjs             │
│   Next.js standalone runner, dumb-init PID 1 supervisor     │
│   Pre-configured cache directories, non-root USER 10001     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│            ghcr.io/pfnapp/base/languages/node               │
│   Alpine Linux, Node.js runtime, curl, ca-certificates,     │
│   tzdata, appuser (UID 10001), port 8080 networking         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Available Tags & Image Footprint

Published to **GitHub Container Registry (`ghcr.io`)**:

| Node Version | Base Image Tag | Compressed (Download) | Uncompressed (Disk) | Pull Command | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **22** | `22-alpine` / `latest` | **~63 MB** | **181 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/nextjs:22-alpine` | Active (Default) |
| **20** | `20-alpine` | **~54 MB** | **151 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/nextjs:20-alpine` | Active (LTS) |
| **18** | `18-alpine` | **~51 MB** | **143 MB** | `docker pull ghcr.io/pfnapp/base/frameworks/nextjs:18-alpine` | Active (Maintenance) |

---

## 🔒 Security & Non-Root Design

- **Execution User**: `appuser:appgroup` (UID `10001` / GID `10001`).
- **Process Supervisor**: `dumb-init` runs as PID 1 to gracefully forward SIGTERM/SIGINT signals to Node.js and reap orphaned child processes.
- **Listen Port**: Default unprivileged `PORT=8080`, `HOSTNAME=0.0.0.0`.
- **SUID/SGID Sanitization**: All SUID and SGID permissions are eliminated at build time.
- **Telemetry Disabled**: `NEXT_TELEMETRY_DISABLED=1` is exported by default to guarantee privacy and reproducible runtime execution.

---

## 🚀 Platform-Managed Integration (Zero-Config PaaS Pattern)

In production App Hosting platforms and CI/CD pipelines, applications do not require a handwritten `Dockerfile`. The platform applies pre-tested build templates:

### 1. Node.js Engine Template (`templates/Dockerfile.managed`)

Optimized multi-stage build supporting `npm`, `pnpm`, and `yarn`:

```bash
docker build \
  -f templates/Dockerfile.managed \
  --build-arg NODE_VERSION=22 \
  -t my-nextjs-app:latest .
```

Prerequisite in your Next.js project `next.config.js` (or `next.config.mjs` / `next.config.ts`):

```javascript
module.exports = {
  output: 'standalone',
}
```

### 2. Bun Engine Template (`templates/Dockerfile.managed-bun`)

Ultra-fast Next.js dependency installation and build powered by Bun:

```bash
docker build \
  -f templates/Dockerfile.managed-bun \
  -t my-nextjs-bun-app:latest .
```

---

## ⚙️ Runtime Configuration & Environment Variables

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | HTTP port on which Next.js server listens |
| `HOSTNAME` | `0.0.0.0` | Network binding interface |
| `NODE_ENV` | `production` | Production runtime environment |
| `NEXT_TELEMETRY_DISABLED` | `1` | Disables Next.js anonymous usage telemetry |
