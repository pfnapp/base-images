# Node.js Base Images (`languages/node`)

Production-ready, hardened Node.js runtime images on Alpine Linux, running **100% as non-root (UID 10001)** with `dumb-init` signal handling and zombie reaping.

---

## 📁 Versions Available & Image Footprint

| Version | Base OS | Compressed (Download) | Uncompressed (Disk) | Status | Pull Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **22** | Alpine 3.21 | **~63 MB** | **181 MB** | Active (Default / `latest`) | `ghcr.io/pfnapp/base/languages/node:22-alpine`, `ghcr.io/pfnapp/base/languages/node:22`, `ghcr.io/pfnapp/base/languages/node:latest` |
| **20** | Alpine 3.21 | **~54 MB** | **151 MB** | Active (LTS) | `ghcr.io/pfnapp/base/languages/node:20-alpine`, `ghcr.io/pfnapp/base/languages/node:20` |
| **18** | Alpine 3.21 | **~51 MB** | **143 MB** | Active (Maintenance) | `ghcr.io/pfnapp/base/languages/node:18-alpine`, `ghcr.io/pfnapp/base/languages/node:18` |

---

## 🔒 Security & Non-Root Design

- **Execution User**: `appuser:appgroup` (UID `10001` / GID `10001`).
- **Process Supervisor**: `dumb-init` (PID 1) ensures proper UNIX signal forwarding (`SIGTERM`, `SIGINT`) and zombie process reaping.
- **Listen Port**: Default unprivileged `PORT=8080`, `HOSTNAME=0.0.0.0`.
- **SUID/SGID Sanitization**: All SUID and SGID permissions are stripped at build time.
- **Ephemeral & Non-Root `/app`**: Working directory `/app` is pre-created and owned by `appuser:appgroup`.

---

## 🛡️ CVE Posture & npm Mitigation

**Root cause of findings on this image = vendored npm dependencies** (`/usr/local/lib/node_modules/npm/node_modules` — `tar`, `brace-expansion`, `ip-address`, `pacote`, `sigstore`, …), **not** Alpine OS packages and **not** the Node.js binary.

Mitigations applied at build time (`Dockerfile.alpine`):

| # | Step | Purpose |
| :--- | :--- | :--- |
| 1 | `apk update && apk upgrade --no-cache` | Clears Alpine OS CVEs (verified: **0 OS CVEs** on Node 18/20/22) |
| 2 | `npm install -g npm@<major\|latest>` | Replaces the bundled npm with the newest patched release for that Node major |
| 3 | `npm cache clean --force && rm -rf /root/.npm` | Purges ~30 MB of build-time npm cache from the final layer |
| 4 | `ARG IMAGE_BUILD_ID` cache buster (CI passes the workflow run id) | Forces apk + npm layers to re-resolve on every scheduled rebuild so newly released npm/Alpine patches are actually picked up |

Verified status on fresh builds (2026-09-23, Aqua Trivy, all severities):

| Tag | npm | OS CVEs | npm-vendored CVEs | Status |
| :--- | :--- | :---: | :---: | :--- |
| **22** | `npm@12` latest (`12.1.0`) | 0 | **0** | ✅ Clean |
| **20** | `npm@11` latest (`11.20.0`) | 0 | **0** | ✅ Clean (Node 20 upstream EOL 2026-04-30) |
| **18** | `npm@10` frozen (`10.9.9`) | 0 | 8 HIGH / 4 MEDIUM / 1 LOW | ⚠️ **Accepted residual risk** — see below |

> **⚠️ Node 18 note:** the npm@10 line is frozen at `10.9.9` (npm 11+ requires Node ≥ 20), so 7 unfixable HIGH CVE IDs in npm's vendored dependencies are formally accepted in `/.trivyignore` at the repo root. Node 18 has been **EOL upstream since 2025-04-30** — recommendation: drop `18` from `matrix.json` once downstream consumers migrate. Re-review the ignore list at that time.
>
> **⏱️ Freshness:** npm ships patches within days (npm `11.20.0` and `12.1.0` both released 2026-09-22). Images rebuild weekly (cron, Tue 03:00); the `IMAGE_BUILD_ID` buster guarantees each run re-resolves npm instead of reusing a cached layer. Re-run `make build-node scan-node` before promoting a tag if a scan shows new `lang-pkgs` findings.

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
