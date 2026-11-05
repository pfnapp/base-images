ARG TAG=2.5.9
FROM docker.io/louislam/uptime-kuma:${TAG} AS upstream

FROM golang:1.27-alpine AS healthcheck-builder
WORKDIR /src
COPY --from=upstream /app/extra/healthcheck.go .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o healthcheck healthcheck.go

FROM upstream
COPY --from=healthcheck-builder /src/healthcheck /app/extra/healthcheck
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends --only-upgrade cloudflared && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    cd /app && \
    node -e 'const fs=require("fs"); const pkg=JSON.parse(fs.readFileSync("package.json")); \
      pkg.dependencies = { ...pkg.dependencies, \
        "@azure/msal-node":"^7.1.0", \
        "@grpc/grpc-js":"^1.14.5", \
        "axios":"^1.20.0", \
        "tar":"^7.5.21", \
        "protobufjs":"^7.5.5", \
        "ws":"^8.21.0", \
        "mysql2":"^3.22.0", \
        "liquidjs":"^10.27.2", \
        "nodemailer":"^10.0.6" }; \
      pkg.overrides = { ...pkg.overrides, \
        "@azure/msal-node":"^7.1.0", \
        "@grpc/grpc-js":"^1.14.5", \
        "axios":"^1.20.0", \
        "body-parser":"^1.20.9", \
        "follow-redirects":"^1.16.2", \
        "glob":"^10.5.0", \
        "lodash":"^4.18.0", \
        "minimatch":"^9.0.6", \
        "undici":"^6.29.1" }; \
      fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2))' && \
    npm install --omit=dev --no-audit --no-fund && \
    npm prune --omit=dev --no-audit --no-fund && \
    rm -rf /app/node_modules/cacache \
           /app/node_modules/@mapbox/node-pre-gyp \
           /app/node_modules/node-gyp \
           /app/node_modules/@louislam/sqlite3/node_modules/tar \
           /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /root/.npm
