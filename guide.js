/* guide.js — Justin himself as a tiny platformer-hero tour guide.
   He waits at the bottom-left; press "Tour" and he runs while the page scrolls, then jumps onto the next
   section's heading like a platform, lands with sparkles and tells you about it. On one-screen concepts he
   hops between objects. Arrow keys ← → step through the tour, Esc ends it.
   Include: <script src="[../]guide.js?v=1" data-root="[../]" data-page="a"></script> (after the page's own scripts).
   Tour stops live in TOURS below: [selector, what Justin says, optional perch selector inside it]. */
(() => {
  if (window.JMGuide) return;
  const me = document.currentScript, root = (me && me.dataset.root) || '', page = (me && me.dataset.page) || 'b';
  const TOURS = {
    b: [['#hero', "Hey, I'm Justin! Hop on — I'll show you around my worlds.", 'h1'], ['#journal', 'My journal: seven worlds. Scroll and the pages really turn.'], ['#explorer', 'Step inside a world — pick one, it opens like a ride door.'], ['#build', 'Watch a world build itself: pencil first, then the magic.'], ['#academy', 'The Academy — the books that taught me everything.'], ['#contact', 'Last stop! Tell me about the world you want to build.']],
    a: [['#hero', "Hey, I'm Justin! Let me give you the director's tour.", 'h1'], ['#worlds', 'Every world I build starts here — imagineered, then shipped.'], ['#cyl', 'Stand in the middle of the work. Drag the room around!'], ['#archive', 'The archive: every world in orbit. Twist the knobs.'], ['#wall', 'My studio wall. Give a frame a flick.'], ['#academy', 'The Academy shelf — pick up a book.'], ['#contact', "That's the tour. Let's build a world together!"]],
    c: [['#hero', "Hey! I'm Justin — this is my studio pass.", 'h1'], ['#featured', 'Now streaming: one world per episode.', 'h2'], ['#worlds', 'The worlds library — hover a slice.', 'h2'], ['#tour', 'Fly with me: LA → Orlando → Guatapé.', '.thead'], ['#about', 'Scroll fast here — the desk pile explodes!', '.abHead'], ['#footer', 'Think. Sketch. Build. Ship. Repeat.', '.mantra']],
    d: [['#hero', "Hey, I'm Justin — your pilot today. Pick a world!", '#choose'], ['#fly', 'Fasten your seatbelt — we fly over the work.', '#flyH'], ['#meet', 'Where the pencil meets the pixels.', '#mh'], ['#stats', 'The numbers, counted by hand.', '.srow'], ['#tomorrow', 'Hover the cards — they fan out.', 'h2'], ['#contact', 'Book a trip — you even get a boarding pass!', 'h2']],
    e: [['#story', "Hey, I'm Justin! Scroll and I'll sketch a world for you.", '.st.on h1, .st.on h2'], ['#worlds', 'Six worlds, one pencil. Stamp your passport!', 'h2'], ['#pour', 'Imagineering is a pour — watch the glass fill.', 'h2'], ['#line', 'My plates, drying on the line.', 'h2'], ['#pad', 'Your turn! Draw something — I will help pour it.', 'h2'], ['#academy', 'The Academy: the art of learning anything.', 'h2'], ['#contact', "Let's sketch your world next.", 'h2']],
    f: [['#hero', "Hey, I'm Justin — and those are my glasses up there.", '.hcol.l1'], ['#visor', 'Watch — they come off and land in my hand.', '.vtop'], ['#work', 'Field notes. The glass clears when you look.', 'h2'], ['#contact', 'Start a world with me — the frames swing!', '.mail']],
    g: [['#o-window', "Welcome to my studio in Guatapé! That's the real view, right now."], ['#o-about', "That's me. Click the frame to say hi."], ['#o-table', 'My desk — every sketch here is a world.'], ['#o-books', 'The Academy shelf: nine books, one habit.'], ['#o-easel', 'Pixel posed for this one. He is very vain.'], ['#o-phone', 'Pick up the phone — it rings me.'], ['#o-record', 'Put a record on and stay a while.']],
    h: [['#top', "Hey, I'm Justin. Bold, red, and only slightly serious.", '.hero-word, h1'], ['#fly', 'Sketch. Build. Ship. Here they come!'], ['#about', 'An Imagineer who treats wonder as infrastructure.', 'h2'], ['#work', 'JAM Studios — the featured world.', 'h2'], ['#worlds', 'Other worlds. Load more, I dare you.', 'h2'], ['#skills', 'Skill {set} — tap the keyboard, pills jump.', 'h2'], ['#process', 'How a world gets made, row by row.', 'h2'], ['#academy', 'The Academy reading list.', 'h2'], ['#contact', "Let's build a world.", 'h2']],
    i: [['#top', "Hey, I'm Justin. That's not the moon — those are my three cities.", '.hero-name, h1'], ['#works', 'The wall: every world I have worked on.', 'h2'], ['#about', 'What I do, and where I do it.', 'h2'], ['#services', 'Four ways we can work together.'], ['#contact', 'Book a call — or ask me anything down there.']],
    j: [['.hero', "Hi! I'm Justin — click the colourful words!", '#headline, h1'], ['#worlds', 'Featured worlds — every folder opens.', 'h2'], ['#numbers', 'Peel the sticker. Go on.', 'h2'], ['#people', 'What people say (placeholders, for now).', 'h2'], ['#about', 'Making boring stuff exciting since day one.', 'h2'], ['.outside', 'Outside work: Guatapé, 740 steps up.', 'h2'], ['#playground', 'Grab a bubble and flick it!', 'h2'], ['#contact', "Let's build a world together!", 'h2']],
    k: [['#profile', "Hey, I'm Justin! This is my playground."], ['#worlds', 'Hover a world — it finds its tile.'], ['#play', 'The big panel scrolls. Go explore!'], ['#pContact', 'Say hola when you are ready.']],
    l: [['#side', "Hey, I'm Justin — welcome to Justin OS."], ['.win.proj', 'Drag my windows around — it is your desk now.'], ['.win.keys', 'The Keys app: a keyboard of worlds.'], ['.di', 'Every dock icon opens a world.'], ['#tVoice', 'Voice mode reads my bio out loud.']],
    m: [['#entrance', "All aboard! I'm Justin — stamp your ticket.", '.pan, h2'], ['#worlds', 'Next stop: the worlds. Mind the gap!', 'h2'], ['#studio', 'The studio — where every ride gets drawn.', 'h2'], ['#academy', 'The Academy carriage.', 'h2'], ['#exit', 'Exit through the gift shop — send me a postcard!', 'h2']],
    n: [['#w-about', "Late night at my desk. Hi, I'm Justin."], ['.icon', 'Double-click a world to open it.'], ['[aria-label="Open Academy"]', 'My reading list lives in this folder.'], ['[aria-label="Open Listen"]', 'Put the CD in — trust me.'], ['[aria-label="Open Mail"]', 'Write me. I answer at night too.']],
  };
  const stops = TOURS[page] || [];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* ---------- sound (original synth blips, follows the site-wide sound toggle) ---------- */
  let ac = null; const soundOn = () => window.JM ? window.JM.sound : localStorage.getItem('jm-sound') !== 'off';
  function blip(type) {
    if (!soundOn()) return; try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume() } catch (e) { return }
    const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain(); o.connect(g); g.connect(ac.destination);
    if (type === 'jump') { o.type = 'square'; o.frequency.setValueAtTime(260, t); o.frequency.exponentialRampToValueAtTime(720, t + .16); g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.0001, t + .2); o.start(t); o.stop(t + .21) }
    else if (type === 'land') { o.type = 'triangle'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(90, t + .1); g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.0001, t + .12); o.start(t); o.stop(t + .13) }
    else { o.type = 'sine'; [880, 1320, 1760].forEach((f, i) => o.frequency.setValueAtTime(f, t + i * .06)); g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.0001, t + .26); o.start(t); o.stop(t + .27) }
  }

  /* ---------- markup + styles ---------- */
  const css = `
  .fun-buddy{display:none!important}
  .jg{position:fixed;left:0;top:0;z-index:205;width:92px;height:172px;pointer-events:none;will-change:transform;transform-origin:0 0}
  .jg-fig{position:absolute;inset:0;transform-origin:50% 100%;pointer-events:auto;cursor:pointer;transition:filter .3s}
  .jg-fig:hover{filter:drop-shadow(0 0 10px rgba(255,220,120,.7))}
  .jg-face{position:absolute;inset:0;transform-origin:50% 100%}
  .jg.flip .jg-body{transform:scaleX(-1)}.jg.flip .jg-head{rotate:-4deg}.jg:not(.flip) .jg-head{rotate:3deg}
  .jg-head{position:absolute;left:7px;top:0;width:78px;z-index:2;filter:drop-shadow(0 4px 4px rgba(0,0,0,.28));transform-origin:50% 92%;animation:jgNod 2.6s ease-in-out infinite;user-select:none;-webkit-user-drag:none}
  .jg-body{position:absolute;left:0;top:104px;width:92px;height:66px;overflow:visible;z-index:1}
  .jg-body .lg,.jg-body .ar{transform-box:fill-box}
  .jg-body .lgL{transform-origin:50% 8%}.jg-body .lgR{transform-origin:50% 8%}
  .jg-body .arL{transform-origin:80% 10%}.jg-body .arR{transform-origin:20% 10%}
  .jg-sh{position:absolute;left:50%;bottom:-6px;width:56px;height:10px;margin-left:-28px;border-radius:50%;background:rgba(0,0,0,.28);filter:blur(2px);transform-origin:50% 50%}
  @keyframes jgNod{50%{transform:rotate(-2.5deg) translateY(1px)}}
  .jg.run .lgL{animation:jgLeg .32s ease-in-out infinite}.jg.run .lgR{animation:jgLeg .32s ease-in-out infinite reverse}
  .jg.run .arL{animation:jgArm .32s ease-in-out infinite}.jg.run .arR{animation:jgArm .32s ease-in-out infinite reverse}
  .jg.run .jg-face{animation:jgBob .16s ease-in-out infinite alternate}
  
  @keyframes jgLeg{0%{transform:rotate(30deg)}50%{transform:rotate(-30deg)}100%{transform:rotate(30deg)}}
  @keyframes jgArm{0%{transform:rotate(-40deg)}50%{transform:rotate(40deg)}100%{transform:rotate(-40deg)}}
  @keyframes jgBob{to{transform:translateY(-4px)}}
  .jg-body .sc{transform-box:fill-box;transform-origin:100% 20%;animation:jgScarf 1.4s ease-in-out infinite}.jg.run .sc,.jg.jump .sc{animation-duration:.22s}
  @keyframes jgScarf{0%,100%{transform:rotate(-6deg) scaleX(1)}50%{transform:rotate(8deg) scaleX(1.15)}}
  .jg.jump .arL{transform:rotate(150deg)}.jg.jump .arR{transform:rotate(-150deg)}
  .jg.jump .lgL{transform:rotate(-22deg) translateY(-3px)}.jg.jump .lgR{transform:rotate(26deg)}
  .jg.wave .arR{animation:jgWave .5s ease-in-out 3}
  @keyframes jgWave{0%,100%{transform:rotate(-150deg)}50%{transform:rotate(-115deg)}}
  .jg-say{position:fixed;z-index:206;max-width:min(300px,78vw);padding:12px 14px 10px;border-radius:16px;background:#fffdf7;color:#17120e;font:500 14px/1.4 Inter,system-ui,sans-serif;box-shadow:0 18px 40px -14px rgba(0,0,0,.55),0 0 0 2px #17120e;opacity:0;transform:translateY(8px) scale(.9);transform-origin:var(--ox,20px) 100%;transition:opacity .25s,transform .35s cubic-bezier(.3,1.5,.5,1);pointer-events:none}
  .jg-say.on{opacity:1;transform:none;pointer-events:auto}
  .jg-say::after{content:'';position:absolute;left:var(--ox,20px);bottom:-9px;width:16px;height:16px;margin-left:-8px;background:#fffdf7;transform:rotate(45deg);box-shadow:2px 2px 0 0 #17120e}
  .jg-say.below::after{bottom:auto;top:-9px;box-shadow:-2px -2px 0 0 #17120e}
  .jg-say b{font-weight:700}
  .jg-row{display:flex;align-items:center;gap:6px;margin-top:10px}
  .jg-row .n{margin-right:auto;font:600 11px ui-monospace,monospace;opacity:.55}
  .jg-btn{appearance:none;border:0;border-radius:99px;padding:7px 12px;font:700 12px Inter,system-ui,sans-serif;cursor:pointer;background:#17120e;color:#fff;box-shadow:0 3px 0 #000;transition:translate .08s,box-shadow .08s}
  .jg-btn:active{translate:0 3px;box-shadow:0 0 0 #000}
  .jg-btn.ghost{background:#efe9dd;color:#17120e;box-shadow:0 3px 0 #c9bfae}
  .jg-btn.go{background:#e3342f;box-shadow:0 3px 0 #8f1a17}
  .jg-spark{position:fixed;z-index:204;pointer-events:none;font:700 16px/1 system-ui;color:#ffd84d;text-shadow:0 1px 0 #b8860b,0 0 8px rgba(255,216,77,.8)}
  .jg-plus{position:fixed;z-index:204;pointer-events:none;font:800 13px Inter,system-ui,sans-serif;color:#fff;background:#e3342f;padding:3px 8px;border-radius:99px;box-shadow:0 2px 0 #8f1a17}
  .jg-hl{outline:3px dashed rgba(255,216,77,.9)!important;outline-offset:6px;border-radius:10px;transition:outline-color .4s}
`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const BODY = `<svg class="jg-body" viewBox="0 0 84 60" aria-hidden="true">
    <g class="lg lgL"><rect x="27" y="22" width="12" height="25" rx="5" fill="#2b3a55"/><path d="M24 47h16a4 4 0 0 1 4 4v1H24a3 3 0 0 1-3-3 2 2 0 0 1 3-2z" fill="#e3342f"/><rect x="21" y="51" width="23" height="3" rx="1.5" fill="#fff"/></g>
    <g class="lg lgR"><rect x="45" y="22" width="12" height="25" rx="5" fill="#26334c"/><path d="M44 47h16a3 3 0 0 1 3 2 3 3 0 0 1-3 3H40v-1a4 4 0 0 1 4-4z" fill="#e3342f"/><rect x="40" y="51" width="23" height="3" rx="1.5" fill="#fff"/></g>
    <g class="ar arL"><rect x="9" y="4" width="13" height="22" rx="6.5" fill="#161616" transform="rotate(14 15 6)"/><circle cx="11" cy="27" r="5.4" fill="#e2a786"/></g>
    <g class="ar arR"><rect x="62" y="4" width="13" height="22" rx="6.5" fill="#161616" transform="rotate(-14 69 6)"/><circle cx="73" cy="27" r="5.4" fill="#e2a786"/></g>
    <path class="sc" d="M38 3c-8-2-20 1-30 8 6 1 10 4 12 9 3-6 10-9 18-9z" fill="#e3342f"/><path class="sc" d="M26 9c-6 1-11 5-14 10 4-1 8 0 10 3 1-5 3-9 4-13z" fill="#b8231f"/><path d="M17 10Q19 1 42 1T67 10L63 29Q42 33 21 29Z" fill="#161616"/><path d="M22 12q20 6 40 0" stroke="#2c2c2c" stroke-width="1.4" fill="none"/>
    <path d="M35 1L42 17L49 1Z" fill="#c98f70"/><path d="M38 6q4 3 8 0" stroke="#7a5a48" stroke-width="1.2" fill="none" opacity=".6"/>
    <path d="M35 1L42 17M49 1L42 17" stroke="#2a2a2a" stroke-width="1.6" fill="none"/>
    <rect x="36" y="25" width="12" height="5" rx="1.5" fill="#f2c14e"/><text x="42" y="29.2" text-anchor="middle" font-size="4" font-weight="800" fill="#17120e" font-family="Inter,system-ui">JAM</text>
  </svg>`;
  const jg = document.createElement('div'); jg.className = 'jg'; jg.setAttribute('aria-hidden', 'true');
  jg.innerHTML = `<div class="jg-fig" title="Justin — click for a tour"><div class="jg-face">${BODY}<img class="jg-head" src="${root}assets/img/justin-head.webp" alt="" draggable="false"></div></div><i class="jg-sh"></i>`;
  const say = document.createElement('div'); say.className = 'jg-say'; say.setAttribute('role', 'dialog'); say.setAttribute('aria-live', 'polite');
  const mount = () => { document.body.appendChild(jg); document.body.appendChild(say) };
  document.body ? mount() : addEventListener('DOMContentLoaded', mount);

  /* ---------- state + positioning ---------- */
  let x = 0, y = 0, scale = 1, flip = false, stand = null, idx = -1, touring = false, busy = false;
  const S = () => innerWidth < 700 ? .66 : 1, W = () => 92 * S(), Hh = () => 172 * S();
  const home = () => ({ x: innerWidth < 700 ? 10 : 22, y: innerHeight - Hh() - (innerWidth < 700 ? 14 : 22) });
  function place() { jg.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${S()})`; jg.classList.toggle('flip', flip) }
  function setPose(p) { jg.classList.remove('run', 'jump', 'wave'); if (p) jg.classList.add(p) }
  // the platform he stands on (top edge of the perch element)
  function perchOf(i) {
    const [sel, , perchSel] = stops[i]; const s = document.querySelector(sel); if (!s) return null;
    let p = perchSel ? s.matches(perchSel) ? s : s.querySelector(perchSel) : null;
    if (!p) p = s.querySelector('h1,h2') || s;
    const r = p.getBoundingClientRect(); if (!r.width) return { sec: s, el: s };
    return { sec: s, el: p };
  }
  function spot(p) {
    const r = p.el.getBoundingClientRect(), w = W();
    const px = clamp(r.left + Math.min(r.width * .5, Math.max(30, r.width * .18)) - w / 2, 8, innerWidth - w - 8);
    let py = r.top - Hh() + 8; if (py < 40) py = clamp(r.top + 10, 40, innerHeight - Hh() - 80);
    return { x: px, y: clamp(py, 40, innerHeight - Hh() - 10) };
  }
  // an arc jump from wherever he is to (tx, ty)
  function jump(tx, ty, dur = 720) {
    return new Promise(res => {
      const x0 = x, y0 = y, apex = Math.min(y0, ty) - clamp(Math.abs(tx - x0) * .35 + 90, 110, 260);
      flip = tx < x0 - 2; setPose('jump'); blip('jump');
      if (reduce) { x = tx; y = ty; place(); setPose(); res(); return }
      const t0 = performance.now();
      (function f(now) { const k = clamp((now - t0) / dur, 0, 1), e = k;
        x = x0 + (tx - x0) * ease(k);
        const a = (1 - e) * (1 - e) * y0 + 2 * (1 - e) * e * apex + e * e * ty; y = a; place();
        if (k < 1) requestAnimationFrame(f); else { land(); res() } })(t0);
    });
  }
  function land() {
    setPose(); blip('land');
    jg.querySelector('.jg-fig').animate([{ transform: 'scale(1.15,.8)' }, { transform: 'scale(.95,1.06)' }, { transform: 'scale(1)' }], { duration: 360, easing: 'cubic-bezier(.3,1.5,.5,1)' });
    sparks();
  }
  function sparks() {
    if (reduce) return; const cx = x + W() / 2, cy = y + Hh() - 6;
    for (let i = 0; i < 9; i++) { const s = document.createElement('i'); s.className = 'jg-spark'; s.textContent = i % 3 ? '✦' : '✧'; s.style.left = cx + 'px'; s.style.top = cy + 'px'; document.body.appendChild(s);
      const a = -Math.PI * (i / 8), d = 40 + Math.random() * 40; s.animate([{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d - 20}px)) scale(1) rotate(${Math.random() * 180}deg)`, opacity: 0 }], { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove() }
    if (touring) { const p = document.createElement('b'); p.className = 'jg-plus'; p.textContent = '+1 world'; p.style.left = (cx - 30) + 'px'; p.style.top = (y - 10) + 'px'; document.body.appendChild(p);
      p.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-46px)', opacity: 0 }], { duration: 1100, easing: 'ease-out' }).onfinish = () => p.remove(); setTimeout(() => blip('coin'), 120) }
  }
  async function run(tx) { // a little run along the ground (used while the page scrolls)
    flip = tx < x; setPose('run'); const x0 = x, t0 = performance.now(), dur = clamp(Math.abs(tx - x0) * 2.2, 260, 900);
    await new Promise(r => (function f(now) { const k = clamp((now - t0) / dur, 0, 1); x = x0 + (tx - x0) * k; place(); k < 1 ? requestAnimationFrame(f) : r() })(t0));
    setPose();
  }
  // scroll the page so the stop sits nicely, and wait until it settles
  async function scrollToStop(p) {
    const se = document.scrollingElement; if (se.scrollHeight <= innerHeight + 4) return; // one-screen page
    const r = p.sec.getBoundingClientRect(), pr = p.el.getBoundingClientRect();
    let target = scrollY + r.top - (p.el !== p.sec ? Math.max(0, Math.min(innerHeight * .32, pr.top - r.top + 0) - (pr.top - r.top)) : 0);
    target = scrollY + pr.top - innerHeight * .34; if (r.height > innerHeight * 1.1 && pr.top - r.top > innerHeight * .6) target = scrollY + r.top;
    target = clamp(target, 0, se.scrollHeight - innerHeight);
    if (Math.abs(target - scrollY) < 8) return;
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
    let last = -1, same = 0; const t0 = performance.now();
    while (performance.now() - t0 < 2600) { await sleep(90); if (Math.abs(scrollY - last) < 1) { if (++same > 2) break } else same = 0; last = scrollY }
  }
  /* ---------- speech bubble ---------- */
  function bubble(html, buttons) {
    say.innerHTML = `<div>${html}</div>` + (buttons ? `<div class="jg-row">${buttons}</div>` : '');
    say.classList.add('on'); posBubble();
    say.querySelectorAll('[data-a]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); act(b.dataset.a) }));
  }
  function posBubble() {
    if (!say.classList.contains('on')) return; const bw = say.offsetWidth, bh = say.offsetHeight, cx = x + W() / 2;
    let bx = clamp(cx - 30, 8, innerWidth - bw - 8), by = y - bh - 16, below = false;
    if (by < 8) { by = y + Hh() + 14; below = true }
    say.style.left = bx + 'px'; say.style.top = by + 'px'; say.style.setProperty('--ox', clamp(cx - bx, 18, bw - 18) + 'px'); say.classList.toggle('below', below);
  }
  const hideBubble = () => say.classList.remove('on');
  let hl = null; const highlight = el => { if (hl) hl.classList.remove('jg-hl'); hl = el; if (el && el !== document.body) { el.classList.add('jg-hl'); setTimeout(() => el.classList.remove('jg-hl'), 1800) } };

  /* ---------- tour flow ---------- */
  async function go(i) {
    if (busy || !stops.length) return; busy = true; i = clamp(i, 0, stops.length - 1);
    const p = perchOf(i); if (!p) { busy = false; if (i < stops.length - 1) return go(i + 1); return }
    idx = i; touring = true; stand = null; hideBubble();
    // run to the middle of the floor while the page scrolls, then jump up onto the platform
    const scrolls = document.scrollingElement.scrollHeight > innerHeight + 4;
    if (scrolls) { const h = home(); const runP = run(clamp(innerWidth * .18, 20, 260)); y = h.y; place(); await Promise.all([runP, scrollToStop(p)]) }
    const s = spot(p); await jump(s.x, s.y);
    stand = { el: p.el, dx: x - p.el.getBoundingClientRect().left, dy: y - p.el.getBoundingClientRect().top };
    highlight(p.sec.offsetHeight < innerHeight * 1.2 ? p.sec : p.el);
    const last = i === stops.length - 1;
    bubble(stops[i][1], `<span class="n">${i + 1}/${stops.length}</span>` + (i ? '<button class="jg-btn ghost" data-a="prev" aria-label="Previous stop">◀</button>' : '') +
      (last ? '<button class="jg-btn go" data-a="end">Done ✦</button>' : '<button class="jg-btn go" data-a="next">Next ▶</button>') + '<button class="jg-btn ghost" data-a="end" aria-label="End tour">✕</button>');
    if (i === 0) { setPose('wave'); setTimeout(() => setPose(), 1600) }
    busy = false;
  }
  async function end() {
    if (busy) return; busy = true; touring = false; stand = null; hideBubble(); const h = home(); await jump(h.x, h.y, 640); idx = -1; busy = false;
    setTimeout(() => !touring && bubble("Anytime! Click me for another tour.", ''), 300); setTimeout(() => !touring && hideBubble(), 3200);
  }
  function act(a) { if (a === 'next') go(idx + 1); else if (a === 'prev') go(idx - 1); else if (a === 'end') end(); else if (a === 'start') go(0); else if (a === 'later') hideBubble() }
  jg.querySelector('.jg-fig').addEventListener('click', () => { if (touring) { if (!busy) go(idx + 1 >= stops.length ? 0 : idx + 1) } else go(0) });
  addEventListener('keydown', e => { if (!touring || /input|textarea|select/i.test((e.target || {}).tagName || '')) return; if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1) } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1) } else if (e.key === 'Escape') end() });

  // follow the platform while the page moves; hop home if it scrolls away
  (function loop() {
    if (stand && !busy) {
      const r = stand.el.getBoundingClientRect(); x = r.left + stand.dx; y = r.top + stand.dy; place(); posBubble();
      if (r.bottom < -40 || r.top > innerHeight + 40) { stand = null; hideBubble(); const h = home(); busy = true; jump(h.x, h.y, 520).then(() => { busy = false; touring && bubble('Lost you! Tap me to carry on the tour.', '<button class="jg-btn go" data-a="next">Continue ▶</button><button class="jg-btn ghost" data-a="end">✕</button>') }) }
    }
    requestAnimationFrame(loop);
  })();
  addEventListener('resize', () => { if (!touring) { const h = home(); x = h.x; y = h.y; place() } posBubble() });

  // entrance: drop in from above at the bottom-left and offer the tour
  const h0 = home(); x = h0.x; y = -200; place();
  setTimeout(async () => { if (!stops.length) return; await jump(h0.x, h0.y, 800); setPose('wave'); setTimeout(() => setPose(), 1500);
    bubble("Hey, I'm <b>Justin</b>! Want me to show you around?", '<button class="jg-btn go" data-a="start">Tour ▶</button><button class="jg-btn ghost" data-a="later">Later</button>');
    setTimeout(() => { if (!touring) hideBubble() }, 9000) }, 1400);
  window.JMGuide = { go, end, get index() { return idx } };
})();
