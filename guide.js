/* guide.js — Justin as a flying tour guide: red cape, fox tail, his own cap.
   He hovers at the bottom-left; press "Tour" and he flies the page section to section, hovering over each
   section's heading to tell you about it. On one-screen concepts he flies between objects.
   Arrow keys ← → step through the tour, Esc ends it.
   Include: <script src="[../]guide.js?v=2" data-root="[../]" data-page="a"></script> (after the page's own scripts).
   Tour stops live in TOURS below: [selector, what Justin says, optional perch selector inside it]. */
(() => {
  if (window.JMGuide) return;
  const me = document.currentScript, root = (me && me.dataset.root) || '', page = (me && me.dataset.page) || 'b';
  const TOURS = {
    b: [['#hero', "Hey, I'm Justin! Let me fly you around my worlds.", 'h1'], ['#journal', 'My journal: seven worlds. Scroll and the pages really turn.'], ['#explorer', 'Step inside a world — pick one, it opens like a ride door.'], ['#build', 'Watch a world build itself: pencil first, then the magic.'], ['#academy', 'The Academy — the books that taught me everything.'], ['#contact', 'Last stop! Tell me about the world you want to build.']],
    a: [['#hero', "Hey, I'm Justin! Let me fly you through the director's cut.", 'h1'], ['#worlds', 'Every world I build starts here — imagineered, then shipped.'], ['#cyl', 'Stand in the middle of the work. Drag the room around!'], ['#archive', 'The archive: every world in orbit. Twist the knobs.'], ['#wall', 'My studio wall. Give a frame a flick.'], ['#academy', 'The Academy shelf — pick up a book.'], ['#contact', "That's the tour. Let's build a world together!"]],
    c: [['#hero', "Hey! I'm Justin — this is my studio pass.", 'h1'], ['#featured', 'Now streaming: one world per episode.', 'h2'], ['#worlds', 'The worlds library — hover a slice.', 'h2'], ['#tour', 'Fly with me: LA → Orlando → Guatapé.', '.thead'], ['#about', 'Scroll fast here — the desk pile explodes!', '.abHead'], ['#footer', 'Think. Sketch. Build. Ship. Repeat.', '.mantra']],
    d: [['#hero', "Hey, I'm Justin — your pilot today. Pick a world!", '#choose'], ['#fly', 'Fasten your seatbelt — we fly over the work.', '#flyH'], ['#meet', 'Where the pencil meets the pixels.', '#mh'], ['#stats', 'The numbers, counted by hand.', '.srow'], ['#tomorrow', 'Hover the cards — they fan out.', 'h2'], ['#contact', 'Book a trip — you even get a boarding pass!', 'h2']],
    e: [['#story', "Hey, I'm Justin! Scroll and I'll sketch a world for you.", '.st.on h1, .st.on h2'], ['#worlds', 'Six worlds, one pencil. Stamp your passport!', 'h2'], ['#pour', 'Imagineering is a pour — watch the glass fill.', 'h2'], ['#line', 'My plates, drying on the line.', 'h2'], ['#pad', 'Your turn! Draw something — I will help pour it.', 'h2'], ['#academy', 'The Academy: the art of learning anything.', 'h2'], ['#contact', "Let's sketch your world next.", 'h2']],
    f: [['#hero', "Hey, I'm Justin — and those are my glasses up there.", '.hcol.l1'], ['#visor', 'Watch — they come off and land in my hand.', '.vtop'], ['#work', 'Field notes. The glass clears when you look.', 'h2'], ['#contact', 'Start a world with me — the frames swing!', '.mail']],
    g: [['#o-window', "Welcome to my studio in Guatapé! That's the real view, right now."], ['#o-about', "That's me. Click the frame to say hi."], ['#o-table', 'My desk — every sketch here is a world.'], ['#o-books', 'The Academy shelf: nine books, one habit.'], ['#o-easel', 'Pixel posed for this one. He is very vain.'], ['#o-phone', 'Pick up the phone — it rings me.'], ['#o-record', 'Put a record on and stay a while.']],
    h: [['#top', "Hey, I'm Justin. Bold, red, and flying.", '.hero-word, h1'], ['#fly', 'Sketch. Build. Ship. Here they come!'], ['#about', 'An Imagineer who treats wonder as infrastructure.', 'h2'], ['#work', 'JAM Studios — the featured world.', 'h2'], ['#worlds', 'Other worlds. Load more, I dare you.', 'h2'], ['#skills', 'Skill {set} — tap the keyboard, pills jump.', 'h2'], ['#process', 'How a world gets made, row by row.', 'h2'], ['#academy', 'The Academy reading list.', 'h2'], ['#contact', "Let's build a world.", 'h2']],
    i: [['#top', "Hey, I'm Justin. That's not the moon — those are my three cities.", '.hero-name, h1'], ['#works', 'The wall: every world I have worked on.', 'h2'], ['#about', 'What I do, and where I do it.', 'h2'], ['#services', 'Four ways we can work together.'], ['#contact', 'Book a call — or ask me anything down there.']],
    j: [['.hero', "Hi! I'm Justin — click the colourful words!", '#headline, h1'], ['#worlds', 'Featured worlds — every folder opens.', 'h2'], ['#numbers', 'Peel the sticker. Go on.', 'h2'], ['#people', 'What people say (placeholders, for now).', 'h2'], ['#about', 'Making boring stuff exciting since day one.', 'h2'], ['.outside', 'Outside work: Guatapé, 740 steps up.', 'h2'], ['#playground', 'Grab a bubble and flick it!', 'h2'], ['#contact', "Let's build a world together!", 'h2']],
    k: [['#profile', "Hey, I'm Justin! This is my playground."], ['#worlds', 'Hover a world — it finds its tile.'], ['#play', 'The big panel scrolls. Go explore!'], ['#pContact', 'Say hola when you are ready.']],
    l: [['#side', "Hey, I'm Justin — welcome to Justin OS."], ['.win.proj', 'Drag my windows around — it is your desk now.'], ['.win.keys', 'The Keys app: a keyboard of worlds.'], ['.di', 'Every dock icon opens a world.'], ['#tVoice', 'Voice mode reads my bio out loud.']],
    m: [['#entrance', "All aboard! I'm Justin — stamp your ticket.", '.pan, h2'], ['#worlds', 'Next stop: the worlds. Mind the gap!', 'h2'], ['#studio', 'The studio — where every ride gets drawn.', 'h2'], ['#academy', 'The Academy carriage.', 'h2'], ['#exit', 'Exit through the gift shop — send me a postcard!', 'h2']],
    n: [['#w-about', "Late night at my desk. Hi, I'm Justin."], ['.icon', 'Double-click a world to open it.'], ['[aria-label="Open Academy"]', 'My reading list lives in this folder.'], ['[aria-label="Open Listen"]', 'Put the CD in — trust me.'], ['[aria-label="Open Mail"]', 'Write me. I answer at night too.']],
  };
  const stops = TOURS[page] || [];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* ---------- sound: one soft whoosh per flight (follows the site-wide sound toggle) ---------- */
  let ac = null; const soundOn = () => window.JM ? window.JM.sound : localStorage.getItem('jm-sound') !== 'off';
  function whoosh(dur = .5) {
    if (!soundOn()) return; try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume() } catch (e) { return }
    const t = ac.currentTime, n = ac.createBufferSource(), buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    n.buffer = buf; const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = .8; f.frequency.setValueAtTime(350, t); f.frequency.exponentialRampToValueAtTime(1500, t + dur * .55); f.frequency.exponentialRampToValueAtTime(500, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.07, t + dur * .4); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    n.connect(f); f.connect(g); g.connect(ac.destination); n.start(t); n.stop(t + dur);
  }

  /* ---------- markup + styles ---------- */
  const css = `
  .fun-buddy{display:none!important}
  .jg{position:fixed;left:0;top:0;z-index:205;width:120px;height:200px;pointer-events:none;will-change:transform;transform-origin:0 0}
  .jg-fig{position:absolute;inset:0;transform-origin:50% 55%;pointer-events:auto;cursor:pointer;rotate:var(--lean,0deg);transition:filter .3s}
  .jg-fig:hover{filter:drop-shadow(0 0 14px rgba(255,190,90,.55))}
  .jg-bob{position:absolute;inset:0;animation:jgHover 2.4s ease-in-out infinite}
  .jg.fly .jg-bob{animation:none}
  @keyframes jgHover{50%{transform:translateY(-7px)}}
  .jg-body{position:absolute;left:0;top:0;width:120px;height:200px;overflow:visible}
  .jg.flip .jg-body{transform:scaleX(-1)}
  .jg-head{position:absolute;left:33px;top:2px;width:54px;z-index:2;filter:drop-shadow(0 3px 4px rgba(0,0,0,.35));transform-origin:50% 90%;rotate:var(--hrot,0deg);transition:rotate .4s;user-select:none;-webkit-user-drag:none}
  .jg-body g{transform-box:fill-box}
  .jg-body .cape{transform-origin:50% 0%;animation:jgCape 3.2s ease-in-out infinite}
  .jg-body .tail{transform-origin:0% 10%;animation:jgTail 2.6s ease-in-out infinite}
  .jg-body .pose{display:none}.jg .jg-body .hip{display:inline}.jg.fly .jg-body .hip,.jg.point .jg-body .hip{display:none}.jg.fly .jg-body .flyA{display:inline}.jg.point:not(.fly) .jg-body .pointA{display:inline}
  .jg-body .lgL,.jg-body .lgR{transform-origin:50% 0%;transition:transform .45s}
  @keyframes jgCape{0%,100%{transform:skewX(-3deg) scaleX(1)}50%{transform:skewX(4deg) scaleX(1.07)}}
  @keyframes jgTail{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(9deg)}}
  .jg.fly .cape{animation:jgCapeF .34s ease-in-out infinite}
  .jg.fly .tail{animation:jgTail .5s ease-in-out infinite}
  @keyframes jgCapeF{0%,100%{transform:skewX(-8deg) scaleX(1.12) scaleY(1.05)}50%{transform:skewX(6deg) scaleX(1.02) scaleY(1.1)}}
  .jg.fly .lgL{transform:rotate(4deg)}.jg.fly .lgR{transform:rotate(-6deg) translateY(-2px)}
  .jg-say{position:fixed;z-index:206;max-width:min(300px,78vw);padding:12px 14px 10px;border-radius:14px;background:rgba(16,14,13,.9);color:#f6efe4;font:500 14px/1.45 Inter,system-ui,sans-serif;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.14);box-shadow:0 20px 44px -16px rgba(0,0,0,.6);opacity:0;transform:translateY(6px);transform-origin:var(--ox,20px) 100%;transition:opacity .3s,transform .4s cubic-bezier(.2,.9,.3,1);pointer-events:none}
  .jg-say.on{opacity:1;transform:none;pointer-events:auto}
  .jg-say::after{content:'';position:absolute;left:var(--ox,20px);bottom:-6px;width:12px;height:12px;margin-left:-6px;background:rgba(16,14,13,.9);transform:rotate(45deg);border-right:1px solid rgba(255,255,255,.14);border-bottom:1px solid rgba(255,255,255,.14)}
  .jg-say.below::after{bottom:auto;top:-6px;border:0;border-left:1px solid rgba(255,255,255,.14);border-top:1px solid rgba(255,255,255,.14)}
  .jg-say b{font-weight:700;color:#ffb648}
  .jg-row{display:flex;align-items:center;gap:6px;margin-top:10px}
  .jg-row .n{margin-right:auto;font:600 11px ui-monospace,monospace;opacity:.5;letter-spacing:.06em}
  .jg-btn{appearance:none;border:1px solid rgba(255,255,255,.16);border-radius:99px;padding:7px 13px;font:600 12px Inter,system-ui,sans-serif;cursor:pointer;background:rgba(255,255,255,.08);color:#f6efe4;transition:background .2s}
  .jg-btn:hover{background:rgba(255,255,255,.16)}
  .jg-btn.go{background:#d7262f;border-color:#d7262f;color:#fff}.jg-btn.go:hover{background:#ee3a42}
  .jg-trail{position:fixed;z-index:204;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,#fff 0,#ffd27a 40%,rgba(255,140,60,0) 72%)}
  .jg-hl{outline:2px solid rgba(255,182,72,.7)!important;outline-offset:8px;border-radius:12px;transition:outline-color .5s}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // drawn in a 120x200 box; the photo head sits on top at the neck
  const BODY = `<svg class="jg-body" viewBox="0 0 120 200" aria-hidden="true">
    <defs>
      <linearGradient id="jgCapeG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4161f"/><stop offset=".6" stop-color="#a50f18"/><stop offset="1" stop-color="#6b0910"/></linearGradient>
      <linearGradient id="jgCapeIn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a0a0e"/><stop offset="1" stop-color="#2a0507"/></linearGradient>
      <linearGradient id="jgTailG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3b24a"/><stop offset=".55" stop-color="#d9822c"/><stop offset="1" stop-color="#a95a1c"/></linearGradient>
      <linearGradient id="jgJeans" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3550"/><stop offset="1" stop-color="#18203a"/></linearGradient>
      <linearGradient id="jgShirt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1c1c1e"/><stop offset=".5" stop-color="#101012"/><stop offset="1" stop-color="#1c1c1e"/></linearGradient>
    </defs>
    <g class="cape"><path d="M31 86Q60 77 89 86L111 182Q92 172 78 189Q68 178 60 195Q52 178 42 189Q28 172 9 182Z" fill="url(#jgCapeG)"/><path d="M37 88Q60 81 83 88L88 114Q60 105 32 114Z" fill="url(#jgCapeIn)" opacity=".6"/><path d="M31 86L9 182M89 86L111 182" stroke="#f0c25a" stroke-width="1.3" opacity=".6"/></g>
    <g class="tail"><path d="M70 140C92 131 112 142 116 163C119 180 106 194 90 192C101 181 98 166 86 160C78 156 72 149 70 140Z" fill="url(#jgTailG)"/><path d="M108 178C112 188 102 195 90 192C99 189 104 184 108 178Z" fill="#fbf4e8"/><path d="M82 146C95 146 106 155 108 168" stroke="#f7c96e" stroke-width="1.4" fill="none" opacity=".6"/></g>
    <g class="lgL"><path d="M46 138H59L58 184H47Z" fill="url(#jgJeans)"/><path d="M44 181H59V189Q59 193 55 193H41Q39 193 39 190Q39 185 44 184Z" fill="#141210"/></g>
    <g class="lgR"><path d="M61 138H74L73 184H62Z" fill="url(#jgJeans)"/><path d="M61 181H76V184Q81 185 81 190Q81 193 79 193H65Q61 193 61 189Z" fill="#141210"/></g>
    <rect x="54" y="72" width="12" height="16" rx="4" fill="#d6a082"/>
    <path d="M32 89Q60 80 88 89L81 140Q60 146 39 140Z" fill="url(#jgShirt)"/>
    <path d="M52 86L60 116L68 86Z" fill="#cf9677"/><path d="M55 95q5 3 10 0M56 103q4 2 8 0" stroke="#8a5e48" stroke-width="1" fill="none" opacity=".55"/>
    <path d="M51 85L60 116L69 85" stroke="#2e2e31" stroke-width="2.2" fill="none"/><path d="M36 92Q48 98 52 112M84 92Q72 98 68 112" stroke="#26262a" stroke-width="1.2" fill="none" opacity=".8"/>
    <path d="M39 133Q60 139 81 133L81 140Q60 146 39 140Z" fill="#3b2a1d"/><rect x="56" y="134.5" width="8" height="5" rx="1.2" fill="#d9a441"/>
    <g class="pose hip" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M35 93L22 116L40 133" stroke="#161618" stroke-width="12"/><path d="M85 93L98 116L80 133" stroke="#161618" stroke-width="12"/><circle cx="41" cy="133" r="5.6" fill="#d6a082"/><circle cx="79" cy="133" r="5.6" fill="#d6a082"/></g>
    <g class="pose flyA" fill="none" stroke-linecap="round"><path d="M36 93L30 136" stroke="#161618" stroke-width="12"/><circle cx="29" cy="139" r="5.6" fill="#d6a082"/><path d="M84 93L92 40" stroke="#161618" stroke-width="12"/><circle cx="92.5" cy="34" r="6.4" fill="#d6a082"/></g>
    <g class="pose pointA" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M35 93L22 116L40 133" stroke="#161618" stroke-width="12"/><circle cx="41" cy="133" r="5.6" fill="#d6a082"/><path d="M85 93L116 78" stroke="#161618" stroke-width="12"/><circle cx="120" cy="76" r="5.6" fill="#d6a082"/></g>  </svg>`;
  const jg = document.createElement('div'); jg.className = 'jg'; jg.setAttribute('aria-hidden', 'true');
  jg.innerHTML = `<div class="jg-fig" title="Justin — click for a tour"><div class="jg-bob">${BODY}<img class="jg-head" src="${root}assets/img/justin-head.webp" alt="" draggable="false"></div></div>`;
  const say = document.createElement('div'); say.className = 'jg-say'; say.setAttribute('role', 'dialog'); say.setAttribute('aria-live', 'polite');
  const mount = () => { document.body.appendChild(jg); document.body.appendChild(say) };
  document.body ? mount() : addEventListener('DOMContentLoaded', mount);
  const fig = jg.querySelector('.jg-fig');

  /* ---------- state + positioning ---------- */
  let x = 0, y = 0, flip = false, stand = null, idx = -1, touring = false, busy = false;
  const S = () => innerWidth < 700 ? .56 : .82, W = () => 120 * S(), Hh = () => 200 * S();
  const home = () => ({ x: innerWidth < 700 ? 4 : 14, y: innerHeight - Hh() - (innerWidth < 700 ? 10 : 16) });
  function place() { jg.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${S()})`; jg.classList.toggle('flip', flip) }
  const lean = d => fig.style.setProperty('--lean', d.toFixed(1) + 'deg');
  function perchOf(i) {
    const [sel, , perchSel] = stops[i]; const s = document.querySelector(sel); if (!s) return null;
    let p = perchSel ? (s.matches(perchSel) ? s : s.querySelector(perchSel)) : null;
    if (!p) p = s.querySelector('h1,h2') || s;
    return p.getBoundingClientRect().width ? { sec: s, el: p } : { sec: s, el: s };
  }
  // hover just above the platform's top edge, a little in from its left
  function spot(p) {
    const r = p.el.getBoundingClientRect(), w = W();
    const px = clamp(r.left + Math.min(r.width * .5, Math.max(24, r.width * .16)) - w / 2, 6, innerWidth - w - 6);
    let py = r.top - Hh() - 4; if (py < 36) py = clamp(r.top + 8, 36, innerHeight - Hh() - 70);
    return { x: px, y: clamp(py, 36, innerHeight - Hh() - 8) };
  }
  // a smooth flight along a gentle curve; he leans into the direction of travel and leaves a light trail
  function fly(tx, ty, dur) {
    return new Promise(res => {
      const x0 = x, y0 = y, dist = Math.hypot(tx - x0, ty - y0); dur = dur || clamp(500 + dist * .7, 650, 1300);
      if (dist < 4) { res(); return }
      flip = tx < x0 - 2; place();
      if (reduce) { jg.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], { duration: 400 }); x = tx; y = ty; place(); res(); return }
      const cx = (x0 + tx) / 2, cy = Math.min(y0, ty) - clamp(dist * .22, 40, 150);
      jg.classList.add('fly'); whoosh(Math.min(.9, dur / 1000)); const t0 = performance.now(); let lx = x0, ly = y0, n = 0;
      (function f(now) {
        const k = clamp((now - t0) / dur, 0, 1), e = ease(k), u = 1 - e;
        x = u * u * x0 + 2 * u * e * cx + e * e * tx; y = u * u * y0 + 2 * u * e * cy + e * e * ty; place();
        const vx = x - lx, vy = y - ly; lx = x; ly = y;
        const sp = Math.hypot(vx, vy), want = sp > .4 ? clamp(Math.atan2(vy, Math.abs(vx)) * 57.3 * .35 + 62, 20, 80) * (vx < 0 ? -1 : 1) : 0;
        lean(want * Math.sin(Math.PI * Math.min(1, k * 1.15)));
        if (++n % 2 === 0 && sp > 1) trail(x + W() / 2 - (vx > 0 ? 1 : -1) * W() * .35, y + Hh() * .62);
        if (k < 1) requestAnimationFrame(f); else { jg.classList.remove('fly'); lean(0); res() }
      })(t0);
    });
  }
  function trail(px, py) {
    const t = document.createElement('i'); t.className = 'jg-trail'; t.style.left = px + 'px'; t.style.top = py + 'px'; document.body.appendChild(t);
    t.animate([{ transform: 'scale(1.2)', opacity: .9 }, { transform: `translate(${(Math.random() - .5) * 14}px,${6 + Math.random() * 10}px) scale(.2)`, opacity: 0 }], { duration: 520 + Math.random() * 300, easing: 'ease-out' }).onfinish = () => t.remove();
  }
  // scroll the page so the stop sits nicely, and wait until it settles
  async function scrollToStop(p) {
    const se = document.scrollingElement; if (se.scrollHeight <= innerHeight + 4) return;
    const r = p.sec.getBoundingClientRect(), pr = p.el.getBoundingClientRect();
    let target = scrollY + pr.top - innerHeight * .36; if (r.height > innerHeight * 1.1 && pr.top - r.top > innerHeight * .6) target = scrollY + r.top;
    target = clamp(target, 0, se.scrollHeight - innerHeight); if (Math.abs(target - scrollY) < 8) return;
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
    let bx = clamp(cx - 30, 8, innerWidth - bw - 8), by = y - bh - 10, below = false;
    if (by < 8) { by = y + Hh() + 10; below = true }
    say.style.left = bx + 'px'; say.style.top = by + 'px'; say.style.setProperty('--ox', clamp(cx - bx, 18, bw - 18) + 'px'); say.classList.toggle('below', below);
  }
  const hideBubble = () => say.classList.remove('on');
  let hl = null; const highlight = el => { if (hl) hl.classList.remove('jg-hl'); hl = el; if (el && el !== document.body) { el.classList.add('jg-hl'); setTimeout(() => el.classList.remove('jg-hl'), 1600) } };
  const point = () => { jg.classList.add('point'); setTimeout(() => jg.classList.remove('point'), 1400) };

  /* ---------- tour flow ---------- */
  async function go(i) {
    if (busy || !stops.length) return; busy = true; i = clamp(i, 0, stops.length - 1);
    const p = perchOf(i); if (!p) { busy = false; if (i < stops.length - 1) return go(i + 1); return }
    idx = i; touring = true; stand = null; hideBubble();
    // take off to a holding spot while the page scrolls, then glide onto the next heading
    if (document.scrollingElement.scrollHeight > innerHeight + 4) await Promise.all([fly(clamp(innerWidth * .1, 10, 160), innerHeight * .42, 700), scrollToStop(p)]);
    const s = spot(p); await fly(s.x, s.y);
    stand = { el: p.el, dx: x - p.el.getBoundingClientRect().left, dy: y - p.el.getBoundingClientRect().top };
    highlight(p.sec.offsetHeight < innerHeight * 1.2 ? p.sec : p.el); point();
    const last = i === stops.length - 1;
    bubble(stops[i][1], `<span class="n">${String(i + 1).padStart(2, '0')} / ${String(stops.length).padStart(2, '0')}</span>` + (i ? '<button class="jg-btn" data-a="prev" aria-label="Previous stop">◀</button>' : '') +
      (last ? '<button class="jg-btn go" data-a="end">Done</button>' : '<button class="jg-btn go" data-a="next">Next ▶</button>') + '<button class="jg-btn" data-a="end" aria-label="End tour">✕</button>');
    busy = false;
  }
  async function end() {
    if (busy) return; busy = true; touring = false; stand = null; hideBubble(); const h = home(); await fly(h.x, h.y); idx = -1; busy = false;
    setTimeout(() => !touring && bubble('Anytime. Tap me for another flight.', ''), 300); setTimeout(() => !touring && hideBubble(), 3000);
  }
  function act(a) { if (a === 'next') go(idx + 1); else if (a === 'prev') go(idx - 1); else if (a === 'end') end(); else if (a === 'start') go(0); else if (a === 'later') hideBubble() }
  fig.addEventListener('click', () => { if (touring) { if (!busy) go(idx + 1 >= stops.length ? 0 : idx + 1) } else go(0) });
  addEventListener('keydown', e => { if (!touring || /input|textarea|select/i.test((e.target || {}).tagName || '')) return; if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1) } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1) } else if (e.key === 'Escape') end() });

  // stay with the platform while the page moves; fly back to the corner if it scrolls away
  (function loop() {
    if (stand && !busy) {
      const r = stand.el.getBoundingClientRect(); x = r.left + stand.dx; y = r.top + stand.dy; place(); posBubble();
      if (r.bottom < -40 || r.top > innerHeight + 40) { stand = null; hideBubble(); const h = home(); busy = true; fly(h.x, h.y).then(() => { busy = false; touring && bubble('Lost you there. Tap me to carry on.', '<button class="jg-btn go" data-a="next">Continue ▶</button><button class="jg-btn" data-a="end">✕</button>') }) }
    }
    requestAnimationFrame(loop);
  })();
  addEventListener('resize', () => { if (!touring) { const h = home(); x = h.x; y = h.y; place() } posBubble() });

  // entrance: he flies in from off-screen left and settles in the corner
  const h0 = home(); x = -160; y = h0.y - 160; place();
  setTimeout(async () => { if (!stops.length) return; await fly(h0.x, h0.y, 1100); point();
    bubble("Hey, I'm <b>Justin</b>. Want the flying tour?", '<button class="jg-btn go" data-a="start">Take off ▶</button><button class="jg-btn" data-a="later">Later</button>');
    setTimeout(() => { if (!touring) hideBubble() }, 9000) }, 1300);
  window.JMGuide = { go, end, get index() { return idx } };
})();
