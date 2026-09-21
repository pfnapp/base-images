# PFNApp — Shlink Hardened Image

**Upstream:** `docker.io/shlinkio/shlink:5.1.6`  
**PFNApp:** `ghcr.io/pfnapp/shlink:5.1.6`

## What changed

- OS packages upgraded via `apt-get upgrade`

## CVE reduction

> Run `make scan-shlink` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
