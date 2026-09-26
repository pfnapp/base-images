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
const TRACKED_CONFIG_FILE = path.join(ROOT_DIR, 'observatory.json');
const CACHE_DIR = path.join(ROOT_DIR, '.cache');
const SCAN_DETAILS_DIR = path.join(ROOT_DIR, 'scan-details');
const REPORT_JSON_FILE = path.join(ROOT_DIR, 'report.json');
const REPORT_MD_FILE = path.join(ROOT_DIR, 'REPORT.md');
const DETECTED_RELEASES_FILE = path.join(ROOT_DIR, 'detected-releases.json');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}
if (!fs.existsSync(SCAN_DETAILS_DIR)) {
  fs.mkdirSync(SCAN_DETAILS_DIR, { recursive: true });
}

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'pfnapp-observatory/1.0', ...headers } }, (res) => {
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
    const url = `https://registry.hub.docker.com/v2/repositories/${imageName}/tags?page_size=100&ordering=last_updated`;
    const data = await fetchJson(url);
    return (data.results || []).map((r) => r.name);
  } catch (err) {
    console.warn(`  ⚠️ Could not fetch remote tags for ${imageName}: ${err.message}`);
    return [];
  }
}

async function getUpstreamGhcrTags(imageName) {
  try {
    const tokenUrl = `https://ghcr.io/token?scope=${encodeURIComponent(`repository:${imageName}:pull`)}`;
    const tokenData = await fetchJson(tokenUrl);
    const token = tokenData.token || tokenData.access_token;
    if (!token) throw new Error('GHCR did not return a pull token');

    // One small page is enough for release discovery; we deliberately do not
    // mirror or retain the registry's complete tag history.
    const data = await fetchJson(`https://ghcr.io/v2/${imageName}/tags/list?n=100`, {
      Authorization: `Bearer ${token}`
    });
    return data.tags || [];
  } catch (err) {
    console.warn(`  ⚠️ Could not fetch remote tags for ghcr.io/${imageName}: ${err.message}`);
    return [];
  }
}

async function getUpstreamTags(app) {
  if (app.registry === 'docker.io') return getUpstreamDockerHubTags(app.image);
  if (app.registry === 'ghcr.io') return getUpstreamGhcrTags(app.image);
  console.warn(`  ⚠️ Unsupported registry for ${app.name}: ${app.registry}`);
  return [];
}

async function discoverLatestRelease(app) {
  if (!app.tag_pattern) return null;

  const pattern = new RegExp(app.tag_pattern);
  const tags = await getUpstreamTags(app);
  const validTags = tags.filter((tag) => pattern.test(tag));
  if (validTags.length === 0) return null;

  return validTags.reduce((latest, tag) => compareSemver(tag, latest) > 0 ? tag : latest);
}

function updateReleaseWindow(app, latestTag, maxActive, now) {
  if (!latestTag) return { changed: false, dropped: [] };

  const currentLatest = app.active_versions?.[0];
  if (currentLatest && compareSemver(latestTag, currentLatest) <= 0) {
    return { changed: false, dropped: [] };
  }

  if (!app.active_versions) app.active_versions = [];
  app.active_versions = [latestTag, ...app.active_versions.filter((tag) => tag !== latestTag)];

  const dropped = [];
  while (app.active_versions.length > maxActive) {
    const tag = app.active_versions.pop();
    dropped.push(tag);
    if (!app.deprecated_versions) app.deprecated_versions = [];
    app.deprecated_versions.unshift({
      tag,
      droppedAt: now.split('T')[0],
      advisory: `UNSUPPORTED: Version fell outside the ${maxActive}-release support window. Upgrade to ${latestTag} immediately.`
    });
  }

  return { changed: true, previousLatest: currentLatest || null, dropped };
}

async function checkReleasesOnly() {
  console.log('🔎 Checking latest upstream application releases...');
  const config = JSON.parse(fs.readFileSync(TRACKED_CONFIG_FILE, 'utf8'));
  const maxActive = config.policy?.max_active_versions || 5;
  const now = new Date().toISOString();
  let changedCount = 0;
  const detectedReleases = [];

  for (const app of config.applications) {
    const latestTag = await discoverLatestRelease(app);
    if (!latestTag) {
      console.log(`  ⚠️ ${app.name}: no matching release tag found`);
      continue;
    }

    const result = updateReleaseWindow(app, latestTag, maxActive, now);
    if (result.changed) {
      changedCount++;
      const fullRef = app.registry === 'ghcr.io' && !app.image.startsWith('ghcr.io/')
        ? `ghcr.io/${app.image}:${latestTag}`
        : `${app.image}:${latestTag}`;
      detectedReleases.push({
        id: app.id,
        name: app.name,
        previousVersion: result.previousLatest,
        version: latestTag,
        registry: app.registry,
        image: app.image,
        imageRef: fullRef,
        pfnappImageRef: `ghcr.io/pfnapp/${app.id}:${latestTag}`,
        detectedAt: now
      });
      console.log(`  ✨ ${app.name}: ${result.previousLatest || 'none'} → ${latestTag}`);

      // Synchronize patches/<app.id>/runtime-manifest.json if present
      const manifestPath = path.join(ROOT_DIR, 'patches', app.id, 'runtime-manifest.json');
      if (fs.existsSync(manifestPath)) {
        try {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          manifest.version = latestTag;
          manifest.baseImage = `ghcr.io/pfnapp/${app.id}:${latestTag}`;
          fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
          console.log(`  📄 Synchronized patches/${app.id}/runtime-manifest.json to ${latestTag}`);
        } catch (mErr) {
          console.warn(`  ⚠️ Could not update manifest for ${app.id}: ${mErr.message}`);
        }
      }

      // Synchronize patches/<app.id>/Dockerfile if present
      const dockerfilePath = path.join(ROOT_DIR, 'patches', app.id, 'Dockerfile');
      if (fs.existsSync(dockerfilePath)) {
        try {
          let dfContent = fs.readFileSync(dockerfilePath, 'utf8');
          if (dfContent.includes('ARG TAG=')) {
            dfContent = dfContent.replace(/ARG TAG=.*/, `ARG TAG=${latestTag}`);
            fs.writeFileSync(dockerfilePath, dfContent);
            console.log(`  🐳 Synchronized patches/${app.id}/Dockerfile ARG TAG to ${latestTag}`);
          } else if (result.previousLatest && dfContent.includes(result.previousLatest)) {
            dfContent = dfContent.replace(new RegExp(result.previousLatest.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), latestTag);
            fs.writeFileSync(dockerfilePath, dfContent);
            console.log(`  🐳 Synchronized patches/${app.id}/Dockerfile upstream tag to ${latestTag}`);
          }
        } catch (dfErr) {
          console.warn(`  ⚠️ Could not update Dockerfile for ${app.id}: ${dfErr.message}`);
        }
      }
    } else {
      console.log(`  ✅ ${app.name}: ${app.active_versions[0]}`);
    }
  }

  if (changedCount > 0) {
    fs.writeFileSync(TRACKED_CONFIG_FILE, JSON.stringify(config, null, 2) + '\n');
    console.log(`💾 Updated observatory.json (${changedCount} application(s))`);
  } else {
    console.log('✅ No new upstream releases detected.');
  }

  fs.writeFileSync(DETECTED_RELEASES_FILE, JSON.stringify(detectedReleases, null, 2) + '\n');
  console.log(`📣 Wrote ${detectedReleases.length} release event(s) to ${DETECTED_RELEASES_FILE}`);
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
    const trivyIgnoreOpt = fs.existsSync(path.join(ROOT_DIR, '.trivyignore'))
      ? `--ignorefile "${path.join(ROOT_DIR, '.trivyignore')}"`
      : '';
    const cacheDirOpt = process.env.TRIVY_CACHE_DIR
      ? `--cache-dir "${process.env.TRIVY_CACHE_DIR}"`
      : '';

    if (process.env.USE_DOCKER_TRIVY === 'true' || !isCommandAvailable('trivy')) {
      const dockerMountIgnore = fs.existsSync(path.join(ROOT_DIR, '.trivyignore'))
        ? `-v "${path.join(ROOT_DIR, '.trivyignore')}:/.trivyignore:ro"`
        : '';
      const dockerIgnoreOpt = fs.existsSync(path.join(ROOT_DIR, '.trivyignore'))
        ? '--ignorefile /.trivyignore'
        : '';
      output = execSync(
        `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock ${dockerMountIgnore} aquasec/trivy:latest image --scanners vuln ${dockerIgnoreOpt} --format json --quiet "${imageRef}"`,
        { maxBuffer: 50 * 1024 * 1024, timeout: 180000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
      );
    } else {
      output = execSync(
        `trivy image --scanners vuln ${trivyIgnoreOpt} ${cacheDirOpt} --format json --quiet "${imageRef}"`,
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

function runTrivyScanPfnapp(appId, tag) {
  const pfnRef = `ghcr.io/pfnapp/${appId}:${tag}`;
  // PFNApp tags are rebuilt in place every day. A tag-keyed cache would keep
  // reporting the previous image's CVEs after a successful rebuild.

  console.log(`  🔍 Scanning PFNApp image ${pfnRef}...`);
  try {
    let output;
    const trivyIgnoreOpt = fs.existsSync(path.join(ROOT_DIR, '.trivyignore'))
      ? `--ignorefile "${path.join(ROOT_DIR, '.trivyignore')}"`
      : '';
    const cacheDirOpt = process.env.TRIVY_CACHE_DIR
      ? `--cache-dir "${process.env.TRIVY_CACHE_DIR}"`
      : '';

    if (process.env.USE_DOCKER_TRIVY === 'true' || !isCommandAvailable('trivy')) {
      const dockerMountIgnore = fs.existsSync(path.join(ROOT_DIR, '.trivyignore'))
        ? `-v "${path.join(ROOT_DIR, '.trivyignore')}:/.trivyignore:ro"`
        : '';
      const dockerIgnoreOpt = fs.existsSync(path.join(ROOT_DIR, '.trivyignore'))
        ? '--ignorefile /.trivyignore'
        : '';
      output = execSync(
        `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock ${dockerMountIgnore} aquasec/trivy:latest image --scanners vuln ${dockerIgnoreOpt} --format json --quiet "${pfnRef}"`,
        { maxBuffer: 50 * 1024 * 1024, timeout: 180000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
      );
    } else {
      output = execSync(
        `trivy image --scanners vuln ${trivyIgnoreOpt} ${cacheDirOpt} --format json --quiet "${pfnRef}"`,
        { maxBuffer: 50 * 1024 * 1024, timeout: 180000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
      );
    }
    const parsed = JSON.parse(output);
    return parsed;
  } catch (err) {
    if (err.message && (err.message.includes('UNAUTHORIZED') || err.message.includes('not found') || err.message.includes('manifest unknown'))) {
      console.log(`  ⏳ PFNApp image ${pfnRef} not yet available in GHCR — skipping`);
    } else {
      console.warn(`  ⚠️  PFNApp scan failed for ${pfnRef}: ${err.message?.slice(0, 100)}`);
    }
    return null;
  }
}

function computeReduction(upstream, pfnapp) {
  const reduce = (a, b, key) => (b?.[key] ?? 0) - (a?.[key] ?? 0);
  return {
    system: {
      critical: reduce(upstream.system, pfnapp?.system, 'critical'),
      high:     reduce(upstream.system, pfnapp?.system, 'high'),
      medium:   reduce(upstream.system, pfnapp?.system, 'medium'),
      low:      reduce(upstream.system, pfnapp?.system, 'low'),
      total:    reduce(upstream.system, pfnapp?.system, 'total'),
    },
    app: {
      critical: reduce(upstream.app, pfnapp?.app, 'critical'),
      high:     reduce(upstream.app, pfnapp?.app, 'high'),
      total:    reduce(upstream.app, pfnapp?.app, 'total'),
    }
  };
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

function makeVulnBucket() {
  return { critical: 0, high: 0, medium: 0, low: 0, fixable: 0, total: 0, topCves: [], allCves: [] };
}

function countVuln(bucket, v) {
  const sev = (v.Severity || '').toUpperCase();
  if (sev === 'CRITICAL') bucket.critical++;
  else if (sev === 'HIGH') bucket.high++;
  else if (sev === 'MEDIUM') bucket.medium++;
  else if (sev === 'LOW') bucket.low++;
  if (v.FixedVersion) bucket.fixable++;
  bucket.total++;

  // top-5 C/H for inline display in report.json
  if ((sev === 'CRITICAL' || sev === 'HIGH') && bucket.topCves.length < 5) {
    bucket.topCves.push({
      id: v.VulnerabilityID,
      pkg: v.PkgName,
      installedVersion: v.InstalledVersion,
      fixedVersion: v.FixedVersion || 'None',
      severity: sev,
      title: v.Title || v.VulnerabilityID
    });
  }

  // full list for scan-details export
  bucket.allCves.push({
    id: v.VulnerabilityID,
    pkg: v.PkgName,
    installedVersion: v.InstalledVersion,
    fixedVersion: v.FixedVersion || 'None',
    severity: sev,
    title: v.Title || v.VulnerabilityID
  });
}

/**
 * Splits vulnerabilities into two buckets:
 *   system  — Class: os-pkgs (debian, alpine, ubuntu, etc.)
 *             These are OS-level packages. We can mitigate by running
 *             `apk upgrade` or `apt-get upgrade` in the base image build.
 *   app     — Class: lang-pkgs (node-pkg, gobinary, python-pkg, gem, etc.)
 *             These live inside the upstream app itself. We cannot fix them;
 *             only the upstream maintainer can by releasing a new version.
 */
function parseVulnerabilities(trivyResult) {
  const system = makeVulnBucket();
  const app    = makeVulnBucket();

  const results = trivyResult?.Results || [];
  for (const res of results) {
    const isSystem = res.Class === 'os-pkgs';
    const bucket   = isSystem ? system : app;
    for (const v of (res.Vulnerabilities || [])) {
      countVuln(bucket, v);
    }
  }

  return { system, app };
}

/**
 * Posture is driven by app-level CVEs only.
 * System CVEs are actionable on our side and should not penalise the upstream app.
 */
function determinePosture(vulns, priv) {
  const app = vulns.app;
  if (app.critical > 0) return { label: 'APP CRITICAL RISK', badge: '🔴' };
  if (app.high > 0)     return { label: 'APP HIGH RISK',     badge: '🟠' };
  if (priv.runAsRoot)   return { label: 'NON-COMPLIANT (ROOT)', badge: '🟡' };
  return { label: 'COMPLIANT', badge: '🟢' };
}

function getLifecycleStatus(index, total) {
  if (index === 0) return { status: 'LATEST', badge: '🟢', advice: 'Recommended active release' };
  if (index === 1 || index === 2) return { status: 'SUPPORTED', badge: '🟢', advice: 'Actively maintained' };
  if (index === 3) return { status: 'AGING', badge: '🟠', advice: 'Plan upgrade to latest' };
  if (index === 4) return { status: 'EOL SOON', badge: '🔴', advice: 'Next upstream release will deprecate this version' };
  return { status: 'DEPRECATED', badge: '⛔', advice: 'Unsupported. Upgrade immediately' };
}

/**
 * Exports full CVE lists to scan-details/{appId}/{tag}/upstream.json
 * and scan-details/{appId}/{tag}/pfnapp.json for the diff viewer.
 * These files are published to the gh-pages branch only — not committed to main.
 */
function exportScanDetails(appId, tag, upstreamVulns, pfnappVulns) {
  // Sanitize tag for use as a directory name (e.g. "v2026.9.14" → safe as-is)
  const tagDir = tag.replace(/[^a-zA-Z0-9._-]/g, '_');
  const dir = path.join(SCAN_DETAILS_DIR, appId, tagDir);
  fs.mkdirSync(dir, { recursive: true });

  // upstream.json — flat sorted list of all CVEs (system + app)
  const upstreamExport = {
    scannedAt: new Date().toISOString(),
    system: {
      total: upstreamVulns.system.total,
      cves: upstreamVulns.system.allCves
    },
    app: {
      total: upstreamVulns.app.total,
      cves: upstreamVulns.app.allCves
    }
  };
  fs.writeFileSync(path.join(dir, 'upstream.json'), JSON.stringify(upstreamExport, null, 2));

  // pfnapp.json — only written when scan succeeded
  if (pfnappVulns) {
    const pfnExport = {
      scannedAt: new Date().toISOString(),
      system: {
        total: pfnappVulns.system.total,
        cves: pfnappVulns.system.allCves
      },
      app: {
        total: pfnappVulns.app.total,
        cves: pfnappVulns.app.allCves
      }
    };
    fs.writeFileSync(path.join(dir, 'pfnapp.json'), JSON.stringify(pfnExport, null, 2));
  }

  console.log(`  📄 Exported scan details → scan-details/${appId}/${tagDir}/`);
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
    highVulnerabilityCount: 0,
    pfnappScannedCount: 0,
    totalCveReduction: 0
  };

  const applicationsReport = [];

  for (const app of config.applications) {
    console.log(`\n📦 Processing ${app.name} (${app.image})...`);

    // 1. Check only the latest matching release and update the sliding window.
    const latestTag = await discoverLatestRelease(app);
    const releaseUpdate = updateReleaseWindow(app, latestTag, maxActive, now);
    if (releaseUpdate.changed) {
      console.log(`  ✨ New version detected upstream: ${latestTag}`);
      for (const dropped of releaseUpdate.dropped) {
        console.log(`  🚪 Dropping older version ${dropped} out of active support window...`);
      }
    }

    const appEntry = {
      id: app.id,
      name: app.name,
      category: app.category || 'General',
      image: app.image,
      registry: app.registry,
      monitoredVersions: [],
      deprecatedVersions: app.deprecated_versions || []
    };

    // 3. Scan each of the active versions
    for (let i = 0; i < app.active_versions.length; i++) {
      const tag = app.active_versions[i];
      const fullRef = app.registry === 'ghcr.io' && !app.image.startsWith('ghcr.io/') ? `ghcr.io/${app.image}:${tag}` : `${app.image}:${tag}`;
      const lifecycle = getLifecycleStatus(i, app.active_versions.length);

      const trivyResult = runTrivyScan(fullRef);
      const priv = evaluatePrivilege(trivyResult);
      const vulns = parseVulnerabilities(trivyResult);
      const posture = determinePosture(vulns, priv);

      // Scan PFNApp image
      const pfnappTrivyResult = runTrivyScanPfnapp(app.id, tag);
      const pfnappVulns = pfnappTrivyResult ? parseVulnerabilities(pfnappTrivyResult) : null;
      const reduction = pfnappVulns ? computeReduction(vulns, pfnappVulns) : null;

      // Export full CVE lists to scan-details/{app-id}/{tag}/
      exportScanDetails(app.id, tag, vulns, pfnappVulns);

      summary.totalMonitoredVersions++;
      if (priv.runAsRoot) summary.runAsRootCount++;
      summary.criticalVulnerabilityCount += vulns.app.critical;
      summary.highVulnerabilityCount += vulns.app.high;
      if (pfnappVulns) {
        summary.pfnappScannedCount = (summary.pfnappScannedCount || 0) + 1;
        summary.totalCveReduction += Math.max(0, reduction.system.total);
      }

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
          upstream: {
            system: {
              critical: vulns.system.critical,
              high: vulns.system.high,
              medium: vulns.system.medium,
              low: vulns.system.low,
              fixable: vulns.system.fixable,
              total: vulns.system.total,
            },
            app: {
              critical: vulns.app.critical,
              high: vulns.app.high,
              medium: vulns.app.medium,
              low: vulns.app.low,
              fixable: vulns.app.fixable,
              total: vulns.app.total,
            }
          },
          pfnapp: pfnappVulns ? {
            scanned: true,
            system: pfnappVulns.system,
            app:    pfnappVulns.app,
          } : { scanned: false },
          reduction: reduction,
        },
        topAppCves:    vulns.app.topCves,
        topSystemCves: vulns.system.topCves,
        posture: posture.label,
        postureBadge: posture.badge,
        scannedAt: now
      });
    }

    applicationsReport.push(appEntry);
  }

  // Save updated observatory config (with shifted sliding window)
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
  md += `- **App Critical CVEs** _(upstream, unfixable by us)_**:** \`${summary.criticalVulnerabilityCount}\`\n`;
  md += `- **App High CVEs** _(upstream, unfixable by us)_**:** \`${summary.highVulnerabilityCount}\`\n`;
  md += `- **PFNApp Images Scanned:** \`${summary.pfnappScannedCount}\` / \`${summary.totalMonitoredVersions}\`\n`;
  md += `- **Total System CVE Reduction:** \`${summary.totalCveReduction}\`\n\n`;
  md += '> **CVE split:** `system` = OS packages fixable via `apk upgrade` / `apt-get upgrade`. `app` = upstream app dependencies, only the maintainer can fix.\n\n';

  md += '---\n\n';
  md += '## 📋 Active Support Window (Max 5 Versions per Application)\n\n';
  md += '| Application | Category | Version | Lifecycle | Root? | Upstream Sys (C/H/M/L) | Upstream App (C/H/M/L) | PFNApp Sys (C/H/M/L) | PFNApp App (C/H/M/L) | Reduction (Sys C/H) | Posture |\n';
  md += '| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |\n';

  for (const app of applications) {
    let firstRow = true;
    for (const v of app.monitoredVersions) {
      const appNameCol  = firstRow ? `**${app.name}**` : '';
      const categoryCol = firstRow ? `_${app.category}_` : '';
      const rootCol     = v.security.runAsRoot ? '⚠️ YES' : '✅ NO';
      const upSys  = `${v.vulnerabilities.upstream.system.critical}/${v.vulnerabilities.upstream.system.high}/${v.vulnerabilities.upstream.system.medium}/${v.vulnerabilities.upstream.system.low}`;
      const upApp  = `${v.vulnerabilities.upstream.app.critical}/${v.vulnerabilities.upstream.app.high}/${v.vulnerabilities.upstream.app.medium}/${v.vulnerabilities.upstream.app.low}`;
      let pfnSys, pfnApp, reductionCol;
      if (v.vulnerabilities.pfnapp.scanned) {
        pfnSys = `${v.vulnerabilities.pfnapp.system.critical}/${v.vulnerabilities.pfnapp.system.high}/${v.vulnerabilities.pfnapp.system.medium}/${v.vulnerabilities.pfnapp.system.low}`;
        pfnApp = `${v.vulnerabilities.pfnapp.app.critical}/${v.vulnerabilities.pfnapp.app.high}/${v.vulnerabilities.pfnapp.app.medium}/${v.vulnerabilities.pfnapp.app.low}`;
        const r = v.vulnerabilities.reduction;
        reductionCol = `${r.system.critical}/${r.system.high}`;
      } else {
        pfnSys = '⏳';
        pfnApp = '⏳';
        reductionCol = '⏳';
      }
      md += `| ${appNameCol} | ${categoryCol} | \`${v.tag}\` | ${v.lifecycleBadge} **${v.lifecycleStatus}** | ${rootCol} | ${upSys} | ${upApp} | ${pfnSys} | ${pfnApp} | ${reductionCol} | ${v.postureBadge} ${v.posture} |\n`;
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

    const appC = latest.vulnerabilities.upstream.app.critical;
    const appH = latest.vulnerabilities.upstream.app.high;
    const sysC = latest.vulnerabilities.upstream.system.critical;
    const sysH = latest.vulnerabilities.upstream.system.high;

    md += `<details>\n<summary><b>${app.name} (<code>${latest.tag}</code>) — App: ${appC} Critical, ${appH} High | System: ${sysC} Critical, ${sysH} High</b></summary>\n\n`;
    md += `- **Full Reference:** \`${latest.fullRef}\`\n`;
    md += `- **Root Status:** ${latest.security.runAsRoot ? '⚠️ Runs as root' : '✅ Runs non-root'} (\`${latest.security.uidLabel}\`)\n`;
    md += `- **Posture:** ${latest.postureBadge} ${latest.posture}\n\n`;

    // App CVEs
    md += `#### 🔴 App CVEs _(upstream dependency — only fixable by maintainer)_\n\n`;
    if (latest.topAppCves && latest.topAppCves.length > 0) {
      md += '| CVE ID | Severity | Package | Installed | Fixed Version |\n';
      md += '| :--- | :---: | :--- | :--- | :--- |\n';
      for (const c of latest.topAppCves) {
        md += `| \`${c.id}\` | **${c.severity}** | \`${c.pkg}\` | \`${c.installedVersion}\` | \`${c.fixedVersion}\` |\n`;
      }
    } else {
      md += '_No Critical or High app-level vulnerabilities detected._\n';
    }

    md += '\n';

    // System CVEs
    md += `#### 🟡 System CVEs _(OS packages — mitigable via \`apk upgrade\` / \`apt-get upgrade\`)_\n\n`;
    if (latest.topSystemCves && latest.topSystemCves.length > 0) {
      md += '| CVE ID | Severity | Package | Installed | Fixed Version |\n';
      md += '| :--- | :---: | :--- | :--- | :--- |\n';
      for (const c of latest.topSystemCves) {
        md += `| \`${c.id}\` | **${c.severity}** | \`${c.pkg}\` | \`${c.installedVersion}\` | \`${c.fixedVersion}\` |\n`;
      }
    } else {
      md += '_No Critical or High system-level vulnerabilities detected._\n';
    }

    // PFNApp reduction table
    if (latest.vulnerabilities.pfnapp.scanned && latest.vulnerabilities.reduction) {
      const r = latest.vulnerabilities.reduction;
      md += '\n#### 🟢 PFNApp CVE Reduction (Upstream → PFNApp Hardened)\n\n';
      md += '| Layer | Critical Δ | High Δ | Medium Δ | Low Δ | Total Δ |\n';
      md += '| :--- | :---: | :---: | :---: | :---: | :---: |\n';
      md += `| System | ${r.system.critical} | ${r.system.high} | ${r.system.medium} | ${r.system.low} | ${r.system.total} |\n`;
      md += `| App | ${r.app.critical} | ${r.app.high} | — | — | ${r.app.total} |\n`;
    } else if (!latest.vulnerabilities.pfnapp.scanned) {
      md += '\n> ⏳ **PFNApp image not yet built** — reduction data pending.\n';
    }

    md += '\n</details>\n\n';
  }

  fs.writeFileSync(REPORT_MD_FILE, md);
}

const command = process.argv.includes('--check-releases') ? checkReleasesOnly : main;

command().catch((err) => {
  console.error('Fatal error in upstream observatory:', err);
  process.exit(1);
});
