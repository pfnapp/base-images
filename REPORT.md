# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-10-07T06:50:59.476Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `17`
- **Active Versions Audited:** `42`
- **Images Running As Root:** `28` / `42` (⚠️ **67%** non-compliant)
- **App Critical CVEs** _(upstream, unfixable by us)_**:** `63`
- **App High CVEs** _(upstream, unfixable by us)_**:** `830`
- **PFNApp Images Scanned:** `41` / `42`
- **Total System CVE Reduction:** `72`

> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.2-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ YES | 0/1/2/0 | 0/0/0/0 | 0/1/1/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `7.1.1-php8.3-fpm-alpine` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/2/0 | 0/0/0/0 | 0/2/2/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.5` | 🟢 **LATEST** | ⚠️ YES | 191/1721/1923/1035 | 7/96/107/10 | 28/247/442/324 | 3/59/46/5 | -163/-1474 | 🔴 APP CRITICAL RISK |
| **9Router** | _AI Gateways & Proxies_ | `0.5.95` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/4/9/1 | 0/0/0/0 | 0/1/0/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.91` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/6/9/1 | 0/0/0/0 | 0/3/0/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `0.5.86` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 1/8/12/1 | 0/0/0/0 | 0/3/0/0 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `0.5.85` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 2/8/12/1 | 0/0/0/0 | 2/8/12/1 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `0.5.75` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/0/0 | 2/8/12/1 | 0/0/0/0 | 2/8/12/1 | 0/0 | 🔴 APP CRITICAL RISK |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.51` | 🟢 **LATEST** | ✅ NO | 0/14/88/69 | 1/10/14/4 | 4/30/105/70 | 4/20/26/10 | 4/16 | 🔴 APP CRITICAL RISK |
|  |  | `3.8.50` | 🟢 **SUPPORTED** | ✅ NO | 4/30/105/70 | 4/20/26/10 | 4/30/105/70 | 4/20/26/10 | 0/0 | 🔴 APP CRITICAL RISK |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.9.8` | 🟢 **LATEST** | ✅ NO | 15/80/229/185 | 0/32/17/5 | 15/86/236/194 | 0/31/16/6 | 0/6 | 🟠 APP HIGH RISK |
|  |  | `2026.9.7` | 🟢 **SUPPORTED** | ✅ NO | 15/86/232/186 | 0/32/17/5 | 15/86/236/194 | 0/31/16/6 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.9.6` | 🟢 **SUPPORTED** | ✅ NO | 15/86/236/194 | 0/31/16/6 | 15/86/236/194 | 0/31/16/6 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2026.9.5` | 🟠 **AGING** | ✅ NO | 15/86/236/194 | 0/31/17/6 | 15/86/236/194 | 0/31/17/6 | 0/0 | 🟠 APP HIGH RISK |
| **n8n** | _AI Agents & Automation_ | `2.43.0` | 🟢 **LATEST** | ✅ NO | 7/25/62/26 | 4/46/49/3 | 7/25/62/26 | 4/46/49/3 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.42.3` | 🟢 **SUPPORTED** | ✅ NO | 7/25/62/26 | 4/46/49/3 | 7/25/62/26 | 4/46/49/3 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.42.2` | 🟢 **SUPPORTED** | ✅ NO | 7/25/62/26 | 4/46/49/3 | 7/25/62/26 | 4/46/49/3 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.42.1` | 🟠 **AGING** | ✅ NO | 7/25/62/26 | 4/46/49/3 | 7/25/62/26 | 4/46/49/3 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.42.0` | 🔴 **EOL SOON** | ✅ NO | 7/25/62/26 | 4/46/49/3 | 7/25/62/26 | 4/46/49/3 | 0/0 | 🔴 APP CRITICAL RISK |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.24` | 🟢 **LATEST** | ⚠️ YES | 17/395/2345/1187 | 3/30/53/18 | 2/226/384/266 | 1/16/22/5 | -15/-169 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.21` | 🟢 **SUPPORTED** | ⚠️ YES | 17/395/2345/1187 | 3/30/53/18 | 2/226/384/266 | 3/32/56/18 | -15/-169 | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.14` | 🟢 **SUPPORTED** | ⚠️ YES | 17/395/2345/1187 | 3/32/56/18 | 2/226/384/266 | 3/32/56/18 | -15/-169 | 🔴 APP CRITICAL RISK |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.4` | 🟢 **LATEST** | ⚠️ YES | 4/22/95/106 | 0/0/0/0 | 4/21/95/106 | 0/0/0/0 | 0/-1 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `1.37.3` | 🟢 **SUPPORTED** | ⚠️ YES | 7/38/137/113 | 0/0/0/0 | 4/28/122/112 | 0/0/0/0 | -3/-10 | 🟡 NON-COMPLIANT (ROOT) |
| **Memos** | _Knowledge & Notes_ | `0.31.0` | 🟢 **LATEST** | ⚠️ YES | 0/4/14/2 | 0/1/0/1 | 0/4/14/2 | 0/1/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ NO | 0/0/0/0 | 0/10/2/1 | 0/0/0/0 | 0/0/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **Stirling-PDF** | _Utilities & Tools_ | `3.1.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/401/80 | 0/12/6/0 | 0/0/337/57 | 0/12/6/0 | 0/-2 | 🟠 APP HIGH RISK |
|  |  | `3.0.2` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/414/80 | 0/12/6/0 | 0/0/337/57 | 0/12/6/0 | 0/-2 | 🟠 APP HIGH RISK |
|  |  | `3.0.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/2/414/80 | 0/12/6/0 | 0/2/338/67 | 0/12/6/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `2.14.3` | 🟠 **AGING** | ⚠️ YES | 0/4/741/141 | 3/66/66/6 | 0/2/361/67 | 3/66/66/6 | 0/-2 | 🔴 APP CRITICAL RISK |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.4` | 🟢 **LATEST** | ⚠️ YES | 0/2/6/12 | 0/0/0/1 | 0/0/0/0 | 0/0/0/1 | 0/-2 | 🟡 NON-COMPLIANT (ROOT) |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ YES | 4/225/2280/536 | 1/8/17/1 | 1/117/1860/454 | 1/8/17/1 | -3/-108 | 🔴 APP CRITICAL RISK |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.16.0` | 🟢 **LATEST** | ⚠️ YES | 2/174/1981/1113 | 2/14/21/2 | 2/174/1981/1113 | 1/6/8/1 | 0/0 | 🔴 APP CRITICAL RISK |
|  |  | `2.15.1` | 🟢 **SUPPORTED** | ⚠️ YES | 16/538/3818/1423 | 3/33/41/5 | 2/174/1981/1113 | 3/33/41/5 | -14/-364 | 🔴 APP CRITICAL RISK |
| **Shlink** | _Networking & Shorteners_ | `5.1.7` | 🟢 **LATEST** | ✅ NO | 0/1/4/0 | 3/21/5/5 | 0/0/2/0 | 3/21/5/5 | 0/-1 | 🔴 APP CRITICAL RISK |
|  |  | `5.1.6` | 🟢 **SUPPORTED** | ✅ NO | 0/1/4/0 | 3/21/5/5 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/6/12 | 2/12/22/5 | 0/0/0/0 | 1/7/10/4 | 0/-2 | 🔴 APP CRITICAL RISK |
| **Dozzle** | _Operations & Logs_ | `v11.3.0` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.2.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.1.3` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.1.2` | 🟠 **AGING** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
|  |  | `v11.1.1` | 🔴 **EOL SOON** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |

---

## 🚫 Deprecated / Dropped from Active Scanning

| Application | Deprecated Version | Dropped On | Advisory to Users |
| :--- | :--- | :---: | :--- |
| **n8n** | `2.41.3` | 2026-10-06 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.43.0 immediately. |
| **n8n** | `2.40.6` | 2026-10-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to 2.42.3 immediately. |
| **Dozzle** | `v11.1.0` | 2026-10-05 | ⛔ **UNSUPPORTED**: UNSUPPORTED: Version fell outside the 5-release support window. Upgrade to v11.3.0 immediately. |

---

## 🔍 Actionable Vulnerability Details per Latest Release

<details>
<summary><b>WordPress (PHP-FPM) (<code>7.1.2-php8.3-fpm-alpine</code>) — App: 0 Critical, 0 High | System: 0 Critical, 1 High</b></summary>

- **Full Reference:** `library/wordpress:7.1.2-php8.3-fpm-alpine`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-103111` | **HIGH** | `pcre2` | `10.48-r0` | `10.49-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | -1 | 0 | -1 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Uptime Kuma (<code>2.5.5</code>) — App: 7 Critical, 96 High | System: 191 Critical, 1721 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.5`
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
| `CVE-2026-10931` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10966` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10971` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10972` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |
| `CVE-2026-10974` | **CRITICAL** | `chromium` | `148.0.7778.178-1~deb12u1` | `149.0.7827.53-1~deb12u1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -163 | -1474 | -1481 | -711 | -4813 |
| App | -4 | -37 | — | — | -107 |

</details>

<details>
<summary><b>9Router (<code>0.5.95</code>) — App: 0 Critical, 4 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.95`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-93748` | **HIGH** | `http-cache-semantics` | `4.2.0` | `None` |
| `CVE-2026-85393` | **HIGH** | `node-forge` | `1.4.0` | `None` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | -3 | — | — | -13 |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.51</code>) — App: 1 Critical, 10 High | System: 0 Critical, 14 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.51`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-104850` | **HIGH** | `@modelcontextprotocol/sdk` | `1.30.0` | `1.31.0` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-93748` | **HIGH** | `http-cache-semantics` | `4.2.0` | `None` |
| `GHSA-vcvr-r3jv-pc5j` | **CRITICAL** | `next` | `16.3.5` | `16.3.6` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-54369` | **HIGH** | `libacl1` | `2.3.2-2+b1` | `None` |
| `CVE-2026-103111` | **HIGH** | `libpcre2-8-0` | `10.46-1~deb13u2` | `10.46-1~deb13u3` |
| `CVE-2026-75804` | **HIGH** | `libssl3t64` | `3.5.7-1~deb13u2` | `3.5.7-1~deb13u3` |
| `CVE-2026-84782` | **HIGH** | `libssl3t64` | `3.5.7-1~deb13u2` | `3.5.7-1~deb13u3` |
| `CVE-2026-16742` | **HIGH** | `libsystemd0` | `257.13-1~deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 4 | 16 | 17 | 1 | 38 |
| App | 3 | 10 | — | — | 31 |

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.9.8</code>) — App: 0 Critical, 32 High | System: 15 Critical, 80 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.9.8`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-104850` | **HIGH** | `@modelcontextprotocol/client` | `2.0.0` | `2.2.0` |
| `CVE-2026-104850` | **HIGH** | `@modelcontextprotocol/sdk` | `1.30.0` | `1.31.0` |
| `CVE-2026-83605` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.9.11, 0.8.14` |
| `CVE-2026-83607` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.9.11, 0.8.14` |
| `CVE-2026-83608` | **HIGH** | `@xmldom/xmldom` | `0.8.13` | `0.8.15, 0.9.12` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-6276` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8286` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `7.88.1-10+deb12u15` | `None` |
| `CVE-2026-41992` | **HIGH** | `gzip` | `1.12-1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 6 | 7 | 9 | 22 |
| App | 0 | -1 | — | — | -1 |

</details>

<details>
<summary><b>n8n (<code>2.43.0</code>) — App: 4 Critical, 46 High | System: 7 Critical, 25 High</b></summary>

- **Full Reference:** `n8nio/n8n:2.43.0`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.14.4` | `1.13.6, 1.14.5` |
| `CVE-2026-104850` | **HIGH** | `@modelcontextprotocol/sdk` | `1.26.0` | `1.31.0` |
| `CVE-2026-102829` | **CRITICAL** | `@simple-git/argv-parser` | `1.1.1` | `2.0.1` |
| `GHSA-j95f-988m-3j2f` | **HIGH** | `@tiptap/core` | `3.27.0` | `3.30.5` |
| `GHSA-g2v6-rqmx-r4w6` | **HIGH** | `@vue/server-renderer` | `3.5.40` | `3.5.42, 3.6.0-rc.6` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r1` | `3.5.8-r0` |
| `CVE-2026-66046` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |
| `CVE-2026-76641` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |
| `CVE-2026-76956` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |
| `CVE-2026-76957` | **HIGH** | `libexpat` | `2.8.3-r1` | `2.8.4-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.24</code>) — App: 3 Critical, 30 High | System: 17 Critical, 395 High</b></summary>

- **Full Reference:** `nousresearch/hermes-agent:v2026.9.24`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.14.4` | `1.13.6, 1.14.5` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |

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
| System | -15 | -169 | -1961 | -921 | -3244 |
| App | -2 | -14 | — | — | -60 |

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.4</code>) — App: 0 Critical, 0 High | System: 4 Critical, 22 High</b></summary>

- **Full Reference:** `vaultwarden/server:1.37.4`
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
| `CVE-2026-54369` | **HIGH** | `libacl1` | `2.3.2-2+b1` | `None` |
| `CVE-2026-8286` | **HIGH** | `libcurl4t64` | `8.14.1-2+deb13u5` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -1 | 0 | 0 | -1 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Memos (<code>0.31.0</code>) — App: 0 Critical, 1 High | System: 0 Critical, 4 High</b></summary>

- **Full Reference:** `neosmemo/memos:0.31.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-84445` | **HIGH** | `google.golang.org/grpc` | `v1.83.1` | `1.82.2, 1.83.2, 1.84.0-dev.0.20260825144003-d5a41119e0e3, 1.85.0-dev.0.20260825072537-93e31b48545e` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-75804` | **HIGH** | `libcrypto3` | `3.3.7-r1` | `3.3.7-r2` |
| `CVE-2026-84782` | **HIGH** | `libcrypto3` | `3.3.7-r1` | `3.3.7-r2` |
| `CVE-2026-75804` | **HIGH** | `libssl3` | `3.3.7-r1` | `3.3.7-r2` |
| `CVE-2026-84782` | **HIGH** | `libssl3` | `3.3.7-r1` | `3.3.7-r2` |

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
<summary><b>Stirling-PDF (<code>3.1.0</code>) — App: 0 Critical, 12 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:3.1.0`
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
| System | 0 | -2 | -64 | -23 | -89 |
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
<summary><b>Linkding (<code>1.47.0</code>) — App: 1 Critical, 8 High | System: 4 Critical, 225 High</b></summary>

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
| `CVE-2026-8286` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |
| `CVE-2026-8458` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |
| `CVE-2026-8927` | **HIGH** | `curl` | `8.14.1-2+deb13u4` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -3 | -108 | -420 | -82 | -613 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.16.0</code>) — App: 2 Critical, 14 High | System: 2 Critical, 174 High</b></summary>

- **Full Reference:** `jc21/nginx-proxy-manager:2.16.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-102990` | **HIGH** | `basic-ftp` | `5.3.1` | `6.2.1` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `5.0.9` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-46729` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `None` |
| `CVE-2026-56153` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `None` |
| `CVE-2026-63292` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `None` |
| `CVE-2026-63686` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `None` |
| `CVE-2026-63718` | **HIGH** | `apache2-utils` | `2.4.68-1~deb13u1` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | -2 |
| App | -1 | -8 | — | — | -23 |

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
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) — App: 2 Critical, 12 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-101916` | **HIGH** | `@grpc/grpc-js` | `1.14.4` | `1.13.6, 1.14.5` |
| `CVE-2026-102276` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.10, 3.0.7, 2.1.5, 1.1.19` |
| `CVE-2026-102278` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.11, 3.0.8, 2.1.6, 1.1.20` |
| `CVE-2026-93748` | **HIGH** | `http-cache-semantics` | `4.2.0` | `None` |
| `CVE-2026-93748` | **HIGH** | `http-cache-semantics` | `4.2.0` | `None` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | -2 | -6 | -12 | -20 |
| App | -1 | -5 | — | — | -19 |

</details>

<details>
<summary><b>Dozzle (<code>v11.3.0</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.3.0`
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

