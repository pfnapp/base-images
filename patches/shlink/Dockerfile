FROM docker.io/shlinkio/shlink:5.1.6
# Base image is Alpine Linux — use apk, not apt-get
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*
