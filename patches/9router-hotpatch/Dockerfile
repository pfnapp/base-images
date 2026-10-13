# syntax=docker/dockerfile:1.7
# PFNApp HOTPATCH image for 9Router: built from an upstream git commit that has
# no upstream Docker image yet. Temporary; retire it once upstream publishes TAG.
# Build/runner stages mirror decolua/9router's Dockerfile at the pinned REF.
ARG NODE_IMAGE=node:22-alpine
ARG TAG
ARG REF

FROM ${NODE_IMAGE} AS source
ARG TAG
ARG REF
RUN apk add --no-cache git
RUN set -eu; \
    echo "$REF" | grep -Eq '^[0-9a-f]{40}$' || { echo "REF must be a full 40-hex commit SHA, got: $REF" >&2; exit 1; }; \
    git init -q /src && cd /src && \
    git remote add origin https://github.com/decolua/9router.git && \
    git fetch -q --depth 1 origin "$REF" && \
    git checkout -q FETCH_HEAD && \
    [ "$(git rev-parse HEAD)" = "$REF" ] && \
    PKG_VERSION="$(node -p "require('./package.json').version")" && \
    [ "$PKG_VERSION" = "$TAG" ] || { echo "package.json version != TAG ($TAG)" >&2; exit 1; }; \
    rm -rf /src/.git

FROM ${NODE_IMAGE} AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++ linux-headers
COPY --from=source /src/package.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install \
      --fetch-retries=5 \
      --fetch-retry-factor=2 \
      --fetch-retry-mintimeout=10000 \
      --fetch-retry-maxtimeout=120000 \
      --fetch-timeout=300000
COPY --from=source /src ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM ${NODE_IMAGE} AS runner
ARG TAG
ARG REF
WORKDIR /app

LABEL org.opencontainers.image.title="9router" \
      org.opencontainers.image.version="${TAG}" \
      org.opencontainers.image.revision="${REF}" \
      org.opencontainers.image.source="https://github.com/decolua/9router" \
      io.pfnapp.hotpatch="true"

ENV NODE_ENV=production
ENV PORT=20128
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATA_DIR=/app/data

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/custom-server.js ./custom-server.js
COPY --from=builder /app/open-sse ./open-sse
# Next file tracing can omit sibling files; MITM runs server.js as a separate process.
COPY --from=builder /app/src/mitm ./src/mitm
# Standalone node_modules may omit deps only required by the MITM child process.
COPY --from=builder /app/node_modules/node-forge ./node_modules/node-forge
# Ensure `next` is available at runtime in case tracing did not include it.
COPY --from=builder /app/node_modules/next ./node_modules/next
# sql.js loads dist/sql-wasm.wasm by path at runtime; tracing only follows JS imports.
COPY --from=builder /app/node_modules/sql.js ./node_modules/sql.js
# node-machine-id is createRequire-loaded at runtime; tracing omits it.
COPY --from=builder /app/node_modules/node-machine-id ./node_modules/node-machine-id

RUN mkdir -p /app/data && chown -R node:node /app && \
  mkdir -p /app/data-home && chown node:node /app/data-home && \
  ln -sf /app/data-home /root/.9router 2>/dev/null || true

RUN apk add --no-cache su-exec && \
  printf '#!/bin/sh\nchown -R node:node /app/data /app/data-home 2>/dev/null\nexec su-exec node "$@"\n' > /entrypoint.sh && \
  chmod +x /entrypoint.sh

EXPOSE 20128

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "custom-server.js"]
