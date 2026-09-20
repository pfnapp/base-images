# 🛡️ Upstream Template Security & Support Window Observatory

> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.
> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.
> **Last Scan:** 2026-09-20T15:23:10.865Z | **Scanner:** Aqua Trivy

### 📊 Governance Summary

- **Applications Monitored:** `6`
- **Active Versions Audited:** `6`
- **Images Running As Root:** `4` / `6` (⚠️ **67%** non-compliant)
- **Total Critical CVEs:** `191`
- **Total High CVEs:** `2242`

---

## 📋 Active Support Window (Max 5 Versions per Application)

| Application | Monitored Version | Lifecycle Status | Run As Root? | Configured UID | Vuln (C / H / M / L) | Fixable | Recommendation / Advisory |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **WordPress (PHP-FPM)** | `7.1.1-php8.3-fpm-alpine` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 0 / 0 / 0 / 0 | 0 | Recommended active release |
| **Uptime Kuma** | `2.5.5` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 149 / 1610 / 1847 / 1008 | 4969 | Recommended active release |
| **9Router** | `0.5.75` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 1 / 10 / 7 / 1 | 19 | Recommended active release |
| **OmniRoute** | `3.8.50` | 🟢 **LATEST** | ✅ **NO** | `node` | 7 / 62 / 67 / 60 | 42 | Recommended active release |
| **OpenClaw 2** | `2026.9.5` | 🟢 **LATEST** | ✅ **NO** | `node` | 15 / 133 / 223 / 185 | 19 | Recommended active release |
| **Hermes Agent** | `v2026.9.14` | 🟢 **LATEST** | ⚠️ **YES** | `0 (root)` | 19 / 427 / 1476 / 1011 | 308 | Recommended active release |

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

