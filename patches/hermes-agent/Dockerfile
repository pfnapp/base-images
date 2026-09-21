FROM nousresearch/hermes-agent:v2026.9.14
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get remove -y --auto-remove \
        gcc g++ cpp make cmake \
        python3-dev libffi-dev \
        libc6-dev linux-libc-dev binutils && \
    rm -rf /var/lib/apt/lists/*
