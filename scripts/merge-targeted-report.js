#!/usr/bin/env node

const fs = require('fs');

const reportFile = process.env.REPORT_FILE || 'gh-pages-out/report.json';
const releaseFile = process.env.RELEASE_REPORT || 'release-cve-report.json';
const observatoryFile = process.env.OBSERVATORY_FILE || 'observatory.json';

const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
const release = JSON.parse(fs.readFileSync(releaseFile, 'utf8'));
const observatory = JSON.parse(fs.readFileSync(observatoryFile, 'utf8'));
const config = observatory.applications.find((app) => app.id === release.appId);

if (!config) throw new Error(`Application ${release.appId} not found in observatory.json`);

function compactBucket(bucket) {
  return {
    critical: bucket.critical,
    high: bucket.high,
    medium: bucket.medium,
    low: bucket.low,
    fixable: 0,
    total: bucket.total
  };
}

function pfnBucket(bucket) {
  return {
    ...compactBucket(bucket),
    topCves: bucket.criticalHigh.slice(0, 5).map(toDashboardCve),
    allCves: []
  };
}

function toDashboardCve(cve) {
  return {
    id: cve.id,
    pkg: cve.package,
    installedVersion: cve.installedVersion,
    fixedVersion: cve.fixedVersion,
    severity: cve.severity,
    title: cve.id
  };
}

function subtract(upstream, pfnapp) {
  return {
    critical: pfnapp.critical - upstream.critical,
    high: pfnapp.high - upstream.high,
    medium: pfnapp.medium - upstream.medium,
    low: pfnapp.low - upstream.low,
    total: pfnapp.total - upstream.total
  };
}

const activeIndex = Math.max(0, config.active_versions.indexOf(release.version));
const lifecycle = activeIndex === 0
  ? { status: 'LATEST', badge: '🟢', advice: 'Recommended active release' }
  : activeIndex <= 2
    ? { status: 'SUPPORTED', badge: '🟢', advice: 'Actively maintained' }
    : activeIndex === 3
      ? { status: 'AGING', badge: '🟠', advice: 'Plan upgrade to latest' }
      : { status: 'EOL SOON', badge: '🔴', advice: 'Next upstream release will deprecate this version' };

const appRisk = release.upstream.app.critical > 0
  ? { label: 'APP CRITICAL RISK', badge: '🔴' }
  : release.upstream.app.high > 0
    ? { label: 'APP HIGH RISK', badge: '🟠' }
    : release.upstreamSecurity.runAsRoot
      ? { label: 'NON-COMPLIANT (ROOT)', badge: '🟡' }
      : { label: 'COMPLIANT', badge: '🟢' };

const versionEntry = {
  tag: release.version,
  fullRef: release.upstreamImage,
  rank: activeIndex + 1,
  lifecycleStatus: lifecycle.status,
  lifecycleBadge: lifecycle.badge,
  lifecycleAdvice: lifecycle.advice,
  security: release.upstreamSecurity,
  vulnerabilities: {
    upstream: {
      system: compactBucket(release.upstream.system),
      app: compactBucket(release.upstream.app)
    },
    pfnapp: {
      scanned: true,
      system: pfnBucket(release.pfnapp.system),
      app: pfnBucket(release.pfnapp.app)
    },
    reduction: {
      system: subtract(release.upstream.system, release.pfnapp.system),
      app: subtract(release.upstream.app, release.pfnapp.app)
    }
  },
  topAppCves: release.upstream.app.criticalHigh.slice(0, 5).map(toDashboardCve),
  topSystemCves: release.upstream.system.criticalHigh.slice(0, 5).map(toDashboardCve),
  posture: appRisk.label,
  postureBadge: appRisk.badge,
  scannedAt: release.generatedAt
};

let application = (report.applications || []).find((app) => app.id === release.appId);
if (!application) {
  application = {
    id: config.id,
    name: config.name,
    category: config.category || 'General',
    image: config.image,
    registry: config.registry,
    monitoredVersions: [],
    deprecatedVersions: config.deprecated_versions || []
  };
  report.applications.push(application);
}

application.monitoredVersions = [
  versionEntry,
  ...(application.monitoredVersions || []).filter((entry) => entry.tag !== release.version)
];

// Keep Observatory's active-version order and retain only active entries.
const order = new Map(config.active_versions.map((tag, index) => [tag, index]));
application.monitoredVersions = application.monitoredVersions
  .filter((entry) => order.has(entry.tag))
  .sort((a, b) => order.get(a.tag) - order.get(b.tag))
  .map((entry, index) => ({ ...entry, rank: index + 1 }));

application.deprecatedVersions = config.deprecated_versions || [];
report.summary.generatedAt = release.generatedAt;
report.summary.totalMonitoredVersions = report.applications.reduce(
  (total, app) => total + (app.monitoredVersions || []).length,
  0
);
report.summary.criticalVulnerabilityCount = report.applications.reduce(
  (total, app) => total + (app.monitoredVersions || []).reduce(
    (sum, version) => sum + (version.vulnerabilities?.upstream?.app?.critical || 0), 0
  ), 0
);
report.summary.highVulnerabilityCount = report.applications.reduce(
  (total, app) => total + (app.monitoredVersions || []).reduce(
    (sum, version) => sum + (version.vulnerabilities?.upstream?.app?.high || 0), 0
  ), 0
);
report.summary.pfnappScannedCount = report.applications.reduce(
  (total, app) => total + (app.monitoredVersions || []).filter(
    (version) => version.vulnerabilities?.pfnapp?.scanned
  ).length, 0
);

fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n');
console.log(`Merged ${release.appId}:${release.version} into ${reportFile}`);
