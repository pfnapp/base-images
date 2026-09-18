#!/bin/sh
set -e

# Default unprivileged runtime configuration
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"

# If command-line arguments are provided, inspect them
if [ $# -gt 0 ]; then
  # If the command is NOT a default start command, execute it directly
  if [ "$*" != "npm run start:prod" ] && [ "$*" != "npm run start" ] && [ "$*" != "npm start" ] && [ "$*" != "start:prod" ] && [ "$*" != "start" ]; then
    exec "$@"
  fi
fi

# 1. Package.json script resolution (priority: start:prod -> start)
if [ -f "package.json" ]; then
  START_SCRIPT=$(node -e '
    try {
      const pkg = require("./package.json");
      if (pkg.scripts) {
        if (pkg.scripts["start:prod"]) {
          process.stdout.write("start:prod");
        } else if (pkg.scripts["start"]) {
          process.stdout.write("start");
        }
      }
    } catch (e) {}
  ' 2>/dev/null)

  if [ -n "$START_SCRIPT" ]; then
    echo "Starting NestJS application using npm run $START_SCRIPT..."
    exec npm run "$START_SCRIPT"
  fi
fi

# 2. Standalone compiled entrypoint resolution
if [ -f "dist/main.js" ]; then
  echo "Starting NestJS application from dist/main.js..."
  exec node dist/main.js
fi

if [ -f "dist/src/main.js" ]; then
  echo "Starting NestJS application from dist/src/main.js..."
  exec node dist/src/main.js
fi

if [ -f "main.js" ]; then
  echo "Starting NestJS application from main.js..."
  exec node main.js
fi

# 3. Fallback lightweight HTTP server when no application code is mounted
exec node -e '
const http = require("http");
const port = parseInt(process.env.PORT || "8080", 10);
const host = process.env.HOSTNAME || "0.0.0.0";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    status: "healthy",
    framework: "NestJS Base Image Runner",
    runtime: "Node.js " + process.version,
    uid: process.getuid ? process.getuid() : null,
    gid: process.getgid ? process.getgid() : null,
    port: port,
    timestamp: new Date().toISOString()
  }) + "\n");
});
server.listen(port, host, () => {
  console.log(`[nestjs-runner] Fallback server listening on ${host}:${port}`);
});
'
