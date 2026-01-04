/* ===============================
   SPA Router + Theme (FIXED)
   =============================== */

/* ---------- ROUTES ---------- */
const routes = {
  home: 'pages/home.html',
  about: 'pages/about.html',
  doctors: 'pages/doctors.html',
  404: 'pages/404.html',
};

/* ---------- HELPERS ---------- */
function getMain() {
  return document.querySelector('main');
}

function getRoute() {
  return location.hash.replace(/^#\//, '') || 'home';
}

function abs(path) {
  return new URL(path, document.baseURI).toString();
}

/* ---------- FADE-IN (repeatable + a11y) ---------- */
function initFadeIn(root = document) {
  const items = root.querySelectorAll('.fade-in');
  if (!items.length) return;

  /* Accessibility: якщо користувач не хоче анімацій */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  /* Скидаємо стан, щоб анімація повторювалась після кожного завантаження partial */
  items.forEach((el) => el.classList.remove('is-visible'));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- MOBILE MENU (hamburger) ---------- */
/* Працює з HTML:
   - header.site-header
   - button#menu-toggle (aria-controls="mobile-menu")
   - div#mobile-menu [hidden]
   - меню містить <a href="#/..."> ...
*/
function initMobileMenu() {
  const header = document.querySelector('.site-header');
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!header || !btn || !menu) return;

  const openMenu = () => {
    header.classList.add('is-menu-open');
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Закрити меню');
  };

  const closeMenu = () => {
    header.classList.remove('is-menu-open');
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Відкрити меню');
  };

  const toggleMenu = () => {
    const isOpen = !menu.hidden;
    isOpen ? closeMenu() : openMenu();
  };

  /* Клік по кнопці */
  btn.addEventListener('click', toggleMenu);

  /* Закривати по кліку на пункт меню */
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (!link) return;
    closeMenu();
  });

  /* Закривати по Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* Закривати при зміні маршруту (Back/Forward теж) */
  window.addEventListener('hashchange', closeMenu);

  /* Експорт в window, якщо захочеш викликати вручну */
  window.__closeMobileMenu = closeMenu;
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

/* ---------- PAGE LOADER ---------- */
async function loadPage(route) {
  const main = getMain();
  if (!main) return;

  const file = routes[route] || routes['404'];

  try {
    const res = await fetch(abs(file), { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);

    /* 1) ВСТАВЛЯЄМО HTML */
    main.innerHTML = await res.text();

    /* 2) АКТИВУЄМО fade-in для щойно вставленого контенту */
    initFadeIn(main);
  } catch (e) {
    main.innerHTML = `
      <section style="padding:32px">
        <h2>Помилка завантаження</h2>
        <p>Файл: ${file}</p>
      </section>`;
  }

  updateActiveNav(route);
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
  document.documentElement.setAttribute('data-theme', safe);
  localStorage.setItem(THEME_KEY, safe);
  setFavicon(safe);

  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = safe === 'dark' ? '🌞' : '🌙';
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  /* theme */
  applyTheme(localStorage.getItem(THEME_KEY) || 'light');

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  });

  /* hamburger menu */
  initMobileMenu();

  /* router */
  window.addEventListener('hashchange', router);
  if (!location.hash) location.hash = '#/home';
  router();
});
