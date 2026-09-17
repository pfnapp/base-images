# Node.js Base Images (`languages/node`)

Production-ready, hardened Node.js runtime images on Alpine Linux, running **100% as non-root (UID 10001)** with `dumb-init` signal handling and zombie reaping.

---

## 📁 Versions Available

| Version | Base OS | Status | Pull Tag |
|---|---|---|---|
| **22** | Alpine 3.21 | Active (Default / `latest`) | `ghcr.io/pfnapp/base/languages/node:22-alpine`, `ghcr.io/pfnapp/base/languages/node:22`, `ghcr.io/pfnapp/base/languages/node:latest` |
| **20** | Alpine 3.21 | Active (LTS) | `ghcr.io/pfnapp/base/languages/node:20-alpine`, `ghcr.io/pfnapp/base/languages/node:20` |
| **18** | Alpine 3.21 | Active (Maintenance) | `ghcr.io/pfnapp/base/languages/node:18-alpine`, `ghcr.io/pfnapp/base/languages/node:18` |

---

## 🔒 Security & Non-Root Design

- **Execution User**: `appuser:appgroup` (UID `10001` / GID `10001`).
- **Process Supervisor**: `dumb-init` (PID 1) ensures proper UNIX signal forwarding (`SIGTERM`, `SIGINT`) and zombie process reaping.
- **Listen Port**: Default unprivileged `PORT=8080`, `HOSTNAME=0.0.0.0`.
- **SUID/SGID Sanitization**: All SUID and SGID permissions are stripped at build time.
- **Ephemeral & Non-Root `/app`**: Working directory `/app` is pre-created and owned by `appuser:appgroup`.

---

## 📦 Installed Utilities & Tools

- **Core Runtime**: Node.js & npm (Alpine)
- **Process Supervisor**: `dumb-init`
- **System Utilities**: `curl`, `ca-certificates`, `tzdata`

---

## ⚙️ Runtime Configuration & Environment Variables

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | HTTP port on which applications listen |
| `HOSTNAME` | `0.0.0.0` | Network binding interface |
| `NODE_ENV` | `production` | Node.js production runtime environment |

---

## 🚀 Usage & Extending in Your Application

Build your application container using the base image:

```dockerfile
FROM ghcr.io/pfnapp/base/languages/node:22-alpine

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy application source
COPY --chown=10001:10001 . .

EXPOSE 8080

USER 10001:10001

CMD ["npm", "start"]
```
