# PFNApp hardened image for OpenClaw
# NOTE: Base OS type is unknown or distroless/scratch.
# Standard package manager upgrade is not applicable.
# This image is re-published as-is from upstream.
# CVE reduction depends on upstream releasing a new version.
FROM docker.io/openclaw/openclaw:2026.9.6

# Env-driven ingress config (OPENCLAW_TRUSTED_PROXIES / OPENCLAW_ALLOWED_ORIGINS)
# so Kubernetes templates can omit `command`/`args` entirely.
COPY --chmod=755 pfnapp-entrypoint.sh /usr/local/bin/pfnapp-entrypoint.sh
ENTRYPOINT ["tini", "-s", "--", "/usr/local/bin/pfnapp-entrypoint.sh"]
CMD ["node", "openclaw.mjs", "gateway", "--allow-unconfigured", "--bind", "lan"]
