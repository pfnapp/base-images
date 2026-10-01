FROM docker.io/openclaw/openclaw:2026.9.6

COPY --chmod=755 pfnapp-entrypoint.sh /usr/local/bin/pfnapp-entrypoint.sh
ENTRYPOINT ["tini", "-s", "--", "/usr/local/bin/pfnapp-entrypoint.sh"]
CMD ["node", "openclaw.mjs", "gateway", "--allow-unconfigured", "--bind", "lan"]
