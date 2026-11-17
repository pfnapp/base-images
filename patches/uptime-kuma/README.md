# PFNApp — Uptime Kuma Hardened Image

**Upstream:** `docker.io/louislam/uptime-kuma:2.5.11`  
**PFNApp:** `ghcr.io/pfnapp/uptime-kuma:2.5.11`

## What changed

- OS packages, including cloudflared, are upgraded from the configured apt repositories.
- Production npm dependencies are refreshed, including JSONata 2.2.1 or later within the 2.x major version, and development dependencies and npm tooling are removed.
- The Go healthcheck is rebuilt with the current Go builder image.

Chromium is retained for browser-based monitoring and cloudflared for tunnels. OS vulnerabilities without a fixed package in the configured repositories remain until an upstream fix is available. The cloudflared upgrade likewise depends on the repository providing a build with a fixed `golang.org/x/net`; rebuilding the healthcheck does not patch other Go binaries. Confirm both with an image scan after building.

## CVE reduction

> Run `make scan-uptime-kuma` to see current delta vs upstream.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
