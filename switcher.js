/* Version switcher shared by every JustinMassion.com landing-page concept.
   Add a new concept by appending to VERSIONS (path is relative to the site root).
   Include on a page with: <script src="[../]switcher.js" data-root="[../]" data-current="a"></script> */
(() => {
  const VERSIONS = [
    { id: 'b', label: 'B', name: 'Spatial journal', path: '' },   // default: site root
    { id: 'a', label: 'A', name: 'Cinematic', path: 'a/' },
    { id: 'c', label: 'C', name: 'Dark studio', path: 'c/' },
    { id: 'd', label: 'D', name: 'Destinations', path: 'd/' },
    { id: 'e', label: 'E', name: 'Sketch story', path: 'e/' },
  ];
  const me = document.currentScript;
  const root = (me && me.dataset.root) || '';
  const current = (me && me.dataset.current) || VERSIONS[0].id;
  const keep = /[?&]nointro/.test(location.search) ? '?nointro' : '';

  const css = `
  .vsw{position:fixed;left:auto;right:18px;top:auto;bottom:18px;width:auto;height:auto;margin:0;transform:none;z-index:200;display:flex;align-items:center;gap:4px;padding:5px;border-radius:999px;
    background:rgba(18,18,16,.62);backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);
    border:1px solid rgba(255,255,255,.14);box-shadow:0 10px 30px -10px rgba(0,0,0,.45);font:500 11px/1 Inter,'Inter Tight',system-ui,sans-serif;color:#f3efe7}
  .vsw .vsw-t{padding:0 10px 0 12px;letter-spacing:.16em;text-transform:uppercase;font-size:9.5px;opacity:.6}
  .vsw a{display:flex;align-items:center;gap:7px;padding:8px 13px;border-radius:999px;color:inherit;text-decoration:none;letter-spacing:.06em;transition:background .3s,color .3s}
  .vsw a b{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;border:1px solid currentColor;font-size:10px}
  .vsw a:hover{background:rgba(255,255,255,.12)}
  .vsw a.on{background:#f3efe7;color:#141210}
  @media (max-width:640px){.vsw .vsw-t,.vsw a span{display:none}.vsw a{padding:7px}.vsw{bottom:12px;right:12px}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // a <div>, not <nav>: concept pages style their own <nav> elements globally
  const bar = document.createElement('div');
  bar.className = 'vsw'; bar.setAttribute('role', 'navigation'); bar.setAttribute('aria-label', 'Design versions');
  bar.innerHTML = '<span class="vsw-t">Concepts</span>' + VERSIONS.map(v =>
    `<a href="${root}${v.path}${keep}" class="${v.id === current ? 'on' : ''}" ${v.id === current ? 'aria-current="page"' : ''} data-cursor="${v.label}"><b>${v.label}</b><span>${v.name}</span></a>`
  ).join('');
  document.body.appendChild(bar);

  // keyboard: Alt+1..9 jumps between concepts
  addEventListener('keydown', e => {
    if (!e.altKey) return; const i = +e.key - 1;
    if (VERSIONS[i] && VERSIONS[i].id !== current) location.href = root + VERSIONS[i].path + keep;
  });
})();
