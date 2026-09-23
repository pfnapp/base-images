# Go Hardened Base Images

Hardened, unprivileged Go (Golang) Alpine container images optimized for high-performance Kubernetes microservices.

## 📦 Supported Tags

| Go Version | Base OS | Status | Pull Tag |
| :--- | :--- | :--- | :--- |
| **Go 1.27** | Alpine 3.24 | Active (`latest`, `matrix.json` default) | `ghcr.io/pfnapp/base/languages/go:1.27-alpine` |
| **Go 1.26** | Alpine 3.24 | Active (Supported) | `ghcr.io/pfnapp/base/languages/go:1.26-alpine` |
| **Go 1.25** | Alpine 3.24 | Active (Supported) | `ghcr.io/pfnapp/base/languages/go:1.25-alpine` |

> ⚠️ Go **1.24 and older are EOL upstream** and no longer receive stdlib security
> patches (current stdlib CVEs such as `CVE-2026-33818` are only fixed in
> **≥ 1.25.13 / ≥ 1.26.6**). Always build with a supported tag.

---

## 🔒 Security & Hardening Features

- **Non-Root Execution**: Runs under UID `10001` (`appuser`) and GID `10001` (`appgroup`).
- **Unprivileged Ingress**: Listens on port **`8080`** by default.
- **Process Supervisor**: Equipped with `dumb-init` for clean PID 1 signal forwarding and zombie reaper handling.
- **SUID/SGID Elimination**: All binary privilege escalation bits are stripped at build time.
- **Read-Only RootFS Friendly**: Default `GOPATH` and `GOCACHE` point to `/tmp/go` and `/tmp/go-cache`.
- **Pre-installed Tooling**: Includes `ca-certificates`, `tzdata`, and `curl` for container health checks.
- **OS Layer CVE Floor**: `apk update && apk upgrade` runs on every build — verified **0 CRITICAL / 0 HIGH** system and app findings (Aqua Trivy).
- **Floating Patch Track**: the `golang:1.27-alpine` upstream tag floats to the newest **1.27.x patch**, so stdlib fixes are picked up automatically on rebuild.

---

## 🛡️ CVE Origin Model for Go Images (read this before patching)

For a statically linked Go image (`CGO_ENABLED=0`), Trivy findings split into two
independent layers — only one of them is an OS problem:

| Layer | Source of CVE | Fix strategy |
| :--- | :--- | :--- |
| **system** (`os-pkgs`) | Alpine packages (`musl`, `busybox`, `libcrypto3`, `ca-certificates`, `curl`, …) | `apk upgrade` in this image ✅ (already applied) |
| **app** (`gobinary`) — *stdlib* | The **Go toolchain** used to compile the binary (e.g. `stdlib 1.26.5`) | Rebuild with a patched toolchain (`≥ 1.26.6` / current `1.27.x`) — **cannot** be fixed by `apk` or by swapping the runtime base |
| **app** (`gobinary`) — *modules* | Third-party modules linked into the binary (`golang.org/x/crypto`, `google.golang.org/grpc`, `github.com/rabbitmq/amqp091-go`, …) | `go get <module>@<fixed>` + rebuild, or wait for upstream release — **cannot** be fixed by `apk` or by swapping the runtime base |

**Rule of thumb:** `apk upgrade` only heals the OS layer. Anything reported under
`gobinary` lives inside *your* binary and must be fixed at **compile time** —
that is why the builder stage of every downstream image must be this base image
(or another equally patched `golang:*`), never a stale `golang:<old>-alpine`.

---

## 🚀 Usage Example

Multi-stage Dockerfile — build **and** run with the same hardened base so the
toolchain (stdlib) and the OS packages stay in sync:

```dockerfile
# Build + runtime stage (toolchain already patched via apk upgrade)
FROM ghcr.io/pfnapp/base/languages/go:1.27-alpine
WORKDIR /src

# Dependency layer (cached until go.mod/go.sum change)
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath \
      -ldflags="-s -w" -o /app/server .

EXPOSE 8080
USER 10001:10001
CMD ["/app/server"]
```

Equivalent two-stage form (smaller runtime) — keep the **builder** on the
PFNApp base as well:

```dockerfile
FROM ghcr.io/pfnapp/base/languages/go:1.27-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app/server .

FROM ghcr.io/pfnapp/base/languages/go:1.27-alpine
COPY --from=builder /app/server /app/server
USER 10001:10001
CMD ["/app/server"]
```

### Optional CI gate (recommended)

```bash
# Go-native vulnerability check (complements Trivy's gobinary scan)
go run golang.org/x/vuln/cmd/govulncheck@latest ./...
```
