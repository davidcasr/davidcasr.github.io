// ── NAV: show on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
}, { passive: true });

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── Lang toggle ──
const html = document.documentElement;
const langBtn = document.getElementById('langToggle');
langBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-lang');
  const next = current === 'es' ? 'en' : 'es';
  html.setAttribute('data-lang', next);
  langBtn.textContent = next === 'es' ? 'EN' : 'ES';
});

// ── Load more publications ──
const pubMoreBtn = document.getElementById('pubMoreBtn');
const pubMoreWrap = document.getElementById('pubMoreWrap');
const hiddenPubs = Array.from(document.querySelectorAll('.pub-hidden'));
let pubShown = 0;
const PUB_BATCH = 3;

function showNextPubs() {
  const next = hiddenPubs.slice(pubShown, pubShown + PUB_BATCH);
  next.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible-pub');
      el.style.transitionDelay = `${i * 70}ms`;
    }, i * 70);
  });
  pubShown += next.length;
  if (pubShown >= hiddenPubs.length) {
    pubMoreWrap.style.display = 'none';
  }
}

if (pubMoreBtn) pubMoreBtn.addEventListener('click', showNextPubs);
if (hiddenPubs.length === 0 && pubMoreWrap) pubMoreWrap.style.display = 'none';

// ── Scroll reveal ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Stagger animations ──
document.querySelectorAll('.exp-item, .proj-card, .edu-card, .contact-card, .pub-item')
  .forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; });

// ── Terminal animation ──
(function () {
  var SEQS = [
    {
      cmd: [{ t: 'whoami', c: 'cmd' }],
      steps: [
        { h: '  <span class="t-key">name:</span>     <span class="t-str">"David Castro"</span>' },
        { h: '  <span class="t-key">role:</span>     <span class="t-str">"Sr. Backend Engineer"</span>' },
        { h: '  <span class="t-key">location:</span> <span class="t-str">"Colombia"</span>' },
      ]
    },
    {
      cmd: [{ t: 'cat ', c: 'cmd' }, { t: 'stack.yaml', c: 'arg' }],
      steps: [
        { h: '  <span class="t-key">backend:</span> <span class="t-str">Python · Django · FastAPI</span>' },
        { h: '  <span class="t-key">infra:</span>   <span class="t-str">AWS · Docker · PostgreSQL</span>' },
        { h: '  <span class="t-key">ai:</span>      <span class="t-str">LLMs · Agents · Claude · OpenAI</span>' },
      ]
    },
    {
      cmd: [{ t: 'git ', c: 'cmd' }, { t: 'log ', c: 'cmd' }, { t: '--oneline ', c: 'flag' }, { t: '-4', c: 'flag' }],
      steps: [
        { h: '<span class="t-num">a3f2c1e</span> <span class="t-str">feat:</span> <span class="t-cmd">launch yugen-labs.dev</span>' },
        { h: '<span class="t-num">b9d4a7f</span> <span class="t-str">feat:</span> <span class="t-cmd">ship knowledgehub-v2 · crehana learning</span>' },
        { h: '<span class="t-num">c1e8b3d</span> <span class="t-str">perf:</span> <span class="t-cmd">optimize learning queries · -80% latency</span>' },
        { h: '<span class="t-num">d7a9e2f</span> <span class="t-dim">wip:</span>  <span class="t-dim">payroll engine · crehana core</span>' },
      ]
    },
    {
      cmd: [{ t: 'ping ', c: 'cmd' }, { t: 'me@davidcasr.com', c: 'arg' }],
      steps: [
        { type: 'progress' },
        { h: '  <span class="t-ok">✓ online</span> <span class="t-dim">· disponible para proyectos</span>', delay: 200 },
      ]
    },
    {
      cmd: [{ t: 'ls ', c: 'cmd' }, { t: '-la ', c: 'flag' }, { t: '~/projects', c: 'arg' }],
      steps: [
        { h: '  <span class="t-str">yugen-labs/</span>        <span class="t-dim">[WIP]</span>' },
        { h: '  <span class="t-str">dorian-medicina/</span>   <span class="t-dim">[live]</span>' },
        { h: '  <span class="t-str">streamlit-oil-gas/</span> <span class="t-dim">[live]</span>' },
        { h: '  <span class="t-str">promesa-health/</span>    <span class="t-dim">[live]</span>' },
      ]
    },
    {
      cmd: [{ t: 'cat ', c: 'cmd' }, { t: 'education.md', c: 'arg' }],
      steps: [
        { h: '  <span class="t-cmd">MSc UNAB</span> <span class="t-dim">· Software Mgmt</span> <span class="t-ok">[Meritorious]</span>' },
        { h: '  <span class="t-cmd">BSc UIS</span>  <span class="t-dim">· Systems Eng</span>' },
      ]
    },
    {
      cmd: [{ t: 'grep ', c: 'cmd' }, { t: '--count ', c: 'flag' }, { t: 'publications.bib', c: 'arg' }],
      steps: [
        { h: '  <span class="t-cmd">found</span> <span class="t-num">5</span> <span class="t-dim">peer-reviewed publications</span>' },
        { h: '  <span class="t-dim">latest:</span> <span class="t-str">JMIR Formative Research</span> <span class="t-dim">· 2024</span>' },
      ]
    },
    {
      cmd: [{ t: 'curl ', c: 'cmd' }, { t: '-s ', c: 'flag' }, { t: 'davidcasr.com/contact', c: 'arg' }],
      steps: [
        { h: '  <span class="t-key">email:</span>    <span class="t-str">"me@davidcasr.com"</span>' },
        { h: '  <span class="t-key">calendly:</span> <span class="t-str">"calendly.com/davidcasr/coaching"</span>' },
      ]
    },
    {
      cmd: [{ t: 'deploy ', c: 'cmd' }, { t: 'yugen-labs ', c: 'arg' }, { t: '--env ', c: 'flag' }, { t: 'prod', c: 'str' }],
      steps: [
        { h: '  <span class="t-err">✗ error:</span> <span class="t-dim">missing env var OPENAI_KEY</span>', delay: 400 },
        { h: '  <span class="t-prompt">$</span> <span class="t-cmd">export AI_PROVIDER=claude</span>', delay: 600 },
        { h: '  <span class="t-ok">✓ switched</span> <span class="t-dim">· deploying...</span>', delay: 400 },
        { h: '  <span class="t-ok">✓ live at</span> <span class="t-str">yugenlabs.dev</span>', delay: 800 },
      ]
    },
  ];

  var root = document.getElementById('termLines');
  if (!root) return;

  var hist = [];

  function pickNext() {
    var pool = SEQS.map(function (_, i) { return i; }).filter(function (i) { return hist.indexOf(i) === -1; });
    var idx = pool[Math.floor(Math.random() * pool.length)];
    hist.push(idx);
    if (hist.length > 3) hist.shift();
    return idx;
  }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function addLine(h) {
    var d = document.createElement('div');
    d.className = 'term-line';
    d.innerHTML = h;
    root.appendChild(d);
    while (root.children.length > 30) root.removeChild(root.firstChild);
  }

  async function typeCmd(parts) {
    var line = document.createElement('div');
    line.className = 'term-line';
    var ps = document.createElement('span');
    ps.className = 't-prompt';
    ps.textContent = '$ ';
    line.appendChild(ps);
    root.appendChild(line);
    while (root.children.length > 30) root.removeChild(root.firstChild);

    for (var p of parts) {
      var s = document.createElement('span');
      s.className = 't-' + p.c;
      line.appendChild(s);
      for (var ch of p.t) {
        s.textContent += ch;
        await sleep(35 + Math.random() * 45);
      }
    }
    await sleep(160);
  }

  async function animateProgress() {
    var line = document.createElement('div');
    line.className = 'term-line';
    var s = document.createElement('span');
    line.appendChild(s);
    root.appendChild(line);
    var N = 20;
    for (var i = 0; i <= N; i++) {
      var pct = Math.round(i / N * 100);
      s.innerHTML = '  <span class="t-dim">[</span>'
        + '<span class="t-ok">' + '█'.repeat(i) + '</span>'
        + '<span class="t-dim">' + '░'.repeat(N - i) + ']</span>'
        + ' <span class="t-num">' + pct + '%</span>';
      await sleep(35 + Math.random() * 25);
    }
  }

  async function runSeq(idx) {
    var seq = SEQS[idx];
    await typeCmd(seq.cmd);
    for (var step of seq.steps) {
      if (step.type === 'progress') {
        await animateProgress();
      } else {
        await sleep(step.delay || 90);
        addLine(step.h);
      }
    }
  }

  async function loop() {
    await sleep(700);
    while (true) {
      await runSeq(pickNext());
      var cur = document.createElement('div');
      cur.className = 'term-line';
      cur.innerHTML = '<span class="t-prompt">$ </span><span class="term-cursor"></span>';
      root.appendChild(cur);
      await sleep(1300 + Math.random() * 1000);
      cur.remove();
    }
  }

  loop();
}());
