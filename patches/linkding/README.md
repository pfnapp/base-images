# PFNApp — Linkding Hardened Image

**Upstream:** `docker.io/sissbruecker/linkding:1.47.0`  
**PFNApp:** `ghcr.io/pfnapp/linkding:1.47.0`

## What changed

- OS packages upgraded via `apt-get upgrade`

## CVE reduction

> Run `make scan-linkding` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
