# syntax=docker/dockerfile:1
# PFNApp hardened image for Shlink 5.1.8
# Remediates CVE-2026-77405, CVE-2026-77408, CVE-2026-77411 (amqp091-go) in RoadRunner binary

# Stage 1: Build hardened RoadRunner binary
FROM golang:1.27-alpine AS rr-builder
RUN apk add --no-cache git ca-certificates
WORKDIR /src
RUN git clone --depth 1 --branch v2025.1.15 https://github.com/roadrunner-server/roadrunner.git . && \
    go get github.com/rabbitmq/amqp091-go@v1.13.0 google.golang.org/grpc@v1.83.2 golang.org/x/net@v0.60.0 && \
    go mod download && \
    rm -rf .git && \
    CGO_ENABLED=0 go build -trimpath -buildvcs=false \
      -ldflags='-s -w -X github.com/roadrunner-server/roadrunner/v2025/internal/meta.version=2025.1.15' \
      -o /out/rr ./cmd/rr

# Stage 2: Hardened Shlink runtime
FROM docker.io/shlinkio/shlink:5.1.8
USER root
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*
COPY --from=rr-builder /out/rr /etc/shlink/bin/rr
RUN chmod +x /etc/shlink/bin/rr && chown 1001:1001 /etc/shlink/bin/rr
USER 1001
