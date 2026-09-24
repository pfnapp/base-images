# PFNApp hardened image for Stirling PDF
FROM docker.io/stirlingtools/stirling-pdf:3.0.0
USER root
RUN apt-get update && \
    apt-get install -y --reinstall debconf && \
    apt-mark hold 'libreoffice*' 'uno*' 'ure*' 'python3-uno' && \
    DEBIAN_FRONTEND=noninteractive apt-get upgrade -y --no-install-recommends -o Dpkg::Options::='--force-confdef' -o Dpkg::Options::='--force-confold' && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
