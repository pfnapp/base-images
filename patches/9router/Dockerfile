# PFNApp hardened image for 9Router
ARG TAG=0.5.112
ARG CLOUDFLARED_VERSION=2025.9.1
ARG TAILSCALE_VERSION=v1.88.3

FROM docker.io/cloudflare/cloudflared:${CLOUDFLARED_VERSION} AS cloudflared
FROM docker.io/tailscale/tailscale:${TAILSCALE_VERSION} AS tailscale

FROM docker.io/decolua/9router:${TAG}
# Static binaries for Cloudflare Tunnel and Tailscale (run as sidecar processes / userspace networking)
COPY --from=cloudflared /usr/local/bin/cloudflared /usr/local/bin/cloudflared
COPY --from=tailscale /usr/local/bin/tailscale /usr/local/bin/tailscaled /usr/local/bin/
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/* \
           /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /root/.npm \
           /root/.cache
