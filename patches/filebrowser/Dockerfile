# syntax=docker/dockerfile:1
# PFNApp hardened image for File Browser
#
# CVE ORIGIN ANALYSIS (Trivy, scan 2026-09-23 — filebrowser/filebrowser:v2.63.23):
#   * System (os-pkgs): NONE VISIBLE. Final stage is busybox:1.37.0-musl with
#     tini + ca-certificates copied in — there is NO package manager (apk/apt)
#     and no OS package database, so `apk upgrade` is NOT applicable and Trivy
#     reports 0 system findings.
#   * App (gobinary /bin/filebrowser): all 10 HIGH findings are compiled INTO
#     the upstream binary:
#       - stdlib 1.26.5 (Go 1.26.5 toolchain) — CVE-2026-33818, CVE-2026-39821,
#         CVE-2026-46600, CVE-2026-56853, CVE-2026-56858, CVE-2026-56859,
#         CVE-2026-56860, CVE-2026-56862  (fixed in Go >= 1.26.6 / 1.27.0-rc.3)
#       - golang.org/x/crypto v0.54.0 — CVE-2026-56854 HIGH (fixed 0.55.0)
#         (+ CVE-2026-56855, CVE-2026-78662 MEDIUM, fixed 0.56.0)
#       - golang.org/x/image  v0.44.0 — CVE-2026-46603 HIGH (fixed 0.45.0)
#     Residual unfixable below the gate: CVE-2023-36308 LOW (imaging, no fix),
#     GO-2026-5932 UNKNOWN (x/crypto, no fix published).
#
# MITIGATION (chosen): upstream version bump of the *toolchain and Go modules*
# via a from-source rebuild — OS patch and base image swap cannot touch code
# that is statically linked into the binary. The rebuilt binary is overlaid on
# the UNCHANGED upstream runtime stage (busybox + tini + non-root user + init
# scripts), so runtime behaviour and UID stay identical to upstream.
# =============================================================================
ARG GO_VERSION=1.27

# --- Stage 1: pinned upstream source (v2.63.23 = release e8a388f8) -----------
FROM alpine:3.24 AS source
ARG FILEBROWSER_VERSION=2.63.23
RUN apk add --no-cache git && \
    git clone -q --depth 1 --branch "v${FILEBROWSER_VERSION}" \
      https://github.com/filebrowser/filebrowser.git /src

# --- Stage 2: frontend (embedded into the Go binary via //go:embed dist/*) ---
FROM node:24-alpine AS frontend
RUN npm install -g pnpm@10.33.4
WORKDIR /src
COPY --from=source /src /src
WORKDIR /src/frontend
RUN pnpm install --frozen-lockfile && pnpm run build

# --- Stage 3: Go build with PATCHED toolchain + PATCHED modules ---------------
FROM golang:${GO_VERSION}-alpine AS builder
RUN apk add --no-cache git ca-certificates
WORKDIR /src
COPY --from=source /src /src
# Upstream go.mod pins x/crypto v0.54.0 / x/image v0.44.0 — bump to the fixed
# versions (golang:1.27 supplies the stdlib fix: >= 1.26.6 equivalent line).
ARG X_CRYPTO_VERSION=v0.57.0
ARG X_IMAGE_VERSION=v0.46.0
RUN go get "golang.org/x/crypto@${X_CRYPTO_VERSION}" \
           "golang.org/x/image@${X_IMAGE_VERSION}"
COPY --from=frontend /src/frontend/dist ./frontend/dist
ARG FILEBROWSER_VERSION=2.63.23
RUN CGO_ENABLED=0 go build -trimpath \
      -ldflags "-s -w \
        -X github.com/filebrowser/filebrowser/v2/version.Version=${FILEBROWSER_VERSION} \
        -X github.com/filebrowser/filebrowser/v2/version.CommitSHA=$(git log -n 1 --format=%h)" \
      -o /out/filebrowser .

# --- Stage 4: unchanged upstream runtime, patched binary only ----------------
FROM docker.io/filebrowser/filebrowser:v2.63.23
COPY --from=builder /out/filebrowser /bin/filebrowser
