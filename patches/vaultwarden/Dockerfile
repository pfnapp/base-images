ARG TAG=1.37.5
FROM docker.io/vaultwarden/server:${TAG}
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
