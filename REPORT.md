# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-09-30T06:17:47.137Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `17`
- **Active Versions Audited:** `35`
- **Images Running As Root:** `23` / `35` (⚠️ **66%** non-compliant)
- **App Critical CVEs** _(upstream, unfixable by us)_**:** `34`
- **App High CVEs** _(upstream, unfixable by us)_**:** `531`
- **PFNApp Images Scanned:** `29` / `35`
- **Total System CVE Reduction:** `0`

> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.2-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.1-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 0/1/0/0 | 0/0/0/0 | 0/1/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.5` | 🟢 **LATEST** | ⚠️ YES | 191/1597/1845/1025 | 6/90/105/9 | 28/157/394/320 | 2/54/45/4 | -163/-1440 | 🔴 APP CRITICAL RISK |
| **9Router** | _AI Gateways & Proxies_ | `0.5.91` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/2/8/1 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.86` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 1/4/11/1 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `0.5.85` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 1/4/11/1 | 0/0/0/0 | 1/4/11/1 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `0.5.75` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 1/4/11/1 | 0/0/0/0 | 1/4/11/1 | 0/0 | 🔴 APP CRITICAL RISK |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.51` | 🟢 **LATEST** | ✅ NO | 0/10/54/91 | 0/6/12/4 | ⏳ | ⏳ | ⏳ | 🟠 APP HIGH RISK |
|  |  | `3.8.50` | 🟢 **SUPPORTED** | ✅ NO | 4/26/70/92 | 3/16/24/10 | 4/26/70/92 | 3/16/24/10 | 0/0 | 🔴 APP CRITICAL RISK |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.9.7` | 🟢 **LATEST** | ✅ NO | 15/76/215/193 | 0/26/15/2 | ⏳ | ⏳ | ⏳ | 🟠 APP HIGH RISK |
|  |  | `2026.9.6` | 🟢 **SUPPORTED** | ✅ NO | 15/76/219/201 | 0/26/14/3 | 15/76/219/201 | 0/26/14/3 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.9.5` | 🟢 **SUPPORTED** | ✅ NO | 15/76/219/201 | 0/26/15/3 | 15/76/219/201 | 0/26/15/3 | 0/0 | 🟠 APP HIGH RISK |
| **n8n** | _AI Agents & Automation_ | `2.42.1` | 🟢 **LATEST** | ✅ NO | 7/21/58/25 | 0/23/34/1 | ⏳ | ⏳ | ⏳ | 🟠 APP HIGH RISK |
|  |  | `2.42.0` | 🟢 **SUPPORTED** | ✅ NO | 7/21/58/25 | 0/23/34/1 | 7/21/58/25 | 0/23/34/1 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2.41.3` | 🟢 **SUPPORTED** | ✅ NO | 7/21/58/25 | 0/23/34/1 | 7/21/58/25 | 0/23/34/1 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2.40.6` | 🟠 **AGING** | ✅ NO | 7/21/58/25 | 0/25/39/4 | 7/21/58/25 | 0/25/39/4 | 0/0 | 🟠 APP HIGH RISK |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.24` | 🟢 **LATEST** | ⚠️ YES | 17/371/2103/1123 | 3/23/43/17 | 2/212/341/287 | 1/10/15/4 | -15/-159 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.21` | 🟢 **SUPPORTED** | ⚠️ YES | 17/371/2103/1123 | 3/23/43/17 | 2/212/341/287 | 3/25/46/17 | -15/-159 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.14` | 🟢 **SUPPORTED** | ⚠️ YES | 17/371/2103/1123 | 3/25/46/17 | 2/212/341/287 | 3/25/46/17 | -15/-159 | 🔴 APP CRITICAL RISK |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.3` | 🟢 **LATEST** | ⚠️ YES | 7/34/104/135 | 0/0/0/0 | 4/24/90/134 | 0/0/0/0 | -3/-10 | 🟡 NON-COMPLIANT (ROOT) |
| **Memos** | _Knowledge & Notes_ | `0.31.0` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/1/0/1 | 0/0/0/0 | 0/1/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ NO | 0/0/0/0 | 0/10/2/1 | 0/0/0/0 | 0/0/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **Stirling-PDF** | _Utilities & Tools_ | `3.0.0` | 🟢 **LATEST** | ⚠️ YES | 0/0/406/70 | 0/2/6/0 | 0/0/330/57 | 0/2/6/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2.14.3` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/733/131 | 2/57/66/6 | 0/0/353/57 | 2/57/66/6 | 0/-2 | 🔴 APP CRITICAL RISK |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.4` | 🟢 **LATEST** | ⚠️ YES | 0/2/6/12 | 0/0/0/1 | 0/0/0/0 | 0/0/0/1 | 0/-2 | 🟡 NON-COMPLIANT (ROOT) |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ YES | 4/219/2076/481 | 1/5/11/1 | 1/109/1659/399 | 1/5/11/1 | -3/-110 | 🔴 APP CRITICAL RISK |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.16.0` | 🟢 **LATEST** | ⚠️ YES | 2/151/1741/1036 | 1/10/19/2 | 2/151/1741/1036 | 0/3/7/1 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.15.1` | 🟢 **SUPPORTED** | ⚠️ YES | 16/517/3572/1346 | 2/28/39/5 | 2/151/1741/1036 | 2/28/39/5 | -14/-366 | 🔴 APP CRITICAL RISK |
| **Shlink** | _Networking & Shorteners_ | `5.1.7` | 🟢 **LATEST** | ✅ NO | 0/1/2/0 | 3/21/5/5 | 0/0/0/0 | 3/21/5/5 | 0/-1 | 🔴 APP CRITICAL RISK |
|  |  | `5.1.6` | 🟢 **SUPPORTED** | ✅ NO | 0/1/2/0 | 3/21/5/5 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/6/12 | 1/7/21/4 | 0/0/0/0 | 0/3/10/3 | 0/-2 | 🔴 APP CRITICAL RISK |
| **Dozzle** | _Operations & Logs_ | `v11.1.3` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.1.2` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.1.1` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.1.0` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |

---

## 🚫 Deprecated / Dropped from Active Scanning

_No versions currently dropped from active support window._

---

## 🔍 Actionable Vulnerability Details per Latest Release

<details>
<summary><b>WordPress (PHP-FPM) (<code>7.1.2-php8.3-fpm-alpine</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `library/wordpress:7.1.2-php8.3-fpm-alpine`
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
<summary><b>Uptime Kuma (<code>2.5.5</code>) — App: 6 Critical, 90 High | System: 191 Critical, 1597 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-48068` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-48069` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-67320` | **HIGH** | `axios` | `0.32.0` | `0.33.0, 1.18.0` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `1.1.18` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `1.1.18` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-10931` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10966` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10971` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10972` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10974` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -163 | -1440 | -1451 | -705 | -4813 |
| App | -4 | -36 | — | — | -105 |

</details>

<details>
<summary><b>9Router (<code>0.5.91</code>) — App: 0 Critical, 2 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.91`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | -2 | — | — | -11 |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.51</code>) — App: 0 Critical, 6 High | System: 0 Critical, 10 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.51`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-19534` | **HIGH** | `undici` | `6.28.0` | `6.28.1, 7.29.1, 8.10.2` |
| `CVE-2026-19534` | **HIGH** | `undici` | `8.10.0` | `6.28.1, 7.29.1, 8.10.2` |
| `CVE-2026-84961` | **HIGH** | `undici` | `8.10.0` | `7.29.1, 8.10.2` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-54369` | **HIGH** | `libacl1` | `2.3.2-2+b1` | `None` |
| `CVE-2026-84782` | **HIGH** | `libssl3t64` | `3.5.7-1~deb13u2` | `None` |
| `CVE-2026-16742` | **HIGH** | `libsystemd0` | `257.13-1~deb13u1` | `None` |
| `CVE-2025-69720` | **HIGH** | `libtinfo6` | `6.5+20250216-2` | `None` |
| `CVE-2026-16742` | **HIGH** | `libudev1` | `257.13-1~deb13u1` | `None` |

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.9.7</code>) — App: 0 Critical, 26 High | System: 15 Critical, 76 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.9.7`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-83605` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.9.11, 0.8.14` |
| `CVE-2026-83607` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.9.11, 0.8.14` |
| `CVE-2026-83608` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.8.15, 0.9.12` |
| `CVE-2026-83613` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.8.15, 0.9.12` |
| `CVE-2026-83614` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.8.15, 0.9.12` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-6276` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8286` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-41992` | **HIGH** | `gzip` | `1.12-1` | `None` |

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>n8n (<code>2.42.1</code>) — App: 0 Critical, 23 High | System: 7 Critical, 21 High</b></summary>

- **Full Reference:** `n8nio/n8n:2.42.1`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `GHSA-j95f-988m-3j2f` | **HIGH** | `@tiptap/core` | `3.27.0` | `3.30.5` |
| `CVE-2026-83608` | **HIGH** | `@xmldom/xmldom` | `0.8.14` | `0.8.15, 0.9.12` |
| `CVE-2026-83613` | **HIGH** | `@xmldom/xmldom` | `0.8.14` | `0.8.15, 0.9.12` |
| `CVE-2026-83614` | **HIGH** | `@xmldom/xmldom` | `0.8.14` | `0.8.15, 0.9.12` |
| `CVE-2026-83615` | **HIGH** | `@xmldom/xmldom` | `0.8.14` | `0.8.15, 0.9.12` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r1` | `3.5.8-r0` |
| `CVE-2026-66046` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |
| `CVE-2026-76641` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |
| `CVE-2026-76956` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |
| `CVE-2026-76957` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.24</code>) — App: 3 Critical, 23 High | System: 17 Critical, 371 High</b></summary>

- **Full Reference:** `nousresearch/hermes-agent:v2026.9.24`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-59873` | **CRITICAL** | `tar` | `7.5.16` | `7.5.19` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -15 | -159 | -1762 | -836 | -3023 |
| App | -2 | -13 | — | — | -56 |

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.3</code>) — App: 0 Critical, 0 High | System: 7 Critical, 34 High</b></summary>

- **Full Reference:** `vaultwarden/server:1.37.3`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |
| `CVE-2026-41992` | **HIGH** | `gzip` | `1.13-1` | `1.13-1+deb13u1` |
| `CVE-2026-54369` | **HIGH** | `libacl1` | `2.3.2-2+b1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -3 | -10 | -14 | -1 | -28 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Memos (<code>0.31.0</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `neosmemo/memos:0.31.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-84445` | **HIGH** | `google.golang.org/grpc` | `v1.83.1` | `1.82.2, 1.83.2, 1.84.0-dev.0.20260825144003-d5a41119e0e3, 1.85.0-dev.0.20260825072537-93e31b48545e` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>File Browser (<code>v2.63.23</code>) — App: 0 Critical, 10 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `filebrowser/filebrowser:v2.63.23`
- **Root Status:** ✅ Runs non-root (`user`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-56854` | **HIGH** | `golang.org/x/crypto` | `v0.54.0` | `0.55.0` |
| `CVE-2026-46603` | **HIGH** | `golang.org/x/image` | `v0.44.0` | `0.45.0` |
| `CVE-2026-33818` | **HIGH** | `stdlib` | `v1.26.5` | `1.25.13, 1.26.6, 1.27.0-rc.3` |
| `CVE-2026-39821` | **HIGH** | `stdlib` | `v1.26.5` | `1.25.13, 1.26.6, 1.27.0-rc.3` |
| `CVE-2026-46600` | **HIGH** | `stdlib` | `v1.26.5` | `1.26.6, 1.27.0-rc.3` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | -10 | — | — | -12 |

</details>

<details>
<summary><b>Stirling-PDF (<code>3.0.0</code>) — App: 0 Critical, 2 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:3.0.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-68497` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.5` | `2.18.10, 2.21.6, 2.22.2` |
| `CVE-2026-68497` | **HIGH** | `tools.jackson.core:jackson-databind` | `3.1.5` | `3.2.2, 3.1.6` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | -76 | -13 | -89 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>PocketBase (<code>0.40.4</code>) — App: 0 Critical, 0 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `ghcr.io/muchobien/pocketbase:0.40.4`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -6 | -12 | -20 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Linkding (<code>1.47.0</code>) — App: 1 Critical, 5 High | System: 4 Critical, 219 High</b></summary>

- **Full Reference:** `sissbruecker/linkding:1.47.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102268` | **CRITICAL** | `PyJWT` | `2.13.0` | `2.14.0` |
| `CVE-2026-102266` | **HIGH** | `PyJWT` | `2.13.0` | `2.14.0` |
| `CVE-2026-102267` | **HIGH** | `PyJWT` | `2.13.0` | `2.14.0` |
| `CVE-2026-102271` | **HIGH** | `PyJWT` | `2.13.0` | `2.14.0` |
| `CVE-2026-102272` | **HIGH** | `PyJWT` | `2.13.0` | `2.14.0` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -3 | -110 | -417 | -82 | -612 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.16.0</code>) — App: 1 Critical, 10 High | System: 2 Critical, 151 High</b></summary>

- **Full Reference:** `jc21/nginx-proxy-manager:2.16.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-59873` | **CRITICAL** | `tar` | `7.5.11` | `7.5.19` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |
| `CVE-2026-24882` | **HIGH** | `dirmngr` | `2.4.7-21+deb13u1+b5` | `None` |
| `CVE-2026-24882` | **HIGH** | `gnupg` | `2.4.7-21+deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | -2 |
| App | -1 | -7 | — | — | -21 |

</details>

<details>
<summary><b>Shlink (<code>5.1.7</code>) — App: 3 Critical, 21 High | System: 0 Critical, 1 High</b></summary>

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

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -1 | -2 | 0 | -3 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) — App: 1 Critical, 7 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-59873` | **CRITICAL** | `tar` | `7.5.11` | `7.5.19` |
| `CVE-2026-59874` | **HIGH** | `tar` | `7.5.11` | `7.5.18` |
| `CVE-2026-73566` | **HIGH** | `tar` | `7.5.11` | `7.5.21` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -6 | -12 | -20 |
| App | -1 | -4 | — | — | -17 |

</details>

<details>
<summary><b>Dozzle (<code>v11.1.3</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.1.3`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

