#!/bin/sh
set -e

# Default unprivileged runtime configuration
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export GOCACHE="${GOCACHE:-/tmp/go-cache}"
export GOPATH="${GOPATH:-/tmp/go}"

# If command-line arguments are provided, execute them directly
if [ $# -gt 0 ]; then
  exec "$@"
fi

# 1. Look for pre-compiled binaries in standard locations
for binary in ./main ./app ./server ./bin/main ./bin/app ./bin/server; do
  if [ -x "$binary" ]; then
    echo "[go-base] Found executable $binary. Starting application..."
    exec "$binary"
  fi
done

# 2. Look for source entrypoint main.go
if [ -f "main.go" ]; then
  echo "[go-base] Found main.go. Running via 'go run main.go'..."
  exec go run main.go
fi

# 3. Fallback lightweight HTTP server when no application code is mounted
echo "[go-base] No application entrypoint detected. Starting fallback health server on $HOSTNAME:$PORT..."
while true; do
  printf "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nConnection: close\r\n\r\n{\"status\":\"healthy\",\"runtime\":\"Go $(go env GOVERSION)\",\"uid\":$(id -u),\"gid\":$(id -g),\"port\":$PORT}\n" | nc -l -p "$PORT" >/dev/null 2>&1 || sleep 1
done
