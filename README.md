# PFN Base Images (`pfnapp/base-images`)

Hardened, unprivileged container base images designed for multi-tenant Kubernetes platforms and modern microservices.

[![Build and Audit PHP Base Images](https://github.com/pfnapp/base-images/actions/workflows/build-php.yml/badge.svg)](https://github.com/pfnapp/base-images/actions/workflows/build-php.yml)
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
| **Languages** | `languages/node/` | *Coming soon* | Node.js 18, 20, 22 (Alpine) |
| **Languages** | `languages/python/` | *Coming soon* | Python 3.11, 3.12 (Slim) |
| **Frameworks** | `frameworks/laravel/` | *Coming soon* | Laravel Standard & Extended (with ffmpeg, zip) |
| **Frameworks** | `frameworks/nextjs/` | *Coming soon* | Next.js Standalone Runner |

---

## 🚀 Quick Pull

All images are published to **GitHub Container Registry (GHCR)**:

```bash
# Pull PHP 8.4 Alpine Base Image
docker pull ghcr.io/pfnapp/base/languages/php:8.4-alpine
docker pull ghcr.io/pfnapp/base/languages/php:8.4
docker pull ghcr.io/pfnapp/base/languages/php:latest
```

---

## 🛠️ Local Development & Automation

This repository includes a `Makefile` for testing and scanning images locally:

```bash
make build       # Build local/php:8.4-test
make test        # Run container, test port 8080 health, and verify UID 10001
make scan        # Run Aqua Security Trivy vulnerability scan locally
make clean       # Remove test containers and images
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
