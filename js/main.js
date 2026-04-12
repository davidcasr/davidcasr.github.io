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
