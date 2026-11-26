ARG TAG=2026.11.9
FROM openclaw/openclaw:${TAG}

USER root
RUN apt-get update && \
    apt-mark manual ca-certificates 2>/dev/null || true && \
    apt-get dist-upgrade -y --no-install-recommends && \
    apt-get purge -y --auto-remove git git-man && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    for dir in /app/node_modules/.pnpm/joi@18.2.*/node_modules/joi; do \
      if [ -d "$dir" ]; then \
        mkdir -p /tmp/joi && npm pack joi@18.3.1 --pack-destination /tmp/joi && \
        tar -xzf /tmp/joi/joi-*.tgz -C /tmp/joi && \
        rm -rf "$dir"/* && cp -r /tmp/joi/package/* "$dir"/ && rm -rf /tmp/joi; \
      fi; \
    done && \
    for dir in /app/node_modules/.pnpm/undici@8.11.*/node_modules/undici; do \
      if [ -d "$dir" ]; then \
        mkdir -p /tmp/undici && npm pack undici@8.12.3 --pack-destination /tmp/undici && \
        tar -xzf /tmp/undici/undici-*.tgz -C /tmp/undici && \
        rm -rf "$dir"/* && cp -r /tmp/undici/package/* "$dir"/ && rm -rf /tmp/undici; \
      fi; \
    done && \
    chown -R node:node /app/node_modules 2>/dev/null || true && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm

USER node

# Env-driven ingress config (OPENCLAW_TRUSTED_PROXIES / OPENCLAW_ALLOWED_ORIGINS)
# so Kubernetes templates can omit `command`/`args` entirely.
COPY --chmod=755 pfnapp-entrypoint.sh /usr/local/bin/pfnapp-entrypoint.sh
ENTRYPOINT ["tini", "-s", "--", "/usr/local/bin/pfnapp-entrypoint.sh"]
CMD ["node", "openclaw.mjs", "gateway", "--allow-unconfigured", "--bind", "lan"]
