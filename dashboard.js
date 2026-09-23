(function () {
  'use strict';

  /* ── Constants ──────────────────────────────────────────────── */
  // Resolve base URL from current page location (works on gh-pages and locally)
  const GH_PAGES_BASE = (() => {
    const { origin, pathname } = location;
    const base = pathname.replace(/\/[^/]*$/, '/');
    return origin + base;
  })();
  const REPORT_URL = GH_PAGES_BASE + 'report.json';
  const BASE_URL   = GH_PAGES_BASE + 'base-report.json';
  const DIFF_PAGE  = 'diff.html';

  /* ── SVG icon map ────────────────────────────────────────────── */
  const ICONS_SVG = {
    node: `<svg viewBox="0 0 128 128"><path fill="#83CD29" d="M112.771 30.334L68.148 4.963c-2.465-1.428-5.571-1.428-8.037 0L15.229 30.334C12.699 31.788 11 34.525 11 37.414v50.172c0 2.889 1.699 5.626 4.229 7.08l11.148 6.451c5.372 2.647 7.222 2.647 9.654 2.647 7.895 0 12.419-4.765 12.419-13.03V44.406c0-.702-.592-1.246-1.291-1.246h-5.455c-.703 0-1.292.544-1.292 1.246v46.328c0 3.696-3.834 7.362-10.063 4.249L19.018 88.26a.694.694 0 01-.337-.602V37.414a.695.695 0 01.337-.602l44.574-25.37a.709.709 0 01.673 0l44.574 25.37a.697.697 0 01.338.602v50.172a.697.697 0 01-.338.602l-44.578 25.37a.71.71 0 01-.674 0L49.888 106.7c-.214-.125-.464-.157-.693-.083-2.399.76-3.022.958-5.386 1.776-.578.198-.732.812-.138 1.143l13.166 7.817c1.209.706 2.596 1.086 4.02 1.086 1.421 0 2.807-.38 4.02-1.086l44.573-25.374c2.528-1.454 4.229-4.191 4.229-7.08V37.414c0-2.889-1.701-5.626-4.228-7.08z"/><path fill="#83CD29" d="M77.104 81.073c-11.442 0-13.894-5.253-13.894-9.651 0-.702.592-1.246 1.292-1.246h5.555c.638 0 1.169.464 1.29 1.085.882 5.936 3.524 8.936 15.271 8.936 9.396 0 13.387-2.129 13.387-7.126 0-2.878-1.138-5.013-15.752-6.449-12.211-1.212-19.766-3.895-19.766-13.645 0-8.993 7.576-14.347 20.275-14.347 14.271 0 21.338 4.952 22.218 15.585.033.374-.109.742-.37 1.013a1.29 1.29 0 01-.952.421h-5.586c-.601 0-1.126-.421-1.267-1.005-1.391-6.152-4.782-8.122-14.043-8.122-10.338 0-11.541 3.6-11.541 6.298 0 3.271 1.42 4.225 15.27 6.073 13.707 1.832 20.213 4.422 20.213 13.974-.001 9.713-8.099 15.206-22.2 15.206z"/></svg>`,

    php: `<svg viewBox="0 0 128 128"><path fill="#6181B6" d="M64 33.039c-33.633 0-60.9 13.901-60.9 31.072S30.367 95.183 64 95.183s60.9-13.903 60.9-31.072S97.633 33.039 64 33.039zm0 57.55c-30.26 0-54.824-11.837-54.824-26.478S33.74 37.634 64 37.634s54.824 11.836 54.824 26.477S94.26 90.589 64 90.589z"/><path fill="#6181B6" d="M39.496 60.677l2.261-11.691h14.815c4.12 0 6.978 1.048 8.549 3.136 1.563 2.092 1.883 5.009.944 8.749a15.058 15.058 0 01-1.701 4.418 12.977 12.977 0 01-2.88 3.441c-1.462 1.256-3.062 2.119-4.805 2.591-1.736.469-3.766.704-6.091.704h-6.084l-1.505 7.803H36.57l2.926-19.151zm10.198 5.388h5.002c.87 0 1.699-.084 2.483-.254 1.557-.347 2.735-1.117 3.532-2.316.797-1.193 1.046-2.672.747-4.435-.297-1.748-1.042-2.897-2.228-3.441-.612-.28-1.517-.42-2.72-.42h-5.316l-1.5 10.866zm31.899-5.388l2.261-11.691h14.815c4.12 0 6.977 1.048 8.549 3.136 1.563 2.092 1.882 5.009.944 8.749a15.043 15.043 0 01-1.7 4.418 13.004 13.004 0 01-2.881 3.441c-1.462 1.256-3.062 2.119-4.805 2.591-1.735.469-3.766.704-6.09.704h-6.085l-1.505 7.803H77.67l2.923-19.151zm10.199 5.388h5.002c.869 0 1.698-.084 2.482-.254 1.557-.347 2.735-1.117 3.532-2.316.797-1.193 1.046-2.672.748-4.435-.298-1.748-1.042-2.897-2.229-3.441-.612-.28-1.517-.42-2.719-.42h-5.317l-1.499 10.866z"/></svg>`,

    python: `<svg viewBox="0 0 128 128"><linearGradient id="py1" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#387EB8"/><stop offset="1" stop-color="#366994"/></linearGradient><linearGradient id="py2" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#FFE052"/><stop offset="1" stop-color="#FFC331"/></linearGradient><path fill="url(#py1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zm-13.354 7.569c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/><path fill="url(#py2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/></svg>`,

    go: `<svg viewBox="0 0 128 128"><path fill="#00ACD7" d="M13.371 15.963c-.351 0-.492.175-.492.456l.069 17.078c0 .351.14.491.491.491h8.276c.28 0 .491-.14.491-.491l-.07-17.078c0-.281-.14-.456-.491-.456zm7.08 3.643c.632 0 1.125.492 1.125 1.124s-.493 1.123-1.124 1.123c-.632 0-1.124-.491-1.124-1.123s.492-1.124 1.124-1.124zm-4.78 0c.631 0 1.124.492 1.124 1.124s-.493 1.123-1.124 1.123c-.632 0-1.124-.491-1.124-1.123s.492-1.124 1.124-1.124zM107.313 16.488c-.281 0-.491.21-.491.492v16.657c0 .281.21.491.491.491h8.276c.281 0 .491-.21.491-.491V16.98c0-.281-.21-.492-.491-.492z"/><path fill="#00ACD7" d="M64 .025C28.654.025 0 28.765 0 64.192c0 35.432 28.654 64.168 64 64.168 35.344 0 64-28.736 64-64.168C128 28.765 99.346.025 64 .025zm0 9.577c30.072 0 54.398 24.408 54.398 54.59 0 30.188-24.326 54.594-54.398 54.594S9.602 94.38 9.602 64.192C9.602 34.01 33.928 9.602 64 9.602z"/><path fill="#00ACD7" d="M41.682 40.65c-5.01 0-8.724 1.5-11.143 4.499-2.419 2.999-3.629 7.263-3.629 12.789 0 5.527 1.21 9.79 3.629 12.789 2.419 2.999 6.133 4.499 11.143 4.499s8.73-1.5 11.155-4.499c2.425-2.999 3.637-7.262 3.637-12.789 0-5.526-1.212-9.79-3.637-12.789-2.425-2.999-6.145-4.499-11.155-4.499zm0 6.5c2.356 0 4.12.852 5.296 2.556 1.174 1.704 1.762 4.31 1.762 7.82s-.588 6.116-1.762 7.82c-1.176 1.705-2.94 2.557-5.296 2.557-2.357 0-4.12-.852-5.293-2.557-1.174-1.704-1.762-4.31-1.762-7.82s.588-6.116 1.762-7.82c1.173-1.704 2.936-2.556 5.293-2.556zm44.636-6.5c-5.011 0-8.73 1.5-11.155 4.499-2.425 2.999-3.637 7.263-3.637 12.789 0 5.527 1.212 9.79 3.637 12.789 2.425 2.999 6.144 4.499 11.155 4.499s8.724-1.5 11.143-4.499c2.419-2.999 3.629-7.262 3.629-12.789 0-5.526-1.21-9.79-3.629-12.789-2.419-2.999-6.133-4.499-11.143-4.499zm0 6.5c2.356 0 4.12.852 5.293 2.556 1.174 1.704 1.762 4.31 1.762 7.82s-.588 6.116-1.762 7.82c-1.173 1.705-2.937 2.557-5.293 2.557-2.357 0-4.12-.852-5.296-2.557-1.174-1.704-1.762-4.31-1.762-7.82s.588-6.116 1.762-7.82c1.176-1.704 2.939-2.556 5.296-2.556z"/></svg>`,

    java: `<svg viewBox="0 0 128 128"><path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/><path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/><path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zm-23.823-6.4c3.547 2.11 8.572 1.89 8.572 1.89l-3.896-4.189c-13.484.715-12.199-7.499-12.199-7.499s-6.855 7.041 7.523 9.798zm-1.706-1.729c-11.232 1.08-17.222-2.498-17.222-2.498s1.82 4.48 15.658 3.826c1.148-.054 2.232-.128 3.271-.215l-1.707-1.113z"/><path fill="#EA2D2E" d="M80.827 72.238s-4.01 2.074 2.847 2.834c-.085-.037.088-.039.09-.078.003 0 7.024.809 14.026-2.012 0 0 1.486.891 4.125 1.8-7.673 4.064-20.306 3.737-30.146-.609-.023.012-.022.009-.022.009l8.822 3.562c-.001 0 .013.002.014.003z"/></svg>`,

    bun: `<svg viewBox="0 0 128 128"><path fill="#FBF0DF" d="M64 10.2C34.3 10.2 10.2 34.3 10.2 64S34.3 117.8 64 117.8 117.8 93.7 117.8 64 93.7 10.2 64 10.2z"/><path fill="#FBDBA7" d="M64 12.2C35.4 12.2 12.2 35.4 12.2 64S35.4 115.8 64 115.8 115.8 92.6 115.8 64 92.6 12.2 64 12.2z"/><path fill="#F2B042" d="M64 15c-27.1 0-49 21.9-49 49s21.9 49 49 49 49-21.9 49-49-21.9-49-49-49z"/><ellipse cx="64" cy="64" rx="44" ry="44" fill="#FBDBA7"/><path fill="#D4A04A" d="M38.7 78.5c.5.1 1 .1 1.5.2C41.4 73 44.7 68 48.7 64c-1.7-1.8-3.3-3.8-4.6-5.9-7.3 4.7-11 12.4-9.9 20 1.4.1 2.9.3 4.5.4z"/><path fill="#D4A04A" d="M79 90.1c-4.6 2.8-9.9 4-15 3.4-1.5 3.7-4.6 6.5-8.6 7.3 7.6 2.1 16 .7 22.2-3.9-.4-.5-.6-1.1-.6-1.7 0-.9.3-1.8.9-2.4-.4-.9-.7-1.8-.9-2.7z"/><circle cx="48" cy="57" r="6" fill="#ffffff"/><circle cx="80" cy="57" r="6" fill="#ffffff"/><circle cx="49.5" cy="56.5" r="3" fill="#2D1F0E"/><circle cx="81.5" cy="56.5" r="3" fill="#2D1F0E"/><path fill="#CC6A3E" d="M57 74c0 3.9 3.1 7 7 7s7-3.1 7-7H57z"/></svg>`,

    laravel: `<svg viewBox="0 0 128 128"><path fill="#FF2D20" d="M127.68 30.77c.14.55.14 1.12.02 1.67l-13.5 57.45a3.76 3.76 0 01-1.83 2.41l-43.94 25.35a3.78 3.78 0 01-3.72.04L22.36 93.85a3.78 3.78 0 01-1.88-2.32L.32 16.69A3.78 3.78 0 014 12h38.74a3.78 3.78 0 013.67 2.83l7.47 29.57 24.41-14.09a3.78 3.78 0 013.72-.04l45.35 26.19a3.78 3.78 0 011.32 4.31zM69.33 68.28L46.77 55.26 53.6 82.3l15.73-14.02zM100.3 44.43L79.54 32.4 68.82 65.83l31.48-21.4zM38.46 16H8.76l18.3 66.43L38.46 16zm8.63 44.23l-7.62-30.17-12.5 46.5 20.12-16.33zm51.33 51.49l11.5-48.97-28.42 19.32 16.92 29.65zm-1.85-55.66l-25.97 17.65 13.46 23.58 12.51-41.23zM64.77 97.19L49.04 88.3l-7.47 6.65 23.2 13.39v-11.15zm3.77.34v10.73l38.24-22.07-14.87-26.04-23.37 37.38z"/></svg>`,

    nextjs: `<svg viewBox="0 0 128 128"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6H36V26.3h13.5l50.4 74.9C107.2 91.7 113 78.5 113 64c0-35.3-28.7-64-49-64z"/><path d="M99.7 92.4L71 49.3v31.9l28.7 11.2z"/></svg>`,

    nestjs: `<svg viewBox="0 0 128 128"><path fill="#E0234E" d="M84.8 48.8c-.3-.2-9-5.1-9-5.1s12.8-13.3 14.2-31.2c-.5.3-6.7 3.6-10.5 6.3-5.8-12.7-16-18.7-16-18.7s-1.2 8.4-3.5 14.6c-3.4-1.6-7.8-2.7-13.4-2.7-26 0-36.6 21.1-36.6 36.3 0 8.1 2.3 14.5 5.3 19.4-1.8 2.1-3.3 4.4-3.3 7.4 0 5.1 3.5 8.4 3.5 8.4s-4.8 3-4.8 9.7c0 11.8 11.2 20.4 28.1 20.4 18.7 0 32.4-9.9 32.4-28.1 0-6.1-1.9-10.1-4.5-13.1C76 67.2 92 60.4 84.8 48.8z"/><path fill="#ffffff" d="M43.3 99.4c-8.4 0-13.1-3.3-13.1-7.4 0-2.2 1.4-3.8 1.4-3.8 2.6 1.5 6 2.4 10.2 2.4 9.8 0 13.5-5.5 13.5-9.7V79c-2.5 2.2-6.1 3.7-11.9 3.7-12.2 0-21.4-9.9-21.4-22.5 0-12.2 9.1-21.9 21.7-21.9 6.7 0 11.3 2.2 13.7 4.9V39.4h11.8v42c0 11.8-8.3 18-26 18zm1.3-44c-5.8 0-10.1 4.3-10.1 10.4 0 6.2 4.3 10.6 10.1 10.6 5.8 0 10.2-4.4 10.2-10.6 0-6.1-4.4-10.4-10.2-10.4z"/></svg>`,

    vite: `<svg viewBox="0 0 128 128"><defs><linearGradient id="vite-a" x1="6" x2="235" y1="33" y2="344" gradientTransform="translate(0 -4) scale(.3122)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#41D1FF"/><stop offset="1" stop-color="#BD34FE"/></linearGradient><linearGradient id="vite-b" x1="194.651" x2="236" y1="8.818" y2="292.989" gradientTransform="translate(0 -4) scale(.3122)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FF3CAC" stop-opacity="0"/><stop offset=".5" stop-color="#FF3CAC"/><stop offset="1" stop-color="#FF3CAC" stop-opacity="0"/></linearGradient></defs><path fill="url(#vite-a)" d="M124.766 19.52 67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L.233 19.524c-1.313-2.302.601-5.076 3.261-4.686l59.3 8.543a3.487 3.487 0 0 0 .993 0l57.953-8.55c2.652-.39 4.57 2.37 3.266 4.669Zm0 0"/><path fill="url(#vite-b)" d="M91.46 1.43 48.954 9.758a1.758 1.758 0 0 0-1.421 1.578l-2.761 49.562a1.757 1.757 0 0 0 2.093 1.821l11.381-2.709a1.758 1.758 0 0 1 2.107 2.088l-3.382 16.7a1.758 1.758 0 0 0 2.242 2.02l7.016-2.165c1.26-.39 2.484.648 2.242 1.953l-5.357 28.312c-.335 1.77 2.001 2.742 2.988 1.215l.666-1.02 36.931-73.86c.874-1.749-.615-3.752-2.542-3.438l-11.732 2.023a1.758 1.758 0 0 1-2.014-2.15l7.688-32.559A1.758 1.758 0 0 0 91.46 1.43Zm0 0"/></svg>`,
  };

  function iconHtml(itemId, size) {
    const svg = ICONS_SVG[itemId];
    if (!svg) return '';
    const dim = size === 'modal' ? 34 : 28;
    return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${dim}px;height:${dim}px;flex-shrink:0">${svg.replace('<svg ', `<svg width="${dim}" height="${dim}" `)}</span>`;
  }

  /* ── State ─────────────────────────────────────────────── */
  let allItems         = [];
  let activeType       = 'All';
  let activeCategory   = 'All';
  let activeStatus     = 'All';
  let activeVulnFilter = 'all';
  let searchQuery      = '';
  let sortMode         = 'posture';

  /* ── Escape HTML ─────────────────────────────────────────── */
  function escHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Helpers ─────────────────────────────────────────────── */
  function numEl(n, cls) {
    return `<span class="num ${n === 0 ? 'zero' : cls}">${n}</span>`;
  }

  function postureClass(posture) {
    const p = (posture || '').toUpperCase();
    if (p.includes('CRITICAL')) return 'critical';
    if (p.includes('HIGH'))     return 'high';
    if (p.includes('MEDIUM'))   return 'medium';
    if (p.includes('ROOT') || p.includes('NON-COMPLIANT')) return 'noncompliant';
    return 'clean';
  }

  function cardBorderClass(ver, itemType) {
    const vuln  = ver.vulnerabilities || {};
    const up    = itemType === 'app' ? (vuln.upstream || vuln) : vuln;
    const sys   = up.system || {};
    const apv   = up.app    || {};
    const total = (sys.total || 0) + (apv.total || 0);
    const p     = (ver.posture || '').toUpperCase();
    if (p.includes('CRITICAL')) return 'critical';
    if (p.includes('HIGH'))     return 'high';
    if (p.includes('MEDIUM'))   return 'medium';
    if ((p.includes('ROOT') || p.includes('NON-COMPLIANT')) && total === 0) return 'clean';
    if (p.includes('ROOT') || p.includes('NON-COMPLIANT')) return 'noncompliant';
    return 'clean';
  }

  function postureSortKey(posture) {
    return { critical:0, high:1, medium:2, noncompliant:3, clean:4 }[postureClass(posture)] ?? 5;
  }

  function lifecycleBadgeEl(status, badge) {
    const cls = {
      'LATEST':'latest','SUPPORTED':'supported','MAINTENANCE':'maintenance',
      'EOL':'eol','EOL SOON':'eol','AGING':'eol','DEPRECATED':'deprecated',
    }[(status||'').toUpperCase()] || 'deprecated';
    return `<span class="lifecycle-badge ${cls}">${badge||''} ${status}</span>`;
  }

  function cveRow(label, v) {
    return `<tr>
      <td>${label}</td>
      <td>${numEl(v.critical,'crit')}</td>
      <td>${numEl(v.high,'high')}</td>
      <td>${numEl(v.medium,'med')}</td>
      <td>${numEl(v.low,'low')}</td>
      <td>${numEl(v.fixable,'fix')}</td>
      <td>${numEl(v.total,'tot')}</td>
    </tr>`;
  }

  function cveTableHtml(rows) {
    return `<div class="cve-table-wrap">
      <table class="cve-table">
        <thead><tr>
          <th>Layer</th><th>C</th><th>H</th><th>M</th><th>L</th><th>Fix</th><th>Total</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }

  /* ── CVE chip row for compact card ───────────────────────── */
  function cveChipsHtml(sys, apv) {
    const c = (sys.critical||0) + (apv.critical||0);
    const h = (sys.high||0)     + (apv.high||0);
    const m = (sys.medium||0)   + (apv.medium||0);
    const l = (sys.low||0)      + (apv.low||0);
    const t = (sys.total||0)    + (apv.total||0);

    if (t === 0) {
      return `<span class="cve-chip zero">✓ <span class="chip-label">Zero CVEs</span></span>`;
    }
    const chips = [];
    if (c > 0) chips.push(`<span class="cve-chip crit">${c} <span class="chip-label">C</span></span>`);
    if (h > 0) chips.push(`<span class="cve-chip high">${h} <span class="chip-label">H</span></span>`);
    if (m > 0) chips.push(`<span class="cve-chip med">${m} <span class="chip-label">M</span></span>`);
    if (l > 0) chips.push(`<span class="cve-chip low">${l} <span class="chip-label">L</span></span>`);
    chips.push(`<span class="cve-chip tot">${t} <span class="chip-label">total</span></span>`);
    return chips.join('');
  }

  /* ── Build compact card ──────────────────────────────────── */
  function buildCompactCard(item, ver, vi, sourceKey) {
    const isApp     = item._source === 'patch';
    const itemType  = isApp ? 'app' : item.type;
    const vuln      = ver.vulnerabilities || {};
    const up        = isApp ? (vuln.upstream || vuln) : vuln;
    const sys       = up.system || {};
    const apv       = up.app    || {};
    const pfnData   = isApp ? (vuln.pfnapp   || null) : null;
    const reduction = isApp ? (vuln.reduction || null) : null;
    const pClass    = postureClass(ver.posture);
    const bClass    = cardBorderClass(ver, itemType);
    const uid       = `${sourceKey}-${item.id}-v${vi}`;

    const postureLabelMap = {
      critical:'🔴 Critical', high:'🟠 High',
      medium:'🟡 Medium', noncompliant:'🟡 Non-Compliant', clean:'✅ Clean',
    };

    // reduction summary for card footer hint
    let reductionHint = '';
    if (isApp && reduction && pfnData?.scanned) {
      const rt = reduction.system?.total || 0;
      const rc = reduction.system?.critical || 0;
      const rh = reduction.system?.high || 0;
      if (rt < 0) {
        reductionHint = `<span class="reduction-val">${rt} sys CVEs (C${rc} H${rh})</span>`;
      }
    }

    const typeLabel = isApp ? 'App' : (item.type === 'language' ? 'Language' : 'Framework');
    const typeCls   = isApp ? 'app' : item.type;

    // data attrs for filtering/sorting
    const totalVulns    = (sys.total||0) + (apv.total||0);
    const criticalVulns = (sys.critical||0) + (apv.critical||0);
    const searchable    = escHtml([
      item.name, item.id, item.category, ver.tag, ver.versionLabel || '',
      ...(isApp
        ? [...(ver.topAppCves||[]), ...(ver.topSystemCves||[])]
        : (ver.topCves||[])
      ).map(c => c.id + ' ' + c.pkg + ' ' + (c.title||'')),
    ].join(' ').toLowerCase());

    return `
<div class="card posture-${bClass}"
     data-uid="${uid}"
     data-item-type="${escHtml(itemType)}"
     data-source="${escHtml(item._source)}"
     data-app-id="${escHtml(item.id)}"
     data-version-tag="${escHtml(ver.tag)}"
     data-category="${escHtml(item.category)}"
     data-status="${escHtml((ver.lifecycleStatus||'').toUpperCase())}"
     data-posture="${postureSortKey(ver.posture)}"
     data-name="${escHtml(item.name)}"
     data-total="${totalVulns}"
     data-critical="${criticalVulns}"
     data-searchable="${searchable}"
     tabindex="0"
     role="button"
     aria-label="View details for ${escHtml(item.name)} ${escHtml(ver.tag)}">

  <div class="card-top">
    <div class="card-title-row">
      <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
        ${iconHtml(item.id, 'card')}
        <span style="font-size:0.88rem;font-weight:700;color:var(--text);line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escHtml(item.name)}</span>
      </div>
      <span class="posture-badge ${pClass}">${postureLabelMap[pClass]||ver.posture}</span>
    </div>
    <div class="card-meta-row">
      <span class="version-tag">${escHtml(ver.tag)}</span>
      ${lifecycleBadgeEl(ver.lifecycleStatus, ver.lifecycleBadge||'')}
      <span class="type-tag ${typeCls}">${typeLabel}</span>
    </div>
  </div>

  <div class="card-cve-row">
    ${cveChipsHtml(sys, apv)}
  </div>

  <div class="card-hint">
    <span>${reductionHint ? '🎯 ' + reductionHint : '<span style="opacity:.5">upstream CVEs shown</span>'}</span>
    <span class="hint-icon">›</span>
  </div>

</div>`;
  }

  /* ── Build modal content ─────────────────────────────────── */
  function buildModalContent(item, ver) {
    const isApp    = item._source === 'patch';
    const itemType = isApp ? 'app' : item.type;
    const vuln     = ver.vulnerabilities || {};
    const up       = isApp ? (vuln.upstream || vuln) : vuln;
    const sys      = up.system || {};
    const apv      = up.app    || {};
    const pfnData  = isApp ? (vuln.pfnapp   || null) : null;
    const reduction= isApp ? (vuln.reduction || null) : null;

    /* ── Registry ── */
    const pfnRef = isApp ? `ghcr.io/pfnapp/${item.id}:${ver.tag}` : (ver.imageRef || '');
    let registryHtml = `<div class="modal-registry">`;
    if (isApp) {
      registryHtml += `
      <div class="registry-item">
        <span class="registry-label">Upstream</span>
        <span class="registry-ref mono">${escHtml(ver.fullRef)}</span>
      </div>
      <div class="registry-item">
        <span class="registry-label">PFNApp</span>
        <span class="registry-ref pfn mono">${escHtml(pfnRef)}</span>
      </div>`;
    } else {
      registryHtml += `
      <div class="registry-item">
        <span class="registry-label">Image</span>
        <span class="registry-ref pfn mono">${escHtml(pfnRef)}</span>
      </div>`;
    }
    if (ver.security) {
      registryHtml += ver.security.runAsRoot
        ? `<div class="root-warning">⚠ Runs as root (UID ${escHtml(ver.security.uidLabel||'0')})</div>`
        : `<div class="nonroot-badge">✓ Non-root · UID ${escHtml(String(ver.security.runAsUser||'10001'))}</div>`;
    }
    registryHtml += `</div>`;

    /* ── Upstream CVE table ── */
    const upstreamHtml = `
      <div class="modal-section">
        <div class="modal-section-title"><span class="dot upstream"></span>${isApp ? 'Upstream Vulnerabilities' : 'Vulnerability Scan'}</div>
        ${cveTableHtml(cveRow('System', sys) + cveRow('App', apv))}
      </div>`;

    /* ── PFNApp section (apps only) ── */
    let pfnHtml = '';
    if (isApp) {
      pfnHtml = `<div class="divider"></div>
      <div class="modal-section">
        <div class="modal-section-title"><span class="dot pfn"></span>PFNApp Hardened Image</div>
        ${pfnData?.scanned
          ? cveTableHtml(cveRow('System', pfnData.system||{}) + cveRow('App', pfnData.app||{}))
          : `<div class="pfn-pending"><span>${pfnData ? '<span class="spin">🔄</span>' : 'ℹ️'}</span><span>${pfnData ? 'Scan pending — pipeline not yet deployed.' : 'PFNApp hardened image scan not yet available.'}</span></div>`
        }
      </div>`;
    }

    /* ── Reduction block ── */
    let reductionHtml = '';
    if (isApp && reduction && pfnData?.scanned) {
      const rs = reduction.system || {};
      const ra = reduction.app    || {};
      const hasReduction = (rs.total||0) < 0 || (ra.total||0) < 0;

      // diff page URL — pass app id and version as params
      const diffUrl = `${DIFF_PAGE}?app=${encodeURIComponent(item.id)}&tag=${encodeURIComponent(ver.tag)}`;

      reductionHtml = `<div class="reduction-block">
        <div class="reduction-block-title">
          <span>🎯 CVE Reduction — Upstream → PFNApp</span>
        </div>
        <div class="reduction-grid">
          <div class="reduction-cell">
            <div class="rc-num ${rs.critical===0?'zero':''}">${rs.critical||0}</div>
            <div class="rc-label">System Critical</div>
          </div>
          <div class="reduction-cell">
            <div class="rc-num ${rs.high===0?'zero':''}">${rs.high||0}</div>
            <div class="rc-label">System High</div>
          </div>
          <div class="reduction-cell">
            <div class="rc-num ${rs.medium===0?'zero':''}">${rs.medium||0}</div>
            <div class="rc-label">System Medium</div>
          </div>
          <div class="reduction-cell">
            <div class="rc-num ${rs.total===0?'zero':''}">${rs.total||0}</div>
            <div class="rc-label">System Total</div>
          </div>
        </div>
        ${hasReduction
          ? `<a href="${escHtml(diffUrl)}" class="diff-link">
               🔍 View full CVE diff (before vs after)
             </a>
             <div class="reduction-disclaimer">
               Negative numbers = CVEs removed in the PFNApp image vs upstream.<br>
               Top-5 CVEs shown per layer; click "View full CVE diff" to see the complete list.
             </div>`
          : `<div class="reduction-disclaimer" style="margin-top:6px;">
               No reduction detected — upstream image is already minimal, or the PFNApp image
               inherits the same base. Numbers are delta (upstream − PFNApp).
             </div>`
        }
      </div>`;
    }

    /* ── Top CVEs ── */
    let topCvesHtml = '';
    const upstreamCves = isApp
      ? [...(ver.topSystemCves||[]), ...(ver.topAppCves||[])]
      : (ver.topCves||[]);
    if (upstreamCves.length > 0) {
      const items = upstreamCves.slice(0, 5).map(c => {
        const sc = (c.severity||'LOW').toUpperCase();
        return `<div class="cve-entry">
          <div class="cve-id-row">
            <span class="cve-id ${sc.toLowerCase()}">${escHtml(c.id)}</span>
            <span class="cve-pkg" title="${escHtml(c.pkg)}">${escHtml(c.pkg)}</span>
            <span class="sev-pill ${sc}">${sc}</span>
          </div>
          <div class="cve-title">${escHtml(c.title||'')}</div>
        </div>`;
      }).join('');
      topCvesHtml = `<div class="modal-section">
        <div class="modal-section-title">🔍 Top CVEs (upstream, up to 5 shown)</div>
        ${items}
      </div>`;
    }

    /* ── Compat matrix (frameworks) ── */
    let compatHtml = '';
    if (item.type === 'framework' && item.compatibilityMatrix) {
      const rows = Object.entries(item.compatibilityMatrix).map(([fwKey, cfg]) => {
        const runtimes   = cfg[item.runtime] || [];
        const defaultVer = cfg.default;
        const pills      = runtimes.map(r =>
          `<span class="compat-pill ${r===defaultVer?'default':''}">${r}${r===defaultVer?' ★':''}</span>`
        ).join('');
        return `<div class="compat-row">
          <span class="compat-fw-label">${escHtml(fwKey)}</span>${pills}
        </div>`;
      }).join('');
      compatHtml = `<div class="compat-section">
        <div class="compat-title">Framework ↔ Runtime Compatibility</div>${rows}
      </div>`;
    }

    return registryHtml + upstreamHtml + pfnHtml + reductionHtml + topCvesHtml + compatHtml;
  }

  /* ── Open modal ──────────────────────────────────────────── */
  function openModal(itemId, versionTag, source) {
    const item = allItems.find(i => i.id === itemId && i._source === source);
    if (!item) return;
    const vers = item._source === 'base' ? (item.versions||[]) : (item.monitoredVersions||[]);
    const ver  = vers.find(v => v.tag === versionTag);
    if (!ver) return;

    document.getElementById('modal-app-icon').innerHTML = iconHtml(item.id, 'modal');
    document.getElementById('modal-app-name').textContent = item.name;
    document.getElementById('modal-sub-row').innerHTML = `
      <span class="version-tag">${escHtml(ver.tag)}</span>
      ${lifecycleBadgeEl(ver.lifecycleStatus, ver.lifecycleBadge||'')}
    `;
    document.getElementById('modal-body').innerHTML = buildModalContent(item, ver);

    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // focus close btn
    document.getElementById('modal-close').focus();
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Build all cards for an item ────────────────────────── */
  function buildCard(item) {
    const isBase = item._source === 'base';
    const vers   = isBase ? (item.versions||[]) : (item.monitoredVersions||[]);
    const srcKey = isBase ? 'base' : 'patch';
    return vers.map((ver, vi) => buildCompactCard(item, ver, vi, srcKey)).join('');
  }

  /* ── Filter + Sort ───────────────────────────────────────── */
  function getVersionsForItem(item) {
    return item._source === 'base' ? (item.versions||[]) : (item.monitoredVersions||[]);
  }

  function getVersionVulnTotals(ver, itemType) {
    const vuln = ver.vulnerabilities || {};
    const up   = itemType === 'app' ? (vuln.upstream || vuln) : vuln;
    return {
      total:    (up.system?.total    ||0) + (up.app?.total    ||0),
      critical: (up.system?.critical ||0) + (up.app?.critical ||0),
      high:     (up.system?.high     ||0) + (up.app?.high     ||0),
    };
  }

  function matchesVulnFilter(totals) {
    if (activeVulnFilter === 'critical') return totals.critical > 0;
    if (activeVulnFilter === 'high') return totals.critical === 0 && totals.high > 0;
    if (activeVulnFilter === 'clean') return totals.total === 0;
    return true;
  }

  function getFilteredItems() {
    const q = searchQuery.trim().toLowerCase();
    return allItems.reduce((acc, item) => {
      const itemType = item._source === 'base' ? item.type : 'app';
      if (activeType !== 'All' && itemType !== activeType) return acc;
      const vers = getVersionsForItem(item);
      const isBaseType = itemType === 'language' || itemType === 'framework';
      const filteredVers = vers.filter(ver => {
        if (activeCategory !== 'All') {
          const filterVal = isBaseType ? item.name : item.category;
          if (filterVal !== activeCategory) return false;
        }
        if (!matchesVulnFilter(getVersionVulnTotals(ver, itemType))) return false;
        if (activeStatus !== 'All' && (ver.lifecycleStatus||'').toUpperCase() !== activeStatus) return false;
        if (q) {
          const cves = item._source === 'base'
            ? (ver.topCves||[])
            : [...(ver.topAppCves||[]), ...(ver.topSystemCves||[])];
          const hay = [
            item.name, item.id, item.category, ver.tag, ver.versionLabel||'', item.icon||'',
            ...cves.map(c => c.id+' '+c.pkg+' '+(c.title||'')),
          ].join(' ').toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
      if (filteredVers.length > 0) {
        const key = item._source === 'base' ? 'versions' : 'monitoredVersions';
        acc.push({ ...item, [key]: filteredVers });
      }
      return acc;
    }, []);
  }

  function sortItems(items) {
    return [...items].sort((a, b) => {
      const av     = getVersionsForItem(a)[0] || {};
      const bv     = getVersionsForItem(b)[0] || {};
      const aType  = a._source === 'base' ? a.type : 'app';
      const bType  = b._source === 'base' ? b.type : 'app';
      const aTot   = getVersionVulnTotals(av, aType);
      const bTot   = getVersionVulnTotals(bv, bType);
      switch (sortMode) {
        case 'posture':   return postureSortKey(av.posture) - postureSortKey(bv.posture) || a.name.localeCompare(b.name);
        case 'name':      return a.name.localeCompare(b.name);
        case 'total-desc':return bTot.total    - aTot.total;
        case 'total-asc': return aTot.total    - bTot.total;
        case 'critical':  return bTot.critical - aTot.critical;
        default: return 0;
      }
    });
  }

  /* ── Render ──────────────────────────────────────────────── */
  function renderCards() {
    const filtered = sortItems(getFilteredItems());
    const grid     = document.getElementById('cards-grid');
    const noRes    = document.getElementById('no-results');
    const countEl  = document.getElementById('results-count');
    grid.innerHTML = filtered.map(item => buildCard(item)).join('');
    const totalCards = filtered.reduce((s, i) => s + getVersionsForItem(i).length, 0);
    noRes.classList.toggle('hidden', totalCards > 0);
    countEl.textContent = `${totalCards} version${totalCards!==1?'s':''} · ${filtered.length} image${filtered.length!==1?'s':''}`;
  }

  function renderTypeTabs() {
    const container = document.getElementById('type-tabs');
    const types = [
      { key:'All',       label:'All',        icon:'📋' },
      { key:'language',  label:'Languages',  icon:'⬡'  },
      { key:'framework', label:'Frameworks', icon:'🔷' },
      { key:'app',       label:'App Patches',icon:'📦' },
    ];
    container.innerHTML = types.map(t => {
      const count = t.key === 'All'
        ? allItems.reduce((s,i) => s + getVersionsForItem(i).length, 0)
        : allItems.filter(i => (i._source==='base' ? i.type : 'app') === t.key)
                  .reduce((s,i) => s + getVersionsForItem(i).length, 0);
      return `<button class="type-btn ${t.key===activeType?'active':''}" data-type="${t.key}">
        ${t.icon} ${t.label}<span class="type-count">${count}</span>
      </button>`;
    }).join('');
    container.querySelectorAll('.type-btn').forEach(btn =>
      btn.addEventListener('click', () => setType(btn.dataset.type))
    );
  }

  function renderTabs() {
    const container = document.getElementById('filter-tabs');
    const visible   = allItems.filter(i => activeType==='All' || (i._source==='base' ? i.type : 'app') === activeType);

    // For language/framework type tabs: show per-image-name sub-filters (more useful than single category)
    // For All/app: show category-based sub-filters as before
    const isBaseType = activeType === 'language' || activeType === 'framework';

    let tabs;
    if (isBaseType) {
      const names = ['All', ...visible.map(i => i.name).sort()];
      tabs = names.map(name => {
        const count = name === 'All'
          ? visible.reduce((s,i) => s + getVersionsForItem(i).length, 0)
          : visible.filter(i => i.name === name).reduce((s,i) => s + getVersionsForItem(i).length, 0);
        const icon = name === 'All' ? '' : (visible.find(i => i.name === name)?.icon || '');
        return { key: name, label: (icon ? icon + ' ' : '') + name, count };
      });
    } else {
      const cats = ['All', ...[...new Set(visible.map(i=>i.category))].sort()];
      tabs = cats.map(cat => {
        const count = cat==='All'
          ? visible.reduce((s,i) => s + getVersionsForItem(i).length, 0)
          : visible.filter(i=>i.category===cat).reduce((s,i) => s + getVersionsForItem(i).length, 0);
        return { key: cat, label: cat, count };
      });
    }

    container.innerHTML = tabs.map(t =>
      `<button class="tab-btn ${t.key===activeCategory?'active':''}" data-cat="${escHtml(t.key)}">
        ${escHtml(t.label)}<span class="tab-count">${t.count}</span>
      </button>`
    ).join('');
    container.querySelectorAll('.tab-btn').forEach(btn =>
      btn.addEventListener('click', () => setCategory(btn.dataset.cat))
    );
  }

  function renderStats() {
    let critical=0, high=0, clean=0, versions=0, images=0;
    allItems.forEach(item => {
      images++;
      const iType = item._source==='base' ? item.type : 'app';
      getVersionsForItem(item).forEach(ver => {
        versions++;
        const totals = getVersionVulnTotals(ver, iType);
        if (totals.critical > 0) critical++;
        else if (totals.high > 0) high++;
        else if (totals.total === 0) clean++;
      });
    });
    document.getElementById('stat-images').textContent   = images;
    document.getElementById('stat-versions').textContent = versions;
    document.getElementById('stat-critical').textContent = critical;
    document.getElementById('stat-high').textContent     = high;
    document.getElementById('stat-clean').textContent    = clean;
  }

  function renderVulnFilters() {
    document.querySelectorAll('[data-vuln-filter]').forEach(btn => {
      const isActive = btn.dataset.vulnFilter === activeVulnFilter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function renderHeaderMeta(patchSummary, baseSummary) {
    const latest   = patchSummary.generatedAt > (baseSummary?.generatedAt||'')
      ? patchSummary.generatedAt : (baseSummary?.generatedAt||patchSummary.generatedAt);
    const scanDate = new Date(latest).toLocaleString('en-US', { dateStyle:'long', timeStyle:'short' });
    document.getElementById('last-scan-text').textContent = `Last scan: ${scanDate}`;
    document.getElementById('header-meta').innerHTML = `
      <div class="meta-badge">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--muted)">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        Scanner: Aqua Trivy
      </div>
      <div class="meta-badge">Policy: ${escHtml(patchSummary.supportWindowPolicy||'N-4')}</div>
    `;
  }

  /* ── Event wiring ────────────────────────────────────────── */
  function setType(type) {
    activeType = type; activeCategory = 'All';
    renderTypeTabs(); renderTabs(); renderCards();
  }
  function setCategory(cat) {
    activeCategory = cat; renderTabs(); renderCards();
  }
  function setVulnFilter(filter) {
    activeVulnFilter = activeVulnFilter === filter && filter !== 'all' ? 'all' : filter;
    renderVulnFilters(); renderCards();
  }

  /* ── Card click → open modal ────────────────────────────── */
  document.getElementById('cards-grid').addEventListener('click', e => {
    const card = e.target.closest('.card[data-uid]');
    if (!card) return;
    openModal(card.dataset.appId, card.dataset.versionTag, card.dataset.source);
  });
  document.getElementById('cards-grid').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.card[data-uid]');
    if (!card) return;
    e.preventDefault();
    card.click();
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── Init ────────────────────────────────────────────────── */
  function init(patchData, baseData) {
    const patchApps  = (patchData.applications||[]).map(a => ({ ...a, _source:'patch' }));
    const baseImages = (baseData?.baseImages   ||[]).map(i => ({ ...i, _source:'base'  }));
    allItems = [
      ...baseImages.filter(i => i.type==='language'),
      ...baseImages.filter(i => i.type==='framework'),
      ...patchApps,
    ];

    renderHeaderMeta(patchData.summary||{}, baseData?.summary||null);
    renderStats();
    renderVulnFilters();
    renderTypeTabs();
    renderTabs();
    renderCards();

    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    document.querySelectorAll('[data-vuln-filter]').forEach(btn =>
      btn.addEventListener('click', () => setVulnFilter(btn.dataset.vulnFilter))
    );
    document.getElementById('search-input').addEventListener('input', e => { searchQuery = e.target.value; renderCards(); });
    document.getElementById('sort-select').addEventListener('change', e => { sortMode = e.target.value; renderCards(); });
    document.getElementById('status-select').addEventListener('change', e => { activeStatus = e.target.value; renderCards(); });
  }

  /* ── Fetch ───────────────────────────────────────────────── */
  Promise.allSettled([
    fetch(REPORT_URL).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }),
    fetch(BASE_URL).then(r  => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }),
  ]).then(([patchResult, baseResult]) => {
    if (patchResult.status === 'rejected') {
      console.error('Failed to load report.json:', patchResult.reason);
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('error-state').classList.remove('hidden');
      return;
    }
    if (baseResult.status === 'rejected') {
      console.warn('base-report.json not available:', baseResult.reason);
    }
    init(patchResult.value, baseResult.status==='fulfilled' ? baseResult.value : null);
  });

})();
