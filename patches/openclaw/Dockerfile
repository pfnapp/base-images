# PFNApp hardened image for OpenClaw 2026.10.5
FROM ghcr.io/openclaw/openclaw:2026.10.5
USER root
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm
USER node

# Env-driven ingress config (OPENCLAW_TRUSTED_PROXIES / OPENCLAW_ALLOWED_ORIGINS)
# so Kubernetes templates can omit `command`/`args` entirely.
COPY --chmod=755 pfnapp-entrypoint.sh /usr/local/bin/pfnapp-entrypoint.sh
ENTRYPOINT ["tini", "-s", "--", "/usr/local/bin/pfnapp-entrypoint.sh"]
CMD ["node", "openclaw.mjs", "gateway", "--allow-unconfigured", "--bind", "lan"]
