FROM docker.io/jc21/nginx-proxy-manager:2.16.0
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
