# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-09-20T21:09:19.998Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `16`
- **Active Versions Audited:** `16`
- **Images Running As Root:** `12` / `16` (⚠️ **75%** non-compliant)
- **Total Critical CVEs:** `226`
- **Total High CVEs:** `3278`

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Category | Monitored Version | Lifecycle Status | Run As Root? | Configured UID | Vuln (C / H / M / L) | Fixable | Recommendation / Advisory |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | _CMS & Publishing_ | `7.1.1-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 0 / 0 / 0 / 0 | 0 | Recommended active release |
| **Uptime Kuma** | _Monitoring & Status_ | `2.5.5` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 149 / 1610 / 1847 / 1008 | 4969 | Recommended active release |
| **9Router** | _AI Gateways & Proxies_ | `0.5.75` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 1 / 10 / 7 / 1 | 19 | Recommended active release |
| **OmniRoute** | _AI Gateways & Proxies_ | `3.8.50` | 🟢 **LATEST** | ✅ **NO** | `node` | 7 / 62 / 67 / 60 | 42 | Recommended active release |
| **OpenClaw 2** | _AI Agents & Automation_ | `2026.9.5` | 🟢 **LATEST** | ✅ **NO** | `node` | 15 / 133 / 223 / 185 | 19 | Recommended active release |
| **Hermes Agent** | _AI Agents & Automation_ | `v2026.9.14` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 19 / 427 / 1476 / 1011 | 308 | Recommended active release |
| **Vaultwarden (Bitwarden)** | _Security & Identity_ | `1.37.3` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 7 / 69 / 106 / 97 | 28 | Recommended active release |
| **Memos** | _Knowledge & Notes_ | `0.31.0` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 0 / 1 / 0 / 1 | 1 | Recommended active release |
| **File Browser** | _Storage & Files_ | `v2.63.23` | 🟢 **LATEST** | ✅ **NO** | `user` | 0 / 10 / 2 / 1 | 12 | Recommended active release |
| **Stirling-PDF** | _Utilities & Tools_ | `2.14.3` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 2 / 67 / 779 / 137 | 566 | Recommended active release |
| **PocketBase** | _Backend-as-a-Service_ | `0.40.4` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 0 / 2 / 6 / 13 | 20 | Recommended active release |
| **Linkding** | _Bookmarks & Archiving_ | `1.47.0` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 4 / 262 / 1443 / 351 | 630 | Recommended active release |
| **Nginx Proxy Manager** | _Networking & Proxy_ | `2.15.1` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 18 / 591 / 2958 / 1228 | 2581 | Recommended active release |
| **Shlink** | _Networking & Shorteners_ | `5.1.6` | 🟢 **LATEST** | ✅ **NO** | `1001` | 3 / 22 / 7 / 5 | 37 | Recommended active release |
| **Homepage Dashboard** | _Dashboards & Homelab_ | `v2.4.0` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 1 / 12 / 14 / 13 | 40 | Recommended active release |
| **Dozzle** | _Operations & Logs_ | `v11.1.0` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 0 / 0 / 0 / 0 | 0 | Recommended active release |

---

## 🚫 Deprecated / Dropped from Active Scanning

_No versions currently dropped from active support window._

---

## 🔍 Actionable Vulnerability Details per Latest Release

<details>
<summary><b>WordPress (PHP-FPM) (<code>7.1.1-php8.3-fpm-alpine</code>) - 0 Critical, 0 High</b></summary>

- **Full Reference:** `library/wordpress:7.1.1-php8.3-fpm-alpine`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

_No Critical or High vulnerabilities detected in this release._

</details>

<details>
<summary><b>Uptime Kuma (<code>2.5.5</code>) - 149 Critical, 1610 High</b></summary>

- **Full Reference:** `louislam/uptime-kuma:2.5.5`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |

</details>

<details>
<summary><b>9Router (<code>0.5.75</code>) - 1 Critical, 10 High</b></summary>

- **Full Reference:** `decolua/9router:0.5.75`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |
| `CVE-2026-69152` | **HIGH** | `brace-expansion` | `2.0.2` | `1.1.18, 2.1.4, 3.0.6, 5.0.9` |
| `CVE-2026-69192` | **HIGH** | `ip-address` | `10.1.0` | `10.3.1` |
| `CVE-2026-9496` | **HIGH** | `pacote` | `19.0.2` | `21.5.1` |

</details>

<details>
<summary><b>OmniRoute (<code>3.8.50</code>) - 7 Critical, 62 High</b></summary>

- **Full Reference:** `diegosouzapw/omniroute:3.8.50`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-41992` | **HIGH** | `gzip` | `1.13-1` | `1.13-1+deb13u1` |

</details>

<details>
<summary><b>OpenClaw 2 (<code>2026.9.5</code>) - 15 Critical, 133 High</b></summary>

- **Full Reference:** `openclaw/openclaw:2026.9.5`
- **Root Status:** ✅ Runs non-root (`node`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.38.1-5+deb12u3` | `None` |

</details>

<details>
<summary><b>Hermes Agent (<code>v2026.9.14</code>) - 19 Critical, 427 High</b></summary>

- **Full Reference:** `nousresearch/hermes-agent:v2026.9.14`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |

</details>

<details>
<summary><b>Vaultwarden (Bitwarden) (<code>1.37.3</code>) - 7 Critical, 69 High</b></summary>

- **Full Reference:** `vaultwarden/server:1.37.3`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78409` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-78410` | **HIGH** | `bsdutils` | `1:2.41.5-0+deb13u1` | `None` |
| `CVE-2026-12064` | **HIGH** | `curl` | `8.14.1-2+deb13u5` | `None` |

</details>

<details>
<summary><b>Memos (<code>0.31.0</code>) - 0 Critical, 1 High</b></summary>

- **Full Reference:** `neosmemo/memos:0.31.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 HIGH RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-84445` | **HIGH** | `google.golang.org/grpc` | `v1.83.1` | `1.82.2, 1.83.2, 1.85.0-dev.0.20260825072537-93e31b48545e` |

</details>

<details>
<summary><b>File Browser (<code>v2.63.23</code>) - 0 Critical, 10 High</b></summary>

- **Full Reference:** `filebrowser/filebrowser:v2.63.23`
- **Root Status:** ✅ Runs non-root (`user`)
- **Posture:** 🟠 HIGH RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-56854` | **HIGH** | `golang.org/x/crypto` | `v0.54.0` | `0.55.0` |
| `CVE-2026-46603` | **HIGH** | `golang.org/x/image` | `v0.44.0` | `0.45.0` |
| `CVE-2026-33818` | **HIGH** | `stdlib` | `1.26.5` | `1.25.13, 1.26.6, 1.27.0-rc.3` |
| `CVE-2026-39821` | **HIGH** | `stdlib` | `1.26.5` | `1.25.13, 1.26.6, 1.27.0-rc.3` |
| `CVE-2026-46600` | **HIGH** | `stdlib` | `1.26.5` | `1.26.6, 1.27.0-rc.3` |

</details>

<details>
<summary><b>Stirling-PDF (<code>2.14.3</code>) - 2 Critical, 67 High</b></summary>

- **Full Reference:** `stirlingtools/stirling-pdf:2.14.3`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-45447` | **HIGH** | `libssl3t64` | `3.0.13-0ubuntu3.7` | `3.0.13-0ubuntu3.11` |
| `CVE-2026-45447` | **HIGH** | `openssl` | `3.0.13-0ubuntu3.7` | `3.0.13-0ubuntu3.11` |
| `GHSA-r7wm-3cxj-wff9` | **HIGH** | `com.fasterxml.jackson.core:jackson-core` | `2.21.2` | `2.18.8, 2.21.4` |
| `CVE-2026-54512` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.2` | `2.18.8, 3.1.4, 2.21.4` |
| `CVE-2026-54513` | **HIGH** | `com.fasterxml.jackson.core:jackson-databind` | `2.21.2` | `2.18.8, 2.21.4, 3.1.4` |

</details>

<details>
<summary><b>PocketBase (<code>0.40.4</code>) - 0 Critical, 2 High</b></summary>

- **Full Reference:** `ghcr.io/muchobien/pocketbase:0.40.4`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟠 HIGH RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |

</details>

<details>
<summary><b>Linkding (<code>1.47.0</code>) - 4 Critical, 262 High</b></summary>

- **Full Reference:** `sissbruecker/linkding:1.47.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-53612` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53613` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-53614` | **HIGH** | `bsdutils` | `1:2.41-5` | `2.41.5-0+deb13u1` |
| `CVE-2026-76642` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |
| `CVE-2026-78408` | **HIGH** | `bsdutils` | `1:2.41-5` | `None` |

</details>

<details>
<summary><b>Nginx Proxy Manager (<code>2.15.1</code>) - 18 Critical, 591 High</b></summary>

- **Full Reference:** `jc21/nginx-proxy-manager:2.15.1`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-34355` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-42536` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-44185` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-44186` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.68-1~deb13u1` |
| `CVE-2026-49975` | **HIGH** | `apache2-utils` | `2.4.67-1~deb13u2` | `2.4.67-1~deb13u3` |

</details>

<details>
<summary><b>Shlink (<code>5.1.6</code>) - 3 Critical, 22 High</b></summary>

- **Full Reference:** `shlinkio/shlink:5.1.6`
- **Root Status:** ✅ Runs non-root (`1001`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-33630` | **HIGH** | `c-ares` | `1.34.6-r0` | `1.34.8-r0` |
| `CVE-2026-77405` | **CRITICAL** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |
| `CVE-2026-77408` | **CRITICAL** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |
| `CVE-2026-77411` | **CRITICAL** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |
| `CVE-2026-77403` | **HIGH** | `github.com/rabbitmq/amqp091-go` | `v1.12.0` | `1.13.0` |

</details>

<details>
<summary><b>Homepage Dashboard (<code>v2.4.0</code>) - 1 Critical, 12 High</b></summary>

- **Full Reference:** `ghcr.io/gethomepage/homepage:v2.4.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🔴 CRITICAL RISK

| CVE ID | Severity | Affected Package | Installed | Fixed Version |
| :--- | :---: | :--- | :--- | :--- |
| `CVE-2026-14456` | **HIGH** | `libcrypto3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-14456` | **HIGH** | `libssl3` | `3.5.7-r0` | `3.5.8-r0` |
| `CVE-2026-13149` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.7, 1.1.16, 2.1.2` |
| `CVE-2026-14257` | **HIGH** | `brace-expansion` | `2.0.2` | `5.0.8, 3.0.3, 2.1.3, 1.1.17` |
| `CVE-2026-69152` | **HIGH** | `brace-expansion` | `2.0.2` | `1.1.18, 2.1.4, 3.0.6, 5.0.9` |

</details>

<details>
<summary><b>Dozzle (<code>v11.1.0</code>) - 0 Critical, 0 High</b></summary>

- **Full Reference:** `amir20/dozzle:v11.1.0`
- **Root Status:** ⚠️ Runs as root (`0 (root)`)
- **Posture:** 🟡 NON-COMPLIANT (ROOT)

_No Critical or High vulnerabilities detected in this release._

</details>

