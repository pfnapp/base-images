#!/usr/bin/env node

/**
 * scripts/base-image-scanner.js
 *
 * PFNApp Base Image Security Scanner
 * 1. Reads matrix.json to discover all language and framework image versions.
 * 2. Reads runtime-manifest.json for each image's security settings.
 * 3. Scans each image with Aqua Trivy for CVEs (system vs. app buckets).
 * 4. Determines lifecycle status and security posture per version.
 * 5. Emits base-report.json to the repo root.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

const ROOT_DIR  = path.join(__dirname, '..');
const CACHE_DIR = path.join(ROOT_DIR, '.cache');
const SCAN_DETAILS_DIR = path.join(ROOT_DIR, 'scan-details');
const MATRIX_FILE  = path.join(ROOT_DIR, 'matrix.json');
const REPORT_FILE  = path.join(ROOT_DIR, 'base-report.json');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}
if (!fs.existsSync(SCAN_DETAILS_DIR)) {
  fs.mkdirSync(SCAN_DETAILS_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// EOL product mapping
// ---------------------------------------------------------------------------

const EOL_PRODUCT_MAP = {
  node:   'nodejs',
  php:    'php',
  python: 'python',
  go:     'go',
  java:   'eclipse-temurin',
  bun:    'bun',
};

// ---------------------------------------------------------------------------
// Utility helpers (same patterns as upstream-observatory.js)
// ---------------------------------------------------------------------------

/**
 * Fetches EOL release data from endoflife.date for a given product ID.
 * Returns a Map keyed by release name (e.g. "22", "8.3", "1.23").
 */
function fetchEolData(productId) {
  return new Promise((resolve) => {
    const url = `https://endoflife.date/api/v1/products/${productId}`;
    https.get(url, { headers: { 'accept': '*/*' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          const releases = data?.result?.releases || [];
          const map = new Map();
          for (const r of releases) {
            if (r.name) map.set(r.name, r);
          }
          console.log(`  📅 EOL data loaded for ${productId}: ${map.size} releases`);
          resolve(map);
        } catch (e) {
          console.warn(`  ⚠️  Failed to parse EOL data for ${productId}: ${e.message}`);
          resolve(new Map());
        }
      });
    }).on('error', (e) => {
      console.warn(`  ⚠️  Failed to fetch EOL data for ${productId}: ${e.message}`);
      resolve(new Map());
    });
  });
}

function isCommandAvailable(cmd) {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
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
      // Invalid cache — fall through to live scan
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

function makeVulnBucket() {
  return { critical: 0, high: 0, medium: 0, low: 0, fixable: 0, total: 0, allCves: [] };
}

function countVuln(bucket, v) {
  const sev = (v.Severity || '').toUpperCase();
  if (sev === 'CRITICAL')    bucket.critical++;
  else if (sev === 'HIGH')   bucket.high++;
  else if (sev === 'MEDIUM') bucket.medium++;
  else if (sev === 'LOW')    bucket.low++;
  if (v.FixedVersion) bucket.fixable++;
  bucket.total++;
  bucket.allCves.push({
    id:               v.VulnerabilityID,
    pkg:              v.PkgName,
    installedVersion: v.InstalledVersion,
    fixedVersion:     v.FixedVersion || 'None',
    severity:         sev,
    title:            v.Title || v.VulnerabilityID,
  });
}

/**
 * Splits vulnerabilities into two buckets:
 *   system  — Class: os-pkgs (Alpine/Debian OS packages).
 *             Mitigable on our side via `apk upgrade` / `apt-get upgrade`.
 *   app     — Class: lang-pkgs (node-pkg, composer, gobinary, python-pkg, etc.).
 *             Only the upstream maintainer can fix these.
 */
function parseVulnerabilities(trivyResult) {
  const system = makeVulnBucket();
  const app    = makeVulnBucket();
  const topCves = [];

  const results = trivyResult?.Results || [];
  for (const res of results) {
    const isSystem = res.Class === 'os-pkgs';
    const bucket   = isSystem ? system : app;
    for (const v of (res.Vulnerabilities || [])) {
      countVuln(bucket, v);
      const sev = (v.Severity || '').toUpperCase();
      if ((sev === 'CRITICAL' || sev === 'HIGH') && topCves.length < 5) {
        topCves.push({
          id: v.VulnerabilityID,
          pkg: v.PkgName,
          installedVersion: v.InstalledVersion,
          fixedVersion: v.FixedVersion || 'None',
          severity: sev,
          title: v.Title || v.VulnerabilityID,
          layer: isSystem ? 'system' : 'app'
        });
      }
    }
  }

  return { system, app, topCves };
}

/**
 * Exports full CVE lists to scan-details/{imageId}/{tag}/upstream.json
 * These files are published to gh-pages only — not committed to main.
 */
function exportScanDetails(imageId, tag, vulns) {
  const tagDir = tag.replace(/[^a-zA-Z0-9._-]/g, '_');
  const dir    = path.join(SCAN_DETAILS_DIR, imageId, tagDir);
  fs.mkdirSync(dir, { recursive: true });

  const out = {
    scannedAt: new Date().toISOString(),
    system: { total: vulns.system.total, cves: vulns.system.allCves },
    app:    { total: vulns.app.total,    cves: vulns.app.allCves    },
  };
  fs.writeFileSync(path.join(dir, 'upstream.json'), JSON.stringify(out, null, 2));
  console.log(`  📄 Exported scan details → scan-details/${imageId}/${tagDir}/upstream.json`);
}

// ---------------------------------------------------------------------------
// Posture determination (driven by app-level CVEs only)
// ---------------------------------------------------------------------------

function determinePosture(vulns, runAsUser) {
  const app = vulns.app;
  if (app.critical > 0)       return { label: 'CRITICAL RISK', badge: '🔴' };
  if (app.high > 0)           return { label: 'HIGH RISK',      badge: '🟠' };
  if (app.medium > 0)         return { label: 'MEDIUM RISK',    badge: '🟡' };
  if (runAsUser === 10001)     return { label: 'COMPLIANT',      badge: '🟢' };
  return { label: 'COMPLIANT', badge: '🟢' };
}

// ---------------------------------------------------------------------------
// Lifecycle status from matrix fields
// ---------------------------------------------------------------------------

/**
 * Returns lifecycle status for a given version string against the runtime
 * spec extracted from matrix.json (active_lts, maintenance_lts, supported,
 * legacy, default).
 */
function getLifecycleStatus(version, spec) {
  const defaultVer       = spec.default || null;
  const activeLts        = spec.active_lts        || [];
  const maintenanceLts   = spec.maintenance_lts   || [];
  const supported        = spec.supported         || [];
  const legacy           = spec.legacy            || [];

  if (version === defaultVer)              return { status: 'LATEST',      badge: '🟢' };
  if (activeLts.includes(version))        return { status: 'SUPPORTED',   badge: '🟢' };
  if (supported.includes(version))        return { status: 'SUPPORTED',   badge: '🟢' };
  if (maintenanceLts.includes(version))   return { status: 'MAINTENANCE', badge: '🟠' };
  if (legacy.includes(version))          return { status: 'MAINTENANCE', badge: '🟠' };
  return { status: 'EOL', badge: '🔴' };
}

// ---------------------------------------------------------------------------
// Runtime manifest reader
// ---------------------------------------------------------------------------

function readRuntimeManifest(type, id) {
  const manifestPath = path.join(ROOT_DIR, `${type}s`, id, 'runtime-manifest.json');
  if (!fs.existsSync(manifestPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Image ref builders
// ---------------------------------------------------------------------------

const LANGUAGE_TAG_SUFFIX = {
  node:   (v) => `${v}-alpine`,
  php:    (v) => `${v}-alpine`,
  bun:    (v) => `${v}-alpine`,
  python: (v) => `${v}-slim`,
  go:     (v) => `${v}-alpine`,
  java:   (v) => `${v}-alpine`,
};

const LANGUAGE_IMAGE_BASE = 'ghcr.io/pfnapp/base/languages';
const FRAMEWORK_IMAGE_BASE = 'ghcr.io/pfnapp/base/frameworks';

function buildLanguageImageRef(id, version) {
  const suffix = LANGUAGE_TAG_SUFFIX[id];
  if (!suffix) throw new Error(`Unknown language: ${id}`);
  return `${LANGUAGE_IMAGE_BASE}/${id}:${suffix(version)}`;
}

function buildFrameworkImageRef(id, frameworkVersion, runtimeVersion) {
  if (id === 'vite') {
    return `${FRAMEWORK_IMAGE_BASE}/vite:latest`;
  }
  if (id === 'laravel') {
    return `${FRAMEWORK_IMAGE_BASE}/laravel:${frameworkVersion}-php${runtimeVersion}-alpine`;
  }
  // nextjs, nestjs — node-based frameworks
  return `${FRAMEWORK_IMAGE_BASE}/${id}:${frameworkVersion}-node${runtimeVersion}-alpine`;
}

// ---------------------------------------------------------------------------
// Collect unique runtime versions from a framework's compatibility_matrix
// ---------------------------------------------------------------------------

function uniqueRuntimeVersions(compatibilityMatrix) {
  const seen = new Set();
  for (const entry of compatibilityMatrix) {
    for (const rv of (entry.compatible_runtimes || [])) {
      seen.add(rv);
    }
  }
  return [...seen].sort();
}

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------

const ICONS = {
  node:   '⬡',
  php:    '🐘',
  python: '🐍',
  go:     '🐹',
  java:   '☕',
  bun:    '🥟',
  laravel: '🔺',
  nextjs:  '▲',
  nestjs:  '🐈',
  vite:    '⚡',
};

// ---------------------------------------------------------------------------
// Human-readable display names
// ---------------------------------------------------------------------------

const DISPLAY_NAMES = {
  node:    'Node.js',
  php:     'PHP',
  python:  'Python',
  go:      'Go',
  java:    'Java',
  bun:     'Bun',
  laravel: 'Laravel',
  nextjs:  'Next.js',
  nestjs:  'NestJS',
  vite:    'Vite',
};

// ---------------------------------------------------------------------------
// Version tag → human-readable label  (e.g. "22-alpine" → "22")
// ---------------------------------------------------------------------------

function versionLabel(tag) {
  return tag
    .replace(/-alpine$/, '')
    .replace(/-slim$/, '')
    .replace(/^php/, 'php ')
    .replace(/^node/, 'node ');
}

// ---------------------------------------------------------------------------
// Build a scanned version entry
// ---------------------------------------------------------------------------

function buildVersionEntry(imageId, imageRef, tag, lifecycleStatus, lifecycleBadge, securityManifest, now, eolInfo = null) {
  const trivyResult = runTrivyScan(imageRef);
  const vulns       = trivyResult ? parseVulnerabilities(trivyResult) : { system: makeVulnBucket(), app: makeVulnBucket(), topCves: [] };

  // Export full CVE list to scan-details/ for gh-pages diff viewer
  if (trivyResult) exportScanDetails(imageId, tag, vulns);

  const runAsUser  = securityManifest?.runAsUser  ?? null;
  const runAsGroup = securityManifest?.runAsGroup ?? null;
  const runAsRoot  = runAsUser !== 10001;
  const uidLabel   = runAsUser !== null ? String(runAsUser) : '0 (root)';

  const posture = determinePosture(vulns, runAsUser);

  return {
    tag,
    imageRef,
    versionLabel: versionLabel(tag),
    lifecycleStatus,
    lifecycleBadge,
    security: {
      runAsUser:  runAsUser,
      runAsGroup: runAsGroup,
      runAsRoot,
      uidLabel
    },
    vulnerabilities: {
      system: {
        critical: vulns.system.critical,
        high:     vulns.system.high,
        medium:   vulns.system.medium,
        low:      vulns.system.low,
        fixable:  vulns.system.fixable,
        total:    vulns.system.total
      },
      app: {
        critical: vulns.app.critical,
        high:     vulns.app.high,
        medium:   vulns.app.medium,
        low:      vulns.app.low,
        fixable:  vulns.app.fixable,
        total:    vulns.app.total
      }
    },
    topCves:    vulns.topCves,
    posture:    posture.label,
    postureBadge: posture.badge,
    scannedAt:  now,
    eol: {
      date:            eolInfo?.eolFrom ?? null,
      isEol:           eolInfo ? !eolInfo.isMaintained : false,
      isLts:           eolInfo?.isLts ?? false,
      ltsFrom:         eolInfo?.ltsFrom ?? null,
      latestPatch:     eolInfo?.latest?.name ?? null,
      latestPatchDate: eolInfo?.latest?.date ?? null,
      source:          eolInfo ? 'endoflife.date' : null,
    }
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🚀 PFNApp Base Image Security Scanner starting...');

  const matrix = JSON.parse(fs.readFileSync(MATRIX_FILE, 'utf8'));
  const now    = new Date().toISOString();

  // Fetch all EOL data in parallel before scanning
  console.log('\n📅 Fetching EOL data from endoflife.date...');
  const eolCache = {}; // { [runtimeId]: Map<name, release> }
  await Promise.all(
    Object.entries(EOL_PRODUCT_MAP).map(async ([runtimeId, productId]) => {
      eolCache[runtimeId] = await fetchEolData(productId);
    })
  );

  const baseImages = [];

  // =========================================================================
  // LANGUAGES
  // =========================================================================
  console.log('\n📦 Processing language base images...');

  for (const [id, spec] of Object.entries(matrix.runtimes)) {
    console.log(`\n🔤 Language: ${DISPLAY_NAMES[id] || id}`);

    const manifest = readRuntimeManifest('language', id);
    const secSetting = manifest?.security ?? null;

    // Build the list of all versions to scan
    const allVersions = [
      ...(spec.active_lts      || []),
      ...(spec.supported       || []),
      ...(spec.maintenance_lts || []),
      ...(spec.legacy          || []),
    ];
    // De-duplicate while preserving order
    const versions = [...new Set(allVersions)];

    const versionEntries = [];
    for (const version of versions) {
      const imageRef = buildLanguageImageRef(id, version);
      const tag      = imageRef.split(':')[1]; // e.g. "22-alpine", "3.12-slim"
      const lc       = getLifecycleStatus(version, spec);

      const eolMap  = eolCache[id] || new Map();
      const eolInfo = eolMap.get(version) || null;

      console.log(`  📌 ${imageRef} [${lc.status}]`);
      const entry = buildVersionEntry(id, imageRef, tag, lc.status, lc.badge, secSetting, now, eolInfo);

      if (eolInfo && !eolInfo.isMaintained) {
        entry.lifecycleStatus = 'EOL';
        entry.lifecycleBadge  = '🔴';
      }

      versionEntries.push(entry);
    }

    baseImages.push({
      id,
      name:     DISPLAY_NAMES[id] || id,
      type:     'language',
      category: 'Languages',
      icon:     ICONS[id] || '📦',
      versions: versionEntries
    });
  }

  // =========================================================================
  // FRAMEWORKS
  // =========================================================================
  console.log('\n📦 Processing framework base images...');

  for (const [id, spec] of Object.entries(matrix.frameworks)) {
    console.log(`\n🔧 Framework: ${DISPLAY_NAMES[id] || id}`);

    const manifest = readRuntimeManifest('framework', id);
    const secSetting = manifest?.security ?? null;

    // Build compatibility matrix for output (runtimeMatrix from manifest)
    const compatibilityMatrix = manifest?.runtimeMatrix ?? null;

    let versionEntries = [];

    if (id === 'vite') {
      // Vite uses a single :latest image
      const imageRef = buildFrameworkImageRef(id, null, null);
      console.log(`  📌 ${imageRef} [LATEST]`);
      const entry = buildVersionEntry(id, imageRef, 'latest', 'LATEST', '🟢', secSetting, now, null);
      versionEntries.push(entry);
    } else {
      // Iterate every (framework_version, runtime_version) combination from compatibility_matrix
      const compatMatrix = spec.compatibility_matrix || [];
      const defaultFwVersion  = compatMatrix[0]?.framework_major ?? null;
      const defaultRtVersion  = compatMatrix[0]?.default_runtime ?? null;

      for (const entry of compatMatrix) {
        const fwVersion = entry.framework_major;
        for (const runtimeVersion of (entry.compatible_runtimes || [])) {
          const imageRef = buildFrameworkImageRef(id, fwVersion, runtimeVersion);
          const tag      = imageRef.split(':')[1]; // e.g. "13-php8.4-alpine", "16-node22-alpine"

          // Determine lifecycle relative to the parent runtime spec in matrix.json
          const parentRuntimeId = spec.runtime; // e.g. "node" or "php"
          const parentSpec      = matrix.runtimes[parentRuntimeId] || {};
          const lc              = getLifecycleStatus(runtimeVersion, parentSpec);

          const parentEolMap = eolCache[parentRuntimeId] || new Map();
          const eolInfo      = parentEolMap.get(runtimeVersion) || null;

          console.log(`  📌 ${imageRef} [${lc.status}]`);
          const versionEntry = buildVersionEntry(id, imageRef, tag, lc.status, lc.badge, secSetting, now, eolInfo);

          if (eolInfo && !eolInfo.isMaintained) {
            versionEntry.lifecycleStatus = 'EOL';
            versionEntry.lifecycleBadge  = '🔴';
          }

          versionEntries.push(versionEntry);
        }
      }
    }

    const imageEntry = {
      id,
      name:     DISPLAY_NAMES[id] || id,
      type:     'framework',
      category: 'Frameworks',
      icon:     ICONS[id] || '📦',
      runtime:  spec.runtime,
      versions: versionEntries
    };

    if (compatibilityMatrix) {
      imageEntry.compatibilityMatrix = compatibilityMatrix;
    }

    baseImages.push(imageEntry);
  }

  // =========================================================================
  // Summary
  // =========================================================================
  let totalVersions  = 0;
  let criticalCount  = 0;
  let highCount      = 0;
  let cleanCount     = 0;

  for (const img of baseImages) {
    for (const v of img.versions) {
      totalVersions++;
      criticalCount += v.vulnerabilities.app.critical;
      highCount     += v.vulnerabilities.app.high;
      if (v.posture === 'COMPLIANT') cleanCount++;
    }
  }

  const report = {
    schemaVersion: '1.1.0',
    generatedAt:   now,
    scanner:       'Aqua Trivy',
    summary: {
      totalImages:   baseImages.length,
      totalVersions,
      criticalCount,
      highCount,
      cleanCount
    },
    baseImages
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2) + '\n');
  console.log(`\n💾 Saved ${REPORT_FILE}`);

  // =========================================================================
  // Summary table
  // =========================================================================
  console.log('\n┌─────────────────────────────────────────────────────────────────────────────────────────┐');
  console.log('│                         PFNApp Base Image Security Report                              │');
  console.log('├──────────┬────────────┬───────────────────────┬──────────────────┬────────────────────┤');
  console.log('│ Image    │ Tag        │ Lifecycle             │ App CVEs (C/H/M) │ Posture            │');
  console.log('├──────────┼────────────┼───────────────────────┼──────────────────┼────────────────────┤');

  for (const img of baseImages) {
    for (const v of img.versions) {
      const idCol       = (img.icon + ' ' + img.id).padEnd(8);
      const tagCol      = v.tag.padEnd(10);
      const lcCol       = (v.lifecycleBadge + ' ' + v.lifecycleStatus).padEnd(21);
      const cveCol      = `${v.vulnerabilities.app.critical}/${v.vulnerabilities.app.high}/${v.vulnerabilities.app.medium}`.padEnd(16);
      const postureCol  = (v.postureBadge + ' ' + v.posture).padEnd(18);
      console.log(`│ ${idCol} │ ${tagCol} │ ${lcCol} │ ${cveCol} │ ${postureCol} │`);
    }
  }

  console.log('└──────────┴────────────┴───────────────────────┴──────────────────┴────────────────────┘');
  console.log(`\n📊 Summary: ${baseImages.length} images | ${totalVersions} versions | ` +
              `${criticalCount} critical app CVEs | ${highCount} high app CVEs | ${cleanCount} compliant`);
}

main().catch((err) => {
  console.error('❌ Fatal error in base-image-scanner:', err);
  process.exit(1);
});
