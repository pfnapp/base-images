# syntax=docker/dockerfile:1
# PFNApp hardened image for Shlink 5.1.9
# Remediates CVE-2026-63209 (compress), CVE-2026-78661 (x/net), CVE-2026-86144 (libxml2), CVE-2026-11979 (libxml2)

# Stage 1: Build hardened RoadRunner binary
FROM golang:1.27-alpine AS rr-builder
RUN apk add --no-cache git ca-certificates
WORKDIR /src
RUN git clone --depth 1 --branch v2025.1.15 https://github.com/roadrunner-server/roadrunner.git . && \
    go mod edit -replace=golang.org/x/net=golang.org/x/net@v0.62.0 && \
    go mod edit -replace=github.com/klauspost/compress=github.com/klauspost/compress@v1.18.7 && \
    go get github.com/rabbitmq/amqp091-go@v1.13.0 \
           google.golang.org/grpc@v1.83.2 \
           golang.org/x/net@v0.62.0 \
           github.com/klauspost/compress@v1.18.7 && \
    go mod download && \
    rm -rf .git && \
    CGO_ENABLED=0 go build -trimpath -buildvcs=false \
      -ldflags='-s -w -X github.com/roadrunner-server/roadrunner/v2025/internal/meta.version=2025.1.15' \
      -o /out/rr ./cmd/rr

# Stage 2: Hardened Shlink runtime
FROM docker.io/shlinkio/shlink:5.1.9
USER root
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*
COPY --from=rr-builder /out/rr /etc/shlink/bin/rr
RUN chmod +x /etc/shlink/bin/rr && chown 1001:1001 /etc/shlink/bin/rr
USER 1001
