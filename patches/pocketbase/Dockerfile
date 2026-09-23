# PFNApp hardened image for PocketBase
#
# CVE ORIGIN ANALYSIS (Trivy, scan 2026-09-23 — ghcr.io/muchobien/pocketbase:0.40.4):
#   * System (os-pkgs, Alpine 3.24.1 — apk IS available, contrary to the old
#     "base OS unknown / distroless" assumption):
#       CVE-2026-14456  HIGH    libcrypto3/libssl3 3.5.7-r0  -> fixed 3.5.8-r0
#       CVE-2026-18798, CVE-2026-63072, CVE-2026-63076        MEDIUM
#       CVE-2026-14457, 54874, 63073, 63074, 63075, 75803     LOW
#     (openssl is pulled in transitively by ca-certificates — the app binary is
#      a pure static Go binary, CGO_ENABLED=0, it does NOT link libssl.)
#   * App (gobinary /usr/local/bin/pocketbase): 0 CRITICAL, 0 HIGH.
#     Residual unfixable, below the CRITICAL/HIGH gate:
#       CVE-2023-36308 LOW  github.com/disintegration/imaging v1.6.2 (no fix)
#       GO-2026-5932   UNKNOWN golang.org/x/crypto v0.57.0 (no fix published)
#
# MITIGATION: OS patch via `apk upgrade` (validated: 0 CRITICAL/HIGH after
# rebuild; libcrypto3/libssl3 3.5.7-r0 -> 3.5.8-r0). Base image upgrade and
# compiler flags are NOT applicable — the binary is already built with
# go1.27.1 and carries no fixable Go-layer findings.
#
# NOTE: Base image runs as root (no USER directive) — manifest runAsUser 0.
FROM ghcr.io/muchobien/pocketbase:0.40.4
USER root
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*
