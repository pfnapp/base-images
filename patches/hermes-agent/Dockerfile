FROM nousresearch/hermes-agent:v2026.9.24
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get remove -y --auto-remove \
        gcc g++ cpp make cmake \
        python3-dev libffi-dev \
        libc6-dev linux-libc-dev binutils && \
    rm -rf /var/lib/apt/lists/* && \
    uv pip install --python /opt/hermes/.venv/bin/python --upgrade \
        'anyio>=4.14.2' 'httpcore2>=2.10.0' 'httpx2>=2.12.0' 'PyJWT>=2.14.0' && \
    cd /opt/hermes && \
    node -e "const fs=require('fs'); const file='package.json'; const pkg=JSON.parse(fs.readFileSync(file)); pkg.overrides={...pkg.overrides, 'source-map-js':'1.2.2', 'undici@^6':'6.28.1', 'undici@^7':'7.29.1', '@grpc/grpc-js':'1.14.5'}; fs.writeFileSync(file, JSON.stringify(pkg, null, 2)+'\\n')" && \
    npm install --ignore-scripts --no-audit --no-fund --prefer-online && \
    npm cache clean --force && \
    curl -LsSf https://astral.sh/uv/install.sh | env CARGO_DIST_FORCE_INSTALL_DIR=/usr/local/bin sh && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm && \
    usermod -u 1000 hermes && \
    groupmod -g 1000 hermes && \
    chown -R hermes:hermes /opt/data

