# Syntax: docker/dockerfile:1
ARG PHP_VERSION=8.4
FROM ghcr.io/pfnapp/base/languages/php:${PHP_VERSION}-alpine

ARG UID=10001
ARG GID=10001

USER root

# Install system utilities needed for Laravel and Composer workflows, plus Node.js/npm for frontend builds
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache \
    git \
    unzip \
    bash \
    nodejs \
    npm

# Install essential Laravel PHP extensions
# pcntl: Required for Laravel asynchronous signals, queue workers, and Horizon
# exif:  Required for image orientation and file metadata parsing
RUN install-php-extensions \
    pcntl \
    exif

# Install Composer v2 binary from official image
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# Configure Composer environment for unprivileged execution
ENV COMPOSER_HOME=/tmp/composer \
    COMPOSER_ALLOW_SUPERUSER=0

# Pre-create Supervisor conf.d, Composer temp, and Laravel directories with non-root ownership
RUN mkdir -p \
    /etc/supervisor/conf.d \
    /tmp/composer \
    /var/www/html/storage/app/public \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache && \
    chown -R ${UID}:${GID} \
    /etc/supervisor \
    /tmp/composer \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache && \
    chmod -R 775 \
    /etc/supervisor \
    /tmp/composer \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Copy Supervisor configuration, scheduler daemon script, and dynamic entrypoint
COPY config/supervisord.conf /etc/supervisor/supervisord.conf
COPY bin/laravel-scheduler.sh /usr/local/bin/laravel-scheduler.sh
COPY bin/entrypoint.sh /usr/local/bin/entrypoint.sh

# Ensure executables have correct permissions and ownership
RUN chmod +x \
    /usr/local/bin/laravel-scheduler.sh \
    /usr/local/bin/entrypoint.sh && \
    chown -R ${UID}:${GID} \
    /etc/supervisor \
    /usr/local/bin/laravel-scheduler.sh \
    /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html

EXPOSE 8080

USER 10001:10001

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
