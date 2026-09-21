FROM docker.io/stirlingtools/stirling-pdf:2.14.3
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
