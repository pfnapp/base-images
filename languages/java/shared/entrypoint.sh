#!/bin/sh
set -e

# Default unprivileged runtime configuration
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export JAVA_TOOL_OPTIONS="${JAVA_TOOL_OPTIONS:--XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0}"

# If command-line arguments are provided, execute them directly
if [ $# -gt 0 ]; then
  exec "$@"
fi

# 1. Look for pre-packaged application JAR in /app or current directory
JAR_FILE=$(ls -1 /app/*.jar 2>/dev/null | head -n 1)
if [ -z "$JAR_FILE" ]; then
  JAR_FILE=$(ls -1 *.jar 2>/dev/null | head -n 1)
fi

if [ -n "$JAR_FILE" ] && [ -f "$JAR_FILE" ]; then
  echo "[java-base] Found executable JAR ($JAR_FILE). Starting JVM..."
  exec java $JAVA_OPTS -jar "$JAR_FILE"
fi

# 2. Fallback lightweight HTTP server when no application JAR is mounted
JAVA_VERSION_STR=$(java -version 2>&1 | grep -i "version" | head -n 1 | tr -d '"\r\n')
echo "[java-base] No JAR file found. Starting fallback health server on $HOSTNAME:$PORT..."
while true; do
  printf "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nConnection: close\r\n\r\n{\"status\":\"healthy\",\"runtime\":\"${JAVA_VERSION_STR}\",\"uid\":$(id -u),\"gid\":$(id -g),\"port\":$PORT}\n" | nc -l -p "$PORT" >/dev/null 2>&1 || sleep 1
done
