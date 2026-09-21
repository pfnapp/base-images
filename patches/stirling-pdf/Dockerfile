FROM docker.io/stirlingtools/stirling-pdf:2.14.3
RUN apt-get update --fix-missing && \
    apt-get upgrade -y --no-install-recommends --fix-missing && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
