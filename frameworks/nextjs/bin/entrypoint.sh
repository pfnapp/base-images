#!/bin/sh
set -e

# Default unprivileged Next.js runtime environment
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export NEXT_TELEMETRY_DISABLED="${NEXT_TELEMETRY_DISABLED:-1}"

# If command-line arguments are provided, execute them directly
if [ $# -gt 0 ]; then
  exec "$@"
fi

# 1. Next.js standalone mode output
if [ -f "server.js" ]; then
  exec node server.js
fi

# 2. TypeScript server or script entrypoint
if [ -f "server.ts" ]; then
  if command -v bun >/dev/null 2>&1; then
    exec bun server.ts
  elif command -v tsx >/dev/null 2>&1; then
    exec tsx server.ts
  else
    exec node server.ts
  fi
fi

# 3. Standard package.json start script
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
    framework: "Next.js Standalone Runner",
    runtime: "Node.js " + process.version,
    uid: process.getuid ? process.getuid() : null,
    gid: process.getgid ? process.getgid() : null,
    port: port,
    timestamp: new Date().toISOString()
  }) + "\n");
});
server.listen(port, host, () => {
  console.log(`[nextjs-runner] Fallback server listening on ${host}:${port}`);
});
'
