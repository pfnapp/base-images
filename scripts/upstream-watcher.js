#!/usr/bin/env node

/**
 * scripts/upstream-watcher.js
 * 
 * Inspects upstream registries (npm, packagist, nodejs dist) to detect:
 * 1. New Major versions of frameworks/runtimes not yet tracked in matrix.json.
 * 2. New Minor/Patch releases of currently supported versions.
 * 
 * Generates an output report and optionally creates GitHub Issues or PR instructions.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const MATRIX_FILE = path.join(__dirname, '..', 'matrix.json');

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'pfnapp-upstream-watcher', ...headers } }, (res) => {
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

async function checkNpmPackage(pkgName) {
  const url = `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`;
  const data = await fetchJson(url);
  const latestVersion = data['dist-tags']?.latest;
  const versions = Object.keys(data.versions || {});
  
  // Extract all major versions
  const majors = [...new Set(versions.map(v => v.split('.')[0]).filter(v => /^\d+$/.test(v)))];
  majors.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  return {
    latestVersion,
    latestMajor: latestVersion ? latestVersion.split('.')[0] : null,
    allMajors: majors
  };
}

async function checkPackagistPackage(pkgName) {
  const url = `https://packagist.org/packages/${pkgName}.json`;
  const data = await fetchJson(url);
  const rawVersions = Object.keys(data.package?.versions || {});
  
  const validVersions = rawVersions
    .filter(v => /^v?\d+(\.\d+)*$/.test(v))
    .map(v => v.replace(/^v/, ''));
    
  const majors = [...new Set(validVersions.map(v => v.split('.')[0]).filter(v => /^\d+$/.test(v)))];
  majors.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  
  const latestMajor = majors[majors.length - 1];

  return {
    latestMajor,
    allMajors: majors
  };
}

async function checkNodeVersions() {
  const url = 'https://nodejs.org/dist/index.json';
  const data = await fetchJson(url);
  
  const ltsList = data
    .filter(item => item.lts !== false)
    .map(item => ({
      version: item.version.replace(/^v/, ''),
      major: item.version.replace(/^v/, '').split('.')[0],
      ltsName: item.lts
    }));
    
  const uniqueLtsMajors = [...new Set(ltsList.map(item => item.major))];
  uniqueLtsMajors.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  
  return {
    latestLtsMajor: uniqueLtsMajors[uniqueLtsMajors.length - 1],
    allLtsMajors: uniqueLtsMajors
  };
}

async function run() {
  console.log('🔍 Starting Daily Upstream Release Watcher...');
  const matrix = JSON.parse(fs.readFileSync(MATRIX_FILE, 'utf8'));
  
  const findings = [];
  const alerts = [];

  // 1. Check Frameworks
  for (const [frameworkKey, fw] of Object.entries(matrix.frameworks)) {
    console.log(`Checking framework: ${frameworkKey} (${fw.upstream_package})...`);
    try {
      let upstreamInfo;
      if (fw.upstream_type === 'npm') {
        upstreamInfo = await checkNpmPackage(fw.upstream_package);
      } else if (fw.upstream_type === 'packagist') {
        upstreamInfo = await checkPackagistPackage(fw.upstream_package);
      }

      if (!upstreamInfo) continue;

      const knownMajors = fw.known_major_versions || [];
      const upstreamLatestMajor = upstreamInfo.latestMajor;
      
      console.log(`  - Known majors in matrix: [${knownMajors.join(', ')}]`);
      console.log(`  - Latest upstream major: ${upstreamLatestMajor} (Latest version: ${upstreamInfo.latestVersion || upstreamLatestMajor})`);

      if (upstreamLatestMajor && !knownMajors.includes(upstreamLatestMajor)) {
        const alert = {
          type: 'MAJOR_RELEASE',
          target: frameworkKey,
          upstreamPackage: fw.upstream_package,
          detectedMajor: upstreamLatestMajor,
          latestVersion: upstreamInfo.latestVersion,
          message: `🚨 New major upstream release detected for ${frameworkKey}: v${upstreamLatestMajor} is published but not tracked in matrix.json!`
        };
        alerts.push(alert);
        console.warn(`  ⚠️ ${alert.message}`);
      } else {
        findings.push({
          target: frameworkKey,
          status: 'UP_TO_DATE',
          trackedMajors: knownMajors,
          latestUpstream: upstreamInfo.latestVersion || upstreamLatestMajor
        });
      }
    } catch (err) {
      console.error(`  ❌ Failed to check ${frameworkKey}: ${err.message}`);
    }
  }

  // 2. Check Node.js LTS
  console.log('Checking Node.js LTS releases...');
  try {
    const nodeInfo = await checkNodeVersions();
    const activeLts = matrix.runtimes.node.active_lts || [];
    console.log(`  - Tracked active Node LTS in matrix: [${activeLts.join(', ')}]`);
    console.log(`  - Upstream latest Node LTS: v${nodeInfo.latestLtsMajor}`);

    if (nodeInfo.latestLtsMajor && !activeLts.includes(nodeInfo.latestLtsMajor)) {
      alerts.push({
        type: 'NODE_LTS_RELEASE',
        target: 'node',
        detectedMajor: nodeInfo.latestLtsMajor,
        message: `🚨 New Node.js LTS release detected: v${nodeInfo.latestLtsMajor} is available upstream but not in matrix.json active_lts!`
      });
    }
  } catch (err) {
    console.error(`  ❌ Failed to check Node.js releases: ${err.message}`);
  }

  // Output summary to GitHub Actions env if available
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  let markdown = '## 🛰️ Upstream Release Watcher Report\n\n';
  
  if (alerts.length > 0) {
    markdown += '### ⚠️ Action Required: New Major / LTS Upstream Releases Detected!\n\n';
    markdown += '| Type | Target | Detected Version | Details |\n';
    markdown += '| :--- | :--- | :--- | :--- |\n';
    for (const a of alerts) {
      markdown += `| **${a.type}** | \`${a.target}\` | \`${a.detectedMajor}\` | ${a.message} |\n`;
    }
  } else {
    markdown += '✅ **All tracked runtimes and frameworks are in sync with current upstream major versions.**\n\n';
  }

  markdown += '\n### 📋 Tracked Status Summary\n\n';
  markdown += '| Target | Status | Tracked Versions | Latest Upstream |\n';
  markdown += '| :--- | :--- | :--- | :--- |\n';
  for (const f of findings) {
    markdown += `| \`${f.target}\` | ${f.status} | \`${f.trackedMajors.join(', ')}\` | \`${f.latestUpstream}\` |\n`;
  }

  console.log('\n' + markdown);

  if (summaryFile) {
    fs.appendFileSync(summaryFile, markdown);
  }

  // Write alert JSON artifact for subsequent issue-creator step
  const alertsOutPath = path.join(process.cwd(), 'upstream-alerts.json');
  fs.writeFileSync(alertsOutPath, JSON.stringify(alerts, null, 2));
  console.log(`Wrote alerts report to ${alertsOutPath} (${alerts.length} alert(s))`);
}

run().catch((err) => {
  console.error('Fatal error in upstream watcher:', err);
  process.exit(1);
});
