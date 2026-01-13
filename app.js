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

/* ---------- SCROLL TO TOP ---------- */
function scrollToTop() {
  // Метод 1: Стандартний window.scrollTo (працює на більшості пристроїв)
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Метод 2: Fallback для старих браузерів
  window.scrollTo(0, 0);

  // Метод 3: Scroll на document.documentElement (для деяких Android браузерів)
  document.documentElement.scrollTop = 0;

  // Метод 4: Scroll на document.body (для Safari iOS та деяких Android браузерів)
  document.body.scrollTop = 0;

  // Метод 5: requestAnimationFrame для затримки на 1 кадр (для Android Chrome)
  // Це допомагає, коли DOM ще рендериться
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

/* ---------- PAGE LOADER ---------- */
async function loadPage(route) {
  const main = getMain();
  if (!main) return;

  const file = routes[route] || routes['404'];

  /* === CLEANUP BEFORE PAGE LOAD (SPA safety) === */
  // 1) Закрити PDF-модалку (Doctors: наказ), якщо була відкрита
  closePdfModal();

  // 2) Закрити Content-модалку (About: відділення), якщо була відкрита
  closeContentModal();

  try {
    const res = await fetch(abs(file), { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);

    // ⬇️ 1. ВСТАВЛЯЄМО HTML
    main.innerHTML = await res.text();

    // ⬇️ 2. ПРОКРУЧУЄМО СТОРІНКУ ВГОРУ (UX для SPA навігації)
    // Використовуємо кілька методів для надійності на Android
    scrollToTop();

    // ⬇️ 3. ОДРАЗУ ПІСЛЯ ЦЬОГО — АКТИВУЄМО fade-in
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

/* ===============================
   PDF MODAL (Doctors: наказ)
   =============================== */

function openPdfModal(src) {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  if (!modal || !frame) return;

  frame.src = abs(src);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('modal-open'); // lock page scroll

  // фокус на кнопку закриття (зручно з клавіатури)
  modal.querySelector('[data-close]')?.focus();
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  if (!modal || !frame) return;

  frame.src = '';
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('modal-open'); // re-enable page scroll
}

function initPdfModal() {
  // Делегування подій: працює навіть після підвантаження partial
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-pdf]');
    const closeBtn = e.target.closest('[data-close]');

    // Відкрити
    if (openBtn) {
      e.preventDefault();
      openPdfModal(openBtn.dataset.pdf);
      return;
    }

    // Закрити (клік по фону або по ✕)
    if (closeBtn) {
      e.preventDefault();
      closePdfModal();
    }
  });

  // ESC — закрити
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePdfModal();
  });
}

/* ===============================
   CONTENT MODAL (About: відділення)
   =============================== */

// Helper function to close content modal (used by router cleanup)
function closeContentModal() {
  const modal = document.getElementById('contentModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('modal-open'); // re-enable page scroll
}

function initContentModal() {
  // Cache references to modal elements
  function getParts() {
    const modal = document.getElementById('contentModal');
    const titleEl = document.getElementById('contentModalTitle');
    const contentEl = document.getElementById('contentModalContent');
    return { modal, titleEl, contentEl };
  }

  // Open the modal with content for a given section
  function openModal(key, label) {
    const { modal, titleEl, contentEl } = getParts();
    const tpl = document.getElementById(`tpl-${key}`);
    if (!modal || !tpl || !titleEl || !contentEl) return;

    // Set the modal title (accessible name) and content
    titleEl.textContent = label;
    contentEl.innerHTML = ''; // clear previous content
    contentEl.appendChild(tpl.content.cloneNode(true));

    // Show the modal
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open'); // lock page scroll

    // Move focus to the close button for accessibility (so that ESC works and focus is trapped in modal)
    modal.querySelector('.content-close')?.focus();
  }

  // Event delegation for opening/closing the modal
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    const closeBtn = e.target.closest('[data-close]');
    if (openBtn) {
      e.preventDefault();
      const sectionKey = openBtn.getAttribute('data-modal-open');
      const sectionName = openBtn.textContent.trim();
      openModal(sectionKey, sectionName);
    }
    if (closeBtn) {
      e.preventDefault();
      closeContentModal();
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContentModal();
    }
  });
}

/* ---------- ROUTER ---------- */
function router() {
  loadPage(getRoute());
}

/* ===============================
   THEME + FAVICON
   =============================== */

const THEME_KEY = 'theme';
const THEME_COLORS = {
  light: '#f5f7fb',
  dark: '#0f172a',
};

function setFavicon(theme) {
  const link = document.getElementById('site-favicon');
  if (!link) return;
  link.href = abs(theme === 'dark' ? 'favicon-dark.ico' : 'favicon.ico');
}

function setThemeColor(theme) {
  const meta =
    document.getElementById('meta-theme-color') ||
    document.querySelector('meta[name="theme-color"]');

  if (!meta) return;

  meta.setAttribute('content', THEME_COLORS[theme] || THEME_COLORS.light);
}

function applyTheme(theme) {
  const safe = theme === 'dark' ? 'dark' : 'light';

  // 1. Встановлюємо тему на <html>
  document.documentElement.setAttribute('data-theme', safe);
  localStorage.setItem(THEME_KEY, safe);

  // 2. Міняємо favicon
  setFavicon(safe);

  // 2.1 Оновлюємо theme-color (колір UI браузера на мобільних)
  setThemeColor(safe);

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

  // modals
  initPdfModal();
  initContentModal();
});
