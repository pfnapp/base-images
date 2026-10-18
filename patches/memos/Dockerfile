# syntax=docker/dockerfile:1
# PFNApp hardened image for Memos 0.31.0
# Remediates CVE-2026-84445 (google.golang.org/grpc) and CVE-2026-78669 (golang.org/x/net)

# Stage 1: Build frontend release assets
FROM node:24-alpine AS frontend
RUN corepack enable && corepack prepare pnpm@11.0.1 --activate && \
    apk add --no-cache git
WORKDIR /src
RUN git clone --depth 1 --branch v0.31.0 https://github.com/usememos/memos.git . && \
    cd web && \
    pnpm install --frozen-lockfile && \
    pnpm release

# Stage 2: Build backend with patched grpc and net/http2
FROM golang:1.27-alpine AS backend
RUN apk add --no-cache git ca-certificates
WORKDIR /backend-build
COPY --from=frontend /src .
RUN go get google.golang.org/grpc@v1.83.2 golang.org/x/net@v0.60.0 && go mod download && \
    rm -rf .git && \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -trimpath -buildvcs=false \
      -ldflags="-s -w -X github.com/usememos/memos/internal/version.Version=v0.31.0 -extldflags '-static'" \
      -tags netgo,osusergo \
      -o /out/memos \
      ./cmd/memos

# Stage 3: Runtime overlay on upstream
FROM docker.io/neosmemo/memos:0.31.0
USER root
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*
COPY --from=backend /out/memos /usr/local/memos/memos
USER root
