#!/usr/bin/env node

/**
 * scripts/upstream-observatory.js
 *
 * Upstream Security & Support Window Observatory Scanner
 * 1. Checks upstream registries for newer releases to maintain a strict 5-version sliding window.
 * 2. Scans active versions with Aqua Trivy for CVEs and inspects non-root/privilege status.
 * 3. Emits:
 *    - report.json: Structured format for PFNApp platform integration
 *    - REPORT.md: Human-readable markdown audit for git governance
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const TRACKED_CONFIG_FILE = path.join(ROOT_DIR, 'observatory', 'tracked-versions.json');
const CACHE_DIR = path.join(ROOT_DIR, 'observatory', '.cache');
const REPORT_JSON_FILE = path.join(ROOT_DIR, 'report.json');
const REPORT_MD_FILE = path.join(ROOT_DIR, 'REPORT.md');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'pfnapp-observatory/1.0' } }, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

function parseSemver(v) {
  const clean = v.replace(/^v/, '').split('-')[0];
  const parts = clean.split('.').map((n) => parseInt(n, 10));
  while (parts.length < 3) parts.push(0);
  return parts;
}

function compareSemver(a, b) {
  const pA = parseSemver(a);
  const pB = parseSemver(b);
  for (let i = 0; i < Math.max(pA.length, pB.length); i++) {
    const nA = pA[i] || 0;
    const nB = pB[i] || 0;
    if (nA > nB) return 1;
    if (nA < nB) return -1;
  }
  return 0;
}

async function getUpstreamDockerHubTags(imageName) {
  try {
    const url = `https://registry.hub.docker.com/v2/repositories/${imageName}/tags?page_size=50`;
    const data = await fetchJson(url);
    return (data.results || []).map((r) => r.name);
  } catch (err) {
    console.warn(`  ⚠️ Could not fetch remote tags for ${imageName}: ${err.message}`);
    return [];
  }
}

function runTrivyScan(imageRef) {
  const cacheFile = path.join(CACHE_DIR, `${imageRef.replace(/[^a-zA-Z0-9_.-]/g, '_')}.json`);
  const forceRefresh = process.argv.includes('--refresh');

  if (!forceRefresh && fs.existsSync(cacheFile)) {
    try {
      console.log(`  ⚡ Loading cached scan for ${imageRef}...`);
      return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    } catch {
      // Invalid cache, continue with live scan
    }
  }

  console.log(`  🔍 Scanning ${imageRef} with Aqua Trivy...`);
  try {
    let output;
    if (process.env.USE_DOCKER_TRIVY === 'true' || !isCommandAvailable('trivy')) {
      output = execSync(
        `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --scanners vuln --format json --quiet "${imageRef}"`,
        { maxBuffer: 50 * 1024 * 1024, timeout: 180000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
      );
    } else {
      output = execSync(
        `trivy image --scanners vuln --format json --quiet "${imageRef}"`,
        { maxBuffer: 50 * 1024 * 1024, timeout: 180000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
      );
    }
    const parsed = JSON.parse(output);
    fs.writeFileSync(cacheFile, JSON.stringify(parsed, null, 2));
    return parsed;
  } catch (err) {
    console.error(`  ❌ Trivy scan failed for ${imageRef}: ${err.message}`);
    return null;
  }
}

function isCommandAvailable(cmd) {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function evaluatePrivilege(trivyResult) {
  const configuredUser = trivyResult?.Metadata?.ImageConfig?.config?.User;
  let runAsRoot = true;
  let uidLabel = '0 (root)';

  if (configuredUser && configuredUser !== '' && configuredUser !== '0' && configuredUser !== 'root' && configuredUser !== '0:0') {
    runAsRoot = false;
    uidLabel = configuredUser;
  }

  return {
    runAsRoot,
    configuredUser: configuredUser || 'root',
    uidLabel
  };
}

function parseVulnerabilities(trivyResult) {
  let critical = 0;
  let high = 0;
  let medium = 0;
  let low = 0;
  let fixable = 0;
  const topCves = [];

  const results = trivyResult?.Results || [];
  for (const res of results) {
    const vulns = res.Vulnerabilities || [];
    for (const v of vulns) {
      const sev = (v.Severity || '').toUpperCase();
      if (sev === 'CRITICAL') critical++;
      else if (sev === 'HIGH') high++;
      else if (sev === 'MEDIUM') medium++;
      else if (sev === 'LOW') low++;

      const isFixable = !!v.FixedVersion;
      if (isFixable) fixable++;

      if ((sev === 'CRITICAL' || sev === 'HIGH') && topCves.length < 5) {
        topCves.push({
          id: v.VulnerabilityID,
          pkg: v.PkgName,
          installedVersion: v.InstalledVersion,
          fixedVersion: v.FixedVersion || 'None',
          severity: sev,
          title: v.Title || v.VulnerabilityID
        });
      }
    }
  }

  return {
    critical,
    high,
    medium,
    low,
    fixable,
    total: critical + high + medium + low,
    topCves
  };
}

function determinePosture(vulns, priv) {
  if (vulns.critical > 0) return { label: 'CRITICAL RISK', badge: '🔴' };
  if (vulns.high > 0) return { label: 'HIGH RISK', badge: '🟠' };
  if (priv.runAsRoot) return { label: 'NON-COMPLIANT (ROOT)', badge: '🟡' };
  return { label: 'COMPLIANT', badge: '🟢' };
}

function getLifecycleStatus(index, total) {
  if (index === 0) return { status: 'LATEST', badge: '🟢', advice: 'Recommended active release' };
  if (index === 1 || index === 2) return { status: 'SUPPORTED', badge: '🟢', advice: 'Actively maintained' };
  if (index === 3) return { status: 'AGING', badge: '🟠', advice: 'Plan upgrade to latest' };
  if (index === 4) return { status: 'EOL SOON', badge: '🔴', advice: 'Next upstream release will deprecate this version' };
  return { status: 'DEPRECATED', badge: '⛔', advice: 'Unsupported. Upgrade immediately' };
}

async function main() {
  console.log('🚀 Starting Upstream Security & Support Window Observatory...');
  const config = JSON.parse(fs.readFileSync(TRACKED_CONFIG_FILE, 'utf8'));
  const maxActive = config.policy?.max_active_versions || 5;

  const now = new Date().toISOString();
  const summary = {
    generatedAt: now,
    scanner: 'Aqua Trivy',
    supportWindowPolicy: `N-${maxActive - 1} (Max ${maxActive} active versions)`,
    totalApplications: config.applications.length,
    totalMonitoredVersions: 0,
    runAsRootCount: 0,
    criticalVulnerabilityCount: 0,
    highVulnerabilityCount: 0
  };

  const applicationsReport = [];

  for (const app of config.applications) {
    console.log(`\n📦 Processing ${app.name} (${app.image})...`);

    // 1. Check upstream tags if pattern defined
    if (app.tag_pattern && app.registry === 'docker.io') {
      const pattern = new RegExp(app.tag_pattern);
      const upstreamTags = await getUpstreamDockerHubTags(app.image);
      const validTags = upstreamTags.filter((t) => pattern.test(t));

      if (validTags.length > 0 && app.active_versions.length > 0) {
        const currentLatest = app.active_versions[0];
        const newerTags = validTags.filter(
          (t) => compareSemver(t, currentLatest) > 0 && !app.active_versions.includes(t)
        );
        newerTags.sort(compareSemver);

        for (const newerTag of newerTags) {
          console.log(`  ✨ New version detected upstream: ${newerTag}`);
          app.active_versions.unshift(newerTag);
        }
      }
    }

    // 2. Enforce 5-version sliding window
    while (app.active_versions.length > maxActive) {
      const dropped = app.active_versions.pop();
      console.log(`  🚪 Dropping older version ${dropped} out of active support window...`);
      if (!app.deprecated_versions) app.deprecated_versions = [];
      app.deprecated_versions.unshift({
        tag: dropped,
        droppedAt: now.split('T')[0],
        advisory: `UNSUPPORTED: Version fell outside the ${maxActive}-release support window. Upgrade to ${app.active_versions[0]} immediately.`
      });
    }

    const appEntry = {
      id: app.id,
      name: app.name,
      image: app.image,
      registry: app.registry,
      monitoredVersions: [],
      deprecatedVersions: app.deprecated_versions || []
    };

    // 3. Scan each of the active versions
    for (let i = 0; i < app.active_versions.length; i++) {
      const tag = app.active_versions[i];
      const fullRef = `${app.image}:${tag}`;
      const lifecycle = getLifecycleStatus(i, app.active_versions.length);

      const trivyResult = runTrivyScan(fullRef);
      const priv = evaluatePrivilege(trivyResult);
      const vulns = parseVulnerabilities(trivyResult);
      const posture = determinePosture(vulns, priv);

      summary.totalMonitoredVersions++;
      if (priv.runAsRoot) summary.runAsRootCount++;
      summary.criticalVulnerabilityCount += vulns.critical;
      summary.highVulnerabilityCount += vulns.high;

      appEntry.monitoredVersions.push({
        tag,
        fullRef,
        rank: i + 1,
        lifecycleStatus: lifecycle.status,
        lifecycleBadge: lifecycle.badge,
        lifecycleAdvice: lifecycle.advice,
        security: {
          runAsRoot: priv.runAsRoot,
          configuredUser: priv.configuredUser,
          uidLabel: priv.uidLabel
        },
        vulnerabilities: {
          critical: vulns.critical,
          high: vulns.high,
          medium: vulns.medium,
          low: vulns.low,
          fixable: vulns.fixable,
          total: vulns.total
        },
        topCves: vulns.topCves,
        posture: posture.label,
        postureBadge: posture.badge,
        scannedAt: now
      });
    }

    applicationsReport.push(appEntry);
  }

  // Save updated tracked configuration (with shifted sliding window)
  fs.writeFileSync(TRACKED_CONFIG_FILE, JSON.stringify(config, null, 2) + '\n');
  console.log(`\n💾 Saved updated ${TRACKED_CONFIG_FILE}`);

  // Build report.json
  const reportJson = {
    schemaVersion: '1.0.0',
    summary,
    applications: applicationsReport
  };
  fs.writeFileSync(REPORT_JSON_FILE, JSON.stringify(reportJson, null, 2) + '\n');
  console.log(`💾 Generated ${REPORT_JSON_FILE} for PFNApp platform integration.`);

  // Build REPORT.md
  generateMarkdownReport(reportJson);
  console.log(`💾 Generated ${REPORT_MD_FILE} for repository governance.`);
}

function generateMarkdownReport(data) {
  const { summary, applications } = data;
  let md = '# 🛡️ Upstream Template Security & Support Window Observatory\n\n';
  md += '> Automated audit of upstream application templates evaluating non-root execution, privilege posture, and CVE metrics.\n';
  md += `> **Policy:** Active Support Window = **Latest 5 Versions (N-4)**. Older versions are automatically marked **DEPRECATED**.\n`;
  md += `> **Last Scan:** ${summary.generatedAt} | **Scanner:** ${summary.scanner}\n\n`;

  md += '### 📊 Governance Summary\n\n';
  md += `- **Applications Monitored:** \`${summary.totalApplications}\`\n`;
  md += `- **Active Versions Audited:** \`${summary.totalMonitoredVersions}\`\n`;
  const rootPct = summary.totalMonitoredVersions > 0 ? Math.round((summary.runAsRootCount / summary.totalMonitoredVersions) * 100) : 0;
  md += `- **Images Running As Root:** \`${summary.runAsRootCount}\` / \`${summary.totalMonitoredVersions}\` (⚠️ **${rootPct}%** non-compliant)\n`;
  md += `- **Total Critical CVEs:** \`${summary.criticalVulnerabilityCount}\`\n`;
  md += `- **Total High CVEs:** \`${summary.highVulnerabilityCount}\`\n\n`;

  md += '---\n\n';
  md += '## 📋 Active Support Window (Max 5 Versions per Application)\n\n';
  md += '| Application | Monitored Version | Lifecycle Status | Run As Root? | Configured UID | Vuln (C / H / M / L) | Fixable | Recommendation / Advisory |\n';
  md += '| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |\n';

  for (const app of applications) {
    let firstRow = true;
    for (const v of app.monitoredVersions) {
      const appNameCol = firstRow ? `**${app.name}**` : '';
      const rootCol = v.security.runAsRoot ? '⚠️ **YES**' : '✅ **NO**';
      const vulnCol = `${v.vulnerabilities.critical} / ${v.vulnerabilities.high} / ${v.vulnerabilities.medium} / ${v.vulnerabilities.low}`;
      md += `| ${appNameCol} | \`${v.tag}\` | ${v.lifecycleBadge} **${v.lifecycleStatus}** | ${rootCol} | \`${v.security.uidLabel}\` | ${vulnCol} | ${v.vulnerabilities.fixable} | ${v.lifecycleAdvice} |\n`;
      firstRow = false;
    }
  }

  // Deprecated table
  let hasDeprecated = false;
  for (const app of applications) {
    if (app.deprecatedVersions && app.deprecatedVersions.length > 0) {
      hasDeprecated = true;
      break;
    }
  }

  md += '\n---\n\n';
  md += '## 🚫 Deprecated / Dropped from Active Scanning\n\n';
  if (!hasDeprecated) {
    md += '_No versions currently dropped from active support window._\n\n';
  } else {
    md += '| Application | Deprecated Version | Dropped On | Advisory to Users |\n';
    md += '| :--- | :--- | :---: | :--- |\n';
    for (const app of applications) {
      for (const d of app.deprecatedVersions) {
        md += `| **${app.name}** | \`${d.tag}\` | ${d.droppedAt} | ⛔ **UNSUPPORTED**: ${d.advisory} |\n`;
      }
    }
    md += '\n';
  }

  // Actionable remediation details
  md += '---\n\n';
  md += '## 🔍 Actionable Vulnerability Details per Latest Release\n\n';
  for (const app of applications) {
    const latest = app.monitoredVersions[0];
    if (!latest) continue;

    md += `<details>\n<summary><b>${app.name} (<code>${latest.tag}</code>) - ${latest.vulnerabilities.critical} Critical, ${latest.vulnerabilities.high} High</b></summary>\n\n`;
    md += `- **Full Reference:** \`${latest.fullRef}\`\n`;
    md += `- **Root Status:** ${latest.security.runAsRoot ? '⚠️ Runs as root' : '✅ Runs non-root'} (\`${latest.security.uidLabel}\`)\n`;
    md += `- **Posture:** ${latest.postureBadge} ${latest.posture}\n\n`;

    if (latest.topCves && latest.topCves.length > 0) {
      md += '| CVE ID | Severity | Affected Package | Installed | Fixed Version |\n';
      md += '| :--- | :---: | :--- | :--- | :--- |\n';
      for (const c of latest.topCves) {
        md += `| \`${c.id}\` | **${c.severity}** | \`${c.pkg}\` | \`${c.installedVersion}\` | \`${c.fixedVersion}\` |\n`;
      }
    } else {
      md += '_No Critical or High vulnerabilities detected in this release._\n';
    }
    md += '\n</details>\n\n';
  }

  fs.writeFileSync(REPORT_MD_FILE, md);
}

main().catch((err) => {
  console.error('Fatal error in upstream observatory:', err);
  process.exit(1);
});
