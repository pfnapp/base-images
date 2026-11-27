FROM docker.io/library/wordpress:7.1.4-php8.3-fpm-alpine

RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache --upgrade libxml2 && \
    rm -rf /var/cache/apk/*
