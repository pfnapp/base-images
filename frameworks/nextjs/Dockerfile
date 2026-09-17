# Syntax: docker/dockerfile:1
ARG NODE_VERSION=22
ARG BASE_IMAGE=ghcr.io/pfnapp/base/languages/node:${NODE_VERSION}-alpine
FROM ${BASE_IMAGE}

ARG UID=10001
ARG GID=10001

USER root

# Pre-create /app and Next.js standalone cache/runtime directories
RUN mkdir -p /app/.next/cache && \
    chown -R ${UID}:${GID} /app && \
    chmod -R 775 /app/.next/cache

# Copy Next.js entrypoint script
COPY bin/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh && \
    chown ${UID}:${GID} /usr/local/bin/entrypoint.sh

WORKDIR /app

# Drop SUID/SGID permissions to eliminate local privilege escalation paths
RUN find / -perm /6000 -type f -exec chmod a-s {} + 2>/dev/null || true

# Default unprivileged Next.js networking and telemetry configuration
ENV PORT=8080 \
    HOSTNAME=0.0.0.0 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

EXPOSE 8080

USER 10001:10001

ENTRYPOINT ["/usr/bin/dumb-init", "--", "/usr/local/bin/entrypoint.sh"]
