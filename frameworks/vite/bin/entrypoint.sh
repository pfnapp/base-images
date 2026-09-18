#!/bin/sh
set -e

# Default unprivileged networking configuration
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"

# Ensure runtime temporary directories exist and are writable
mkdir -p /tmp/nginx/client_temp \
         /tmp/nginx/proxy_temp \
         /tmp/nginx/fastcgi_temp \
         /tmp/nginx/uwsgi_temp \
         /tmp/nginx/scgi_temp

# Fallback index.html if application files are not mounted
if [ ! -f "/app/index.html" ]; then
  cat << 'EOF' > /app/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite Static Runner</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
    .card { background: #1e293b; padding: 2rem 3rem; border-radius: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); text-align: center; }
    h1 { color: #38bdf8; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 0.95rem; }
    .badge { display: inline-block; background: #059669; color: #ecfdf5; font-size: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 600; text-transform: uppercase; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Vite Static Runner</h1>
    <p>Nginx SPA Base Image is running healthy.</p>
    <div class="badge">Status: Healthy</div>
  </div>
</body>
</html>
EOF
fi

# Verify nginx syntax
nginx -t -q

# Execute the passed command
exec "$@"
