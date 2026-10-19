# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-10-19T05:43:19.910Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `17`
- **Active Versions Audited:** `46`
- **Images Running As Root:** `31` / `46` (⚠️ **67%** non-compliant)
- **App Critical CVEs** _(upstream, unfixable by us)_**:** `70`
- **App High CVEs** _(upstream, unfixable by us)_**:** `713`
- **PFNApp Images Scanned:** `44` / `46`
- **Total System CVE Reduction:** `1030`

> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.3-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ YES | 0/3/6/1 | 0/0/0/0 | 0/2/5/0 | 0/0/0/0 | 0/-1 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.2-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 0/4/8/1 | 0/0/0/0 | 0/4/7/1 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.1-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 0/5/8/1 | 0/0/0/0 | 0/5/8/1 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.6` | 🟢 **LATEST** | ⚠️ YES | 196/2040/2276/1228 | 6/93/120/11 | 21/389/622/456 | 2/58/63/6 | -175/-1651 | 🔴 APP CRITICAL RISK |
|  |  | `2.5.5` | 🟢 **SUPPORTED** | ⚠️ YES | 196/2040/2276/1228 | 7/95/129/12 | 33/550/787/515 | 3/60/68/7 | -163/-1490 | 🔴 APP CRITICAL RISK |
| **9Router** | _AI Gateways & Proxies_ | `0.5.104` | 🟢 **LATEST** | ⚠️ YES | 0/0/1/0 | 0/1/9/1 | 0/0/0/0 | 0/1/0/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.95` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/1/0 | 0/1/9/1 | 0/0/1/0 | 0/1/0/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.91` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/1/0 | 0/4/13/2 | 0/0/1/0 | 0/4/4/1 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.86` | 🟠 **AGING** | ⚠️ YES | 0/0/1/0 | 1/6/16/2 | 0/0/1/0 | 0/4/4/1 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `0.5.85` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/1/0 | 2/6/16/2 | 0/0/1/0 | 2/6/16/2 | 0/0 | 🔴 APP CRITICAL RISK |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.51` | 🟢 **LATEST** | ✅ NO | 0/11/91/69 | 1/6/17/5 | 4/27/108/70 | 4/14/29/11 | 4/16 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.50` | 🟢 **SUPPORTED** | ✅ NO | 4/27/108/70 | 4/14/29/11 | 4/27/108/70 | 4/14/29/11 | 0/0 | 🔴 APP CRITICAL RISK |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.10.5` | 🟢 **LATEST** | ✅ NO | 3/51/194/218 | 0/1/7/2 | 3/51/194/218 | 0/1/7/2 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.10.4` | 🟢 **SUPPORTED** | ✅ NO | 3/51/194/218 | 0/23/30/4 | 15/94/253/231 | 0/24/20/6 | 12/43 | 🟠 APP HIGH RISK |
|  |  | `2026.10.3` | 🟢 **SUPPORTED** | ✅ NO | 3/51/194/218 | 0/23/30/4 | 15/94/253/231 | 0/24/20/6 | 12/43 | 🟠 APP HIGH RISK |
|  |  | `2026.10.2` | 🟠 **AGING** | ✅ NO | 3/51/194/218 | 0/23/30/4 | 15/94/253/231 | 0/24/20/6 | 12/43 | 🟠 APP HIGH RISK |
|  |  | `2026.10.1` | 🔴 **EOL SOON** | ✅ NO | 3/51/194/218 | 0/23/30/4 | 15/94/253/231 | 0/24/20/6 | 12/43 | 🟠 APP HIGH RISK |
| **n8n** | _AI Agents & Automation_ | `2.44.3` | 🟢 **LATEST** | ✅ NO | 0/2/2/0 | 4/8/29/1 | 7/27/64/26 | 6/41/49/3 | 7/25 | 🔴 APP CRITICAL RISK |
|  |  | `2.44.2` | 🟢 **SUPPORTED** | ✅ NO | 0/2/2/0 | 4/8/29/1 | 7/27/64/26 | 6/41/49/3 | 7/25 | 🔴 APP CRITICAL RISK |
|  |  | `2.44.1` | 🟢 **SUPPORTED** | ✅ NO | 0/2/2/0 | 4/8/29/1 | 7/27/64/26 | 6/41/49/3 | 7/25 | 🔴 APP CRITICAL RISK |
|  |  | `2.44.0` | 🟠 **AGING** | ✅ NO | 0/2/2/0 | 4/8/29/1 | 7/27/64/26 | 6/41/49/3 | 7/25 | 🔴 APP CRITICAL RISK |
|  |  | `2.43.4` | 🔴 **EOL SOON** | ✅ NO | 7/27/64/26 | 6/41/49/3 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.24` | 🟢 **LATEST** | ⚠️ YES | 18/464/2496/1376 | 3/22/54/18 | 2/241/475/344 | 1/12/23/5 | -16/-223 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.21` | 🟢 **SUPPORTED** | ⚠️ YES | 18/464/2496/1376 | 3/22/54/18 | 2/241/475/344 | 3/24/57/18 | -16/-223 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.14` | 🟢 **SUPPORTED** | ⚠️ YES | 18/464/2496/1376 | 3/24/57/18 | 2/241/475/344 | 3/24/57/18 | -16/-223 | 🔴 APP CRITICAL RISK |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.4` | 🟢 **LATEST** | ⚠️ YES | 4/34/119/144 | 0/0/0/0 | 4/33/119/144 | 0/0/0/0 | 0/-1 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `1.37.3` | 🟢 **SUPPORTED** | ⚠️ YES | 7/47/164/151 | 0/0/0/0 | 4/37/149/150 | 0/0/0/0 | -3/-10 | 🟡 NON-COMPLIANT (ROOT) |
| **Memos** | _Knowledge & Notes_ | `0.31.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/17/2 | 0/5/13/2 | 0/0/0/0 | 0/0/0/1 | 0/-2 | 🟠 APP HIGH RISK |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ NO | 0/0/0/0 | 0/15/15/2 | 0/0/0/0 | 0/0/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **Stirling-PDF** | _Utilities & Tools_ | `3.2.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/476/107 | 0/12/6/0 | 0/0/381/84 | 0/12/6/0 | 0/-2 | 🟠 APP HIGH RISK |
|  |  | `3.1.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/476/107 | 0/12/6/0 | 0/0/412/84 | 0/12/6/0 | 0/-2 | 🟠 APP HIGH RISK |
|  |  | `3.0.2` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/489/107 | 0/12/6/0 | 0/0/412/84 | 0/12/6/0 | 0/-2 | 🟠 APP HIGH RISK |
|  |  | `3.0.0` | 🟠 **AGING** | ⚠️ YES | 0/2/489/107 | 0/12/6/0 | 0/2/413/94 | 0/12/6/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2.14.3` | 🔴 **EOL SOON** | ⚠️ YES | 0/4/816/168 | 4/68/66/6 | 0/2/436/94 | 4/68/66/6 | 0/-2 | 🔴 APP CRITICAL RISK |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.5` | 🟢 **LATEST** | ⚠️ YES | 0/0/1/0 | 0/1/4/1 | 0/0/0/0 | 0/0/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ YES | 5/278/2354/687 | 1/8/17/1 | 2/159/1946/604 | 1/8/17/1 | -3/-119 | 🔴 APP CRITICAL RISK |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.16.0` | 🟢 **LATEST** | ⚠️ YES | 3/223/2072/1276 | 2/8/21/2 | 3/114/780/1005 | 0/0/0/0 | 0/-109 | 🔴 APP CRITICAL RISK |
|  |  | `2.15.1` | 🟢 **SUPPORTED** | ⚠️ YES | 17/607/3878/1597 | 3/27/42/5 | 3/223/2072/1276 | 3/27/42/5 | -14/-384 | 🔴 APP CRITICAL RISK |
| **Shlink** | _Networking & Shorteners_ | `5.1.7` | 🟢 **LATEST** | ✅ NO | 0/11/23/4 | 3/26/19/6 | 0/10/21/4 | 0/0/2/5 | 0/-1 | 🔴 APP CRITICAL RISK |
|  |  | `5.1.6` | 🟢 **SUPPORTED** | ✅ NO | 0/11/23/4 | 3/26/19/6 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/7/12 | 2/8/26/6 | 0/0/0/0 | 0/0/0/0 | 0/-2 | 🔴 APP CRITICAL RISK |
| **Dozzle** | _Operations & Logs_ | `v11.3.2` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.3.1` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/1/4/0 | 0/0/0/0 | 0/1/4/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.3.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/4/13/1 | 0/0/0/0 | 0/1/4/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.2.0` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 0/4/13/1 | 0/0/0/0 | 0/4/13/1 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.1.3` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/0/0 | 0/4/13/1 | 0/0/0/0 | 0/4/13/1 | 0/0 | 🟠 APP HIGH RISK |

---

## 🚫 Deprecated / Dropped from Active Scanning

| Application | Deprecated Version | Dropped On | Advisory to Users |
| :--- | :--- | :---: | :--- |
| **9Router** | `0.5.75` | 2026-10-15 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 0.5.104 immediately. |
| **OpenClaw 2** | `2026.9.9` | 2026-10-18 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.5 immediately. |
| **OpenClaw 2** | `2026.9.8` | 2026-10-16 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.4 immediately. |
| **OpenClaw 2** | `2026.9.7` | 2026-10-13 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.3 immediately. |
| **OpenClaw 2** | `2026.9.6` | 2026-10-12 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.2 immediately. |
| **OpenClaw 2** | `2026.9.5` | 2026-10-11 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2026.10.1 immediately. |
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
| `CVE-2026-77214` | **HIGH** | `libexpat` | `2.8.5-r0` | `2.9.0-r0` |
| `CVE-2026-88806` | **HIGH** | `libx11` | `1.8.13-r0` | `1.8.14-r0` |
| `CVE-2026-4775` | **HIGH** | `tiff` | `4.7.1-r0` | `4.7.2-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -1 | -1 | -1 | -3 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Uptime Kuma (<code>2.5.6</code>) — App: 6 Critical, 93 High | System: 196 Critical, 2040 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.6`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.13.6, 1.14.5` |
| `CVE-2026-48068` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-48069` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-101909` | **HIGH** | `axios` | `0.32.0` | `0.34.0, 1.20.0` |
| `CVE-2026-67320` | **HIGH** | `axios` | `0.32.0` | `0.33.0, 1.18.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53615` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-106195` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `155.0.8059.39-1~deb12u1` |
| `CVE-2026-106237` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `155.0.8059.39-1~deb12u1` |
| `CVE-2026-10931` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10966` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -175 | -1651 | -1654 | -772 | -5216 |
| App | -4 | -35 | — | — | -101 |

</details>

<details>
<summary><b>9Router (<code>0.5.104</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.104`
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
| System | 0 | 0 | -1 | 0 | -1 |
| App | 0 | 0 | — | — | -10 |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.51</code>) — App: 1 Critical, 6 High | System: 0 Critical, 11 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.51`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-104850` | **HIGH** | `@modelcontextprotocol/sdk` | `1.30.0` | `1.31.0` |
| `GHSA-vcvr-r3jv-pc5j` | **CRITICAL** | `next` | `16.3.5` | `16.3.6` |
| `CVE-2026-94483` | **HIGH** | `next` | `16.3.5` | `16.3.8` |
| `GHSA-wq5f-xc86-pv6w` | **HIGH** | `sharp` | `0.35.4` | `0.35.5` |
| `CVE-2026-93749` | **HIGH** | `source-map-js` | `1.2.1` | `1.2.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-54369` | **HIGH** | `libacl1` | `2.3.2-2+b1` | `None` |
| `CVE-2026-103111` | **HIGH** | `libpcre2-8-0` | `10.46-1~deb13u2` | `10.46-1~deb13u3` |
| `CVE-2026-84782` | **HIGH** | `libssl3t64` | `3.5.7-1~deb13u2` | `3.5.7-1~deb13u3` |
| `CVE-2026-16742` | **HIGH** | `libsystemd0` | `257.13-1~deb13u1` | `None` |
| `CVE-2025-69720` | **HIGH** | `libtinfo6` | `6.5+20250216-2` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 4 | 16 | 17 | 1 | 38 |
| App | 3 | 8 | — | — | 29 |

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.10.5</code>) — App: 0 Critical, 1 High | System: 3 Critical, 51 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.10.5`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-93687` | **HIGH** | `braces` | `3.0.3` | `None` |

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
<summary><b>n8n (<code>2.44.3</code>) — App: 4 Critical, 8 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `n8nio/n8n:2.44.3`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102829` | **CRITICAL** | `@simple-git/argv-parser` | `1.1.1` | `2.0.1` |
| `CVE-2026-93687` | **HIGH** | `braces` | `3.0.3` | `None` |
| `CVE-2026-106445` | **CRITICAL** | `handlebars` | `4.7.9` | `4.7.10` |
| `CVE-2026-106446` | **CRITICAL** | `handlebars` | `4.7.9` | `4.7.10` |
| `CVE-2026-82659` | **HIGH** | `nodemailer` | `8.0.10` | `9.0.1` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-77214` | **HIGH** | `libexpat` | `2.8.5-r0` | `2.9.0-r0` |
| `CVE-2026-4775` | **HIGH** | `tiff` | `4.7.1-r0` | `4.7.2-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 7 | 25 | 62 | 26 | 121 |
| App | 2 | 33 | — | — | 57 |

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.24</code>) — App: 3 Critical, 22 High | System: 18 Critical, 464 High</b></summary>

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
| System | -16 | -223 | -2021 | -1032 | -3641 |
| App | -2 | -10 | — | — | -56 |

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.4</code>) — App: 0 Critical, 0 High | System: 4 Critical, 34 High</b></summary>

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
<summary><b>Memos (<code>0.31.0</code>) — App: 0 Critical, 5 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `neosmemo/memos:0.31.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78669` | **HIGH** | `golang.org/x/net` | `v0.58.0` | `0.60.0` |
| `CVE-2026-84445` | **HIGH** | `google.golang.org/grpc` | `v1.83.1` | `1.82.2, 1.83.2, 1.84.0-dev.0.20260825144003-d5a41119e0e3, 1.85.0-dev.0.20260825072537-93e31b48545e` |
| `CVE-2026-78667` | **HIGH** | `stdlib` | `v1.27.0` | `1.26.9, 1.27.2` |
| `CVE-2026-78669` | **HIGH** | `stdlib` | `v1.27.0` | `1.26.9, 1.27.2` |
| `CVE-2026-97031` | **HIGH** | `stdlib` | `v1.27.0` | `1.26.9, 1.27.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-84782` | **HIGH** | `libcrypto3` | `3.3.7-r1` | `3.3.7-r2` |
| `CVE-2026-84782` | **HIGH** | `libssl3` | `3.3.7-r1` | `3.3.7-r2` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -17 | -2 | -21 |
| App | 0 | -5 | — | — | -19 |

</details>

<details>
<summary><b>File Browser (<code>v2.63.23</code>) — App: 0 Critical, 15 High | System: 0 Critical, 0 High</b></summary>

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
| `CVE-2026-33818` | **HIGH** | `stdlib` | `v1.26.5` | `1.25.13, 1.26.6, 1.27.0-rc.3` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | -15 | — | — | -31 |

</details>

<details>
<summary><b>Stirling-PDF (<code>3.2.0</code>) — App: 0 Critical, 12 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:3.2.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

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
| System | 0 | -2 | -95 | -23 | -120 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>PocketBase (<code>0.40.5</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `ghcr.io/muchobien/pocketbase:0.40.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-78669` | **HIGH** | `golang.org/x/net` | `v0.59.0` | `0.60.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | -1 | 0 | -1 |
| App | 0 | -1 | — | — | -5 |

</details>

<details>
<summary><b>Linkding (<code>1.47.0</code>) — App: 1 Critical, 8 High | System: 5 Critical, 278 High</b></summary>

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
| System | -3 | -119 | -408 | -83 | -613 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.16.0</code>) — App: 2 Critical, 8 High | System: 3 Critical, 223 High</b></summary>

- **Full Reference:** `jc21/nginx-proxy-manager:2.16.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102990` | **HIGH** | `basic-ftp` | `5.3.1` | `6.2.1` |
| `CVE-2026-90711` | **CRITICAL** | `proxy-addr` | `2.0.7` | `2.0.8` |
| `CVE-2026-59873` | **CRITICAL** | `tar` | `7.5.11` | `7.5.19` |
| `CVE-2026-59874` | **HIGH** | `tar` | `7.5.11` | `7.5.18` |
| `CVE-2026-73566` | **HIGH** | `tar` | `7.5.11` | `7.5.21` |

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
| System | 0 | -109 | -1292 | -271 | -1980 |
| App | -2 | -8 | — | — | -33 |

</details>

<details>
<summary><b>Shlink (<code>5.1.7</code>) — App: 3 Critical, 26 High | System: 0 Critical, 11 High</b></summary>

- **Full Reference:** `shlinkio/shlink:5.1.7`
- **Root Status:** ✅ Runs non-root (`1001`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-77405` | **CRITICAL** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |
| `CVE-2026-77408` | **CRITICAL** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |
| `CVE-2026-77411` | **CRITICAL** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |
| `CVE-2026-77403` | **HIGH** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |
| `CVE-2026-77404` | **HIGH** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-33630` | **HIGH** | `c-ares` | `1.34.6-r0` | `1.34.8-r0` |
| `CVE-2026-5773` | **HIGH** | `curl` | `8.14.1-r2` | `8.14.1-r4` |
| `CVE-2026-6276` | **HIGH** | `curl` | `8.14.1-r2` | `8.14.1-r4` |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-r2` | `8.14.1-r4` |
| `CVE-2026-8927` | **HIGH** | `curl` | `8.14.1-r2` | `8.14.1-r4` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -1 | -2 | 0 | -3 |
| App | -3 | -26 | — | — | -47 |

</details>

<details>
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) — App: 2 Critical, 8 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.14.4` | `1.13.6, 1.14.5` |
| `GHSA-vcvr-r3jv-pc5j` | **CRITICAL** | `next` | `16.3.3` | `16.3.6` |
| `CVE-2026-94483` | **HIGH** | `next` | `16.3.3` | `16.3.8` |
| `GHSA-wq5f-xc86-pv6w` | **HIGH** | `sharp` | `0.35.4` | `0.35.5` |
| `CVE-2026-93749` | **HIGH** | `source-map-js` | `1.2.1` | `1.2.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -7 | -12 | -21 |
| App | -2 | -8 | — | — | -42 |

</details>

<details>
<summary><b>Dozzle (<code>v11.3.2</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.3.2`
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

