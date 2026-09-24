# PFNApp hardened image for 9Router
ARG TAG=0.5.86
FROM docker.io/decolua/9router:${TAG}
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/* \
           /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /root/.npm \
           /root/.cache
