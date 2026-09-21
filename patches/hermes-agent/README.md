# PFNApp — Hermes Agent Hardened Image

**Upstream:** `docker.io/nousresearch/hermes-agent:v2026.9.14`  
**PFNApp:** `ghcr.io/pfnapp/hermes-agent:v2026.9.14`

## What changed

- OS packages upgraded via `apt-get upgrade`
- Build toolchain removed from runtime image (`gcc`, `g++`, `cpp`, `make`, `cmake`, `python3-dev`, `libffi-dev`, `libc6-dev`, `linux-libc-dev`, `binutils`)

## CVE reduction

> Run `make scan-hermes-agent` to see current delta vs upstream.

Tested result: **-2.521 system CVEs (-75%)** from upgrade + build toolchain removal.

## Version policy

Same version tag as upstream. When upstream releases a new version,
PFNApp image is rebuilt automatically within 24 hours.
