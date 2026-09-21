# PFNApp — Stirling PDF Hardened Image

**Upstream:** `docker.io/stirlingtools/stirling-pdf:2.14.3`  
**PFNApp:** `ghcr.io/pfnapp/stirling-pdf:2.14.3`

## What changed

- OS packages upgraded via `apt-get upgrade`

## CVE reduction

> Run `make scan-stirling-pdf` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
