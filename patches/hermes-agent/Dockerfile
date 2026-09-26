FROM nousresearch/hermes-agent:v2026.9.24
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get remove -y --auto-remove \
        gcc g++ cpp make cmake \
        python3-dev libffi-dev \
        libc6-dev linux-libc-dev binutils && \
    rm -rf /var/lib/apt/lists/* && \
    uv pip install --python /opt/hermes/.venv/bin/python --upgrade 'anyio>=4.14.2' 'httpcore2>=2.10.0' 'httpx2>=2.12.0' && \
    curl -LsSf https://astral.sh/uv/install.sh | env CARGO_DIST_FORCE_INSTALL_DIR=/usr/local/bin sh && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm && \
    usermod -u 1000 hermes && \
    groupmod -g 1000 hermes && \
    chown -R hermes:hermes /opt/data
