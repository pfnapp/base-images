# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-09-21T20:18:14.589Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `16`
- **Active Versions Audited:** `19`
- **Images Running As Root:** `14` / `19` (⚠️ **74%** non-compliant)
- **App Critical CVEs** _(upstream, unfixable by us)_**:** `25`
- **App High CVEs** _(upstream, unfixable by us)_**:** `302`
- **PFNApp Images Scanned:** `14` / `19`
- **Total System CVE Reduction:** `10524`

> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.1-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0/0/0 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.5` | 🟢 **LATEST** | ⚠️ YES | 144/1547/1762/1004 | 6/89/94/8 | 27/189/363/313 | 5/66/86/8 | -117/-1358 | 🔴 APP CRITICAL RISK |
| **9Router** | _AI Gateways & Proxies_ | `0.5.75` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 1/10/7/1 | 0/0/0/0 | 1/10/7/1 | 0/0 | 🔴 APP CRITICAL RISK |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.50` | 🟢 **LATEST** | ✅ NO | 4/59/66/60 | 3/3/1/0 | 4/59/66/60 | 3/3/1/0 | 0/0 | 🔴 APP CRITICAL RISK |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.9.5` | 🟢 **LATEST** | ✅ NO | 15/116/218/186 | 0/17/2/2 | 15/116/218/186 | 0/17/2/2 | 0/0 | 🟠 APP HIGH RISK |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.21` | 🟢 **LATEST** | ⚠️ YES | 17/409/1903/1002 | 2/14/24/12 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
|  |  | `v2026.9.14` | 🟢 **SUPPORTED** | ⚠️ YES | 17/409/1903/1002 | 2/16/27/12 | 2/242/320/249 | 2/16/27/12 | -15/-167 | 🔴 APP CRITICAL RISK |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.3` | 🟢 **LATEST** | ⚠️ YES | 7/69/104/99 | 0/0/0/0 | 4/59/90/98 | 0/0/0/0 | -3/-10 | 🟡 NON-COMPLIANT (ROOT) |
| **Memos** | _Knowledge & Notes_ | `0.31.0` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/1/0/1 | 0/0/0/0 | 0/1/0/1 | 0/0 | 🟠 APP HIGH RISK |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ NO | 0/0/0/0 | 0/10/2/1 | 0/0/0/0 | 0/10/2/1 | 0/0 | 🟠 APP HIGH RISK |
| **Stirling-PDF** | _Utilities & Tools_ | `2.14.3` | 🟢 **LATEST** | ⚠️ YES | 0/2/716/131 | 2/55/60/6 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.4` | 🟢 **LATEST** | ⚠️ YES | 0/2/6/12 | 0/0/0/1 | 0/2/6/12 | 0/0/0/1 | 0/0 | 🟡 NON-COMPLIANT (ROOT) |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ YES | 4/260/1900/352 | 0/0/7/1 | 1/143/1480/270 | 0/0/7/1 | -3/-117 | 🟡 NON-COMPLIANT (ROOT) |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.15.1` | 🟢 **LATEST** | ⚠️ YES | 16/558/3391/1225 | 2/34/27/4 | 2/184/1558/915 | 2/34/27/4 | -14/-374 | 🔴 APP CRITICAL RISK |
| **Shlink** | _Networking & Shorteners_ | `5.1.7` | 🟢 **LATEST** | ✅ NO | 0/1/2/0 | 3/21/5/5 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
|  |  | `5.1.6` | 🟢 **SUPPORTED** | ✅ NO | 0/1/2/0 | 3/21/5/5 | ⏳ | ⏳ | ⏳ | 🔴 APP CRITICAL RISK |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ YES | 0/2/6/12 | 1/10/8/1 | 0/0/0/0 | 1/10/8/1 | 0/-2 | 🔴 APP CRITICAL RISK |
| **Dozzle** | _Operations & Logs_ | `v11.1.1` | 🟢 **LATEST** | ⚠️ YES | 0/0/0/0 | 0/1/0/0 | 0/0/0/0 | 0/1/0/0 | 0/0 | 🟠 APP HIGH RISK |
|  |  | `v11.1.0` | 🟢 **SUPPORTED** | ⚠️ YES | 0/0/0/0 | 0/0/0/0 | ⏳ | ⏳ | ⏳ | 🟡 NON-COMPLIANT (ROOT) |

---

## 🚫 Deprecated / Dropped from Active Scanning

_No versions currently dropped from active support window._

---

## 🔍 Actionable Vulnerability Details per Latest Release

<details>
<summary><b>WordPress (PHP-FPM) (<code>7.1.1-php8.3-fpm-alpine</code>) — App: 0 Critical, 0 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `library/wordpress:7.1.1-php8.3-fpm-alpine`
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
<summary><b>Uptime Kuma (<code>2.5.5</code>) — App: 6 Critical, 89 High | System: 144 Critical, 1547 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-48068` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-48069` | **HIGH** | `@grpc/grpc-js` | `1.8.22` | `1.9.16, 1.10.12, 1.11.4, 1.12.7, 1.13.5, 1.14.4` |
| `CVE-2026-67320` | **HIGH** | `axios` | `0.32.0` | `0.33.0, 1.18.0` |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -117 | -1358 | -1399 | -691 | -4800 |
| App | -1 | -23 | — | — | -32 |

</details>

<details>
<summary><b>9Router (<code>0.5.75</code>) — App: 1 Critical, 10 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.75`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |
| `CVE-2026-69152` | **HIGH** | `brace-expansion` | `2.0.2` | `1.1.18, 2.1.4, 3.0.6, 5.0.9` |
| `CVE-2026-69192` | **HIGH** | `ip-address` | `10.1.0` | `10.3.1` |
| `CVE-2026-9496` | **HIGH** | `pacote` | `19.0.2` | `21.5.1` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.50</code>) — App: 3 Critical, 3 High | System: 4 Critical, 59 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.50`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-77301` | **HIGH** | `adm-zip` | `0.6.0` | `0.6.1` |
| `CVE-2026-75604` | **CRITICAL** | `next` | `16.3.1` | `15.5.24, 16.3.3` |
| `GHSA-2xp9-vwfh-vxw4` | **CRITICAL** | `next` | `16.3.1` | `15.5.24, 16.3.3` |
| `CVE-2026-88062` | **CRITICAL** | `omniroute` | `3.8.50` | `None` |
| `GHSA-rgj7-g3m4-5g8c` | **HIGH** | `sharp` | `0.35.3` | `0.35.4` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-41992` | **HIGH** | `gzip` | `1.13-1` | `1.13-1+deb13u1` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.9.5</code>) — App: 0 Critical, 17 High | System: 15 Critical, 116 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.9.5`
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
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.21</code>) — App: 2 Critical, 14 High | System: 17 Critical, 409 High</b></summary>

- **Full Reference:** `nousresearch/hermes-agent:v2026.9.21`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |
| `CVE-2026-69152` | **HIGH** | `brace-expansion` | `5.0.6` | `1.1.18, 2.1.4, 3.0.6, 5.0.9` |
| `CVE-2026-69192` | **HIGH** | `ip-address` | `10.2.0` | `10.3.1` |
| `CVE-2026-59873` | **CRITICAL** | `tar` | `7.5.16` | `7.5.19` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.3</code>) — App: 0 Critical, 0 High | System: 7 Critical, 69 High</b></summary>

- **Full Reference:** `vaultwarden/server:1.37.3`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-12064` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |

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
| `CVE-2026-84445` | **HIGH** | `google.golang.org/grpc` | `v1.83.1` | `1.82.2, 1.83.2, 1.85.0-dev.0.20260825072537-93e31b48545e` |

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
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Stirling-PDF (<code>2.14.3</code>) — App: 2 Critical, 55 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:2.14.3`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `GHSA-r7wm-3cxj-wff9` | **HIGH** | `com.fasterxml.jackson.core:jackson-core` | `2.21.2` | `2.18.8, 2.21.4` |
| `CVE-2026-54512` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.2` | `2.18.8, 3.1.4, 2.21.4` |
| `CVE-2026-54513` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.2` | `2.18.8, 2.21.4, 3.1.4` |
| `CVE-2024-47554` | **HIGH** | `commons-io:commons-io` | `2.8.0` | `2.14.0` |
| `CVE-2026-40983` | **HIGH** | `io.micrometer:micrometer-core` | `1.16.5` | `1.16.6, 1.15.12` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-45447` | **HIGH** | `libssl3t64` | `3.0.13-0ubuntu3.7` | `3.0.13-0ubuntu3.11` |
| `CVE-2026-45447` | **HIGH** | `openssl` | `3.0.13-0ubuntu3.7` | `3.0.13-0ubuntu3.11` |

> ⏳ **PFNApp image not yet built** — reduction data pending.

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
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Linkding (<code>1.47.0</code>) — App: 0 Critical, 0 High | System: 4 Critical, 260 High</b></summary>

- **Full Reference:** `sissbruecker/linkding:1.47.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

_No Critical or High app-level vulnerabilities detected._

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -3 | -117 | -420 | -82 | -622 |
| App | 0 | 0 | — | — | 0 |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.15.1</code>) — App: 2 Critical, 34 High | System: 16 Critical, 558 High</b></summary>

- **Full Reference:** `jc21/nginx-proxy-manager:2.15.1`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |
| `CVE-2026-69152` | **HIGH** | `brace-expansion` | `2.0.2` | `1.1.18, 2.1.4, 3.0.6, 5.0.9` |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `5.0.6` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-34355` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-42536` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-44185` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-44186` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-49975` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.67-1~deb13u3` |

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | -14 | -374 | -1833 | -310 | -2533 |
| App | 0 | 0 | — | — | 0 |

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

> ⏳ **PFNApp image not yet built** — reduction data pending.

</details>

<details>
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) — App: 1 Critical, 10 High | System: 0 Critical, 2 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 APP CRITICAL RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |
| `CVE-2026-69152` | **HIGH** | `brace-expansion` | `2.0.2` | `1.1.18, 2.1.4, 3.0.6, 5.0.9` |
| `CVE-2026-69192` | **HIGH** | `ip-address` | `10.1.0` | `10.3.1` |
| `CVE-2026-9496` | **HIGH** | `pacote` | `19.0.2` | `21.5.1` |

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
<summary><b>Dozzle (<code>v11.1.1</code>) — App: 0 Critical, 1 High | System: 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.1.1`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 APP HIGH RISK

#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_

| CVE ID | Severity | Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-84445` | **HIGH** | `google.golang.org/grpc` | `v1.84.0` | `1.82.2, 1.83.2, 1.85.0-dev.0.20260825072537-93e31b48545e` |

#### 🟡 System CVEs _(OS packages — mitigable via `apk upgrade` / `apt-get upgrade`)_

_No Critical or High system-level vulnerabilities detected._

#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)

| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| System | 0 | 0 | 0 | 0 | 0 |
| App | 0 | 0 | — | — | 0 |

</details>

