# PFNApp — WordPress FPM Hardened Image

**Upstream:** `docker.io/library/wordpress:7.1.1-php8.3-fpm-alpine`  
**PFNApp:** `ghcr.io/pfnapp/wordpress-fpm:7.1.1-php8.3-fpm-alpine`

## What changed

- OS packages upgraded via `apk upgrade`

## CVE reduction

> Run `make scan-wordpress-fpm` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
