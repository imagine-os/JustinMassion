/* Shared fun layer for every JustinMassion.com concept.
   - Pixel the chameleon pops up from the bottom-left as you reach each section, with a line written for that page.
   - Click him: he changes colour (he's a chameleon), hops and throws confetti.
   - Type P-I-X-E-L anywhere: it rains chameleons.
   - "Contact" / submit buttons get a little confetti burst.
   Include with: <script src="[../]fun.js" data-root="[../]" data-page="a"></script> */
(() => {
  const me = document.currentScript, root = (me && me.dataset.root) || '', page = (me && me.dataset.page) || 'b';
  const QUIPS = {
    b: ["Hi! I'm Pixel. Welcome to the journal.", "Psst — the stickers up top are draggable.", "Scroll the journal, the pages really turn.", "This island grows as you scroll. Like me after lunch.", "Nine books. I've read… the covers.", "Say hi to Justin — he's nice."],
    a: ["Lights, camera… chameleon.", "Scroll and the sketch turns into Justin!", "Spin the room — drag it, I'll wait.", "The archive has knobs. Twist them!", "I'm on the bookshelf too, by the way.", "Contact's warm. I checked."],
    c: ["Season 2026, episode: me.", "Flip the pass — there's a sketch on the back!", "Hover the slices. I'm slice number two.", "LA → Orlando → Guatapé. I fly economy.", "Scroll fast — the deck explodes!", "Think. Sketch. Build. Snack."],
    d: ["Pick a world, any world.", "Fasten your seatbelt — scroll to fly.", "Pencil meets pixels. I'm the pixels.", "Those numbers? I counted them myself.", "Hover the cards — they fan out.", "Book a trip. I'll pack snacks."],
    e: ["Hi! I started as a doodle too.", "Stamp all six worlds for a surprise.", "Watch the glass fill up…", "Try the sketch pad — I'll help!", "The book breathes. Don't tell anyone.", "Let's sketch YOUR world."],
    f: ["Those are Justin's glasses. Don't drop them!", "They land in his hand. Smooth.", "Scroll — they turn all the way round.", "Hover a card to wipe the glass.", "Swiss grid. Very serious. I'm not.", "Start a world with Justin!"],
  }[page] || [];
  const EGG = 'psst… type P-I-X-E-L';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = `
  .fun-buddy{position:fixed;left:16px;bottom:0;z-index:190;width:96px;transform:translateY(112%);transition:transform .7s cubic-bezier(.3,1.55,.5,1);cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent}
  .fun-buddy.up{transform:translateY(6%)}
  .fun-buddy img{display:block;width:100%;filter:drop-shadow(0 6px 10px rgba(0,0,0,.3));transition:filter .5s;pointer-events:none}
  .fun-say{position:absolute;left:84%;bottom:62%;width:max-content;max-width:230px;padding:9px 13px;border-radius:16px 16px 16px 4px;background:#fff;color:#141210;font:600 13px/1.35 Inter,system-ui,sans-serif;box-shadow:0 12px 28px -10px rgba(0,0,0,.45);opacity:0;transform:scale(.6);transform-origin:0 100%;transition:opacity .3s,transform .45s cubic-bezier(.3,1.6,.5,1)}
  .fun-buddy.up .fun-say{opacity:1;transform:scale(1)}
  .fun-rain{position:fixed;top:-120px;z-index:189;pointer-events:none;width:70px}
  .fun-toast{position:fixed;left:50%;top:18px;z-index:191;transform:translate(-50%,-140%);padding:12px 20px;border-radius:99px;background:#141210;color:#fff;font:600 14px Inter,system-ui,sans-serif;box-shadow:0 14px 30px -10px rgba(0,0,0,.5);transition:transform .6s cubic-bezier(.3,1.5,.5,1)}
  .fun-toast.on{transform:translate(-50%,0)}
  #fun-cf{position:fixed;inset:0;width:100%;height:100%;z-index:188;pointer-events:none}
  @media (max-width:640px){.fun-buddy{width:70px;left:8px}.fun-say{font-size:12px;max-width:170px}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ---- confetti ----
  const cv = document.createElement('canvas'); cv.id = 'fun-cf'; document.body.appendChild(cv);
  const cx = cv.getContext('2d'), P = [], COL = ['#ff5a1f', '#f2c14e', '#7fd36b', '#4f8cff', '#e8a0b4', '#14c4c1', '#ffffff'];
  let running = false;
  function size() { const d = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * d; cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0) }
  size(); addEventListener('resize', size);
  function burst(x, y, n) {
    if (reduce) return;
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = 3 + Math.random() * (n > 60 ? 12 : 7); P.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, r: Math.random() * 6, vr: (Math.random() - .5) * .4, w: 5 + Math.random() * 6, h: 3 + Math.random() * 4, c: COL[i % COL.length], l: 1, k: i % 3 }) }
    if (!running) { running = true; requestAnimationFrame(tick) }
  }
  function tick() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.vy += .22; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.l -= .009;
      if (p.l <= 0 || p.y > innerHeight + 30) { P.splice(i, 1); continue }
      cx.save(); cx.globalAlpha = Math.min(1, p.l * 2); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
      if (p.k === 1) { cx.beginPath(); cx.arc(0, 0, p.h * .7, 0, 7); cx.fill() } else cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore() }
    if (P.length) requestAnimationFrame(tick); else { running = false; cx.clearRect(0, 0, innerWidth, innerHeight) }
  }
  window.funBurst = burst;

  // ---- Pixel buddy ----
  const b = document.createElement('div'); b.className = 'fun-buddy'; b.setAttribute('role', 'button'); b.setAttribute('aria-label', 'Pixel the chameleon — click me');
  b.innerHTML = `<div class="fun-say"></div><img src="${root}assets/3d/pixel-peek.webp" alt="">`;
  document.body.appendChild(b);
  const say = b.querySelector('.fun-say'), img = b.querySelector('img');
  let hideT = 0, lastPop = 0, hue = 0, qi = 0;
  function pop(text, ms = 4200) {
    say.textContent = text; b.classList.add('up'); lastPop = Date.now();
    clearTimeout(hideT); hideT = setTimeout(() => b.classList.remove('up'), ms);
  }
  b.addEventListener('click', () => {
    hue = (hue + 70) % 360; img.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 6px 10px rgba(0,0,0,.3))`;
    if (!reduce) img.animate([{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-26px) rotate(-10deg)' }, { transform: 'translateY(0) rotate(0)' }], { duration: 520, easing: 'cubic-bezier(.3,1.4,.5,1)' });
    const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 20, 26);
    const lines = ['New colour, who dis?', 'I can do this all day.', 'Chameleon things.', 'Ta-da! ✨', EGG];
    pop(lines[qi++ % lines.length], 3200);
  });
  // pop up when a new section arrives (not more often than every 7s)
  const secs = [...document.querySelectorAll('section, footer')];
  const seen = new Set();
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const i = secs.indexOf(e.target); if (seen.has(i) || Date.now() - lastPop < 7000) return;
    seen.add(i); const n = seen.size - 1; pop(n >= QUIPS.length ? EGG : QUIPS[Math.min(n, QUIPS.length - 1)]);
  }), { threshold: .45 });
  setTimeout(() => { secs.forEach(s => io.observe(s)) }, 2600);

  // ---- easter egg: type PIXEL ----
  let buf = '';
  addEventListener('keydown', e => {
    if (e.target && /input|textarea/i.test(e.target.tagName)) return;
    buf = (buf + (e.key || '').toLowerCase()).slice(-5);
    if (buf === 'pixel') { buf = ''; rain() }
  });
  function rain() {
    const t = document.createElement('div'); t.className = 'fun-toast'; t.textContent = '🦎 You found the secret — it\'s raining Pixels!'; document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('on')); setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 700) }, 3200);
    burst(innerWidth / 2, innerHeight * .35, 160); pop('YOU FOUND ME! 🎉', 3500);
    if (reduce) return;
    for (let i = 0; i < 26; i++) {
      const im = document.createElement('img'); im.className = 'fun-rain'; im.src = root + 'assets/3d/pixel.webp'; im.alt = '';
      const x = Math.random() * innerWidth, w = 40 + Math.random() * 70; im.style.left = x + 'px'; im.style.width = w + 'px';
      im.style.filter = `hue-rotate(${Math.random() * 360}deg)`; document.body.appendChild(im);
      const a = im.animate([{ transform: `translateY(0) rotate(${Math.random() * 60 - 30}deg)` }, { transform: `translateY(${innerHeight + 260}px) rotate(${Math.random() * 720 - 360}deg)` }],
        { duration: 2200 + Math.random() * 2400, delay: Math.random() * 900, easing: 'cubic-bezier(.4,0,.8,.6)', fill: 'forwards' });
      a.onfinish = () => im.remove();
    }
  }
  window.funRain = rain;

  // ---- confetti on contact-ish buttons ----
  addEventListener('click', e => {
    const el = e.target.closest && e.target.closest('a[href*="contact"],button[type=submit],.go,#send');
    if (!el || el.closest('.vsw')) return; const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 30);
  }, true);
})();
