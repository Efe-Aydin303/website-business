document.body.classList.remove('no-js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sheet = document.getElementById('sheet'), menuBtn = document.querySelector('.menu-btn');
function closeSheet(){ sheet.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }
menuBtn.addEventListener('click', () => { sheet.classList.add('open'); menuBtn.setAttribute('aria-expanded','true'); sheet.querySelector('.go').focus(); });
sheet.querySelector('.close').addEventListener('click', () => { closeSheet(); menuBtn.focus(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('open')) { closeSheet(); menuBtn.focus(); } });
const story = document.querySelector('.story');
function storyY(f) { return story.offsetTop + (story.offsetHeight - innerHeight) * f; }
document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
  closeSheet();
  const id = b.dataset.go, behavior = reduce ? 'auto' : 'smooth';
  if (id === 'diensten') return scrollTo({ top: storyY(.2), behavior });
  if (id === 'werkwijze') return scrollTo({ top: storyY(.9), behavior });
  document.getElementById(id).scrollIntoView({ behavior });
}));
document.getElementById('main').tabIndex = -1;
(() => {
  const el = document.querySelector('.rot-in'), words = ['Op Google.', 'Op Instagram.', 'Op TikTok.'];
  if (!el || reduce) return;
  let i = 0;
  setInterval(() => {
    el.classList.add('out');
    setTimeout(() => {
      i = (i + 1) % words.length; el.textContent = words[i];
      el.classList.remove('out'); el.classList.add('pre'); void el.offsetWidth; el.classList.remove('pre');
    }, 450);
  }, 2600);
})();
document.querySelector('.skip').addEventListener('click', e => { e.preventDefault(); document.getElementById('main').focus(); });


const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* telefoon blijft staan, schermen en panelen wisselen */
(() => {
  const phone = document.getElementById('phone');
  const screens = [...phone.querySelectorAll('.screen')], steps = [...document.querySelectorAll('.panel .step')], dots = [...document.querySelectorAll('.dots i')];

  const panelL = document.querySelector('.panel.l');
  function fit() {
    phone.style.setProperty('--fit', 1);
    const mob = innerWidth < 640, ph = phone.offsetHeight;
    let reserve = 156;
    if (mob) {
      const on = steps.filter(s => s.classList.contains('on'));
      let max = 0;
      steps.filter(s => s.closest('.panel.l')).forEach(s => { steps.forEach(x => x.classList.toggle('on', x === s)); max = Math.max(max, panelL.offsetHeight); });
      steps.forEach(x => x.classList.toggle('on', on.includes(x)));
      reserve = 92 + max + 14;
    }
    phone.style.setProperty('--fit', Math.min(1, (innerHeight - reserve) / ph).toFixed(3));
    if (!mob) {
      const f = Math.min(1, (innerHeight - reserve) / ph), introB = document.querySelector('.intro .wrap').getBoundingClientRect().bottom - Math.min(0, story.getBoundingClientRect().top);
      const top = introB + 28, natTop = innerHeight / 2 - ph * f * .9 / 2;
      phone.style.setProperty('--introY', (top - natTop) + 'px');
      story.style.setProperty('--introTop', (introB + 40) + 'px');
    }
  }
  let cur = -1;
  function setStep(i) {
    if (i === cur) return; cur = i;
    screens.forEach((s, k) => s.classList.toggle('on', k === i));
    steps.forEach(s => s.classList.toggle('on', +s.dataset.s === i));
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
  }
  function onScroll() {
    const total = story.offsetHeight - innerHeight, p = Math.min(1, Math.max(0, -story.getBoundingClientRect().top / total));
    story.classList.toggle('past', p > .1);
    setStep(Math.min(3, Math.max(0, Math.floor((p - .1) / .22))));
  }
  let ticking = false, lastW = innerWidth, lastH = innerHeight;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }, { passive: true });
  addEventListener('resize', () => { if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 120) return; lastW = innerWidth; lastH = innerHeight; fit(); onScroll(); });
  onScroll(); fit();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
})();

(() => {
  const f = document.getElementById('cform'); if (!f) return;
  const out = document.getElementById('cform-s'), t0 = Date.now();
  const say = (m, c) => { out.textContent = m; out.className = 'cform-s ' + (c || ''); };
  const tel = f.querySelector('.tel'), telIn = f.querySelector('[name=phone]');
  f.addEventListener('change', () => { const w = f.querySelector('[name=via]:checked').value === 'whatsapp'; tel.hidden = !w; telIn.required = w; });
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f).entries());
    if (!d.name.trim() || !/^\S+@\S+\.\S{2,}$/.test(d.email.trim()) || d.message.trim().length < 5) return say('Vul je naam, een geldig e-mailadres en een bericht in.', 'err');
    if (d.via === 'whatsapp' && (d.phone || '').replace(/\D/g, '').length < 9) return say('Vul je telefoonnummer in voor WhatsApp.', 'err');
    const btn = f.querySelector('button[type=submit]'); btn.disabled = true; say('Even versturen...');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...d, elapsed: Date.now() - t0 }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { f.reset(); tel.hidden = true; telIn.required = false; say('Bedankt! Ik stuur je zo snel mogelijk een voorstel voor een moment.', 'ok'); }
      else say(r.status === 422 ? 'Controleer je naam, e-mailadres en bericht.' : 'Versturen lukt nu niet. Mail me even rechtstreeks op info@efeweb.nl.', 'err');
    } catch (x) { say('Versturen lukt nu niet. Mail me even rechtstreeks op info@efeweb.nl.', 'err'); }
    btn.disabled = false;
  });
})();

(() => {
  const meta = document.querySelector('meta[name=theme-color]'), root = document.documentElement, mq = matchMedia('(prefers-color-scheme: dark)');
  const apply = () => { const t = mq.matches ? 'dark' : 'light'; root.dataset.theme = t; if (meta) meta.content = t === 'dark' ? '#0e0f11' : '#ffffff'; };
  apply(); mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
})();
