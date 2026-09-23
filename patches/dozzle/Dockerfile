# syntax=docker/dockerfile:1
# PFNApp hardened image for Dozzle
#
# CVE ORIGIN ANALYSIS (Trivy, scan 2026-09-23 — amir20/dozzle:v11.1.1):
#   * System (os-pkgs): NONE VISIBLE. Upstream runtime is scratch-based (a
#     single static binary, no shell, no package manager, no OS package DB),
#     so `apk/apt upgrade` is NOT applicable and Trivy reports 0 system
#     findings.
#   * App (gobinary /dozzle): 1 HIGH compiled INTO the release binary:
#       - google.golang.org/grpc v1.84.0 — CVE-2026-84445 HIGH
#         (advisory fix lines: 1.82.2 / 1.83.2 / 1.85.0-dev → v1.83.2 is the
#         newest STABLE fixed release; v1.84.0 has no backported fix).
#     Residual below the gate: GO-2026-5932 UNKNOWN (golang.org/x/crypto, no
#     fix published).
#
# MITIGATION (chosen): from-source rebuild on the patched Go toolchain
# (golang:1.27-alpine) with grpc pinned to the fixed v1.83.2, then overlay the
# rebuilt binary onto the UNCHANGED upstream runtime stage — entrypoint,
# exposed ports, env and OCI labels stay byte-identical to upstream.
#
# The default embedded agent TLS pair (shared_cert.pem / shared_key.pem —
# gitignored; upstream CI injects them at release time) is carved
# byte-identically out of the released upstream binary instead of minting a
# new pair (verified: ED25519, subject O=Dozzle, identical public keys).
#
# BUILD NOTE (false-positive guard): `go get` dirties go.mod/go.sum. Without
# countermeasures Go stamps the main module as a dirty pseudo-version
# (v0.0.0-<time>-<hash>+dirty) which sorts BELOW every fixed version, making
# Trivy report app CVEs that are already fixed in this source (CVE-2026-24740
# fixed 9.0.3, CVE-2026-44985 / CVE-2026-45298 fixed 10.5.2 — all < v11.1.1).
# Building after `rm -rf .git` with -buildvcs=false stamps
# `mod github.com/amir20/dozzle (devel)` — identical to the upstream release
# binary — so the scanner result matches upstream reality.
# =============================================================================

# --- Stage 1: pinned upstream source (v11.1.1 = release 71d3d71) --------------
FROM alpine:3.24 AS source
RUN apk add --no-cache git
ARG DOZZLE_VERSION=11.1.1
RUN git clone -q --depth 1 --branch "v${DOZZLE_VERSION}" \
      https://github.com/amir20/dozzle.git /dozzle

# --- Stage 2: target image, used for PEM carving AND final runtime config -----
FROM docker.io/amir20/dozzle:v11.1.1 AS upstream

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

# --- Stage 4: Go build with PATCHED toolchain + PATCHED grpc ------------------
FROM golang:1.27-alpine AS builder
RUN apk add --no-cache git ca-certificates grep
WORKDIR /dozzle
COPY --from=source /dozzle .
# Carve the default agent TLS pair out of the released upstream binary
# (byte-identical; validation greps abort the build if extraction failed).
COPY --from=upstream /dozzle /tmp/upstream-dozzle
RUN grep -a -o -Pz '(?s)-----BEGIN CERTIFICATE-----.*?-----END CERTIFICATE-----' \
        /tmp/upstream-dozzle | tr -d '\0' > shared_cert.pem && \
    grep -a -o -Pz '(?s)-----BEGIN PRIVATE KEY-----.*?-----END PRIVATE KEY-----' \
        /tmp/upstream-dozzle | tr -d '\0' > shared_key.pem && \
    printf '\n' >> shared_cert.pem && printf '\n' >> shared_key.pem && \
    grep -q -- '-----BEGIN CERTIFICATE-----' shared_cert.pem && \
    grep -q -- '-----END CERTIFICATE-----'   shared_cert.pem && \
    grep -q -- '-----BEGIN PRIVATE KEY-----' shared_key.pem && \
    grep -q -- '-----END PRIVATE KEY-----'   shared_key.pem && \
    rm -f /tmp/upstream-dozzle
# CVE-2026-84445 fix: newest STABLE grpc line (v1.84.0 is unfixed; bump to
# >= v1.85.0 once it leaves -dev).
ARG GRPC_VERSION=v1.83.2
RUN go get "google.golang.org/grpc@${GRPC_VERSION}" && go mod download
COPY --from=assets /build/dist ./dist
ARG DOZZLE_VERSION=11.1.1
# -buildvcs=false + no .git ⇒ main module stamps as (devel) like upstream
# (see BUILD NOTE above).
RUN rm -rf .git && \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -buildvcs=false \
      -ldflags "-s -w -X github.com/amir20/dozzle/internal/cli.Version=v${DOZZLE_VERSION}" \
      -o /out/dozzle .

# --- Stage 5: unchanged upstream runtime config, patched binary only ----------
FROM upstream
COPY --from=builder /out/dozzle /dozzle
