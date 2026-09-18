# Syntax: docker/dockerfile:1
FROM alpine:3.22

# Set build arguments for non-root runtime UID/GID
ARG UID=10001
ARG GID=10001

# Install runtime web server, process reaper, and security certificates
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache \
    nginx \
    dumb-init \
    curl \
    ca-certificates \
    tzdata

# Create dedicated non-root user and group
RUN addgroup -g ${GID} -S appgroup && \
    adduser -u ${UID} -S appuser -G appgroup

# Pre-create application and Nginx runtime directories with non-root ownership
RUN mkdir -p /app \
             /tmp/nginx/client_temp \
             /tmp/nginx/proxy_temp \
             /tmp/nginx/fastcgi_temp \
             /tmp/nginx/uwsgi_temp \
             /tmp/nginx/scgi_temp \
             /var/log/nginx \
             /var/lib/nginx/html \
             /etc/nginx/conf.d && \
    chown -R ${UID}:${GID} /app /tmp/nginx /var/log/nginx /var/lib/nginx /etc/nginx && \
    chmod -R 775 /tmp/nginx /var/log/nginx /var/lib/nginx

# Copy hardened Nginx configurations
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy unified runtime entrypoint
COPY bin/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh && \
    chown ${UID}:${GID} /usr/local/bin/entrypoint.sh

WORKDIR /app

# Drop SUID/SGID permissions to eliminate local privilege escalation paths
RUN find / -perm /6000 -type f -exec chmod a-s {} + 2>/dev/null || true

# Default unprivileged networking and environment
ENV PORT=8080 \
    HOSTNAME=0.0.0.0

EXPOSE 8080

USER 10001:10001

ENTRYPOINT ["/usr/bin/dumb-init", "--", "/usr/local/bin/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
