#!/bin/sh
set -e

# Default unprivileged runtime configuration
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"

# If command-line arguments are provided, inspect them
if [ $# -gt 0 ]; then
  # If the command is NOT standard start, execute it directly
  if [ "$*" != "bun run start" ] && [ "$*" != "bun start" ] && [ "$*" != "start" ]; then
    exec "$@"
  fi
fi

# Application entrypoint resolution via package.json scripts (start:prod -> start)
if [ -f "package.json" ]; then
  START_SCRIPT=$(bun -e '
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
    echo "Starting application using bun run $START_SCRIPT..."
    exec bun run "$START_SCRIPT"
  fi
fi

# Standalone file resolution
if [ -f "server.js" ]; then
  exec bun server.js
fi

if [ -f "server.ts" ]; then
  exec bun server.ts
fi

if [ -f "index.ts" ]; then
  exec bun index.ts
fi

if [ -f "index.js" ]; then
  exec bun index.js
fi

# Fallback lightweight HTTP server when no application code is mounted
exec bun -e '
const port = parseInt(process.env.PORT || "8080", 10);
const host = process.env.HOSTNAME || "0.0.0.0";
Bun.serve({
  port,
  hostname: host,
  fetch(req) {
    return new Response(JSON.stringify({
      status: "healthy",
      runtime: "Bun " + Bun.version,
      uid: process.getuid ? process.getuid() : null,
      gid: process.getgid ? process.getgid() : null,
      port: port,
      timestamp: new Date().toISOString()
    }) + "\n", {
      headers: { "Content-Type": "application/json" }
    });
  }
});
console.log(`[bun-base] Fallback server listening on ${host}:${port}`);
'
