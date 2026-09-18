#!/bin/sh
set -e

# Configure runtime PHP settings
PHP_MEMORY_LIMIT="${PHP_MEMORY_LIMIT:-256M}"
PHP_UPLOAD_MAX_FILESIZE="${PHP_UPLOAD_MAX_FILESIZE:-64M}"
PHP_POST_MAX_SIZE="${PHP_POST_MAX_SIZE:-$PHP_UPLOAD_MAX_FILESIZE}"
PHP_MAX_EXECUTION_TIME="${PHP_MAX_EXECUTION_TIME:-60}"
PHP_TIMEZONE="${PHP_TIMEZONE:-Asia/Jakarta}"

# Configure PHP-FPM environment defaults
export PHP_FPM_PM="${PHP_FPM_PM:-dynamic}"
export PHP_FPM_MAX_CHILDREN="${PHP_FPM_MAX_CHILDREN:-50}"
export PHP_FPM_START_SERVERS="${PHP_FPM_START_SERVERS:-5}"
export PHP_FPM_MIN_SPARE_SERVERS="${PHP_FPM_MIN_SPARE_SERVERS:-5}"
export PHP_FPM_MAX_SPARE_SERVERS="${PHP_FPM_MAX_SPARE_SERVERS:-35}"
export PHP_FPM_MAX_REQUESTS="${PHP_FPM_MAX_REQUESTS:-500}"
export PHP_FPM_REQUEST_TERMINATE_TIMEOUT="${PHP_FPM_REQUEST_TERMINATE_TIMEOUT:-300s}"

# Write dynamic runtime overrides to /etc/php/conf.d/custom/99-overrides.ini
mkdir -p /etc/php/conf.d/custom
cat <<EOF > /etc/php/conf.d/custom/99-overrides.ini
; Runtime overrides generated dynamically by entrypoint.sh (UID: $(id -u))
memory_limit = ${PHP_MEMORY_LIMIT}
upload_max_filesize = ${PHP_UPLOAD_MAX_FILESIZE}
post_max_size = ${PHP_POST_MAX_SIZE}
max_execution_time = ${PHP_MAX_EXECUTION_TIME}
date.timezone = ${PHP_TIMEZONE}
EOF

# Append dynamic disable_functions if configured
if [ -n "${PHP_DISABLE_FUNCTIONS}" ]; then
    echo "disable_functions = ${PHP_DISABLE_FUNCTIONS}" >> /etc/php/conf.d/custom/99-overrides.ini
fi

# Ensure required Laravel storage and bootstrap cache directories exist
mkdir -p \
    /var/www/html/storage/app/public \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache 2>/dev/null || true

# Normalize supervisord invocation if passed as command
if [ "$1" = "supervisord" ] || [ "$1" = "/usr/bin/supervisord" ]; then
    shift
    if [ "$1" = "-c" ]; then
        shift 2
    fi
fi

# Check for direct CLI execution (e.g., docker run image php -v or artisan tinker)
if [ "$#" -gt 0 ] && [ "${1#-}" = "$1" ]; then
    if [ "$1" = "artisan" ]; then
        shift
        exec php /var/www/html/artisan "$@"
    fi
    exec "$@"
fi

# Fallback index.php for health checks and status endpoint if not mounted
if [ ! -f /var/www/html/public/index.php ]; then
    mkdir -p /var/www/html/public
    cat <<'EOF' > /var/www/html/public/index.php
<?php
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'status' => 'healthy',
    'framework' => 'Laravel Base Image',
    'runtime' => 'PHP ' . PHP_VERSION,
    'sapi' => PHP_SAPI,
    'uid' => getmyuid(),
    'gid' => getmygid(),
    'timezone' => date_default_timezone_get(),
    'memory_limit' => ini_get('memory_limit'),
    'role' => getenv('CONTAINER_ROLE') ?: 'app',
    'timestamp' => date('c'),
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
EOF
fi

# Placeholder artisan runner if no application is mounted (prevents crash-loops during testing)
if [ ! -f /var/www/html/artisan ]; then
    cat <<'EOF' > /var/www/html/artisan
#!/usr/bin/env php
<?php
$sub = $argv[1] ?? '';
if (strpos($sub, 'queue:work') !== false) {
    echo "[laravel-worker] Placeholder worker active (waiting for application code)...\n";
    while (true) { sleep(60); }
}
if (strpos($sub, 'horizon') !== false) {
    echo "[laravel-horizon] Placeholder Horizon worker active (waiting for application code)...\n";
    while (true) { sleep(60); }
}
if (strpos($sub, 'schedule:work') !== false || strpos($sub, 'schedule:run') !== false) {
    echo "[laravel-scheduler] Placeholder scheduler active (waiting for application code)...\n";
    while (true) { sleep(60); }
}
echo "Laravel Artisan CLI runner (placeholder - no application mounted)\n";
EOF
    chmod +x /var/www/html/artisan
fi

# Determine container role
RAW_ROLE="${CONTAINER_ROLE:-app}"
ROLE=$(echo "$RAW_ROLE" | tr '[:upper:]' '[:lower:]')

case "$ROLE" in
    web) ROLE="app" ;;
    queue) ROLE="worker" ;;
    cron) ROLE="scheduler" ;;
esac

ENABLE_WEB=false
ENABLE_WORKER=false
ENABLE_HORIZON=false
ENABLE_SCHEDULER=false

case "$ROLE" in
    app)
        ENABLE_WEB=true
        if [ "${LARAVEL_QUEUE_ENABLE:-false}" = "true" ]; then ENABLE_WORKER=true; fi
        if [ "${LARAVEL_HORIZON_ENABLE:-false}" = "true" ]; then ENABLE_HORIZON=true; fi
        if [ "${LARAVEL_SCHEDULE_ENABLE:-false}" = "true" ]; then ENABLE_SCHEDULER=true; fi
        ;;
    worker)
        ENABLE_WORKER=true
        ;;
    horizon)
        ENABLE_HORIZON=true
        ;;
    scheduler)
        ENABLE_SCHEDULER=true
        ;;
    all)
        ENABLE_WEB=true
        ENABLE_WORKER=true
        ENABLE_SCHEDULER=true
        if [ "${LARAVEL_HORIZON_ENABLE:-false}" = "true" ]; then ENABLE_HORIZON=true; fi
        ;;
    *)
        echo "ERROR: Invalid CONTAINER_ROLE '$RAW_ROLE'."
        echo "Supported roles: app (or web), worker (or queue), horizon, scheduler (or cron), all."
        exit 1
        ;;
esac

# Prevent conflicting worker modes
if [ "$ENABLE_WORKER" = "true" ] && [ "$ENABLE_HORIZON" = "true" ]; then
    echo "ERROR: Both Laravel Queue Worker and Horizon are enabled."
    echo "Please enable only one worker system to avoid supervisor conflicts."
    exit 1
fi

echo "==> Starting Laravel container with role: [${ROLE}] (UID: $(id -u))"

# Execute startup automations only when artisan exists
if [ -f /var/www/html/artisan ]; then
    # Ensure storage link exists
    if [ "${LARAVEL_STORAGE_LINK:-true}" = "true" ]; then
        if [ ! -e /var/www/html/public/storage ]; then
            echo "==> Creating storage symlink (php artisan storage:link)..."
            php /var/www/html/artisan storage:link --no-interaction 2>/dev/null || true
        fi
    fi

    # Run database migrations if explicitly enabled
    if [ "${LARAVEL_RUN_MIGRATIONS:-false}" = "true" ]; then
        echo "==> Running database migrations (php artisan migrate --force)..."
        php /var/www/html/artisan migrate --force --no-interaction
    fi

    # Run optimizations if explicitly enabled
    if [ "${LARAVEL_RUN_OPTIMIZE:-false}" = "true" ]; then
        echo "==> Running Laravel optimizations (php artisan optimize)..."
        php /var/www/html/artisan optimize --no-interaction || {
            echo "==> Fallback caching..."
            php /var/www/html/artisan config:cache --no-interaction || true
            php /var/www/html/artisan route:cache --no-interaction || true
            php /var/www/html/artisan view:cache --no-interaction || true
        }
    fi
fi

# Clean and prepare Supervisor configuration directory
mkdir -p /etc/supervisor/conf.d
rm -f /etc/supervisor/conf.d/*.conf

# Configure Web service (Nginx + PHP-FPM)
if [ "$ENABLE_WEB" = "true" ]; then
    echo "==> Enabling Nginx + PHP-FPM web services..."

    # Ensure unprivileged Nginx temporary directories exist
    mkdir -p /tmp/nginx/client_temp /tmp/nginx/proxy_temp /tmp/nginx/fastcgi_temp /tmp/nginx/uwsgi_temp /tmp/nginx/scgi_temp 2>/dev/null || true

    cat <<'EOF' > /etc/supervisor/conf.d/php-fpm.conf
[program:php-fpm]
command=/usr/local/sbin/php-fpm -F -y /usr/local/etc/php-fpm.conf
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true
priority=10
stopsignal=QUIT
stopwaitsecs=10
EOF

    cat <<'EOF' > /etc/supervisor/conf.d/nginx.conf
[program:nginx]
command=/usr/sbin/nginx -g "daemon off;" -c /etc/nginx/nginx.conf
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true
priority=20
stopsignal=QUIT
stopwaitsecs=10
EOF
fi

# Configure Queue Worker service
if [ "$ENABLE_WORKER" = "true" ]; then
    QUEUE_CONN="${LARAVEL_QUEUE_CONNECTION:-default}"
    QUEUE_NAME="${LARAVEL_QUEUE_NAME:-default}"
    QUEUE_NUMPROCS="${LARAVEL_QUEUE_NUMPROCS:-2}"
    QUEUE_SLEEP="${LARAVEL_QUEUE_SLEEP:-3}"
    QUEUE_TRIES="${LARAVEL_QUEUE_TRIES:-3}"
    QUEUE_TIMEOUT="${LARAVEL_QUEUE_TIMEOUT:-60}"
    QUEUE_MEMORY="${LARAVEL_QUEUE_MEMORY:-128}"

    WORKER_CMD="/usr/local/bin/php /var/www/html/artisan queue:work"
    if [ "$QUEUE_CONN" != "default" ] && [ -n "$QUEUE_CONN" ]; then
        WORKER_CMD="$WORKER_CMD $QUEUE_CONN"
    fi
    if [ "$QUEUE_NAME" != "default" ] && [ -n "$QUEUE_NAME" ]; then
        WORKER_CMD="$WORKER_CMD --queue=$QUEUE_NAME"
    fi
    WORKER_CMD="$WORKER_CMD --sleep=$QUEUE_SLEEP --tries=$QUEUE_TRIES --timeout=$QUEUE_TIMEOUT --memory=$QUEUE_MEMORY"
    if [ -n "$LARAVEL_QUEUE_MAX_JOBS" ]; then
        WORKER_CMD="$WORKER_CMD --max-jobs=$LARAVEL_QUEUE_MAX_JOBS"
    fi
    if [ -n "$LARAVEL_QUEUE_MAX_TIME" ]; then
        WORKER_CMD="$WORKER_CMD --max-time=$LARAVEL_QUEUE_MAX_TIME"
    fi

    echo "==> Enabling Laravel Queue Worker (${QUEUE_NUMPROCS} processes)..."
    echo "    Command: $WORKER_CMD"

    cat <<EOF > /etc/supervisor/conf.d/laravel-worker.conf
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=$WORKER_CMD
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
numprocs=$QUEUE_NUMPROCS
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
stopwaitsecs=3600
priority=30
EOF
fi

# Configure Horizon service
if [ "$ENABLE_HORIZON" = "true" ]; then
    echo "==> Enabling Laravel Horizon Worker..."

    cat <<'EOF' > /etc/supervisor/conf.d/laravel-horizon.conf
[program:laravel-horizon]
process_name=%(program_name)s
command=/usr/local/bin/php /var/www/html/artisan horizon
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
stopwaitsecs=3600
priority=30
EOF
fi

# Configure Scheduler service
if [ "$ENABLE_SCHEDULER" = "true" ]; then
    echo "==> Enabling Laravel Scheduler daemon..."

    cat <<'EOF' > /etc/supervisor/conf.d/laravel-scheduler.conf
[program:laravel-scheduler]
process_name=%(program_name)s
command=/usr/local/bin/laravel-scheduler.sh
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
priority=40
EOF
fi

# Launch Supervisor process manager
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf "$@"
