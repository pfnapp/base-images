# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-11-20T08:04:22.448Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `17`
- **Active Versions Audited:** `60`
- **Images Running As Root:** `44` / `60` (⚠️ **73%** non-compliant)
- **App Critical CVEs** _(upstream, unfixable by us)_**:** `92`
- **App High CVEs** _(upstream, unfixable by us)_**:** `783`
- **PFNApp Images Scanned:** `44` / `60`
- **Total System CVE Reduction:** `168`

> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.4-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ YES | 0/0/15/0 | 0/0/0/0 | 0/0/15/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.3-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 1/6/25/44 | 0/0/0/0 | 0/4/16/0 | 0/0/0/0 | -1/-2 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.2-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 1/13/32/45 | 0/0/0/0 | 1/13/31/45 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.1-php8.3-fpm-alpine` | 🟠 **AGING** | ⚠️ YES | 1/14/25/45 | 0/0/0/0 | 1/14/25/45 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.12` | 🟢 **LATEST** | ⚠️ YES | 6/603/704/559 | 6/58/109/9 | 6/603/704/559 | 0/1/7/2 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.11` | 🟢 **SUPPORTED** | ⚠️ YES | 6/603/704/559 | 6/61/110/9 | 6/603/704/559 | 0/1/7/2 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.10` | 🟢 **SUPPORTED** | ⚠️ YES | 6/603/704/559 | 4/63/109/9 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
|  |  | `2.5.9` | 🟠 **AGING** | ⚠️ YES | 11/1381/768/565 | 4/65/112/9 | 6/603/704/559 | 0/2/9/2 | -5/-778 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.8` | 🔴 **EOL SOON** | ⚠️ YES | 11/1381/768/565 | 4/65/117/9 | 6/665/720/559 | 0/13/31/3 | -5/-716 | 🔴 APP CRITICAL RISK |
| **9Router** | _AI Gateways & Proxies_ | `0.5.119` | 🟢 **LATEST** | ⚠️ YES | 0/0/11/0 | 0/0/12/1 | 0/0/10/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `0.5.116` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/11/0 | 0/0/12/1 | 0/0/10/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `0.5.112` | 🟢 **SUPPORTED** | ⚠️ YES | 0/4/11/0 | 0/0/22/2 | 0/0/11/0 | 0/0/10/1 | 0/-4 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `0.5.111` | 🟠 **AGING** | ⚠️ YES | 0/4/11/0 | 0/8/26/7 | 0/4/11/0 | 4/151/178/20 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.109` | 🔴 **EOL SOON** | ⚠️ YES | 0/4/11/0 | 0/8/26/7 | 0/4/11/0 | 4/151/178/20 | 0/0 | 🟠 APP HIGH RISK |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.54` | 🟢 **LATEST** | ✅ NO | 0/3/116/70 | 0/0/9/0 | 0/3/116/70 | 0/0/7/0 | 0/0 | 🟢 COMPLIANT |
|  |  | `3.8.53` | 🟢 **SUPPORTED** | ✅ NO | 0/4/117/70 | 0/0/9/0 | 0/3/116/70 | 0/0/7/0 | 0/-1 | 🟢 COMPLIANT |
|  |  | `3.8.52` | 🟢 **SUPPORTED** | ✅ NO | 0/6/117/70 | 2/2/18/2 | 0/6/117/70 | 2/1/9/2 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.51` | 🟠 **AGING** | ✅ NO | 0/10/147/76 | 3/11/37/7 | 4/23/164/77 | 6/18/53/11 | 4/13 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.50` | 🔴 **EOL SOON** | ✅ NO | 4/23/164/77 | 6/18/53/11 | 4/23/164/77 | 6/18/53/11 | 0/0 | 🔴 APP CRITICAL RISK |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.11.6` | 🟢 **LATEST** | ✅ NO | 1/94/249/220 | 0/2/25/3 | 1/94/249/220 | 0/2/23/3 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.11.5` | 🟢 **SUPPORTED** | ✅ NO | 1/94/249/220 | 0/2/25/3 | 1/94/249/220 | 0/2/23/3 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.11.4` | 🟢 **SUPPORTED** | ✅ NO | 1/83/246/230 | 0/3/29/5 | 1/83/246/230 | 0/3/27/8 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.11.3` | 🟠 **AGING** | ✅ NO | 1/83/246/230 | 0/3/29/8 | 1/83/246/230 | 0/3/27/8 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.11.2` | 🔴 **EOL SOON** | ✅ NO | 1/83/246/230 | 0/3/29/8 | 1/83/246/230 | 0/3/27/8 | 0/0 | 🟠 APP HIGH RISK |
| **n8n** | _AI Agents & Automation_ | `3.3.0` | 🟢 **LATEST** | ✅ NO | 0/0/10/0 | 0/1/26/3 | 0/0/10/0 | 0/1/23/3 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `3.2.2` | 🟢 **SUPPORTED** | ✅ NO | 0/0/10/0 | 0/3/26/3 | 0/0/10/0 | 0/1/23/3 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `3.2.0` | 🟢 **SUPPORTED** | ✅ NO | 8/5/12/22 | 0/14/31/7 | 8/5/12/22 | 0/14/31/7 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `3.1.0` | 🟠 **AGING** | ✅ NO | 8/5/12/22 | 0/15/33/7 | 8/5/12/22 | 0/15/33/7 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `3.0.1` | 🔴 **EOL SOON** | ✅ NO | 8/5/12/22 | 0/18/38/7 | 15/34/81/49 | 6/66/83/11 | 7/29 | 🟠 APP HIGH RISK |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.24` | 🟢 **LATEST** | ⚠️ YES | 19/641/3226/1610 | 12/71/103/28 | 2/359/643/359 | 7/60/56/10 | -17/-282 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.21` | 🟢 **SUPPORTED** | ⚠️ YES | 19/641/3226/1610 | 12/71/103/28 | 3/375/680/365 | 12/73/106/27 | -16/-266 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.14` | 🟢 **SUPPORTED** | ⚠️ YES | 19/641/3226/1610 | 12/73/106/27 | 3/375/680/365 | 12/73/106/27 | -16/-266 | 🔴 APP CRITICAL RISK |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.5` | 🟢 **LATEST** | ⚠️ YES | 0/98/192/155 | 0/0/0/0 | 0/61/180/153 | 0/0/0/0 | 0/-37 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `1.37.4` | 🟢 **SUPPORTED** | ⚠️ YES | 1/101/194/155 | 0/0/0/0 | 0/98/192/155 | 0/0/0/0 | -1/-3 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `1.37.3` | 🟢 **SUPPORTED** | ⚠️ YES | 4/111/239/162 | 0/0/0/0 | 1/104/224/161 | 0/0/0/0 | -3/-7 | 🟡 NON-COMPLIANT (ROOT) |
| **Memos** | _Knowledge & Notes_ | `26.11.1` | 🟢 **LATEST** | ⚠️ YES | 0/0/1/0 | 0/0/1/1 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `26.11` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/1/0 | 0/0/1/1 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `26.10` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/1/0 | 0/2/2/1 | ⏳ | ⏳ | ⏳ | 🟠 APP HIGH RISK |
|  |  | `0.31.0` | 🟠 **AGING** | ⚠️ YES | 0/5/17/2 | 1/5/23/2 | 0/0/1/0 | 1/4/10/1 | 0/-5 | 🔴 APP CRITICAL RISK |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ NO | 0/0/0/0 | 0/13/16/2 | 0/0/0/0 | 0/1/1/1 | 0/0 | 🟠 APP HIGH RISK |
| **Stirling-PDF** | _Utilities & Tools_ | `3.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/448/60 | 0/0/1/0 | 0/0/424/60 | 0/0/1/0 | 0/-2 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `3.3.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/448/60 | 0/0/1/0 | 0/0/428/60 | 0/0/1/0 | 0/-2 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `3.2.2` | 🟢 **SUPPORTED** | ⚠️ YES | 0/5/553/110 | 6/37/21/0 | 0/2/455/60 | 6/37/21/0 | 0/-3 | 🔴 APP CRITICAL RISK |
|  |  | `3.2.1` | 🟠 **AGING** | ⚠️ YES | 0/5/553/110 | 6/37/21/0 | 0/3/455/60 | 6/37/21/0 | 0/-2 | 🔴 APP CRITICAL RISK |
|  |  | `3.2.0` | 🔴 **EOL SOON** | ⚠️ YES | 0/5/553/110 | 6/37/21/0 | 0/3/459/60 | 6/37/21/0 | 0/-2 | 🔴 APP CRITICAL RISK |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.5` | 🟢 **LATEST** | ⚠️ YES | 0/3/11/0 | 0/2/5/1 | 0/0/10/0 | 0/0/0/1 | 0/-3 | 🟠 APP HIGH RISK |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ YES | 6/442/2897/905 | 2/12/19/1 | 1/220/944/395 | 2/12/19/1 | -5/-222 | 🔴 APP CRITICAL RISK |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.17.1` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `2.17.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `2.16.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `2.15.1` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
| **Shlink** | _Networking & Shorteners_ | `5.1.8` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `5.1.7` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `5.1.6` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
| **Dozzle** | _Operations & Logs_ | `v11.5.0` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.4.3` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.4.2` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.4.1` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.4.0` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/2/3/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |

---

## 🚫 Deprecated / Dropped from Active Scanning

| Application | Deprecated Version | Dropped On | Advisory to Users |
| :--- | :--- | :---: | :--- |
| **Uptime Kuma** | `2.5.7` | 2026-11-17 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.5.12 immediately. |
| **Uptime Kuma** | `2.5.6` | 2026-11-12 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.5.11 immediately. |
| **Uptime Kuma** | `2.5.5` | 2026-11-12 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.5.10 immediately. |
| **9Router** | `0.5.104` | 2026-11-16 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.119 immediately. |
| **9Router** | `0.5.95` | 2026-11-09 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.116 immediately. |
| **9Router** | `0.5.91` | 2026-10-28 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.112 immediately. |
| **9Router** | `0.5.86` | 2026-10-26 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.111 immediately. |
| **9Router** | `0.5.85` | 2026-10-23 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.109 immediately. |
| **9Router** | `0.5.75` | 2026-10-15 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.104 immediately. |
| **OpenClaw 2** | `2026.11.1` | 2026-11-19 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.11.6 immediately. |
| **OpenClaw 2** | `2026.10.10` | 2026-11-17 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.11.5 immediately. |
| **OpenClaw 2** | `2026.10.9` | 2026-11-16 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.11.4 immediately. |
| **OpenClaw 2** | `2026.10.8` | 2026-11-10 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.11.3 immediately. |
| **OpenClaw 2** | `2026.10.7` | 2026-11-08 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.11.2 immediately. |
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
| **n8n** | `3.0.0` | 2026-11-17 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.3.0 immediately. |
| **n8n** | `2.45.4` | 2026-11-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.2 immediately. |
| **n8n** | `2.45.3` | 2026-11-10 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.0 immediately. |
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
| **Stirling-PDF** | `3.1.0` | 2026-11-19 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.4.0 immediately. |
| **Stirling-PDF** | `3.0.2` | 2026-11-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.3.0 immediately. |
| **Stirling-PDF** | `3.0.0` | 2026-10-24 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.2 immediately. |
| **Stirling-PDF** | `2.14.3` | 2026-10-21 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 3.2.1 immediately. |
| **Dozzle** | `v11.3.5` | 2026-11-19 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.5.0 immediately. |
| **Dozzle** | `v11.3.4` | 2026-11-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.4.3 immediately. |
| **Dozzle** | `v11.3.3` | 2026-11-08 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.4.2 immediately. |
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
<summary><b>Uptime Kuma (<code>2.5.12</code>) — App: 6 Critical, 58 High | System: 6 Critical, 603 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.12`
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
| `CVE-2026-121032` | **HIGH** | `chromium` | `156.0.8078.79-1~deb12u1` | `None` |
| `CVE-2026-121034` | **HIGH** | `chromium` | `156.0.8078.79-1~deb12u1` | `None` |
| `CVE-2026-121035` | **HIGH** | `chromium` | `156.0.8078.79-1~deb12u1` | `None` |
| `CVE-2026-121036` | **HIGH** | `chromium` | `156.0.8078.79-1~deb12u1` | `None` |
| `CVE-2026-121037` | **HIGH** | `chromium` | `156.0.8078.79-1~deb12u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | -6 | -57 | — | — | -172 |

</details>

<details>
<summary><b>9Router (<code>0.5.119</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.119`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | -1 | 0 | -21 |
| App | 0 | 0 | — | — | -13 |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.54</code>) — App: 0 Critical, 0 High | System: 0 Critical, 3 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.54`
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

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | -2 |

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.11.6</code>) — App: 0 Critical, 2 High | System: 1 Critical, 94 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.11.6`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-118772` | **HIGH** | `joi` | `18.2.9` | `17.13.9, 18.3.1` |
| `CVE-2026-109829` | **HIGH** | `undici` | `8.11.2` | `7.30.1, 8.12.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-105437` | **HIGH** | `git` | `1:2.47.3-0+deb13u1` | `None` |
| `CVE-2026-111760` | **HIGH** | `git` | `1:2.47.3-0+deb13u1` | `None` |
| `CVE-2026-114466` | **HIGH** | `git` | `1:2.47.3-0+deb13u1` | `None` |
| `CVE-2026-105437` | **HIGH** | `git-man` | `1:2.47.3-0+deb13u1` | `None` |
| `CVE-2026-111760` | **HIGH** | `git-man` | `1:2.47.3-0+deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | -2 |

</details>

<details>
<summary><b>n8n (<code>3.3.0</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `n8nio/n8n:3.3.0`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-111759` | **HIGH** | `markdown-it` | `13.0.2` | `15.0.2, 14.3.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | -3 |

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.24</code>) — App: 12 Critical, 71 High | System: 19 Critical, 641 High</b></summary>

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
| `CVE-2026-92543` | **HIGH** | `docker-cli` | `26.1.5+dfsg1-9+deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -17 | -282 | -2583 | -1251 | -4360 |
| App | -5 | -11 | — | — | -81 |

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.5</code>) — App: 0 Critical, 0 High | System: 0 Critical, 98 High</b></summary>

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
| `CVE-2026-107364` | **HIGH** | `libgssapi-krb5-2` | `1.21.3-5+deb13u1` | `None` |
| `CVE-2026-112315` | **HIGH** | `libgssapi-krb5-2` | `1.21.3-5+deb13u1` | `None` |
| `CVE-2026-112316` | **HIGH** | `libgssapi-krb5-2` | `1.21.3-5+deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -37 | -12 | -2 | -51 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Memos (<code>26.11.1</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `neosmemo/memos:26.11.1`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>File Browser (<code>v2.63.23</code>) — App: 0 Critical, 13 High | System: 0 Critical, 0 High</b></summary>

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
| App | 0 | -12 | — | — | -28 |

</details>

<details>
<summary><b>Stirling-PDF (<code>3.4.0</code>) — App: 0 Critical, 0 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:3.4.0`
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
| System | 0 | -2 | -24 | 0 | -26 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>PocketBase (<code>0.40.5</code>) — App: 0 Critical, 2 High | System: 0 Critical, 3 High</b></summary>

- **Full Reference:** `ghcr.io/muchobien/pocketbase:0.40.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78661` | **HIGH** | `golang.org/x/net` | `v0.59.0` | `0.62.0` |
| `CVE-2026-97054` | **HIGH** | `stdlib` | `v1.27.2` | `1.26.11, 1.27.4` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-107891` | **HIGH** | `musl` | `1.2.6-r2` | `1.2.6-r3` |
| `CVE-2026-107891` | **HIGH** | `musl-utils` | `1.2.6-r2` | `1.2.6-r3` |
| `CVE-2026-85091` | **HIGH** | `zlib` | `1.3.2-r0` | `1.3.2-r1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -3 | -1 | 0 | -4 |
| App | 0 | -2 | — | — | -7 |

</details>

<details>
<summary><b>Linkding (<code>1.47.0</code>) — App: 2 Critical, 12 High | System: 6 Critical, 442 High</b></summary>

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
| `CVE-2026-107364` | **HIGH** | `krb5-locales` | `1.21.3-5+deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -5 | -222 | -1953 | -510 | -2693 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.17.1</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `jc21/nginx-proxy-manager:2.17.1`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>Shlink (<code>5.1.8</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `shlinkio/shlink:5.1.8`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>Dozzle (<code>v11.5.0</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.5.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

