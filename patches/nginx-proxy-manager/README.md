# PFNApp — Nginx Proxy Manager Hardened Image

**Upstream:** `docker.io/jc21/nginx-proxy-manager:2.15.1`  
**PFNApp:** `ghcr.io/pfnapp/nginx-proxy-manager:2.15.1`

## What changed

- OS packages upgraded via `apt-get upgrade`

## CVE reduction

> Run `make scan-nginx-proxy-manager` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
