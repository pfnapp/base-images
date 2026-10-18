# PFNApp hardened image for PocketBase 0.40.5
# Recompiles binary with patched golang.org/x/net to eliminate CVE-2026-78669.

FROM golang:1.27-alpine AS builder
RUN apk add --no-cache git
WORKDIR /src
RUN git clone --depth 1 --branch v0.40.5 https://github.com/pocketbase/pocketbase.git . && \
    cd examples/base && \
    go get golang.org/x/net@v0.60.0 && \
    go mod download && \
    CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/pocketbase

FROM ghcr.io/muchobien/pocketbase:0.40.5
USER root
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*
COPY --from=builder /out/pocketbase /usr/local/bin/pocketbase
USER 0
