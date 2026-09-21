# PFNApp — Uptime Kuma Hardened Image

**Upstream:** `docker.io/louislam/uptime-kuma:2.5.5`  
**PFNApp:** `ghcr.io/pfnapp/uptime-kuma:2.5.5`

## What changed

- OS packages upgraded via `apt-get upgrade`

## CVE reduction

> Run `make scan-uptime-kuma` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
