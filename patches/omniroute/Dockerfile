# PFNApp hardened image for OmniRoute
ARG TAG=3.8.52

FROM docker.io/diegosouzapw/omniroute:${TAG}
USER root
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    if [ -d /app/node_modules/undici ]; then \
      cd /tmp && npm pack undici@8.12.2 && \
      tar -xzf undici-*.tgz && \
      rm -rf /app/node_modules/undici/* && \
      cp -r package/* /app/node_modules/undici/ && \
      rm -rf /tmp/undici* /tmp/package; \
    fi && \
    rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /root/.npm \
           /root/.cache
USER node
