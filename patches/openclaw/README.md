# PFNApp — OpenClaw Hardened Image & Control UI

**Upstream:** `docker.io/openclaw/openclaw:2026.9.6`  
**PFNApp:** `ghcr.io/pfnapp/openclaw:2026.9.6`

## Arsitektur: Control UI & Onboarding vs Hermes Dashboard

Perbedaan utama antara **OpenClaw Control UI** dan **Hermes Dashboard**:

| Aspek | OpenClaw | Hermes Agent |
| --- | --- | --- |
| **Port & Service** | 1 port terpadu (`18789` untuk HTTP Control UI + WebSocket Gateway) | 2 port terpisah (Port `9119` untuk Web Dashboard, `8642` untuk API Server) |
| **Dashboard URL** | `http://<host>:18789/` | `http://<host>:9119/` |
| **Autentikasi Web** | Token Gateway (`OPENCLAW_GATEWAY_TOKEN`) atau Password Gateway (`OPENCLAW_GATEWAY_PASSWORD`) dimasukkan ke form *Gateway Secret* | Basic Auth (`HERMES_DASHBOARD_BASIC_AUTH_USERNAME` & `PASSWORD`) dengan cookie session |
| **Onboarding Web UI** | Fitur **Agents Home** & **New Agent (Custodian Wizard)** di Control UI untuk membuat agent, role, memilih model AI, tool, dan channel | Wizard setup onboarding berbasis web dashboard hermes |
| **Headless Startup** | Menggunakan argumen `--allow-unconfigured` agar container menyala tanpa terblokir wizard interaktif terminal (CLI wizard) | Menggunakan boot prelude dan env var flag `HERMES_DASHBOARD=1` |

## Cara Menggunakan

1. **Jalankan Docker Compose:**
   ```bash
   cd patches/openclaw
   docker compose up -d
   ```

2. **Akses Dashboard:**
   - Buka browser ke `http://127.0.0.1:18789/` atau `http://localhost:18789/`.
   - Masukkan token gateway yang diset di environment (`OPENCLAW_GATEWAY_TOKEN`, default contoh: `token_test_12345678901234567890`) pada kolom **Gateway secret**.
   - Setelah masuk, Anda dapat menggunakan wizard onboarding agent baru (**Agents** -> **New Agent**), menambahkan provider AI (OpenAI, Anthropic, Gemini, Groq, OpenRouter), serta menghubungkan channel.

## Health Probes

- **Liveness probe:** `GET /healthz` (HTTP 200 `{"ok":true,"status":"live"}`)
- **Readiness probe:** `GET /startupz` (HTTP 200 `{"ok":true,"status":"started"}`)
