FROM docker.io/jc21/nginx-proxy-manager:2.16.0
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    /opt/certbot/bin/pip install --no-cache-dir --upgrade 'cryptography>=50.0.0' 'pyOpenSSL' 'msgpack>=1.2.1' && \
    rm -rf /opt/certbot/lib/python3.13/site-packages/pip* /opt/certbot/bin/pip* && \
    cd /app && \
    node -e 'const pkg=require("./package.json"); pkg.overrides={...pkg.overrides, "basic-ftp":"^6.2.1", "proxy-addr":"^2.0.8", "fast-uri":"^3.1.8", "ip-address":"^10.5.1", "brace-expansion":"^5.0.10"}; require("fs").writeFileSync("./package.json", JSON.stringify(pkg, null, 2))' && \
    npm install && \
    rm -rf /app/node_modules/node-gyp /usr/lib/node_modules/npm /usr/bin/npm /usr/bin/npx /root/.npm
