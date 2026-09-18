# Bun Base Images (`languages/bun`)

Production-ready, hardened Bun runtime images on Alpine Linux, running **100% as non-root (UID 10001)** with `dumb-init` signal handling and zombie process reaping.

---

## 📁 Versions Available

| Version | Base OS | Status | Pull Tag |
|---|---|---|---|
| **1.4** | Alpine 3.22 | Active (Default / `latest`) | `ghcr.io/pfnapp/base/languages/bun:1.4-alpine`, `ghcr.io/pfnapp/base/languages/bun:1.4`, `ghcr.io/pfnapp/base/languages/bun:latest` |
| **1.2** | Alpine 3.20 | LTS / Supported | `ghcr.io/pfnapp/base/languages/bun:1.2-alpine`, `ghcr.io/pfnapp/base/languages/bun:1.2` |

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

## 🎯 Smart Start Script Detection

The unprivileged runtime entrypoint (`shared/entrypoint.sh`) dynamically resolves the application startup command without external dependencies like `jq` using native Bun evaluation:

1. **`start:prod` Priority**: If `package.json` defines `"start:prod"`, it executes `bun run start:prod`.
2. **`start` Fallback**: If `"start:prod"` is absent but `"start"` exists, it executes `bun run start`.
3. **Standalone Files**: If neither script is present in `package.json`, it checks for `server.js`, `server.ts`, `index.ts`, or `index.js`.
4. **Fallback Health Server**: If no application files are mounted, it launches a lightweight HTTP health check endpoint on `$PORT`.

---

## 🚀 Platform-Managed Multi-Stage Template

For automated PaaS and CI deployments, use the multi-stage build template [`templates/Dockerfile.managed`](templates/Dockerfile.managed). It isolates build-time dependencies, executes optional `requirements` and `build` scripts, and produces a minimal production container:

```bash
docker build \
  -f languages/bun/templates/Dockerfile.managed \
  --build-arg BUN_VERSION=1.4 \
  -t my-bun-app:latest .
```

---

## 🛠️ Usage & Extending in Your Custom Dockerfile

Build your Bun application container manually:

```dockerfile
FROM ghcr.io/pfnapp/base/languages/bun:1.4-alpine

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
