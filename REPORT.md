# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-10-28T06:37:30.461Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `17`
- **Active Versions Audited:** `50`
- **Images Running As Root:** `33` / `50` (⚠️ **66%** non-compliant)
- **App Critical CVEs** _(upstream, unfixable by us)_**:** `122`
- **App High CVEs** _(upstream, unfixable by us)_**:** `1185`
- **PFNApp Images Scanned:** `49` / `50`
- **Total System CVE Reduction:** `2154`

> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.3-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ YES | 0/3/9/44 | 0/0/0/0 | 0/2/9/44 | 0/0/0/0 | 0/-1 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.2-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 0/7/17/45 | 0/0/0/0 | 0/7/16/45 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.1-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 0/8/10/45 | 0/0/0/0 | 0/8/10/45 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.8` | 🟢 **LATEST** | ⚠️ YES | 9/273/389/337 | 4/68/108/8 | 21/509/653/463 | 2/69/77/6 | 12/236 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.7` | 🟢 **SUPPORTED** | ⚠️ YES | 9/273/389/337 | 4/70/108/8 | 21/509/653/463 | 2/69/77/6 | 12/236 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.6` | 🟢 **SUPPORTED** | ⚠️ YES | 194/2163/2307/1235 | 6/104/135/11 | 21/509/653/463 | 2/69/77/6 | -173/-1654 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.5` | 🟠 **AGING** | ⚠️ YES | 194/2163/2307/1235 | 7/106/144/12 | 33/669/818/522 | 3/71/82/7 | -161/-1494 | 🔴 APP CRITICAL RISK |
| **9Router** | _AI Gateways & Proxies_ | `0.5.111` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/1/10/1 | 0/0/0/0 | 4/154/155/14 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.109` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/1/10/1 | 0/0/0/0 | 4/154/155/14 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.104` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/1/0 | 0/1/10/1 | 0/0/0/0 | 4/154/155/14 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.95` | 🟠 **AGING** | ⚠️ YES | 0/0/1/0 | 2/2/10/1 | 0/0/1/0 | 2/2/0/0 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `0.5.91` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/1/0 | 2/5/15/2 | 0/0/1/0 | 2/5/5/1 | 0/0 | 🔴 APP CRITICAL RISK |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.52` | 🟢 **LATEST** | ✅ NO | 0/7/61/63 | 2/9/10/2 | 4/27/108/70 | 6/32/45/11 | 4/20 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.51` | 🟢 **SUPPORTED** | ✅ NO | 0/11/91/69 | 3/18/29/7 | 4/27/108/70 | 6/32/45/11 | 4/16 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.50` | 🟢 **SUPPORTED** | ✅ NO | 4/27/108/70 | 6/32/45/11 | 4/27/108/70 | 6/32/45/11 | 0/0 | 🔴 APP CRITICAL RISK |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.10.8` | 🟢 **LATEST** | ✅ NO | 3/48/184/221 | 1/12/21/6 | 3/48/184/221 | 1/12/21/6 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.7` | 🟢 **SUPPORTED** | ✅ NO | 3/50/192/223 | 1/12/21/6 | 3/50/192/223 | 1/12/21/6 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.6` | 🟢 **SUPPORTED** | ✅ NO | 3/51/192/223 | 1/12/21/6 | 3/51/192/223 | 1/12/21/6 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.5` | 🟠 **AGING** | ✅ NO | 3/53/194/223 | 1/15/23/6 | 3/53/194/223 | 1/15/23/6 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.4` | 🔴 **EOL SOON** | ✅ NO | 3/53/194/223 | 1/54/73/14 | 15/95/253/236 | 1/56/67/16 | 12/42 | 🔴 APP CRITICAL RISK |
| **n8n** | _AI Agents & Automation_ | `3.0.0` | 🟢 **LATEST** | ✅ NO | 0/2/1/22 | 0/20/27/4 | 7/29/71/49 | 6/68/72/8 | 7/27 | 🟠 APP HIGH RISK |
|  |  | `2.45.4` | 🟢 **SUPPORTED** | ✅ NO | 0/2/8/22 | 0/27/42/6 | 7/29/71/49 | 6/68/72/8 | 7/27 | 🟠 APP HIGH RISK |
|  |  | `2.45.3` | 🟢 **SUPPORTED** | ✅ NO | 0/2/8/22 | 0/27/42/6 | 7/29/71/49 | 6/68/72/8 | 7/27 | 🟠 APP HIGH RISK |
|  |  | `2.45.2` | 🟠 **AGING** | ✅ NO | 0/2/8/22 | 0/27/42/6 | 7/29/71/49 | 6/68/72/8 | 7/27 | 🟠 APP HIGH RISK |
|  |  | `2.45.1` | 🔴 **EOL SOON** | ✅ NO | 0/4/10/22 | 0/27/42/6 | 7/29/71/49 | 6/68/72/8 | 7/25 | 🟠 APP HIGH RISK |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.24` | 🟢 **LATEST** | ⚠️ YES | 19/492/2814/1570 | 10/63/93/27 | 2/222/442/346 | 8/50/59/16 | -17/-270 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.21` | 🟢 **SUPPORTED** | ⚠️ YES | 19/492/2814/1570 | 10/63/93/27 | 2/242/478/352 | 10/65/96/26 | -17/-250 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.14` | 🟢 **SUPPORTED** | ⚠️ YES | 19/492/2814/1570 | 10/65/96/26 | 2/242/478/352 | 10/65/96/26 | -17/-250 | 🔴 APP CRITICAL RISK |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.4` | 🟢 **LATEST** | ⚠️ YES | 4/39/117/146 | 0/0/0/0 | 4/38/117/146 | 0/0/0/0 | 0/-1 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `1.37.3` | 🟢 **SUPPORTED** | ⚠️ YES | 7/52/162/153 | 0/0/0/0 | 4/42/147/152 | 0/0/0/0 | -3/-10 | 🟡 NON-COMPLIANT (ROOT) |
| **Memos** | _Knowledge & Notes_ | `0.31.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/17/2 | 1/7/15/2 | 0/0/0/0 | 1/1/2/1 | 0/-2 | 🔴 APP CRITICAL RISK |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ NO | 0/0/0/0 | 0/16/15/2 | 0/0/0/0 | 0/0/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **Stirling-PDF** | _Utilities & Tools_ | `3.2.2` | 🟢 **LATEST** | ⚠️ YES | 0/2/480/107 | 6/36/19/0 | 0/0/381/57 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `3.2.1` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/480/107 | 6/36/19/0 | 0/0/381/57 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `3.2.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/480/107 | 6/36/19/0 | 0/0/385/57 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `3.1.0` | 🟠 **AGING** | ⚠️ YES | 0/2/480/107 | 6/36/19/0 | 0/0/416/84 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `3.0.2` | 🔴 **EOL SOON** | ⚠️ YES | 0/2/493/107 | 6/36/19/0 | 0/0/416/84 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.5` | 🟢 **LATEST** | ⚠️ YES | 0/0/1/0 | 0/2/4/1 | 0/0/0/0 | 0/0/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ YES | 6/303/2659/881 | 2/12/17/1 | 2/68/714/365 | 2/12/17/1 | -4/-235 | 🔴 APP CRITICAL RISK |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.16.0` | 🟢 **LATEST** | ⚠️ YES | 4/251/2389/1463 | 4/18/32/8 | 3/119/840/1042 | 1/2/3/5 | -1/-132 | 🔴 APP CRITICAL RISK |
|  |  | `2.15.1` | 🟢 **SUPPORTED** | ⚠️ YES | 17/612/4194/1808 | 4/32/48/10 | 4/251/2389/1463 | 4/32/48/10 | -13/-361 | 🔴 APP CRITICAL RISK |
| **Shlink** | _Networking & Shorteners_ | `5.1.8` | 🟢 **LATEST** | ✅ NO | 0/3/2/44 | 0/0/0/0 | 0/2/2/44 | 0/1/2/5 | 0/-1 | 🟢 COMPLIANT |
|  |  | `5.1.7` | 🟢 **SUPPORTED** | ✅ NO | 0/11/23/4 | 3/28/19/6 | 0/10/21/4 | 0/1/2/5 | 0/-1 | 🔴 APP CRITICAL RISK |
|  |  | `5.1.6` | 🟢 **SUPPORTED** | ✅ NO | 0/11/23/4 | 3/29/19/6 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/7/12 | 4/16/37/7 | 0/0/0/0 | 2/7/5/0 | 0/-2 | 🔴 APP CRITICAL RISK |
| **Dozzle** | _Operations & Logs_ | `v11.3.5` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/1/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.3.4` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/1/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.3.3` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/1/0/0 | 0/0/0/0 | 0/0/1/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.3.2` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 0/1/1/0 | 0/0/0/0 | 0/1/1/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.3.1` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/0/0 | 0/2/5/0 | 0/0/0/0 | 0/2/5/0 | 0/0 | 🟠 APP HIGH RISK |

---

## 🚫 Deprecated / Dropped from Active Scanning

| Application | Deprecated Version | Dropped On | Advisory to Users |
| :--- | :--- | :---: | :--- |
| **9Router** | `0.5.86` | 2026-10-26 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.111 immediately. |
| **9Router** | `0.5.85` | 2026-10-23 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.109 immediately. |
| **9Router** | `0.5.75` | 2026-10-15 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.104 immediately. |
| **OpenClaw 2** | `2026.10.3` | 2026-10-27 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.8 immediately. |
| **OpenClaw 2** | `2026.10.2` | 2026-10-24 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.7 immediately. |
| **OpenClaw 2** | `2026.10.1` | 2026-10-22 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.6 immediately. |
| **OpenClaw 2** | `2026.9.9` | 2026-10-18 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.5 immediately. |
| **OpenClaw 2** | `2026.9.8` | 2026-10-16 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.4 immediately. |
| **OpenClaw 2** | `2026.9.7` | 2026-10-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.3 immediately. |
| **OpenClaw 2** | `2026.9.6` | 2026-10-12 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.2 immediately. |
| **OpenClaw 2** | `2026.9.5` | 2026-10-11 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.1 immediately. |
| **n8n** | `2.45.0` | 2026-10-27 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.0.0 immediately. |
| **n8n** | `2.44.4` | 2026-10-26 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.45.4 immediately. |
| **n8n** | `2.44.3` | 2026-10-23 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.45.3 immediately. |
| **n8n** | `2.44.2` | 2026-10-22 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.45.2 immediately. |
| **n8n** | `2.44.1` | 2026-10-21 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.45.1 immediately. |
| **n8n** | `2.44.0` | 2026-10-20 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.45.0 immediately. |
| **n8n** | `2.43.4` | 2026-10-19 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.44.4 immediately. |
| **n8n** | `2.43.3` | 2026-10-16 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.44.3 immediately. |
| **n8n** | `2.43.2` | 2026-10-15 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.44.2 immediately. |
| **n8n** | `2.43.1` | 2026-10-14 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.44.1 immediately. |
| **n8n** | `2.43.0` | 2026-10-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.44.0 immediately. |
| **n8n** | `2.42.3` | 2026-10-12 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.43.4 immediately. |
| **n8n** | `2.42.2` | 2026-10-09 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.43.3 immediately. |
| **n8n** | `2.42.1` | 2026-10-08 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.43.2 immediately. |
| **n8n** | `2.42.0` | 2026-10-07 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.43.1 immediately. |
| **n8n** | `2.41.3` | 2026-10-06 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.43.0 immediately. |
| **n8n** | `2.40.6` | 2026-10-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.42.3 immediately. |
| **Stirling-PDF** | `3.0.0` | 2026-10-24 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.2 immediately. |
| **Stirling-PDF** | `2.14.3` | 2026-10-21 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.1 immediately. |
| **Dozzle** | `v11.3.0` | 2026-10-24 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.5 immediately. |
| **Dozzle** | `v11.2.0` | 2026-10-20 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.4 immediately. |
| **Dozzle** | `v11.1.3` | 2026-10-19 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.3 immediately. |
| **Dozzle** | `v11.1.2` | 2026-10-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.2 immediately. |
| **Dozzle** | `v11.1.1` | 2026-10-10 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.1 immediately. |
| **Dozzle** | `v11.1.0` | 2026-10-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.0 immediately. |

---

## 🔍 Actionable Vulnerability Details per Latest Release

<details>
<summary><b>WordPress (PHP-FPM) (<code>7.1.3-php8.3-fpm-alpine</code>) — App: 0 Critical, 0 High | System: 0 Critical, 3 High</b></summary>

- **Full Reference:** `library/wordpress:7.1.3-php8.3-fpm-alpine`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-111497` | **HIGH** | `brotli-libs` | `1.2.0-r1` | `1.2.1-r0` |
| `CVE-2026-92392` | **HIGH** | `curl` | `8.22.0-r0` | `8.23.0-r0` |
| `CVE-2026-92392` | **HIGH** | `libcurl` | `8.22.0-r0` | `8.23.0-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -1 | 0 | 0 | -1 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Uptime Kuma (<code>2.5.8</code>) — App: 4 Critical, 68 High | System: 9 Critical, 273 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.8`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-109461` | **HIGH** | `@azure/msal-node` | `5.6.0` | `7.1.0` |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.13.6, 1.14.5` |
| `CVE-2026-48068` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-48069` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-101909` | **HIGH** | `axios` | `0.32.0` | `0.34.0, 1.20.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53615` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-110913` | **HIGH** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.47-1~deb12u1` |
| `CVE-2026-110917` | **HIGH** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.47-1~deb12u1` |
| `CVE-2026-110918` | **HIGH** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.47-1~deb12u1` |
| `CVE-2026-110919` | **HIGH** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.47-1~deb12u1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 12 | 236 | 264 | 126 | 639 |
| App | -2 | 1 | — | — | -34 |

</details>

<details>
<summary><b>9Router (<code>0.5.111</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.111`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-85393` | **HIGH** | `node-forge` | `1.4.0` | `None` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 4 | 153 | — | — | 327 |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.52</code>) — App: 2 Critical, 9 High | System: 0 Critical, 7 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.52`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `GHSA-2464-fhr4-w9xw` | **CRITICAL** | `next` | `16.3.8` | `15.5.28, 16.4.1` |
| `GHSA-673q-mjm6-r5xr` | **CRITICAL** | `next` | `16.3.8` | `16.4.1` |
| `CVE-2026-94482` | **HIGH** | `next` | `16.3.8` | `15.5.28, 16.4.1` |
| `CVE-2026-109383` | **HIGH** | `undici` | `6.29.0` | `6.29.1, 7.30.1, 8.12.2` |
| `CVE-2026-109869` | **HIGH** | `undici` | `6.29.0` | `6.29.1, 7.30.1, 8.12.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-54369` | **HIGH** | `libacl1` | `2.3.2-2+b1` | `None` |
| `CVE-2026-16742` | **HIGH** | `libsystemd0` | `257.13-1~deb13u1` | `None` |
| `CVE-2025-69720` | **HIGH** | `libtinfo6` | `6.5+20250216-2` | `None` |
| `CVE-2026-16742` | **HIGH** | `libudev1` | `257.13-1~deb13u1` | `None` |
| `CVE-2025-69720` | **HIGH** | `ncurses-base` | `6.5+20250216-2` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 4 | 20 | 47 | 7 | 80 |
| App | 4 | 23 | — | — | 71 |

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.10.8</code>) — App: 1 Critical, 12 High | System: 3 Critical, 48 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.10.8`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-111181` | **HIGH** | `body-parser` | `2.3.0` | `2.4.0, 1.20.9` |
| `GHSA-cg2g-xh64-v4q7` | **CRITICAL** | `dompurify` | `3.4.16` | `3.4.17` |
| `GHSA-mrv2-3pqr-j5jr` | **HIGH** | `dompurify` | `3.4.16` | `3.4.17` |
| `CVE-2026-111758` | **HIGH** | `markdown-it` | `15.0.2` | `14.3.3, 15.0.3` |
| `CVE-2026-109383` | **HIGH** | `undici` | `6.28.0` | `6.29.1, 7.30.1, 8.12.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53615` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-6276` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8286` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>n8n (<code>3.0.0</code>) — App: 0 Critical, 20 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `n8nio/n8n:3.0.0`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-109461` | **HIGH** | `@azure/msal-node` | `5.1.5` | `7.1.0` |
| `CVE-2026-109461` | **HIGH** | `@azure/msal-node` | `5.6.0` | `7.1.0` |
| `GHSA-f897-62hf-6gxq` | **HIGH** | `@modelcontextprotocol/node` | `2.0.0` | `2.1.0` |
| `CVE-2026-111767` | **HIGH** | `@modelcontextprotocol/sdk` | `1.31.0` | `1.32.0` |
| `CVE-2026-111768` | **HIGH** | `@modelcontextprotocol/sdk` | `1.31.0` | `1.32.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-111497` | **HIGH** | `brotli-libs` | `1.2.0-r1` | `1.2.1-r0` |
| `CVE-2026-92392` | **HIGH** | `libcurl` | `8.22.0-r0` | `8.23.0-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 7 | 27 | 70 | 27 | 133 |
| App | 6 | 48 | — | — | 103 |

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.24</code>) — App: 10 Critical, 63 High | System: 19 Critical, 492 High</b></summary>

- **Full Reference:** `nousresearch/hermes-agent:v2026.9.24`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.14.4` | `1.13.6, 1.14.5` |
| `CVE-2026-93749` | **HIGH** | `source-map-js` | `1.2.1` | `1.2.2` |
| `CVE-2026-59873` | **CRITICAL** | `tar` | `7.5.16` | `7.5.19` |
| `CVE-2026-59874` | **HIGH** | `tar` | `7.5.16` | `7.5.18` |
| `CVE-2026-73566` | **HIGH** | `tar` | `7.5.16` | `7.5.21` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53615` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `8.14.1-2+deb13u7` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -17 | -270 | -2372 | -1224 | -3901 |
| App | -2 | -13 | — | — | -60 |

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.4</code>) — App: 0 Critical, 0 High | System: 4 Critical, 39 High</b></summary>

- **Full Reference:** `vaultwarden/server:1.37.4`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `8.14.1-2+deb13u7` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `8.14.1-2+deb13u7` |
| `CVE-2026-92392` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `8.14.1-2+deb13u7` |
| `CVE-2026-54369` | **HIGH** | `libacl1` | `2.3.2-2+b1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -1 | 0 | 0 | -1 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Memos (<code>0.31.0</code>) — App: 1 Critical, 7 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `neosmemo/memos:0.31.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `GHSA-cxf3-9h37-7rr8` | **CRITICAL** | `github.com/labstack/echo/v5` | `v5.3.1` | `5.4.1` |
| `GHSA-9969-6676-49h5` | **HIGH** | `github.com/labstack/echo/v5` | `v5.3.1` | `5.4.1` |
| `CVE-2026-78669` | **HIGH** | `golang.org/x/net` | `v0.58.0` | `0.60.0` |
| `CVE-2026-84445` | **HIGH** | `google.golang.org/grpc` | `v1.83.1` | `1.82.2, 1.83.2, 1.84.0-dev.0.20260825144003-d5a41119e0e3, 1.85.0-dev.0.20260825072537-93e31b48545e` |
| `CVE-2026-111943` | **HIGH** | `stdlib` | `v1.27.0` | `1.26.10, 1.27.3` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-84782` | **HIGH** | `libcrypto3` | `3.3.7-r1` | `3.3.7-r2` |
| `CVE-2026-84782` | **HIGH** | `libssl3` | `3.3.7-r1` | `3.3.7-r2` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -17 | -2 | -23 |
| App | 0 | -6 | — | — | -20 |

</details>

<details>
<summary><b>File Browser (<code>v2.63.23</code>) — App: 0 Critical, 16 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `filebrowser/filebrowser:v2.63.23`
- **Root Status:** ✅ Runs non-root (`user`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-56854` | **HIGH** | `golang.org/x/crypto` | `v0.54.0` | `0.55.0` |
| `CVE-2026-46603` | **HIGH** | `golang.org/x/image` | `v0.44.0` | `0.45.0` |
| `CVE-2026-78669` | **HIGH** | `golang.org/x/net` | `v0.57.0` | `0.60.0` |
| `CVE-2026-56851` | **HIGH** | `golang.org/x/text` | `v0.40.0` | `0.41.0` |
| `CVE-2026-111943` | **HIGH** | `stdlib` | `v1.26.5` | `1.26.10, 1.27.3` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | -16 | — | — | -32 |

</details>

<details>
<summary><b>Stirling-PDF (<code>3.2.2</code>) — App: 6 Critical, 36 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:3.2.2`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-89407` | **HIGH** | `com.fasterxml.jackson.core:jackson-core` | `2.21.5` | `2.18.11, 2.21.7, 2.22.3` |
| `CVE-2026-89425` | **HIGH** | `com.fasterxml.jackson.core:jackson-core` | `2.21.5` | `2.21.7, 2.22.3, 2.18.11` |
| `CVE-2026-68497` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.5` | `2.18.10, 2.21.6, 2.22.2` |
| `CVE-2026-91776` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.5` | `2.18.11, 2.21.7, 2.22.3` |
| `CVE-2026-91777` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.5` | `2.21.7, 2.18.11, 2.22.3` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-84782` | **HIGH** | `libssl3t64` | `3.0.13-0ubuntu3.12` | `3.0.13-0ubuntu3.16` |
| `CVE-2026-84782` | **HIGH** | `openssl` | `3.0.13-0ubuntu3.12` | `3.0.13-0ubuntu3.16` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -99 | -50 | -151 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>PocketBase (<code>0.40.5</code>) — App: 0 Critical, 2 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `ghcr.io/muchobien/pocketbase:0.40.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78669` | **HIGH** | `golang.org/x/net` | `v0.59.0` | `0.60.0` |
| `CVE-2026-111943` | **HIGH** | `stdlib` | `v1.27.2` | `1.26.10, 1.27.3` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | -1 | 0 | -3 |
| App | 0 | -2 | — | — | -6 |

</details>

<details>
<summary><b>Linkding (<code>1.47.0</code>) — App: 2 Critical, 12 High | System: 6 Critical, 303 High</b></summary>

- **Full Reference:** `sissbruecker/linkding:1.47.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-15307` | **HIGH** | `Django` | `6.0.7` | `5.2.17, 6.0.8` |
| `CVE-2026-102268` | **CRITICAL** | `PyJWT` | `2.13.0` | `2.14.0` |
| `CVE-2026-102266` | **HIGH** | `PyJWT` | `2.13.0` | `2.14.0` |
| `CVE-2026-102267` | **HIGH** | `PyJWT` | `2.13.0` | `2.14.0` |
| `CVE-2026-102271` | **HIGH** | `PyJWT` | `2.13.0` | `2.14.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53615` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `8.14.1-2+deb13u7` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -4 | -235 | -1945 | -516 | -2709 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.16.0</code>) — App: 4 Critical, 18 High | System: 4 Critical, 251 High</b></summary>

- **Full Reference:** `jc21/nginx-proxy-manager:2.16.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102990` | **HIGH** | `basic-ftp` | `5.3.1` | `6.2.1` |
| `CVE-2026-111181` | **HIGH** | `body-parser` | `2.3.0` | `2.4.0, 1.20.9` |
| `CVE-2026-90711` | **CRITICAL** | `proxy-addr` | `2.0.7` | `2.0.8` |
| `CVE-2026-59873` | **CRITICAL** | `tar` | `7.5.11` | `7.5.19` |
| `CVE-2026-59874` | **HIGH** | `tar` | `7.5.11` | `7.5.18` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-46729` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `2.4.69-1~deb13u1` |
| `CVE-2026-56153` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `2.4.69-1~deb13u1` |
| `CVE-2026-56154` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `2.4.69-1~deb13u1` |
| `CVE-2026-63292` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `2.4.69-1~deb13u1` |
| `CVE-2026-63686` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `2.4.69-1~deb13u1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -1 | -132 | -1549 | -421 | -2115 |
| App | -3 | -16 | — | — | -51 |

</details>

<details>
<summary><b>Shlink (<code>5.1.8</code>) — App: 0 Critical, 0 High | System: 0 Critical, 3 High</b></summary>

- **Full Reference:** `shlinkio/shlink:5.1.8`
- **Root Status:** ✅ Runs non-root (`1001`)
- **Posture:** 🟢 COMPLIANT

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-111497` | **HIGH** | `brotli-libs` | `1.2.0-r1` | `1.2.1-r0` |
| `CVE-2026-92392` | **HIGH** | `curl` | `8.22.0-r0` | `8.23.0-r0` |
| `CVE-2026-92392` | **HIGH** | `libcurl` | `8.22.0-r0` | `8.23.0-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -1 | 0 | 0 | -1 |
| App | 0 | 1 | — | — | 8 |

</details>

<details>
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) — App: 4 Critical, 16 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.14.4` | `1.13.6, 1.14.5` |
| `CVE-2026-111755` | **HIGH** | `follow-redirects` | `1.16.0` | `1.16.1` |
| `CVE-2026-111756` | **HIGH** | `follow-redirects` | `1.16.0` | `1.16.1` |
| `GHSA-2464-fhr4-w9xw` | **CRITICAL** | `next` | `16.3.3` | `15.5.28, 16.4.1` |
| `GHSA-673q-mjm6-r5xr` | **CRITICAL** | `next` | `16.3.3` | `16.4.1` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -7 | -12 | -21 |
| App | -2 | -9 | — | — | -50 |

</details>

<details>
<summary><b>Dozzle (<code>v11.3.5</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.3.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 1 |

</details>

