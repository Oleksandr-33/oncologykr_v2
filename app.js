/* ===============================
   SPA Router + Theme (FIXED)
   =============================== */

/* ---------- ROUTES ---------- */
const routes = {
  home: 'pages/home.html',
  about: 'pages/about.html',
  doctors: 'pages/doctors.html',
  services: 'pages/services.html',
  404: 'pages/404.html',
};

/* ---------- HELPERS ---------- */
function getMain() {
  // Контейнер, куди підвантажуються partial-сторінки
  return document.getElementById('content');
}

function getRoute() {
  return location.hash.replace(/^#\//, '') || 'home';
}

function abs(path) {
  return new URL(path, document.baseURI).toString();
}

function initFadeIn(root = document) {
  const items = root.querySelectorAll('.fade-in');
  if (!items.length) return;

  /* Accessibility: якщо користувач не хоче анімацій */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  /* ⬇️ ВАЖЛИВО: скидаємо стан, щоб анімація повторювалась */
  items.forEach((el) => el.classList.remove('is-visible'));

  /* IntersectionObserver */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // один раз на елемент
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- NAV ACTIVE ---------- */
function updateActiveNav(route) {
  document.querySelectorAll('a[href^="#/"]').forEach((a) => {
    const r = a.getAttribute('href').replace(/^#\//, '');
    a.classList.toggle('active', r === route);
    r === route
      ? a.setAttribute('aria-current', 'page')
      : a.removeAttribute('aria-current');
  });
}

/* ---------- MOBILE NAV ---------- */
function setMobileNavOpen(isOpen) {
  const html = document.documentElement;
  const btn = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;

  html.classList.toggle('nav-open', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
}

function initMobileNav() {
  const btn = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;

  // Toggle по кліку
  btn.addEventListener('click', () => {
    const isOpen = document.documentElement.classList.contains('nav-open');
    setMobileNavOpen(!isOpen);
  });

  // Закривати меню після вибору пункту
  mobileNav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    setMobileNavOpen(false);
  });

  // ESC — закрити
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    setMobileNavOpen(false);
  });

  // Клік поза меню — закрити (лише коли відкрите)
  document.addEventListener('click', (e) => {
    const isOpen = document.documentElement.classList.contains('nav-open');
    if (!isOpen) return;

    const inHeader = e.target.closest('.site-header');
    if (inHeader) return;
    setMobileNavOpen(false);
  });
}

/* ---------- PAGE LOADER ---------- */
async function loadPage(route) {
  const main = getMain();
  if (!main) return;

  const file = routes[route] || routes['404'];

  try {
    const res = await fetch(abs(file), { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);

    // ⬇️ 1. ВСТАВЛЯЄМО HTML
    main.innerHTML = await res.text();

    // ⬇️ 2. ОДРАЗУ ПІСЛЯ ЦЬОГО — АКТИВУЄМО fade-in
    initFadeIn(main);
  } catch (e) {
    main.innerHTML = `
      <section style="padding:32px">
        <h2>Помилка завантаження</h2>
        <p>Файл: ${file}</p>
      </section>`;
  }

  updateActiveNav(route);

  // UX: якщо мобільне меню відкрите — закриваємо після навігації
  setMobileNavOpen(false);
}

/* ---------- ROUTER ---------- */
function router() {
  loadPage(getRoute());
}

/* ===============================
   THEME + FAVICON
   =============================== */

const THEME_KEY = 'theme';

function setFavicon(theme) {
  const link = document.getElementById('site-favicon');
  if (!link) return;
  link.href = abs(theme === 'dark' ? 'favicon-dark.ico' : 'favicon.ico');
}

function applyTheme(theme) {
  const safe = theme === 'dark' ? 'dark' : 'light';

  // 1. Встановлюємо тему на <html>
  document.documentElement.setAttribute('data-theme', safe);
  localStorage.setItem(THEME_KEY, safe);

  // 2. Міняємо favicon
  setFavicon(safe);

  // 3. Оновлюємо кнопку теми (ARIA, title)
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', safe === 'dark' ? 'true' : 'false');
    btn.setAttribute(
      'aria-label',
      safe === 'dark' ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'
    );
    btn.title = btn.getAttribute('aria-label');
  }
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // theme
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(saved);

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  });

  // router
  window.addEventListener('hashchange', router);
  if (!location.hash) location.hash = '#/home';
  router();

  // mobile nav
  initMobileNav();
});
