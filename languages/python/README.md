# Python Base Images (`languages/python`)

Production-ready, hardened Python runtime images on Debian Bookworm Slim, running **100% as non-root (UID 10001)** with `dumb-init` signal handling and zombie reaping.

Built specifically on Debian Slim to ensure 100% binary wheel (`manylinux`) compatibility for data science, AI/ML inference, and modern web frameworks (FastAPI, Flask, Django, Uvicorn, Gunicorn, Pydantic, NumPy, Psycopg).

---

## 📁 Versions Available & Image Footprint

| Version | Base OS | Compressed (Download) | Uncompressed (Disk) | Status | Primary Pull Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **3.12** | Debian 12 Slim | **~51 MB** | **147 MB** | Active (Default / `latest`) | `ghcr.io/pfnapp/base/languages/python:3.12-slim`, `ghcr.io/pfnapp/base/languages/python:3.12`, `ghcr.io/pfnapp/base/languages/python:latest` |
| **3.11** | Debian 12 Slim | **~53 MB** | **152 MB** | Active (LTS) | `ghcr.io/pfnapp/base/languages/python:3.11-slim`, `ghcr.io/pfnapp/base/languages/python:3.11` |

---

## 🔒 Security & Non-Root Design

- **Execution User**: `appuser:appgroup` (UID `10001` / GID `10001`).
- **Process Supervisor**: `dumb-init` (PID 1) ensures proper UNIX signal forwarding (`SIGTERM`, `SIGINT`) and zombie process reaping.
- **Listen Port**: Default unprivileged `PORT=8080`, `HOSTNAME=0.0.0.0`.
- **SUID/SGID Sanitization**: All SUID and SGID permissions are stripped at build time.
- **Ephemeral & Non-Root `/app`**: Working directory `/app` is pre-created and owned by `appuser:appgroup`.
- **Aqua Trivy Scanned**: Automated CI vulnerability gating with zero actionable critical or high CVEs.

---

## 📦 Installed Utilities & Tools

- **Core Runtime**: Python 3.12 / 3.11, Pip, Setuptools, Wheel
- **Process Supervisor**: `dumb-init`
- **System Utilities**: `curl`, `ca-certificates`, `tzdata`

---

## ⚙️ Runtime Configuration & Environment Variables

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | HTTP port on which applications listen |
| `HOSTNAME` | `0.0.0.0` | Network binding interface |
| `PYTHONUNBUFFERED` | `1` | Forces unbuffered stdout and stderr for real-time logging |
| `PYTHONDONTWRITEBYTECODE` | `1` | Prevents Python from writing `.pyc` files on disk |
| `PIP_NO_CACHE_DIR` | `1` | Disables pip caching to save disk footprint |
| `PIP_BREAK_SYSTEM_PACKAGES` | `1` | Allows unprivileged pip package installs without virtualenv restriction |
| `WEB_CONCURRENCY` | `2` | Number of worker processes for ASGI / WSGI servers |

---

## 🚀 Platform-Managed Integration (Zero-Config PaaS Pattern)

In production App Hosting platforms and CI/CD pipelines, applications do not require a handwritten `Dockerfile`. The platform applies [`templates/Dockerfile.managed`](templates/Dockerfile.managed) which handles multi-stage dependency building and produces clean, unprivileged production containers.

```bash
docker build \
  -f languages/python/templates/Dockerfile.managed \
  --build-arg PYTHON_VERSION=3.12 \
  -t my-python-app:latest .
```

---

## 🛠️ Usage & Extending in Your Application

You can also extend this base image directly in your application:

```dockerfile
FROM ghcr.io/pfnapp/base/languages/python:3.12-slim

WORKDIR /app

# Copy and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY --chown=10001:10001 . .

EXPOSE 8080

USER 10001:10001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```
