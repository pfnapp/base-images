#!/bin/sh
set -e

echo "[laravel-scheduler] Initializing Laravel scheduler daemon (UID: $(id -u))..."

# Graceful termination handling for loop mode
trap 'echo "[laravel-scheduler] Received termination signal, exiting..."; exit 0' TERM INT

# If artisan is present, check for native schedule:work command (available in Laravel 8+)
if [ -f /var/www/html/artisan ]; then
    if php /var/www/html/artisan list --raw 2>/dev/null | grep -q "^schedule:work"; then
        echo "[laravel-scheduler] Using native 'php artisan schedule:work' command..."
        exec php /var/www/html/artisan schedule:work --no-interaction -v
    fi
fi

# Fallback daemon loop executing every 60 seconds (for Laravel < 8 or missing artisan)
echo "[laravel-scheduler] Using 60-second periodic execution loop..."
while true; do
    if [ -f /var/www/html/artisan ]; then
        echo "[laravel-scheduler] Executing 'php artisan schedule:run' at $(date -u +'%Y-%m-%d %H:%M:%S UTC')..."
        php /var/www/html/artisan schedule:run --no-interaction -v 2>&1 || true
    else
        echo "[laravel-scheduler] Notice: /var/www/html/artisan not detected. Waiting 60s..."
    fi
    sleep 60 &
    wait $!
done
