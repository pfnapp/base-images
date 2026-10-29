FROM docker.io/n8nio/n8n:3.0.1

# Upgrade Alpine packages when apk is present; some hardened variants omit it.
RUN if command -v apk >/dev/null 2>&1; then \
      apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*; \
    else \
      echo "apk unavailable; OS package upgrades must be applied in the upstream base image"; \
    fi
