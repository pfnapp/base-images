FROM golang:1.24-alpine AS healthcheck-builder
WORKDIR /src
COPY --from=docker.io/louislam/uptime-kuma:2.5.5 /app/extra/healthcheck.go .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o healthcheck healthcheck.go

FROM docker.io/louislam/uptime-kuma:2.5.5
COPY --from=healthcheck-builder /src/healthcheck /app/extra/healthcheck
RUN apt-get update && \
    apt-get install -y --no-install-recommends --only-upgrade cloudflared && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    cd /app && \
    (npm audit fix --omit=dev || true) && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm
