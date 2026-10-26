FROM docker.io/library/wordpress:7.1.3-php8.3-fpm-alpine

RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache --upgrade curl libcurl && \
    rm -rf /var/cache/apk/*
