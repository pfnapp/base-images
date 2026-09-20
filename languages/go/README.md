# Go Hardened Base Images

Hardened, unprivileged Go (Golang) Alpine container images optimized for high-performance Kubernetes microservices.

## 📦 Supported Tags

| Go Version | Base OS | Status | Pull Tag |
| :--- | :--- | :--- | :--- |
| **Go 1.24** | Alpine Linux 3.21 | Active (`latest`) | `ghcr.io/pfnapp/base/languages/go:1.24-alpine` |
| **Go 1.23** | Alpine Linux 3.21 | Active (Supported) | `ghcr.io/pfnapp/base/languages/go:1.23-alpine` |

---

## 🔒 Security & Hardening Features

- **Non-Root Execution**: Runs under UID `10001` (`appuser`) and GID `10001` (`appgroup`).
- **Unprivileged Ingress**: Listens on port `8080` by default.
- **Process Supervisor**: Equipped with `dumb-init` for clean PID 1 signal forwarding and zombie reaper handling.
- **SUID/SGID Elimination**: All binary privilege escalation bits are stripped at build time.
- **Read-Only RootFS Friendly**: Default `GOPATH` and `GOCACHE` point to `/tmp/go` and `/tmp/go-cache`.
- **Pre-installed Tooling**: Includes `ca-certificates`, `tzdata`, and `curl` for container health checks.

---

## 🚀 Usage Example

### Multi-stage Dockerfile
```dockerfile
# Build stage
FROM golang:1.24-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app/server .

# Production runner
FROM ghcr.io/pfnapp/base/languages/go:1.24-alpine
COPY --from=builder /app/server /app/server

EXPOSE 8080
CMD ["/app/server"]
```
