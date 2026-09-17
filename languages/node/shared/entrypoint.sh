#!/bin/sh
set -e

# Default unprivileged runtime configuration
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"

# If command-line arguments are provided, execute them directly
if [ $# -gt 0 ]; then
  exec "$@"
fi

# If package.json exists, start the application via npm start
if [ -f "package.json" ]; then
  exec npm start
fi

# Fallback lightweight HTTP server when no application code is mounted
exec node -e '
const http = require("http");
const port = parseInt(process.env.PORT || "8080", 10);
const host = process.env.HOSTNAME || "0.0.0.0";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    status: "healthy",
    runtime: "Node.js " + process.version,
    uid: process.getuid ? process.getuid() : null,
    gid: process.getgid ? process.getgid() : null,
    port: port,
    timestamp: new Date().toISOString()
  }) + "\n");
});
server.listen(port, host, () => {
  console.log(`[node-base] Fallback server listening on ${host}:${port}`);
});
'
