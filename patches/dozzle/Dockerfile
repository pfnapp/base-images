# syntax=docker/dockerfile:1
# PFNApp hardened image for Dozzle v11.4.2
#
# Rebuild the release source with the fixed golang.org/x/net version, then
# overlay only the binary onto the matching upstream runtime image.

# --- Stage 1: pinned upstream source ------------------------------------------
FROM alpine:3.24 AS source
RUN apk add --no-cache git
ARG DOZZLE_VERSION=11.4.1
RUN git clone -q --depth 1 --branch "v${DOZZLE_VERSION}" \
      https://github.com/amir20/dozzle.git /dozzle

# --- Stage 2: upstream runtime, also used to extract default TLS assets -------
FROM docker.io/amir20/dozzle:v11.4.2 AS upstream

# --- Stage 3: frontend (baked into the Go binary via go:embed) ----------------
FROM oven/bun:1.4.2-alpine AS assets
WORKDIR /build
COPY --from=source /dozzle/package.json /dozzle/bun.lock /dozzle/bunfig.toml ./
RUN bun install --frozen-lockfile --ignore-scripts
COPY --from=source /dozzle/vite.config.ts /dozzle/tsconfig.json ./
COPY --from=source /dozzle/assets ./assets
COPY --from=source /dozzle/locales ./locales
COPY --from=source /dozzle/public ./public
COPY --from=source /dozzle/scripts ./scripts
RUN bun run build

# --- Stage 4: Go build with patched golang.org/x/net -------------------------
FROM golang:1.27-alpine AS builder
RUN apk add --no-cache git ca-certificates grep
WORKDIR /dozzle
COPY --from=source /dozzle .

# Preserve the default agent TLS pair from the upstream release binary.
COPY --from=upstream /dozzle /tmp/upstream-dozzle
RUN grep -a -o -Pz '(?s)-----BEGIN CERTIFICATE-----.*?-----END CERTIFICATE-----' \
        /tmp/upstream-dozzle | tr -d '\0' > shared_cert.pem && \
    grep -a -o -Pz '(?s)-----BEGIN PRIVATE KEY-----.*?-----END PRIVATE KEY-----' \
        /tmp/upstream-dozzle | tr -d '\0' > shared_key.pem && \
    printf '\n' >> shared_cert.pem && printf '\n' >> shared_key.pem && \
    grep -q -- '-----BEGIN CERTIFICATE-----' shared_cert.pem && \
    grep -q -- '-----END CERTIFICATE-----' shared_cert.pem && \
    grep -q -- '-----BEGIN PRIVATE KEY-----' shared_key.pem && \
    grep -q -- '-----END PRIVATE KEY-----' shared_key.pem && \
    rm -f /tmp/upstream-dozzle

ARG X_NET_VERSION=v0.62.0
RUN go get "golang.org/x/net@${X_NET_VERSION}" && go mod download

COPY --from=assets /build/dist ./dist
ARG DOZZLE_VERSION=11.4.1
RUN rm -rf .git && \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -buildvcs=false \
      -ldflags "-s -w -X github.com/amir20/dozzle/internal/cli.Version=v${DOZZLE_VERSION}" \
      -o /out/dozzle .

# --- Stage 5: unchanged upstream runtime config, patched binary only ----------
FROM upstream
COPY --from=builder /out/dozzle /dozzle
