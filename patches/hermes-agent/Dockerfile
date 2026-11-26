FROM nousresearch/hermes-agent:v2026.9.24
RUN apt-get update && \
    apt-get dist-upgrade -y --no-install-recommends && \
    apt-get remove -y --auto-remove \
        gcc g++ cpp make cmake \
        python3-dev libffi-dev \
        libc6-dev linux-libc-dev binutils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    uv pip install --python /opt/hermes/.venv/bin/python --upgrade \
        'anyio>=4.14.2' 'httpcore2>=2.10.0' 'httpx2>=2.12.0' 'PyJWT>=2.14.0' \
        'aiohttp>=3.14.4' 'brotlicffi>=1.2.1.0' 'certifi>=2026.10.18' \
        'mcp>=2.2.0' 'oauthlib>=4.0.1' 'pillow>=13.0.0' 'pyasn1>=0.6.5' 'tornado>=6.5.9' 'urllib3>=2.8.0' && \
    cd /opt/hermes && \
    rm -f package-lock.json && \
    node -e "const fs=require('fs'); const file='package.json'; const pkg=JSON.parse(fs.readFileSync(file)); pkg.overrides={...pkg.overrides, 'source-map-js':'^1.2.2', 'vite':'^8.2.4', 'undici':'^8.12.2', 'undici@^6':'^6.29.1', 'undici@^7':'^7.30.1', '@grpc/grpc-js':'^1.14.5', 'brace-expansion':'^5.0.11', 'tar':'^7.5.21'}; fs.writeFileSync(file, JSON.stringify(pkg, null, 2)+'\\n')" && \
    npm install --omit=dev --ignore-scripts --no-audit --no-fund --prefer-online && \
    npm prune --omit=dev --ignore-scripts --no-audit --no-fund && \
    rm -rf /opt/hermes/tests-js/node_modules && \
    for dir in $(find /opt/hermes -type d -name source-map-js -path '*/node_modules/source-map-js'); do \
      mkdir -p /tmp/sm && npm pack source-map-js@1.2.2 --pack-destination /tmp/sm && \
      tar -xzf /tmp/sm/*.tgz -C /tmp/sm && \
      rm -rf "$dir"/* && cp -r /tmp/sm/package/* "$dir"/ && rm -rf /tmp/sm; \
    done && \
    for dir in $(find /opt/hermes -type d -name tar -path '*/node_modules/tar'); do \
      mkdir -p /tmp/tar && npm pack tar@7.5.21 --pack-destination /tmp/tar && \
      tar -xzf /tmp/tar/*.tgz -C /tmp/tar && \
      rm -rf "$dir"/* && cp -r /tmp/tar/package/* "$dir"/ && rm -rf /tmp/tar; \
    done && \
    for dir in $(find /opt/hermes -type d -name grpc-js -path '*/node_modules/@grpc/grpc-js'); do \
      mkdir -p /tmp/grpc && npm pack @grpc/grpc-js@1.14.5 --pack-destination /tmp/grpc && \
      tar -xzf /tmp/grpc/*.tgz -C /tmp/grpc && \
      rm -rf "$dir"/* && cp -r /tmp/grpc/package/* "$dir"/ && rm -rf /tmp/grpc; \
    done && \
    if [ -f /opt/hermes/plugins/platforms/photon/sidecar/package.json ]; then \
      cd /opt/hermes/plugins/platforms/photon/sidecar && \
      node -e "const fs=require('fs'); const file='package.json'; const pkg=JSON.parse(fs.readFileSync(file)); pkg.overrides={...pkg.overrides, 'undici':'^8.12.2', 'undici@^6':'^6.29.1', 'undici@^7':'^7.30.1', '@grpc/grpc-js':'^1.14.5', 'brace-expansion':'^5.0.11', 'tar':'^7.5.21'}; fs.writeFileSync(file, JSON.stringify(pkg, null, 2)+'\\n')" && \
      npm install --omit=dev --ignore-scripts --no-audit --no-fund --prefer-online; \
    fi && \
    npm cache clean --force && \
    curl -LsSf https://astral.sh/uv/install.sh | env CARGO_DIST_FORCE_INSTALL_DIR=/usr/local/bin sh && \
    rm -rf /usr/local/lib/node_modules/npm /usr/lib/node_modules/npm /usr/share/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm && \
    usermod -u 1000 hermes && \
    groupmod -g 1000 hermes && \
    chown -R hermes:hermes /opt/data
