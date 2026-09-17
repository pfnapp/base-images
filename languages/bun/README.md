# Bun Base Images (`languages/bun`)

Production-ready, hardened Bun runtime images on Alpine Linux, running **100% as non-root (UID 10001)** with `dumb-init` signal handling and zombie process reaping.

---

## 📁 Versions Available

| Version | Base OS | Status | Pull Tag |
|---|---|---|---|
| **1.2** | Alpine 3.20 | Active (Default / `latest`) | `ghcr.io/pfnapp/base/languages/bun:1.2-alpine`, `ghcr.io/pfnapp/base/languages/bun:1.2`, `ghcr.io/pfnapp/base/languages/bun:latest` |

---

## 🔒 Security & Non-Root Design

- **Execution User**: `appuser:appgroup` (UID `10001` / GID `10001`).
- **Process Supervisor**: `dumb-init` (PID 1) ensures proper UNIX signal forwarding (`SIGTERM`, `SIGINT`) and zombie process reaping.
- **Listen Port**: Default unprivileged `PORT=8080`, `HOSTNAME=0.0.0.0`.
- **SUID/SGID Sanitization**: All SUID and SGID permissions are stripped at build time.
- **Ephemeral & Non-Root `/app`**: Working directory `/app` is pre-created and owned by `appuser:appgroup`.

---

## 📦 Installed Utilities & Tools

- **Core Runtime**: Bun (Official Alpine binary)
- **Process Supervisor**: `dumb-init`
- **System Utilities**: `curl`, `ca-certificates`, `tzdata`

---

## ⚙️ Runtime Configuration & Environment Variables

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | HTTP port on which applications listen |
| `HOSTNAME` | `0.0.0.0` | Network binding interface |
| `NODE_ENV` | `production` | Node/Bun production runtime environment |

---

## 🚀 Usage & Extending in Your Application

Build your Bun application container:

```dockerfile
FROM ghcr.io/pfnapp/base/languages/bun:1.2-alpine

WORKDIR /app

# Copy dependency manifests
COPY package.json bun.lockb* bun.lock* ./
RUN bun install --frozen-lockfile --production

# Copy application source
COPY --chown=10001:10001 . .

EXPOSE 8080

USER 10001:10001

CMD ["bun", "run", "start"]
```
