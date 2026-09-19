#!/bin/sh
set -e

# Default unprivileged runtime configuration
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PYTHONUNBUFFERED="${PYTHONUNBUFFERED:-1}"
export PYTHONDONTWRITEBYTECODE="${PYTHONDONTWRITEBYTECODE:-1}"

# If command-line arguments are provided, execute them directly
if [ $# -gt 0 ]; then
  exec "$@"
fi

# 1. Look for common Python entrypoints in the working directory
if [ -f "main.py" ]; then
  # If uvicorn is installed and main.py defines an 'app', try running with uvicorn
  if command -v uvicorn >/dev/null 2>&1 && grep -q "app *=" main.py 2>/dev/null; then
    echo "[python-base] Detected ASGI app in main.py. Starting with Uvicorn..."
    exec uvicorn main:app --host "$HOSTNAME" --port "$PORT"
  fi
  echo "[python-base] Starting Python application from main.py..."
  exec python3 main.py
fi

if [ -f "app.py" ]; then
  if command -v uvicorn >/dev/null 2>&1 && grep -q "app *=" app.py 2>/dev/null; then
    echo "[python-base] Detected ASGI app in app.py. Starting with Uvicorn..."
    exec uvicorn app:app --host "$HOSTNAME" --port "$PORT"
  fi
  echo "[python-base] Starting Python application from app.py..."
  exec python3 app.py
fi

if [ -f "manage.py" ]; then
  echo "[python-base] Detected Django project. Starting development server on $HOSTNAME:$PORT..."
  exec python3 manage.py runserver "$HOSTNAME:$PORT"
fi

# 2. Fallback lightweight HTTP server when no application code is mounted
echo "[python-base] No application entrypoint detected (main.py, app.py, manage.py). Starting fallback HTTP server on $HOSTNAME:$PORT..."
exec python3 -c '
import json, os, sys
from http.server import HTTPServer, BaseHTTPRequestHandler

port = int(os.environ.get("PORT", "8080"))
host = os.environ.get("HOSTNAME", "0.0.0.0")

class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        payload = {
            "status": "healthy",
            "runtime": f"Python {sys.version.split()[0]}",
            "uid": os.getuid(),
            "gid": os.getgid(),
            "port": port,
            "architecture": os.uname().machine,
        }
        self.wfile.write(json.dumps(payload, indent=2).encode() + b"\n")

    def log_message(self, format, *args):
        # Clean logging format
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

server = HTTPServer((host, port), HealthHandler)
server.serve_forever()
'
