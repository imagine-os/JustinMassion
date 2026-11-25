/* personality.js — tactile, physical UI for every JustinMassion.com concept.
   Include: <script src="[../]personality.js?v=1" data-root="[../]"></script>  (after the page's own markup)
   Components are opt-in with data-jm="…" attributes; style them per page with CSS variables.

   data-jm="hang"   Frames hanging on cords that swing with scroll speed and the cursor.
                    Children: <img src alt data-cap="caption"> (or any element). Vars: --jm-cord, --jm-frame-bg, --jm-frame-w
   data-jm="peel"   A sticker that curls at the corner on hover; drag it to peel it off and stick it somewhere else.
   data-jm="press"  A chunky 3D key/button that physically presses down with a soft click. Vars: --jm-key, --jm-key-ink
   data-jm="hex"    A honeycomb keyboard of glyph keys that glow under the cursor. data-items="Pencil,Blueprint,…" data-glyphs="✎,⌗,…"
                    Vars: --jm-hex-a, --jm-hex-b (glow gradient), --jm-hex-key, --jm-hex-ink
   data-jm="arc"    Images on a big curved arc you can drag/scroll to rotate. Children: <img src alt data-cap>.
   Global:          every button / .btn / [role=button] gets a tiny press + click sound (toggle lives in the concept switcher).
   Events:          window 'jm:tap' {detail:{el,label}} fired by hex keys and press keys. API: window.JM.tick(pitch), window.JM.sound */
(() => {
  if (window.JM) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- sound: tiny synthesized clicks, no files ---------- */
  let ac = null, on = localStorage.getItem('jm-sound') !== 'off';
  function ctx() { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)() } catch (e) { } } if (ac && ac.state === 'suspended') ac.resume(); return ac }
  function tick(pitch = 1, vol = .16, kind = 'tick') {
    if (!on) return; const a = ctx(); if (!a) return; const t = a.currentTime;
    const g = a.createGain(); g.connect(a.destination);
    if (kind === 'pop') { const o = a.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(520 * pitch, t); o.frequency.exponentialRampToValueAtTime(180 * pitch, t + .12); o.connect(g); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + .16); o.start(t); o.stop(t + .17); return }
    // tick = short filtered noise burst + a tiny sine body (like a mechanical key)
    const n = a.createBufferSource(), buf = a.createBuffer(1, a.sampleRate * .03, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
    n.buffer = buf; const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2600 * pitch; f.Q.value = 1.4; n.connect(f); f.connect(g);
    const o = a.createOscillator(); o.type = 'triangle'; o.frequency.value = 190 * pitch; const og = a.createGain(); og.gain.setValueAtTime(vol * .7, t); og.gain.exponentialRampToValueAtTime(.0001, t + .06); o.connect(og); og.connect(a.destination);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + .05); n.start(t); o.start(t); o.stop(t + .07);
  }
  const JM = window.JM = { tick, get sound() { return on }, set sound(v) { on = !!v; localStorage.setItem('jm-sound', on ? 'on' : 'off'); document.documentElement.classList.toggle('jm-muted', !on); dispatchEvent(new CustomEvent('jm:sound', { detail: on })) } };
  document.documentElement.classList.toggle('jm-muted', !on);
  const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms) } catch (e) { } };

  /* ---------- styles ---------- */
  const css = `
  :where(button,.btn,[role=button],a.btn){transition:scale .12s cubic-bezier(.3,1.6,.5,1)}
  :where(button,.btn,[role=button],a.btn):active{scale:.95}
  [data-jm=hang]{position:relative;display:flex;justify-content:center;gap:clamp(14px,2.4vw,36px);align-items:flex-start;padding-top:0;min-height:calc(var(--jm-frame-w)*1.9);touch-action:pan-y}
  :where([data-jm=hang]){--jm-cord:rgba(255,255,255,.55);--jm-frame-bg:rgba(255,255,255,.12);--jm-frame-w:min(clamp(120px,14vw,220px),calc((100% - (var(--jm-n,5) - 1)*14px)/var(--jm-n,5)))}
  [data-jm=hang]::before{content:'';position:absolute;left:4%;right:4%;top:0;height:3px;border-radius:3px;background:var(--jm-cord);opacity:.7}
  .jm-hanger{position:relative;width:var(--jm-frame-w);transform-origin:50% 0;will-change:transform;cursor:grab}
  .jm-hanger:active{cursor:grabbing}
  .jm-cord{display:block;margin:0 auto;width:2px;background:var(--jm-cord)}
  .jm-hanger .jm-pin{position:absolute;left:50%;top:-5px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:var(--jm-cord);box-shadow:0 1px 3px rgba(0,0,0,.35)}
  .jm-frame{position:relative;padding:8px;border-radius:12px;background:var(--jm-frame-bg);backdrop-filter:blur(10px) saturate(1.3);-webkit-backdrop-filter:blur(10px) saturate(1.3);border:1px solid rgba(255,255,255,.35);box-shadow:0 30px 40px -18px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.45)}
  .jm-frame::before{content:'';position:absolute;left:50%;top:-1px;width:26px;height:8px;margin-left:-13px;border-radius:0 0 6px 6px;background:var(--jm-cord)}
  .jm-frame>img,.jm-frame>*{display:block;width:100%;border-radius:6px}
  .jm-frame>img{aspect-ratio:4/5;object-fit:cover}
  .jm-frame::after{content:'';position:absolute;inset:8px;border-radius:6px;background:linear-gradient(115deg,rgba(255,255,255,.35),rgba(255,255,255,0) 35%,rgba(255,255,255,0) 70%,rgba(255,255,255,.18));pointer-events:none;mix-blend-mode:screen}
  .jm-cap{margin-top:8px;font-family:inherit;font-weight:600;font-size:11px;line-height:1.3;letter-spacing:.08em;text-transform:uppercase;text-align:center;opacity:.8}
  [data-jm=peel]{position:relative;display:inline-block;touch-action:none;cursor:grab;--p:0;transition:filter .3s;user-select:none;-webkit-user-select:none}
  [data-jm=peel].jm-drag{cursor:grabbing;z-index:60;filter:drop-shadow(0 22px 18px rgba(0,0,0,.35))}
  .jm-peel-in{clip-path:polygon(0 0,100% 0,100% calc(100% - var(--p)*100%),calc(100% - var(--p)*100%) 100%,0 100%)}
  .jm-curl{position:absolute;right:0;bottom:0;width:calc(var(--p)*100%);height:calc(var(--p)*100%);pointer-events:none;background:linear-gradient(135deg,#ffffff 0%,#f4efe4 28%,#ddd5c5 46%,#b9b09f 50%);clip-path:polygon(0 0,100% 0,0 100%);transform:rotate(0);filter:drop-shadow(-3px -3px 4px rgba(0,0,0,.2));border-radius:0 0 30% 0}
  :where([data-jm=press]){--jm-key:#f3efe7;--jm-key-ink:#141210;--jm-d:7px}
  [data-jm=press]{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:64px;padding:16px 26px;border:0;border-radius:999px;background:linear-gradient(180deg,color-mix(in srgb,var(--jm-key),#fff 22%),var(--jm-key));color:var(--jm-key-ink);font-family:inherit;font-weight:700;font-size:15px;line-height:1;cursor:pointer;
    box-shadow:0 var(--jm-d) 0 color-mix(in srgb,var(--jm-key),#000 32%),0 calc(var(--jm-d) + 10px) 22px -8px rgba(0,0,0,.45),inset 0 2px 0 rgba(255,255,255,.7),inset 0 -2px 0 rgba(0,0,0,.08);translate:0 0;transition:translate .08s,box-shadow .08s}
  [data-jm=press].jm-down,[data-jm=press]:active{translate:0 calc(var(--jm-d) - 1px);box-shadow:0 1px 0 color-mix(in srgb,var(--jm-key),#000 32%),0 4px 10px -6px rgba(0,0,0,.5),inset 0 2px 0 rgba(255,255,255,.5),inset 0 -1px 0 rgba(0,0,0,.08);scale:1}
  :where([data-jm=hex]){--jm-hex-a:#ff8a3d;--jm-hex-b:#ff3d9a;--jm-hex-key:#1b1b1f;--jm-hex-ink:#f3efe7;--s:clamp(46px,5.4vw,74px)}
  [data-jm=hex]{position:relative;display:block;padding:calc(var(--s)*.2) 0 calc(var(--s)*.5);overflow:hidden;touch-action:pan-y}
  .jm-hex-row{display:flex;gap:calc(var(--s)*.08);justify-content:center;margin-top:calc(var(--s)*-.2)}
  .jm-hex-row:nth-child(even){transform:translateX(calc(var(--s)*.54))}
  .jm-key{position:relative;flex:none;width:var(--s);height:calc(var(--s)*1.1);clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);background:var(--jm-hex-key);display:grid;place-items:center;color:var(--jm-hex-ink);font-size:calc(var(--s)*.32);cursor:pointer;transition:transform .12s,background .25s,color .25s;user-select:none}
  .jm-key::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 35%,var(--jm-hex-a),var(--jm-hex-b));opacity:var(--g,0);transition:opacity .25s}
  .jm-key span{position:relative;filter:drop-shadow(0 1px 0 rgba(0,0,0,.25))}
  .jm-key.jm-hot span{color:#fff}
  .jm-key.jm-down{transform:scale(.9)}
  .jm-hex-label{position:absolute;left:50%;bottom:6px;transform:translateX(-50%);padding:6px 12px;border-radius:99px;background:rgba(0,0,0,.65);color:#fff;font-family:inherit;font-weight:600;font-size:12px;line-height:1;opacity:0;transition:opacity .25s;pointer-events:none;white-space:nowrap}
  [data-jm=arc]{position:relative;height:clamp(300px,42vw,520px);overflow:hidden;touch-action:pan-y;cursor:grab;user-select:none}
  [data-jm=arc]:active{cursor:grabbing}
  .jm-arc-item{position:absolute;left:50%;top:0;width:clamp(110px,13vw,190px);margin-left:calc(clamp(110px,13vw,190px)/-2);transform-origin:50% 0;will-change:transform;transition:filter .3s}
  .jm-arc-item img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:14px;box-shadow:0 24px 30px -16px rgba(0,0,0,.5);pointer-events:none}
  .jm-arc-item .jm-cap{margin-top:8px}
  .jm-snd{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:1px solid currentColor;margin-left:4px;font-size:13px;line-height:1;opacity:.8;cursor:pointer;flex:none}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- global tactile click on buttons ---------- */
  addEventListener('pointerdown', e => {
    const b = e.target.closest && e.target.closest('button,.btn,[role=button],[data-jm=press]');
    if (!b || b.closest('[data-jm=hex]')) return; tick(b.matches('[data-jm=press]') ? .8 : 1.15, b.matches('[data-jm=press]') ? .2 : .09); buzz(6);
  }, { passive: true });

  /* ---------- HANG: pendulum physics ---------- */
  const hangers = [];
  function setupHang(root) {
    const items = [...root.children]; root.innerHTML = ''; root.style.setProperty('--jm-n', items.length);
    items.forEach((el, i) => {
      const h = document.createElement('div'); h.className = 'jm-hanger';
      const L = 30 + ((i * 47) % 70); // cords of different lengths
      h.innerHTML = `<i class="jm-pin"></i><i class="jm-cord" style="height:${L}px"></i>`;
      const fr = document.createElement('div'); fr.className = 'jm-frame'; fr.appendChild(el); h.appendChild(fr);
      const cap = el.getAttribute && el.getAttribute('data-cap'); if (cap) { const c = document.createElement('div'); c.className = 'jm-cap'; c.textContent = cap; h.appendChild(c) }
      root.appendChild(h);
      hangers.push({ el: h, th: (Math.random() - .5) * .3, w: 0, k: 9 + (i % 3) * 2.5, root });
      // fling: drag sideways to push the frame
      let sx = null, lt = 0;
      h.addEventListener('pointerdown', ev => { sx = ev.clientX; lt = performance.now(); h.setPointerCapture(ev.pointerId); tick(.7, .08) });
      h.addEventListener('pointermove', ev => { if (sx === null) return; const H = hangers.find(o => o.el === h), dt = Math.max(16, performance.now() - lt); H.w += (ev.clientX - sx) / dt * .9; sx = ev.clientX; lt = performance.now() });
      ['pointerup', 'pointercancel'].forEach(t => h.addEventListener(t, () => sx = null));
    });
  }
  let lastY = scrollY, vScroll = 0, mx = -1e4, my = -1e4, pmx = mx;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY }, { passive: true });
  addEventListener('scroll', () => { vScroll += (scrollY - lastY); lastY = scrollY }, { passive: true });

  /* ---------- PEEL ---------- */
  function setupPeel(el) {
    const inner = document.createElement('div'); inner.className = 'jm-peel-in'; while (el.firstChild) inner.appendChild(el.firstChild); el.appendChild(inner);
    const curl = document.createElement('i'); curl.className = 'jm-curl'; el.appendChild(curl);
    let p = 0, target = 0, dx = 0, dy = 0, sx = 0, sy = 0, drag = false, ox = 0, oy = 0, baseRot = '';
    const loop = () => { p += (target - p) * .2; el.style.setProperty('--p', p.toFixed(3)); if (Math.abs(target - p) > .001) requestAnimationFrame(loop) };
    const go = t => { target = t; requestAnimationFrame(loop) };
    el.addEventListener('pointerenter', () => { if (!drag) { go(.16); tick(1.6, .05) } });
    el.addEventListener('pointerleave', () => { if (!drag) go(0) });
    el.addEventListener('pointerdown', e => { if (!drag) baseRot = el.style.rotate; drag = true; el.setPointerCapture(e.pointerId); sx = e.clientX - ox; sy = e.clientY - oy; el.classList.add('jm-drag'); go(.32); tick(.9, .12, 'pop'); e.preventDefault() });
    el.addEventListener('pointermove', e => { if (!drag) return; ox = e.clientX - sx; oy = e.clientY - sy; el.style.translate = `${ox}px ${oy}px`; el.style.rotate = `${clamp((e.movementX || 0) * .6, -12, 12)}deg` });
    const up = () => { if (!drag) return; drag = false; el.classList.remove('jm-drag'); el.style.rotate = baseRot; go(0); tick(.6, .16, 'pop'); buzz(10);
      el.animate([{ scale: 1.08 }, { scale: .97 }, { scale: 1 }], { duration: 320, easing: 'cubic-bezier(.3,1.6,.5,1)' }) };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('dblclick', () => { ox = oy = 0; el.style.translate = '0 0' });
  }

  /* ---------- PRESS ---------- */
  function setupPress(el) {
    const label = el.getAttribute('aria-label') || el.textContent.trim();
    const down = () => { el.classList.add('jm-down'); buzz(8) }, upp = () => { if (el.classList.contains('jm-down')) { el.classList.remove('jm-down'); tick(1.4, .1); dispatchEvent(new CustomEvent('jm:tap', { detail: { el, label } })) } };
    el.addEventListener('pointerdown', down); el.addEventListener('pointerup', upp); el.addEventListener('pointerleave', () => el.classList.remove('jm-down'));
    el.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') down() }); el.addEventListener('keyup', upp);
  }

  /* ---------- HEX keyboard ---------- */
  const hexes = [];
  function setupHex(root) {
    const items = (root.dataset.items || 'Sketch,Blueprint,Prototype,Ship,Pixel,Story,AI,Spatial,Guatapé,Orlando,LA,Academy').split(',').map(s => s.trim());
    const glyphs = (root.dataset.glyphs || '✎,⌗,✦,☁,◉,❝,⚙,◎,⛰,✺,☼,❖').split(',').map(s => s.trim());
    const cols = Math.max(5, +root.dataset.cols || (innerWidth < 700 ? 6 : 11)), rows = +root.dataset.rows || 4;
    root.innerHTML = ''; let k = 0;
    for (let r = 0; r < rows; r++) { const row = document.createElement('div'); row.className = 'jm-hex-row';
      for (let c = 0; c < cols - (r % 2); c++) { const key = document.createElement('div'); key.className = 'jm-key'; const n = k % items.length; key.dataset.label = items[n];
        key.innerHTML = `<span>${glyphs[n % glyphs.length]}</span>`; key.setAttribute('role', 'button'); key.setAttribute('aria-label', items[n]); key.tabIndex = -1; row.appendChild(key); k++ }
      root.appendChild(row) }
    const lab = document.createElement('div'); lab.className = 'jm-hex-label'; root.appendChild(lab);
    const keys = [...root.querySelectorAll('.jm-key')]; const H = { root, keys, lab, g: keys.map(() => 0), idle: 0, last: null }; hexes.push(H);
    root.addEventListener('pointerdown', e => { const key = e.target.closest('.jm-key'); if (!key) return; key.classList.add('jm-down'); tick(.9 + Math.random() * .5, .14); buzz(5);
      lab.textContent = key.dataset.label; lab.style.opacity = 1; clearTimeout(H.t); H.t = setTimeout(() => lab.style.opacity = 0, 1400);
      dispatchEvent(new CustomEvent('jm:tap', { detail: { el: key, label: key.dataset.label } })) });
    addEventListener('pointerup', () => keys.forEach(k => k.classList.remove('jm-down')));
    root.addEventListener('pointermove', e => { const key = e.target.closest('.jm-key'); if (key && key !== H.last) { H.last = key; tick(1.8 + Math.random() * .4, .025) } });
  }

  /* ---------- ARC carousel ---------- */
  const arcs = [];
  function setupArc(root) {
    const items = [...root.children]; root.innerHTML = '';
    const els = items.map(el => { const w = document.createElement('div'); w.className = 'jm-arc-item'; w.appendChild(el); const cap = el.getAttribute && el.getAttribute('data-cap'); if (cap) { const c = document.createElement('div'); c.className = 'jm-cap'; c.textContent = cap; w.appendChild(c) } root.appendChild(w); return w });
    const A = { root, els, rot: 0, v: .0009, target: null, drag: false }; arcs.push(A);
    let sx = 0, last = 0;
    root.addEventListener('pointerdown', e => { A.drag = true; sx = e.clientX; last = performance.now(); root.setPointerCapture(e.pointerId) });
    root.addEventListener('pointermove', e => { if (!A.drag) return; const d = (e.clientX - sx) / root.clientWidth; A.rot += d * 1.4; A.v = d * 1.4 / Math.max(1, (performance.now() - last) / 16); sx = e.clientX; last = performance.now() });
    ['pointerup', 'pointercancel'].forEach(t => root.addEventListener(t, () => { A.drag = false }));
    root.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { A.rot -= e.deltaX * .0015; e.preventDefault() } }, { passive: false });
  }

  /* ---------- one animation loop for everything ---------- */
  let lt = performance.now(), tAcc = 0;
  function frame(now) {
    const dt = Math.min(.05, (now - lt) / 1000); lt = now; tAcc += dt;
    const sv = vScroll; vScroll *= .0; // consume the scroll impulse
    for (const H of hangers) {
      const r = H.el.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) continue;
      let f = -H.k * Math.sin(H.th) - 1.6 * H.w;
      f += clamp(sv, -60, 60) * .06 * (H.k / 10); // scroll gusts
      if (!reduce) { const cx = r.left + r.width / 2, cy = r.top + r.height * .6, d = Math.hypot(mx - cx, my - cy); if (d < r.width * .9) { const push = (mx - pmx) * .9; f += push * (1 - d / (r.width * .9)) } }
      f += Math.sin(tAcc * 1.3 + H.k) * .25; // breeze
      H.w += f * dt; H.th = clamp(H.th + H.w * dt, -1.1, 1.1);
      H.el.style.transform = `rotate(${(H.th * 57.3).toFixed(2)}deg)`;
    }
    for (const X of hexes) {
      const R = X.root.getBoundingClientRect(); if (R.bottom < 0 || R.top > innerHeight) continue;
      X.idle += dt; const near = mx > R.left && mx < R.right && my > R.top && my < R.bottom;
      X.keys.forEach((k, i) => {
        let g = 0;
        if (near) { const b = k.getBoundingClientRect(), d = Math.hypot(mx - (b.left + b.width / 2), my - (b.top + b.height / 2)); g = clamp(1 - d / (b.width * 2.4), 0, 1) }
        else if (!reduce) { g = Math.max(0, Math.sin(X.idle * 1.4 - i * .37)) ** 8 * .85 } // idle ripple, like someone typing
        X.g[i] += (g - X.g[i]) * .18; k.style.setProperty('--g', X.g[i].toFixed(3)); k.classList.toggle('jm-hot', X.g[i] > .35);
      });
    }
    for (const A of arcs) {
      const R = A.root.getBoundingClientRect(); if (R.bottom < 0 || R.top > innerHeight) continue;
      if (!A.drag) { A.rot += A.v; A.v = lerp(A.v, reduce ? 0 : .0009, .04) }
      // items sit side by side on a big circle; the ring wraps so it scrolls forever
      const n = A.els.length, iw = A.els[0].offsetWidth || 160, Rr = Math.max(R.width * 1.05, 900), step = (iw * 1.18) / Rr, total = n * step, half = Math.asin(Math.min(1, (R.width / 2 + iw) / Rr));
      const rot = A.rot * (total / (Math.PI * 2)) * 4;
      A.els.forEach((el, i) => {
        let a = ((i * step + rot) % total + total) % total; if (a > total / 2) a -= total; // centred on 0 = top
        const x = Math.sin(a) * Rr, y = Rr * (1 - Math.cos(a)) + 24;
        el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${(a * 57.3).toFixed(2)}deg)`;
        el.style.opacity = Math.abs(a) < half ? 1 : 0; el.style.zIndex = 100 - Math.round(Math.abs(a) * 60);
      });
    }
    pmx = mx; requestAnimationFrame(frame);
  }

  // set up every not-yet-initialised component inside root (call JM.mount(el) for content you add later)
  const SETUP = { hang: setupHang, peel: setupPeel, press: setupPress, hex: setupHex, arc: setupArc };
  function mount(root = document) {
    const list = [...(root.querySelectorAll ? root.querySelectorAll('[data-jm]') : [])]; if (root.matches && root.matches('[data-jm]')) list.unshift(root);
    list.forEach(el => { if (el.dataset.jmReady) return; const f = SETUP[el.dataset.jm]; if (f) { el.dataset.jmReady = '1'; f(el) } });
  }
  JM.mount = mount;
  function init() {
    mount(document);
    requestAnimationFrame(frame);
    // sound toggle inside the concept switcher (if present)
    const add = () => { const bar = document.querySelector('.vsw'); if (!bar || bar.querySelector('.jm-snd')) return;
      const b = document.createElement('button'); b.className = 'jm-snd'; b.type = 'button'; const upd = () => { b.textContent = on ? '🔊' : '🔈'; b.title = on ? 'UI sounds on' : 'UI sounds off'; b.setAttribute('aria-label', b.title) }; upd();
      b.addEventListener('click', e => { e.preventDefault(); JM.sound = !on; upd(); if (on) tick(1, .14, 'pop') }); bar.appendChild(b) };
    add(); setTimeout(add, 800);
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
