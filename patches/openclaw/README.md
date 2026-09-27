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
   Set random token di process environment, lalu jalankan Compose:
   ```bash
   cd patches/openclaw
   export OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 16)
   docker compose up -d
   ```
   Gateway dijalankan dengan argumen eksplisit `--bind lan` dan `--allow-unconfigured` agar mendengarkan di `0.0.0.0` (dapat diakses via published port host dan container/Pod IP). Variabel `OPENCLAW_GATEWAY_BIND` tidak didukung oleh runtime OpenClaw sehingga flag `--bind lan` (atau konfigurasi `gateway.bind: lan`) wajib digunakan. Port dipublikasikan di host loopback `127.0.0.1:18789`.

2. **Akses Dashboard & Pengaturan Origin Ingress:**
   - Buka browser ke `http://127.0.0.1:18789/` atau `http://localhost:18789/`.
   - Masukkan token gateway yang diset di environment (`OPENCLAW_GATEWAY_TOKEN`) pada kolom **Gateway secret**.
   - Konfigurasi gateway tersimpan di `/home/node/.openclaw/openclaw.json`; persistensikan seluruh direktori `/home/node/.openclaw` untuk menyimpan konfigurasi dan state aplikasi.
   - **External Ingress & Allowed Origins:** Saat pertama kali boot tanpa konfigurasi, runtime otomatis mengizinkan `http://localhost:18789` dan `http://127.0.0.1:18789`. Namun untuk domain HTTPS eksternal (misal melalui Kubernetes Ingress), daftar origin harus ditambahkan secara eksplisit via CLI resmi dan disimpan permanen:
     ```bash
     docker compose exec openclaw node openclaw.mjs config set gateway.controlUi.allowedOrigins '["https://control.example.com"]' --strict-json
     ```
     Perintah tersebut **mengganti** daftar origin; sertakan origin localhost jika masih diperlukan. Gunakan padanan CLI di container Kubernetes untuk deployment Ingress. Keamanan HTTPS dan pairing perangkat tetap wajib dijaga; token valid tidak otomatis menyetujui perangkat baru. Jangan mengaktifkan `gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback=true` atau mematikan validasi origin.

## Health Probes

- **Liveness probe:** `GET /healthz` (HTTP 200 `{"ok":true,"status":"live"}`)
- **Startup / Onboarding readiness probe:** `GET /startupz` (HTTP 200 `{"ok":true,"status":"started"}`)
- **Catatan Probe & Jaringan:**
  - Probe onboarding menggunakan `/startupz` agar container tetap dianggap ready sebelum AI provider/channel dikonfigurasi.
  - Endpoint `/readyz` memeriksa kesiapan operasional mendalam subsistem terkonfigurasi, termasuk database agent dan channel. `/readyz` bukan bukti inferensi model provider, dan jika ada channel terkonfigurasi yang tidak terhubung dapat memblokir status ready sehingga kurang cocok untuk mengekspos wizard onboarding awal.
  - Masalah sebelumnya di Kubernetes (localhost 200 namun Pod IP connection refused sehingga kubelet mengirim SIGTERM) diatasi dengan flag eksplisit `--bind lan`.

## Kubernetes Spec Excerpt (Partial)

Excerpt Pod spec berikut mempertahankan image entrypoint tini (`["tini", "-s", "--"]`) melalui `args`, dengan storage UID 1000, Secret token, dan probe. Pastikan driver storage memberikan akses tulis ke PVC; `fsGroup` bukan jaminan untuk semua jenis volume. `runtime-manifest.json` mendokumentasikan kontrak ini, tetapi generator platform tetap perlu menerapkan `args`, mount, dan startup probe berikut:

```yaml
# Partial Pod spec excerpt — requires platform Service, Ingress, and PVC wiring
spec:
  securityContext:
    runAsNonRoot: true
    fsGroup: 1000
  containers:
    - name: openclaw
      image: ghcr.io/pfnapp/openclaw:2026.9.6
      # Preserve tini ENTRYPOINT [tini, -s, --]; pass arguments via args
      args:
        - node
        - openclaw.mjs
        - gateway
        - --allow-unconfigured
        - --bind
        - lan
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        readOnlyRootFilesystem: false
      ports:
        - name: gateway
          containerPort: 18789
          protocol: TCP
      env:
        - name: NODE_ENV
          value: production
        - name: OPENCLAW_GATEWAY_PORT
          value: "18789"
        - name: OPENCLAW_GATEWAY_TOKEN
          valueFrom:
            secretKeyRef:
              name: openclaw-gateway-auth
              key: token
      volumeMounts:
        - name: openclaw-data
          mountPath: /home/node/.openclaw
      startupProbe:
        httpGet:
          path: /startupz
          port: gateway
        initialDelaySeconds: 5
        periodSeconds: 10
        failureThreshold: 30
      livenessProbe:
        httpGet:
          path: /healthz
          port: gateway
        initialDelaySeconds: 15
        periodSeconds: 15
      readinessProbe:
        httpGet:
          path: /startupz
          port: gateway
        initialDelaySeconds: 5
        periodSeconds: 10
  volumes:
    - name: openclaw-data
      persistentVolumeClaim:
        claimName: openclaw-home-pvc
```

## Hasil Simulasi & Batasan

- **Proses & Hak Akses:** Image berjalan sebagai UID 1000 (`node`), PID 1 adalah `tini -s -- node ...` yang memanage child gateway.
- **Konektivitas:** Terverifikasi respon HTTP 200 OK pada probe `/healthz`, `/startupz`, `/readyz`, dan Control UI dashboard root (`/`) baik melalui host loopback (`127.0.0.1:18789`) maupun IP langsung container (`172.18.0.2:18789`).
- **Autentikasi Gateway:**
  - Panggilan gateway dengan token salah ditolak (`unauthorized: gateway token mismatch`).
  - Panggilan gateway dengan token valid dari process env berhasil diproses (`"ok": true`).
- **Persistensi State:** Pengaturan aplikasi (`gateway.controlUi.allowedOrigins`) berhasil disimpan via CLI resmi (`openclaw config set`) ke `/home/node/.openclaw/openclaw.json` dan terbukti bertahan setelah container direstart maupun di-recreate paksa pada volume yang sama (`openclaw-home`).
- **Batasan Pengujian:** Simulasi dijalankan tanpa provider AI eksternal (mode `--allow-unconfigured`). Pengujian autentikasi memakai RPC CLI, bukan login browser; koneksi eksternal juga menunjukkan pembatasan pairing/scope. Pairing browser, penyimpanan konfigurasi melalui UI, inferensi provider, dan deployment Kubernetes end-to-end belum diuji. Keberhasilan HTTP/probe tidak membuktikan semua alur tersebut.
