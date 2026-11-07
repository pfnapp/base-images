# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-11-07T06:49:39.249Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `17`
- **Active Versions Audited:** `56`
- **Images Running As Root:** `38` / `56` (⚠️ **68%** non-compliant)
- **App Critical CVEs** _(upstream, unfixable by us)_**:** `124`
- **App High CVEs** _(upstream, unfixable by us)_**:** `1025`
- **PFNApp Images Scanned:** `53` / `56`
- **Total System CVE Reduction:** `1301`

> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.4-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ YES | 0/0/1/0 | 0/0/0/0 | 0/0/1/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.3-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 1/6/10/44 | 0/0/0/0 | 0/4/1/0 | 0/0/0/0 | -1/-2 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.2-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 1/13/17/45 | 0/0/0/0 | 1/13/16/45 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.1-php8.3-fpm-alpine` | 🟠 **AGING** | ⚠️ YES | 1/14/10/45 | 0/0/0/0 | 1/14/10/45 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.9` | 🟢 **LATEST** | ⚠️ YES | 11/1011/586/446 | 4/63/110/8 | 6/255/536/440 | 0/5/19/1 | -5/-756 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.8` | 🟢 **SUPPORTED** | ⚠️ YES | 11/1011/586/446 | 4/63/115/8 | 6/295/538/440 | 0/11/29/2 | -5/-716 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.7` | 🟢 **SUPPORTED** | ⚠️ YES | 11/1011/586/446 | 4/65/115/8 | 15/1231/850/572 | 2/59/82/6 | 4/220 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.6` | 🟠 **AGING** | ⚠️ YES | 258/3171/2504/1344 | 6/94/143/11 | 15/1231/850/572 | 2/59/82/6 | -243/-1940 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.5` | 🔴 **EOL SOON** | ⚠️ YES | 258/3171/2504/1344 | 7/96/152/12 | 27/1393/1015/631 | 3/61/87/7 | -231/-1778 | 🔴 APP CRITICAL RISK |
| **9Router** | _AI Gateways & Proxies_ | `0.5.112` | 🟢 **LATEST** | ⚠️ YES | 0/4/1/0 | 0/0/12/1 | 0/0/1/0 | 0/0/0/0 | 0/-4 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `0.5.111` | 🟢 **SUPPORTED** | ⚠️ YES | 0/4/1/0 | 0/6/15/4 | 0/4/1/0 | 4/146/165/17 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.109` | 🟢 **SUPPORTED** | ⚠️ YES | 0/4/1/0 | 0/6/15/4 | 0/4/1/0 | 4/146/165/17 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.104` | 🟠 **AGING** | ⚠️ YES | 0/3/1/0 | 0/6/15/4 | 0/2/1/0 | 4/146/165/17 | 0/-1 | 🟠 APP HIGH RISK |
|  |  | `0.5.95` | 🔴 **EOL SOON** | ⚠️ YES | 0/3/1/0 | 2/7/15/4 | 0/3/1/0 | 2/7/3/3 | 0/0 | 🔴 APP CRITICAL RISK |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.53` | 🟢 **LATEST** | ✅ NO | 0/5/81/64 | 0/0/2/0 | 0/5/81/64 | 0/0/0/0 | 0/0 | 🟢 COMPLIANT |
|  |  | `3.8.52` | 🟢 **SUPPORTED** | ✅ NO | 0/7/81/64 | 2/2/12/2 | 0/7/81/64 | 2/1/3/2 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.51` | 🟢 **SUPPORTED** | ✅ NO | 0/11/111/70 | 3/11/31/7 | 4/24/128/71 | 6/18/47/11 | 4/13 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.50` | 🟠 **AGING** | ✅ NO | 4/24/128/71 | 6/18/47/11 | 4/24/128/71 | 6/18/47/11 | 0/0 | 🔴 APP CRITICAL RISK |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.11.1` | 🟢 **LATEST** | ✅ NO | 1/22/212/222 | 1/4/23/4 | 1/22/212/222 | 1/4/21/4 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.10` | 🟢 **SUPPORTED** | ✅ NO | 1/24/212/222 | 1/4/23/4 | 1/22/212/222 | 1/4/21/4 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.9` | 🟢 **SUPPORTED** | ✅ NO | 1/24/214/222 | 1/5/21/4 | 1/24/214/222 | 1/5/24/6 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.8` | 🟠 **AGING** | ✅ NO | 1/24/214/222 | 1/5/26/6 | 1/24/214/222 | 1/5/24/6 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2026.10.7` | 🔴 **EOL SOON** | ✅ NO | 1/26/222/224 | 1/5/26/6 | 1/26/222/224 | 1/5/24/6 | 0/0 | 🔴 APP CRITICAL RISK |
| **n8n** | _AI Agents & Automation_ | `3.1.0` | 🟢 **LATEST** | ✅ NO | 1/12/2/22 | 0/15/27/5 | 8/41/71/49 | 6/66/77/9 | 7/29 | 🟠 APP HIGH RISK |
|  |  | `3.0.1` | 🟢 **SUPPORTED** | ✅ NO | 1/12/2/22 | 0/18/32/5 | 8/41/71/49 | 6/66/77/9 | 7/29 | 🟠 APP HIGH RISK |
|  |  | `3.0.0` | 🟢 **SUPPORTED** | ✅ NO | 1/12/2/22 | 0/18/32/5 | 8/41/71/49 | 6/66/77/9 | 7/29 | 🟠 APP HIGH RISK |
|  |  | `2.45.4` | 🟠 **AGING** | ✅ NO | 1/12/9/22 | 0/25/47/7 | 8/41/71/49 | 6/66/77/9 | 7/29 | 🟠 APP HIGH RISK |
|  |  | `2.45.3` | 🔴 **EOL SOON** | ✅ NO | 1/12/9/22 | 0/25/47/7 | 8/41/71/49 | 6/66/77/9 | 7/29 | 🟠 APP HIGH RISK |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.24` | 🟢 **LATEST** | ⚠️ YES | 19/502/3029/1588 | 12/61/100/27 | 2/228/518/347 | 8/45/60/10 | -17/-274 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.21` | 🟢 **SUPPORTED** | ⚠️ YES | 19/502/3029/1588 | 12/61/100/27 | 3/243/554/353 | 12/63/103/26 | -16/-259 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.14` | 🟢 **SUPPORTED** | ⚠️ YES | 19/502/3029/1588 | 12/63/103/26 | 3/243/554/353 | 12/63/103/26 | -16/-259 | 🔴 APP CRITICAL RISK |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.5` | 🟢 **LATEST** | ⚠️ YES | 0/7/132/146 | 0/0/0/0 | 0/5/132/146 | 0/0/0/0 | 0/-2 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `1.37.4` | 🟢 **SUPPORTED** | ⚠️ YES | 1/10/134/146 | 0/0/0/0 | 0/7/132/146 | 0/0/0/0 | -1/-3 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `1.37.3` | 🟢 **SUPPORTED** | ⚠️ YES | 4/20/179/153 | 0/0/0/0 | 1/13/164/152 | 0/0/0/0 | -3/-7 | 🟡 NON-COMPLIANT (ROOT) |
| **Memos** | _Knowledge & Notes_ | `26.11` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/1/1/1 | ⏳ | ⏳ | ⏳ | 🟠 APP HIGH RISK |
|  |  | `26.10` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/1/1/1 | ⏳ | ⏳ | ⏳ | 🟠 APP HIGH RISK |
|  |  | `0.31.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/5/16/2 | 1/4/22/2 | 0/0/0/0 | 1/3/9/1 | 0/-5 | 🔴 APP CRITICAL RISK |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ NO | 0/0/0/0 | 0/12/16/2 | 0/0/0/0 | 0/1/1/1 | 0/0 | 🟠 APP HIGH RISK |
| **Stirling-PDF** | _Utilities & Tools_ | `3.3.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/374/56 | 0/0/0/0 | 0/0/374/56 | 0/0/0/0 | 0/-2 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `3.2.2` | 🟢 **SUPPORTED** | ⚠️ YES | 0/5/479/106 | 6/36/19/0 | 0/2/381/56 | 6/36/19/0 | 0/-3 | 🔴 APP CRITICAL RISK |
|  |  | `3.2.1` | 🟢 **SUPPORTED** | ⚠️ YES | 0/5/479/106 | 6/36/19/0 | 0/3/381/56 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `3.2.0` | 🟠 **AGING** | ⚠️ YES | 0/5/479/106 | 6/36/19/0 | 0/3/385/56 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `3.1.0` | 🔴 **EOL SOON** | ⚠️ YES | 0/5/479/106 | 6/36/19/0 | 0/3/416/83 | 6/36/19/0 | 0/-2 | 🔴 APP CRITICAL RISK |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.5` | 🟢 **LATEST** | ⚠️ YES | 0/3/1/0 | 0/1/5/1 | 0/0/1/0 | 0/1/1/1 | 0/-3 | 🟠 APP HIGH RISK |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ YES | 6/298/2763/898 | 2/10/17/1 | 1/79/812/384 | 2/10/17/1 | -5/-219 | 🔴 APP CRITICAL RISK |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.16.0` | 🟢 **LATEST** | ⚠️ YES | 4/254/2559/1481 | 4/9/45/9 | 1/73/530/947 | 1/2/12/4 | -3/-181 | 🔴 APP CRITICAL RISK |
|  |  | `2.15.1` | 🟢 **SUPPORTED** | ⚠️ YES | 17/612/4353/1825 | 4/27/57/10 | 4/254/2559/1481 | 4/27/57/10 | -13/-358 | 🔴 APP CRITICAL RISK |
| **Shlink** | _Networking & Shorteners_ | `5.1.8` | 🟢 **LATEST** | ✅ NO | 1/2/3/44 | 0/1/1/0 | 0/0/1/0 | 0/2/3/5 | -1/-2 | 🟠 APP HIGH RISK |
|  |  | `5.1.7` | 🟢 **SUPPORTED** | ✅ NO | 0/8/24/4 | 3/24/20/6 | 0/7/22/4 | 0/2/3/5 | 0/-1 | 🔴 APP CRITICAL RISK |
|  |  | `5.1.6` | 🟢 **SUPPORTED** | ✅ NO | 0/8/24/4 | 3/25/20/6 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/5/7/12 | 4/15/40/8 | 0/0/1/0 | 2/6/5/1 | 0/-5 | 🔴 APP CRITICAL RISK |
| **Dozzle** | _Operations & Logs_ | `v11.4.1` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/1/1/0 | 0/0/0/0 | 0/1/2/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.4.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/1/1/0 | 0/0/0/0 | 0/1/2/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.3.5` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/1/1/0 | 0/0/0/0 | 0/1/2/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.3.4` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 0/1/1/0 | 0/0/0/0 | 0/1/2/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.3.3` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/0/0 | 0/1/1/0 | 0/0/0/0 | 0/1/2/0 | 0/0 | 🟠 APP HIGH RISK |

---

## 🚫 Deprecated / Dropped from Active Scanning

| Application | Deprecated Version | Dropped On | Advisory to Users |
| :--- | :--- | :---: | :--- |
| **9Router** | `0.5.91` | 2026-10-28 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.112 immediately. |
| **9Router** | `0.5.86` | 2026-10-26 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.111 immediately. |
| **9Router** | `0.5.85` | 2026-10-23 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.109 immediately. |
| **9Router** | `0.5.75` | 2026-10-15 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.104 immediately. |
| **OpenClaw 2** | `2026.10.6` | 2026-11-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.11.1 immediately. |
| **OpenClaw 2** | `2026.10.5` | 2026-11-03 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.10 immediately. |
| **OpenClaw 2** | `2026.10.4` | 2026-10-29 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.9 immediately. |
| **OpenClaw 2** | `2026.10.3` | 2026-10-27 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.8 immediately. |
| **OpenClaw 2** | `2026.10.2` | 2026-10-24 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.7 immediately. |
| **OpenClaw 2** | `2026.10.1` | 2026-10-22 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.6 immediately. |
| **OpenClaw 2** | `2026.9.9` | 2026-10-18 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.5 immediately. |
| **OpenClaw 2** | `2026.9.8` | 2026-10-16 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.4 immediately. |
| **OpenClaw 2** | `2026.9.7` | 2026-10-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.3 immediately. |
| **OpenClaw 2** | `2026.9.6` | 2026-10-12 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.2 immediately. |
| **OpenClaw 2** | `2026.9.5` | 2026-10-11 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.1 immediately. |
| **n8n** | `2.45.2` | 2026-11-03 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.1.0 immediately. |
| **n8n** | `2.45.1` | 2026-10-28 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.0.1 immediately. |
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
| **Stirling-PDF** | `3.0.2` | 2026-11-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.3.0 immediately. |
| **Stirling-PDF** | `3.0.0` | 2026-10-24 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.2 immediately. |
| **Stirling-PDF** | `2.14.3` | 2026-10-21 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.1 immediately. |
| **Dozzle** | `v11.3.2` | 2026-11-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.4.1 immediately. |
| **Dozzle** | `v11.3.1` | 2026-10-30 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.4.0 immediately. |
| **Dozzle** | `v11.3.0` | 2026-10-24 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.5 immediately. |
| **Dozzle** | `v11.2.0` | 2026-10-20 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.4 immediately. |
| **Dozzle** | `v11.1.3` | 2026-10-19 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.3 immediately. |
| **Dozzle** | `v11.1.2` | 2026-10-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.2 immediately. |
| **Dozzle** | `v11.1.1` | 2026-10-10 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.1 immediately. |
| **Dozzle** | `v11.1.0` | 2026-10-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.0 immediately. |

---

## 🔍 Actionable Vulnerability Details per Latest Release

<details>
<summary><b>WordPress (PHP-FPM) (<code>7.1.4-php8.3-fpm-alpine</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `library/wordpress:7.1.4-php8.3-fpm-alpine`
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
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Uptime Kuma (<code>2.5.9</code>) — App: 4 Critical, 63 High | System: 11 Critical, 1011 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.9`
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
| `CVE-2026-109518` | **HIGH** | `apt` | `2.6.1` | `2.6.2` |
| `CVE-2026-118333` | **CRITICAL** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.73-1~deb12u1` |
| `CVE-2026-118337` | **CRITICAL** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.73-1~deb12u1` |
| `CVE-2026-110913` | **HIGH** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.47-1~deb12u1` |
| `CVE-2026-110917` | **HIGH** | `chromium` | `155.0.8059.79-1~deb12u1` | `156.0.8078.47-1~deb12u1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -5 | -756 | -50 | -6 | -893 |
| App | -4 | -58 | — | — | -160 |

</details>

<details>
<summary><b>9Router (<code>0.5.112</code>) — App: 0 Critical, 0 High | System: 0 Critical, 4 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.112`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-113351` | **HIGH** | `libexpat` | `2.9.0-r0` | `2.10.0-r0` |
| `CVE-2026-115506` | **HIGH** | `libexpat` | `2.9.0-r0` | `2.10.0-r0` |
| `CVE-2026-117610` | **HIGH** | `libexpat` | `2.9.0-r0` | `2.10.0-r0` |
| `CVE-2026-118370` | **HIGH** | `libexpat` | `2.9.0-r0` | `2.10.0-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -4 | 0 | 0 | -4 |
| App | 0 | 0 | — | — | -13 |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.53</code>) — App: 0 Critical, 0 High | System: 0 Critical, 5 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.53`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟢 COMPLIANT

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-119373` | **HIGH** | `libsqlite3-0` | `3.46.1-7+deb13u2` | `None` |
| `CVE-2026-119374` | **HIGH** | `libsqlite3-0` | `3.46.1-7+deb13u2` | `None` |
| `CVE-2026-119379` | **HIGH** | `libsqlite3-0` | `3.46.1-7+deb13u2` | `None` |
| `CVE-2026-76844` | **HIGH** | `zlib1g` | `1:1.3.dfsg+really1.3.1-1+b1` | `None` |
| `CVE-2026-85091` | **HIGH** | `zlib1g` | `1:1.3.dfsg+really1.3.1-1+b1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | -2 |

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.11.1</code>) — App: 1 Critical, 4 High | System: 1 Critical, 22 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.11.1`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `GHSA-cg2g-xh64-v4q7` | **CRITICAL** | `dompurify` | `3.4.16` | `3.4.17` |
| `GHSA-mrv2-3pqr-j5jr` | **HIGH** | `dompurify` | `3.4.16` | `3.4.17` |
| `CVE-2026-118772` | **HIGH** | `joi` | `18.2.9` | `17.13.9, 18.3.1` |
| `CVE-2026-111758` | **HIGH** | `markdown-it` | `15.0.2` | `14.3.3, 15.0.3` |
| `CVE-2026-109829` | **HIGH** | `undici` | `8.11.2` | `7.30.1, 8.12.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-113351` | **HIGH** | `libexpat1` | `2.5.0-1+deb12u5` | `None` |
| `CVE-2026-115506` | **HIGH** | `libexpat1` | `2.5.0-1+deb12u5` | `None` |
| `CVE-2026-117610` | **HIGH** | `libexpat1` | `2.5.0-1+deb12u5` | `None` |
| `CVE-2026-118370` | **HIGH** | `libexpat1` | `2.5.0-1+deb12u5` | `None` |
| `CVE-2026-11940` | **HIGH** | `libpython3.11-minimal` | `3.11.2-6+deb12u9` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | -2 |

</details>

<details>
<summary><b>n8n (<code>3.1.0</code>) — App: 0 Critical, 15 High | System: 1 Critical, 12 High</b></summary>

- **Full Reference:** `n8nio/n8n:3.1.0`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-109461` | **HIGH** | `@azure/msal-node` | `5.1.5` | `7.1.0` |
| `CVE-2026-109461` | **HIGH** | `@azure/msal-node` | `5.6.0` | `7.1.0` |
| `CVE-2026-118257` | **HIGH** | `@intlify/core-base` | `11.4.5` | `11.4.14, 12.0.0-alpha.5` |
| `CVE-2026-118257` | **HIGH** | `@intlify/shared` | `11.4.5` | `11.4.14, 12.0.0-alpha.5` |
| `GHSA-f897-62hf-6gxq` | **HIGH** | `@modelcontextprotocol/node` | `2.0.0` | `2.1.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-111497` | **CRITICAL** | `brotli-libs` | `1.2.0-r1` | `1.2.1-r0` |
| `CVE-2026-92392` | **HIGH** | `libcurl` | `8.22.0-r0` | `8.23.0-r0` |
| `CVE-2026-113351` | **HIGH** | `libexpat` | `2.9.0-r1` | `2.10.0-r0` |
| `CVE-2026-115506` | **HIGH** | `libexpat` | `2.9.0-r1` | `2.10.0-r0` |
| `CVE-2026-117610` | **HIGH** | `libexpat` | `2.9.0-r1` | `2.10.0-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 7 | 29 | 69 | 27 | 133 |
| App | 6 | 51 | — | — | 111 |

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.24</code>) — App: 12 Critical, 61 High | System: 19 Critical, 502 High</b></summary>

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
| `CVE-2026-109518` | **HIGH** | `apt` | `3.0.3` | `3.0.4` |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-92392` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `8.14.1-2+deb13u7` |
| `CVE-2026-92542` | **HIGH** | `docker-cli` | `26.1.5+dfsg1-9+deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -17 | -274 | -2511 | -1241 | -4054 |
| App | -4 | -16 | — | — | -77 |

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.5</code>) — App: 0 Critical, 0 High | System: 0 Critical, 7 High</b></summary>

- **Full Reference:** `vaultwarden/server:1.37.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-109518` | **HIGH** | `apt` | `3.0.3` | `3.0.4` |
| `CVE-2026-109518` | **HIGH** | `libapt-pkg7.0` | `3.0.3` | `3.0.4` |
| `CVE-2026-119373` | **HIGH** | `libsqlite3-0` | `3.46.1-7+deb13u2` | `None` |
| `CVE-2026-119374` | **HIGH** | `libsqlite3-0` | `3.46.1-7+deb13u2` | `None` |
| `CVE-2026-119379` | **HIGH** | `libsqlite3-0` | `3.46.1-7+deb13u2` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | 0 | 0 | -2 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Memos (<code>26.11</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `neosmemo/memos:26.11`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78661` | **HIGH** | `golang.org/x/net` | `v0.61.0` | `0.62.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>File Browser (<code>v2.63.23</code>) — App: 0 Critical, 12 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `filebrowser/filebrowser:v2.63.23`
- **Root Status:** ✅ Runs non-root (`user`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-56854` | **HIGH** | `golang.org/x/crypto` | `v0.54.0` | `0.55.0` |
| `CVE-2026-46603` | **HIGH** | `golang.org/x/image` | `v0.44.0` | `0.45.0` |
| `CVE-2026-78661` | **HIGH** | `golang.org/x/net` | `v0.57.0` | `0.62.0` |
| `CVE-2026-56851` | **HIGH** | `golang.org/x/text` | `v0.40.0` | `0.41.0` |
| `CVE-2026-33818` | **HIGH** | `stdlib` | `v1.26.5` | `1.25.13, 1.26.6, 1.27.0-rc.3` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | -11 | — | — | -27 |

</details>

<details>
<summary><b>Stirling-PDF (<code>3.3.0</code>) — App: 0 Critical, 0 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:3.3.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-109518` | **HIGH** | `apt` | `2.8.3` | `2.8.4ubuntu0.1` |
| `CVE-2026-109518` | **HIGH** | `libapt-pkg6.0t64` | `2.8.3` | `2.8.4ubuntu0.1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | 0 | 0 | -2 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>PocketBase (<code>0.40.5</code>) — App: 0 Critical, 1 High | System: 0 Critical, 3 High</b></summary>

- **Full Reference:** `ghcr.io/muchobien/pocketbase:0.40.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78661` | **HIGH** | `golang.org/x/net` | `v0.59.0` | `0.62.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-107891` | **HIGH** | `musl` | `1.2.6-r2` | `1.2.6-r3` |
| `CVE-2026-107891` | **HIGH** | `musl-utils` | `1.2.6-r2` | `1.2.6-r3` |
| `CVE-2026-85091` | **HIGH** | `zlib` | `1.3.2-r0` | `1.3.2-r1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -3 | 0 | 0 | -3 |
| App | 0 | 0 | — | — | -4 |

</details>

<details>
<summary><b>Linkding (<code>1.47.0</code>) — App: 2 Critical, 10 High | System: 6 Critical, 298 High</b></summary>

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
| `CVE-2026-109518` | **HIGH** | `apt` | `3.0.3` | `3.0.4` |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-92392` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `8.14.1-2+deb13u7` |
| `CVE-2026-109518` | **HIGH** | `libapt-pkg7.0` | `3.0.3` | `3.0.4` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -5 | -219 | -1951 | -514 | -2692 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.16.0</code>) — App: 4 Critical, 9 High | System: 4 Critical, 254 High</b></summary>

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
| System | -3 | -181 | -2029 | -534 | -2754 |
| App | -3 | -7 | — | — | -48 |

</details>

<details>
<summary><b>Shlink (<code>5.1.8</code>) — App: 0 Critical, 1 High | System: 1 Critical, 2 High</b></summary>

- **Full Reference:** `shlinkio/shlink:5.1.8`
- **Root Status:** ✅ Runs non-root (`1001`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78661` | **HIGH** | `golang.org/x/net` | `v0.60.0` | `0.62.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-111497` | **CRITICAL** | `brotli-libs` | `1.2.0-r1` | `1.2.1-r0` |
| `CVE-2026-92392` | **HIGH** | `curl` | `8.22.0-r0` | `8.23.0-r0` |
| `CVE-2026-92392` | **HIGH** | `libcurl` | `8.22.0-r0` | `8.23.0-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -1 | -2 | -2 | -44 | -49 |
| App | 0 | 1 | — | — | 8 |

</details>

<details>
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) — App: 4 Critical, 15 High | System: 0 Critical, 5 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.14.4` | `1.13.6, 1.14.5` |
| `CVE-2026-111755` | **HIGH** | `follow-redirects` | `1.16.0` | `1.16.1` |
| `CVE-2026-111756` | **HIGH** | `follow-redirects` | `1.16.0` | `1.16.1` |
| `CVE-2026-116689` | **HIGH** | `follow-redirects` | `1.16.0` | `1.16.2` |
| `GHSA-2464-fhr4-w9xw` | **CRITICAL** | `next` | `16.3.3` | `15.5.28, 16.4.1` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-107891` | **HIGH** | `musl` | `1.2.6-r2` | `1.2.6-r3` |
| `CVE-2026-107891` | **HIGH** | `musl-utils` | `1.2.6-r2` | `1.2.6-r3` |
| `CVE-2026-85091` | **HIGH** | `zlib` | `1.3.2-r0` | `1.3.2-r1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -5 | -6 | -12 | -23 |
| App | -2 | -9 | — | — | -53 |

</details>

<details>
<summary><b>Dozzle (<code>v11.4.1</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.4.1`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78661` | **HIGH** | `golang.org/x/net` | `v0.60.0` | `0.62.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 1 |

</details>

