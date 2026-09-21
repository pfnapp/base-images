# PFNApp — Vaultwarden Hardened Image

**Upstream:** `docker.io/vaultwarden/server:1.37.3`  
**PFNApp:** `ghcr.io/pfnapp/vaultwarden:1.37.3`

## What changed

- OS packages upgraded via `apt-get upgrade`

## CVE reduction

> Run `make scan-vaultwarden` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
