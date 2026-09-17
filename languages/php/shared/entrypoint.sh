#!/bin/sh
set -e

# Default environment variables
PHP_MEMORY_LIMIT="${PHP_MEMORY_LIMIT:-256M}"
PHP_UPLOAD_MAX_FILESIZE="${PHP_UPLOAD_MAX_FILESIZE:-64M}"
PHP_POST_MAX_SIZE="${PHP_POST_MAX_SIZE:-$PHP_UPLOAD_MAX_FILESIZE}"
PHP_MAX_EXECUTION_TIME="${PHP_MAX_EXECUTION_TIME:-60}"
PHP_TIMEZONE="${PHP_TIMEZONE:-Asia/Jakarta}"

# Export PHP-FPM environment variables with defaults for pool configuration across all PHP versions
export PHP_FPM_PM="${PHP_FPM_PM:-dynamic}"
export PHP_FPM_MAX_CHILDREN="${PHP_FPM_MAX_CHILDREN:-50}"
export PHP_FPM_START_SERVERS="${PHP_FPM_START_SERVERS:-5}"
export PHP_FPM_MIN_SPARE_SERVERS="${PHP_FPM_MIN_SPARE_SERVERS:-5}"
export PHP_FPM_MAX_SPARE_SERVERS="${PHP_FPM_MAX_SPARE_SERVERS:-35}"
export PHP_FPM_MAX_REQUESTS="${PHP_FPM_MAX_REQUESTS:-500}"
export PHP_FPM_REQUEST_TERMINATE_TIMEOUT="${PHP_FPM_REQUEST_TERMINATE_TIMEOUT:-300s}"

# Write 99-overrides.ini into /etc/php/conf.d/custom/
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

# Ensure fallback health check index.php exists if missing
if [ ! -f /var/www/html/public/index.php ]; then
    cat <<'EOF' > /var/www/html/public/index.php
<?php
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'status' => 'healthy',
    'runtime' => 'PHP ' . PHP_VERSION,
    'sapi' => PHP_SAPI,
    'uid' => getmyuid(),
    'gid' => getmygid(),
    'timezone' => date_default_timezone_get(),
    'memory_limit' => ini_get('memory_limit'),
    'timestamp' => date('c'),
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
EOF
fi

# Execute process manager
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf "$@"
