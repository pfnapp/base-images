ARG TAG=2026.11.5
FROM openclaw/openclaw:${TAG}

USER root
RUN apt-get update && \
    apt-mark manual ca-certificates 2>/dev/null || true && \
    apt-get dist-upgrade -y --no-install-recommends && \
    apt-get purge -y --auto-remove git git-man && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    (npm install --no-audit --no-fund joi@18.3.1 undici@8.12.2 2>/dev/null || true) && \
    (npm prune --omit=dev 2>/dev/null || true) && \
    chown -R node:node node_modules 2>/dev/null || true && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm

USER node

# Env-driven ingress config (OPENCLAW_TRUSTED_PROXIES / OPENCLAW_ALLOWED_ORIGINS)
# so Kubernetes templates can omit `command`/`args` entirely.
COPY --chmod=755 pfnapp-entrypoint.sh /usr/local/bin/pfnapp-entrypoint.sh
ENTRYPOINT ["tini", "-s", "--", "/usr/local/bin/pfnapp-entrypoint.sh"]
CMD ["node", "openclaw.mjs", "gateway", "--allow-unconfigured", "--bind", "lan"]
