# PFNApp Hardened Patches

Each subdirectory contains a `Dockerfile` that re-layers the upstream image
with OS-level security hardening. The PFNApp version is published to GHCR
at `ghcr.io/pfnapp/<app-id>:<upstream-tag>`.

## Strategy

| Hardening | What it does |
|:---|:---|
| `apt-get upgrade` / `apk upgrade` | Patches fixable OS CVEs |
| Remove build toolchain | Eliminates CVEs from gcc/binutils/linux-libc-dev leaked into runtime |

## Apps

| App ID | Base OS | Strategy |
|:---|:---|:---|
| hermes-agent | Debian 13 | upgrade + remove build toolchain |
| uptime-kuma | Debian | upgrade |
| wordpress-fpm | Alpine | apk upgrade |
| vaultwarden | Debian | upgrade |
| linkding | Debian | upgrade |
| stirling-pdf | Debian | upgrade |
| nginx-proxy-manager | Debian/Alpine | upgrade |
| shlink | Debian | upgrade |
| homepage | Alpine | apk upgrade |
| openclaw | Unknown | re-publish as-is |
| omniroute | Unknown | re-publish as-is |
| 9router | Unknown | re-publish as-is |
| memos | Unknown | re-publish as-is |
| filebrowser | Unknown | re-publish as-is |
| pocketbase | Unknown | re-publish as-is |
| dozzle | Unknown | re-publish as-is |
