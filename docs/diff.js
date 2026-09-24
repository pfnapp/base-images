(function () {
  'use strict';

  // On gh-pages, scan details live at /scans/{app}/{tag}/*.json
  // report.json is also on gh-pages for summary data
  const GH_PAGES_BASE = (() => {
    const { origin, pathname } = location;
    // strip /diff.html or trailing filename to get base path
    const base = pathname.replace(/\/[^/]*$/, '/');
    return origin + base;
  })();
  const REPORT_URL   = GH_PAGES_BASE + 'report.json';

  /* ── Parse URL params ────────────────────────────────────── */
  const params  = new URLSearchParams(location.search);
  const appId   = params.get('app') || '';
  const appTag  = params.get('tag') || '';

  /* ── Helpers ─────────────────────────────────────────────── */
  function escHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function nvdUrl(cveId) {
    return `https://nvd.nist.gov/vuln/detail/${encodeURIComponent(cveId)}`;
  }

  const SEV_ORDER = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };

  function sevSort(a, b) {
    return (SEV_ORDER[a.severity] ?? 9) - (SEV_ORDER[b.severity] ?? 9);
  }

  /* ── Show error ──────────────────────────────────────────── */
  function showError(title, msg) {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-title').textContent = title;
    document.getElementById('error-msg').textContent   = msg;
    document.getElementById('error-state').classList.remove('hidden');
  }

  /* ── State ─────────────────────────────────────────────────*/
  let allRows = [];   // { layer, cve, upstreamOnly, pfnOnly, inBoth, status }
  let sevFilter    = 'All';
  let statusFilter = 'All';
  let searchQuery  = '';

  /* ── Build diff rows from CVE lists ─────────────────────── */
  function buildDiffRows(upstreamCves, pfnCves, layer) {
    const upMap  = new Map(upstreamCves.map(c => [c.id, c]));
    const pfnMap = new Map(pfnCves.map(c => [c.id, c]));
    const allIds = new Set([...upMap.keys(), ...pfnMap.keys()]);

    const rows = [];
    allIds.forEach(id => {
      const up  = upMap.get(id) || null;
      const pfn = pfnMap.get(id) || null;
      let status;
      if (up && !pfn)  status = 'removed';    // ✅ eliminated
      else if (!up && pfn) status = 'pfn-only';  // only in pfn (shouldn't happen often)
      else status = 'remaining';                  // still present

      rows.push({ layer, id, up, pfn, status, severity: (up||pfn).severity });
    });
    return rows;
  }

  /* ── Render a single CVE entry in a column ───────────────── */
  function renderCveEntry(cve, status) {
    if (!cve) return `<div class="cve-row"><span style="color:var(--muted-2);font-size:.7rem;padding:0 4px;">—</span></div>`;
    const sev = (cve.severity || 'LOW').toUpperCase();
    const dotCls = status === 'removed' ? 'removed' : status === 'remaining' ? 'remaining' : 'none';
    return `<div class="cve-row ${status}">
      <span class="status-dot ${dotCls}"></span>
      <a class="cve-id-link ${sev}" href="${nvdUrl(cve.id)}" target="_blank" rel="noopener">${escHtml(cve.id)}</a>
      <span class="cve-pkg-chip" title="${escHtml(cve.pkg)}">${escHtml(cve.pkg)}</span>
      <span class="cve-title-text" title="${escHtml(cve.title||'')}">${escHtml(cve.title||'–')}</span>
      <span class="sev-pill ${sev}">${sev}</span>
    </div>`;
  }

  /* ── Render diff for one layer ───────────────────────────── */
  function renderLayer(layer, rows, upstreamTotal, pfnTotal) {
    const layerRows = rows.filter(r => r.layer === layer);
    if (layerRows.length === 0 && upstreamTotal === 0) return '';

    const layerLabel  = layer === 'system' ? 'System Packages' : 'Application Packages';
    const dotCls      = 'upstream';

    const upCount  = layerRows.filter(r => r.up).length;
    const pfnCount = layerRows.filter(r => r.pfn).length;

    // Left: upstream rows
    const upHtml = layerRows.length === 0
      ? `<div class="empty-col"><span class="check">✓</span>No CVEs found</div>`
      : layerRows.map(r => renderCveEntry(r.up, r.up ? r.status : 'none')).join('');

    // Right: pfn rows (aligned with upstream)
    const pfnHtml = layerRows.length === 0
      ? `<div class="empty-col"><span class="check">✓</span>No CVEs found</div>`
      : layerRows.map(r => {
          if (r.status === 'removed') {
            return `<div class="cve-row removed" style="opacity:.45">
              <span class="status-dot removed"></span>
              <span style="color:var(--green);font-size:.70rem;font-family:monospace">${escHtml(r.id)}</span>
              <span style="color:var(--green);font-size:.70rem;margin-left:auto;">✓ Eliminated</span>
            </div>`;
          }
          return renderCveEntry(r.pfn, r.status);
        }).join('');

    const truncatedNotice = upstreamTotal > upCount
      ? `<div class="truncation-notice">
           ⚠ Showing top ${upCount} of ${upstreamTotal.toLocaleString()} upstream CVEs.
           Full scan will be available after the nightly workflow runs.
         </div>`
      : '';

    return `<div class="layer-block">
      <div class="layer-title">
        <span class="dot ${dotCls}"></span>${escHtml(layerLabel)}
      </div>
      <div class="diff-cols">
        <div>
          <div class="diff-col-header upstream">
            <span>⬡ Upstream Image</span>
            <span class="col-count">${upstreamTotal.toLocaleString()} CVEs total</span>
          </div>
          <div class="diff-col-body upstream">${upHtml}${truncatedNotice}</div>
        </div>
        <div>
          <div class="diff-col-header pfn">
            <span>🛡 PFNApp Hardened</span>
            <span class="col-count">${pfnTotal.toLocaleString()} CVEs total</span>
          </div>
          <div class="diff-col-body pfn">${pfnHtml}</div>
        </div>
      </div>
    </div>`;
  }

  /* ── Filter rows ─────────────────────────────────────────── */
  function getFilteredRows() {
    const q = searchQuery.trim().toLowerCase();
    return allRows.filter(r => {
      if (sevFilter !== 'All' && (r.severity||'').toUpperCase() !== sevFilter) return false;
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      if (q) {
        const hay = [r.id, r.up?.pkg||'', r.pfn?.pkg||'', r.up?.title||'', r.pfn?.title||''].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  /* ── Re-render diff body ─────────────────────────────────── */
  function renderDiff(upSysTotal, upAppTotal, pfnSysTotal, pfnAppTotal) {
    const filteredRows = getFilteredRows();
    const systemRows   = filteredRows.filter(r => r.layer === 'system');
    const appRows      = filteredRows.filter(r => r.layer === 'app');
    const main         = document.getElementById('diff-main');
    main.innerHTML =
      renderLayer('system', systemRows, upSysTotal, pfnSysTotal) +
      renderLayer('app',    appRows,    upAppTotal, pfnAppTotal);
    const total = filteredRows.length;
    document.getElementById('result-count').textContent =
      `${total} CVE${total!==1?'s':''} shown`;
  }

  /* ── Main init ───────────────────────────────────────────── */
  async function init(data) {
    const app = (data.applications || []).find(a => a.id === appId);
    if (!app) { showError('App not found', `No application with id "${appId}" in report.json.`); return; }

    const ver = (app.monitoredVersions || []).find(v => v.tag === appTag);
    if (!ver) { showError('Version not found', `No version "${appTag}" for "${appId}".`); return; }

    const vuln    = ver.vulnerabilities || {};
    const up      = vuln.upstream || vuln;
    const pfnData = vuln.pfnapp || null;
    const red     = vuln.reduction || null;

    /* ── Page title ── */
    document.getElementById('page-title').textContent = `CVE Diff — ${app.name}`;
    document.getElementById('page-subtitle').innerHTML = `
      <span class="tag-chip">${escHtml(ver.tag)}</span>
      <span>Upstream vs PFNApp Hardened Image</span>
    `;
    document.title = `CVE Diff — ${app.name} ${ver.tag}`;

    /* ── Summary pills ── */
    const rs = red?.system || {};
    const summaryBar = document.getElementById('summary-bar');
    summaryBar.innerHTML = `
      <div class="summary-pill gray">
        <span class="snum gray">${(up.system?.total||0).toLocaleString()}</span>
        <span>upstream system CVEs</span>
      </div>
      <div class="summary-pill gray">
        <span class="snum gray">${(pfnData?.system?.total||0).toLocaleString()}</span>
        <span>PFNApp system CVEs</span>
      </div>
      ${(rs.total||0) > 0 ? `
      <div class="summary-pill green">
        <span class="snum green">${rs.total}</span>
        <span>system reduction</span>
      </div>
      <div class="summary-pill red">
        <span class="snum red">${rs.critical||0}</span>
        <span>critical Δ</span>
      </div>
      <div class="summary-pill orange">
        <span class="snum orange">${rs.high||0}</span>
        <span>high Δ</span>
      </div>` : ''}
    `;

    /* ── Try to fetch full scan detail files from gh-pages ── */
    const tagSafe   = appTag.replace(/[^a-zA-Z0-9._-]/g, '_');
    const scanBase  = `${GH_PAGES_BASE}scans/${encodeURIComponent(appId)}/${encodeURIComponent(tagSafe)}/`;
    const upstreamUrl = scanBase + 'upstream.json';
    const pfnUrl      = scanBase + 'pfnapp.json';

    let upstreamDetail = null;
    let pfnDetail      = null;

    try {
      const [upRes, pfnRes] = await Promise.allSettled([
        fetch(upstreamUrl).then(r => r.ok ? r.json() : Promise.reject(r.status)),
        fetch(pfnUrl).then(r => r.ok ? r.json() : Promise.reject(r.status)),
      ]);
      if (upRes.status === 'fulfilled')  upstreamDetail = upRes.value;
      if (pfnRes.status === 'fulfilled') pfnDetail      = pfnRes.value;
    } catch (_) { /* fall through to top-5 fallback */ }

    const hasFullData   = !!upstreamDetail;
    const upSysTotal    = up.system?.total || 0;
    const upAppTotal    = up.app?.total    || 0;

    // Use full CVE lists if available, else fall back to top-5 from report.json
    const upSysCves  = upstreamDetail?.system?.cves  || ver.topSystemCves || [];
    const upAppCves  = upstreamDetail?.app?.cves     || ver.topAppCves    || [];
    const pfnSysCves = pfnDetail?.system?.cves        || pfnData?.system?.topCves || [];
    const pfnAppCves = pfnDetail?.app?.cves           || pfnData?.app?.topCves    || [];

    /* ── Data notice ── */
    const shownSys  = upSysCves.length;
    const shownApp  = upAppCves.length;
    const notice    = document.getElementById('data-notice');
    if (hasFullData) {
      notice.innerHTML = `<strong>✓ Full data loaded:</strong> Showing all
        ${upSysTotal.toLocaleString()} system + ${upAppTotal.toLocaleString()} app upstream CVEs
        from <span class="mono">scans/${escHtml(appId)}/${escHtml(tagSafe)}/upstream.json</span>.
        Diff is complete and accurate.`;
    } else {
      const shown  = shownSys + shownApp;
      const actual = upSysTotal + upAppTotal;
      notice.innerHTML = `<strong>⚠ Partial data:</strong> Full scan file
        (<span class="mono">scans/${escHtml(appId)}/${escHtml(tagSafe)}/upstream.json</span>)
        not yet available — showing top-5 CVEs per layer (${shown} of ${actual.toLocaleString()}).
        Run the nightly scan workflow to generate complete files.
        Reduction totals in the summary bar are accurate.`;
      notice.style.background = 'var(--orange-dim)';
      notice.style.borderColor = '#9e6a0340';
    }

    /* ── Build all rows ── */
    allRows = [
      ...buildDiffRows(upSysCves, pfnSysCves, 'system'),
      ...buildDiffRows(upAppCves, pfnAppCves, 'app'),
    ].sort(sevSort);

    /* ── Show content ── */
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');

    renderDiff(upSysTotal, upAppTotal, pfnData?.system?.total || 0, pfnData?.app?.total || 0);

    /* ── Wire filters ── */
    document.getElementById('search-input').addEventListener('input', e => {
      searchQuery = e.target.value;
      renderDiff(upSysTotal, upAppTotal, pfnData?.system?.total || 0, pfnData?.app?.total || 0);
    });
    document.getElementById('sev-filter').addEventListener('change', e => {
      sevFilter = e.target.value;
      renderDiff(upSysTotal, upAppTotal, pfnData?.system?.total || 0, pfnData?.app?.total || 0);
    });
    document.getElementById('status-filter').addEventListener('change', e => {
      statusFilter = e.target.value;
      renderDiff(upSysTotal, upAppTotal, pfnData?.system?.total || 0, pfnData?.app?.total || 0);
    });
  }

  /* ── Validate params & fetch ─────────────────────────────── */
  if (!appId || !appTag) {
    showError('Missing parameters', 'Expected URL params: ?app=<id>&tag=<version>. Open this page from the dashboard card.');
    document.getElementById('loading-state').classList.add('hidden');
  } else {
    fetch(REPORT_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => init(data))
      .catch(err => showError('Failed to load report.json', err.message));
  }
})();
