FROM docker.io/jc21/nginx-proxy-manager:2.16.0
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    /opt/certbot/bin/pip install --no-cache-dir --upgrade 'cryptography>=50.0.0' 'pyOpenSSL' 'msgpack>=1.2.1' && \
    cd /app && npm install --save-exact tar@latest && \
    rm -rf /usr/lib/node_modules/npm /usr/bin/npm /usr/bin/npx /root/.npm
