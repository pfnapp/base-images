FROM ghcr.io/gethomepage/homepage:v2.4.0
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/* \
           /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /root/.npm \
           /root/.cache
