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
    main.innerHTML = await res.text();
  } catch (e) {
    main.innerHTML = `
      <section style="padding:32px;max-width:900px;margin:auto">
        <h2>Помилка завантаження</h2>
        <p>Файл: <code>${file}</code></p>
        <p>Перевір існування файлу або запуск через HTTP.</p>
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

  /* router */
  window.addEventListener('hashchange', router);
  if (!location.hash) location.hash = '#/home';
  router();
});
