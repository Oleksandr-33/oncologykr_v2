/* ===============================
   SPA Router + Theme (FIXED)
   =============================== */

/* ---------- ROUTES ---------- */
const routes = {
  home: 'pages/home.html',
  about: 'pages/about.html',
  doctors: 'pages/doctors.html',
  services: 'pages/services.html',
  contact: 'pages/contact.html',
  404: 'pages/404.html',
};

/* ---------- SEO META DATA ---------- */
const pageMeta = {
  home: {
    title: 'Онкологія Кривий Ріг - Центр онкологічної допомоги та підтримки',
    description: 'КНТ «Криворізький онкологічний диспансер» - сучасний медичний заклад, що надає повний цикл онкологічної допомоги від діагностики до лікування та реабілітації пацієнтів.',
    url: 'https://oncologykr.com/#/home'
  },
  about: {
    title: 'Про нас - Онкологія Кривий Ріг',
    description: 'Інформація про відділення, команду фахівців та підхід до лікування в Криворізькому онкологічному диспансері. Сучасні методи діагностики та комплексна допомога пацієнтам.',
    url: 'https://oncologykr.com/#/about'
  },
  services: {
    title: 'Наші послуги - Онкологія Кривий Ріг',
    description: 'Повний перелік медичних послуг за договором з НСЗУ: хірургічні операції, діагностика, хіміотерапія, променева терапія та комплексне лікування онкологічних захворювань.',
    url: 'https://oncologykr.com/#/services'
  },
  doctors: {
    title: 'Наші лікарі - Онкологія Кривий Ріг',
    description: 'Експертні команди з оцінювання повсякденного функціонування особи (ЕКОПФО). Висококваліфіковані лікарі-онкологи та хірурги-онкологи Криворізького онкологічного диспансеру.',
    url: 'https://oncologykr.com/#/doctors'
  },
  contact: {
    title: 'Контакти - Онкологія Кривий Ріг',
    description: 'Зв\'яжіться з Криворізьким онкологічним диспансером. Надішліть нам повідомлення через контактну форму або зателефонуйте за номерами: (098) 905-09-87, (056) 405-45-47.',
    url: 'https://oncologykr.com/#/contact'
  },
  404: {
    title: '404 - Сторінку не знайдено | Онкологія Кривий Ріг',
    description: 'Сторінку не знайдено. Перейдіть на головну сторінку Криворізького онкологічного диспансеру для отримання інформації про наші послуги та контакти.',
    url: 'https://oncologykr.com/#/404'
  }
};

function updateMetaTags(route) {
  const meta = pageMeta[route] || pageMeta.home;

  // Update title
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = meta.title;

  // Update meta description
  const descEl = document.getElementById('meta-description');
  if (descEl) descEl.setAttribute('content', meta.description);

  // Update Open Graph tags
  const ogTitleEl = document.getElementById('og-title');
  if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

  const ogDescEl = document.getElementById('og-description');
  if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

  const ogUrlEl = document.getElementById('og-url');
  if (ogUrlEl) ogUrlEl.setAttribute('content', meta.url);

  // Update Twitter Card tags
  const twitterTitleEl = document.getElementById('twitter-title');
  if (twitterTitleEl) twitterTitleEl.setAttribute('content', meta.title);

  const twitterDescEl = document.getElementById('twitter-description');
  if (twitterDescEl) twitterDescEl.setAttribute('content', meta.description);
}

/* ---------- ANALYTICS TRACKING ---------- */
/**
 * Track custom events with Plausible Analytics
 * @param {string} eventName - Name of the event to track
 * @param {Object} props - Optional properties to attach to the event
 */
function trackEvent(eventName, props = {}) {
  // Check if Plausible is loaded (window.plausible is available when script loads)
  if (typeof window.plausible !== 'undefined') {
    window.plausible(eventName, { props });
  }
}

/**
 * Track page view for SPA navigation
 * Plausible automatically tracks initial page load, but we need to manually
 * track SPA route changes since URL hash changes don't trigger new page views
 */
function trackPageView(route) {
  const meta = pageMeta[route] || pageMeta.home;

  // Track the page view with the full URL including hash
  if (typeof window.plausible !== 'undefined') {
    window.plausible('pageview', {
      u: meta.url,
      // Optional: send the page title as well
      props: {
        route: route,
        title: meta.title
      }
    });
  }
}

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

/* ---------- TRACK NAVIGATION CLICKS ---------- */
function initNavigationTracking() {
  // Track all navigation link clicks (both desktop and mobile)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (!link) return;

    const route = link.getAttribute('href').replace(/^#\//, '');
    const isMobile = link.closest('.mobile-nav') !== null;

    trackEvent('Navigation Click', {
      route: route,
      type: isMobile ? 'mobile' : 'desktop',
      text: link.textContent.trim()
    });
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

/* ---------- LOADING BAR ---------- */
function showLoadingBar() {
  const bar = document.getElementById('loading-bar');
  if (!bar) return;

  // Скинути стан
  bar.classList.remove('is-complete');
  bar.style.width = '0%';

  // Показати з початковою анімацією
  requestAnimationFrame(() => {
    bar.classList.add('is-loading');
    // Імітація прогресу: 0% -> 90% за 0.5s
    bar.style.width = '90%';
  });

  // Track loading bar display (indicates user navigation)
  trackEvent('Loading Bar', { action: 'show' });
}

function hideLoadingBar() {
  const bar = document.getElementById('loading-bar');
  if (!bar) return;

  // Завершити анімацію: 90% -> 100%
  bar.style.width = '100%';
  bar.classList.add('is-complete');

  // Приховати через 0.3s після завершення
  setTimeout(() => {
    bar.classList.remove('is-loading', 'is-complete');
    bar.style.width = '0%';
  }, 300);
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

  // 3) Показати loading bar
  showLoadingBar();

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

    // ⬇️ 4. ПРИХОВАТИ loading bar після завантаження
    hideLoadingBar();
  } catch (e) {
    main.innerHTML = `
      <section style="padding:32px">
        <h2>Помилка завантаження</h2>
        <p>Файл: ${file}</p>
      </section>`;
    hideLoadingBar();
  }

  updateActiveNav(route);

  // Update meta tags for SEO
  updateMetaTags(route);

  // Track page view for analytics (SPA navigation)
  trackPageView(route);

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

/* ===============================
   CONTACT FORM (Validation + Submit)
   =============================== */

// Form validation patterns
const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneUA: /^(\+380|0)\d{9}$/,
};

// Character limits
const CHAR_LIMITS = {
  name: 100,
  subject: 200,
  message: 1000,
};

// Form submission state
let isSubmitting = false;

/**
 * Validate a single form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateField(field) {
  const errorSpan = document.getElementById(`${field.id.replace('contact-', '')}-error`);
  if (!errorSpan) return true;

  const value = field.value.trim();
  const fieldName = field.name;
  let errorMessage = '';

  // Clear previous error
  errorSpan.textContent = '';
  field.classList.remove('form-input--error', 'form-select--error', 'form-textarea--error');

  // Required field check
  if (field.hasAttribute('required') && !value) {
    errorMessage = 'Це поле обов\'язкове';
  }
  // Email validation
  else if (fieldName === 'email' && value && !VALIDATION_PATTERNS.email.test(value)) {
    errorMessage = 'Введіть коректну email адресу';
  }
  // Phone validation (optional but if filled, must be valid)
  else if (fieldName === 'phone' && value && !VALIDATION_PATTERNS.phoneUA.test(value)) {
    errorMessage = 'Формат: +380XXXXXXXXX або 0XXXXXXXXX';
  }
  // Character limit checks
  else if (fieldName === 'name' && value.length > CHAR_LIMITS.name) {
    errorMessage = `Максимум ${CHAR_LIMITS.name} символів`;
  } else if (fieldName === 'message' && value.length > CHAR_LIMITS.message) {
    errorMessage = `Максимум ${CHAR_LIMITS.message} символів`;
  }

  // Display error if any
  if (errorMessage) {
    errorSpan.textContent = errorMessage;
    if (field.classList.contains('form-input')) {
      field.classList.add('form-input--error');
    } else if (field.classList.contains('form-select')) {
      field.classList.add('form-select--error');
    } else if (field.classList.contains('form-textarea')) {
      field.classList.add('form-textarea--error');
    }
    return false;
  }

  return true;
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if all fields are valid
 */
function validateForm(form) {
  const fields = form.querySelectorAll('input, select, textarea');
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Update character counter for textarea
 * @param {HTMLTextAreaElement} textarea - The textarea element
 */
function updateCharCounter(textarea) {
  const counter = document.getElementById('message-counter');
  if (!counter) return;

  const length = textarea.value.length;
  const limit = CHAR_LIMITS.message;
  counter.textContent = `${length} / ${limit}`;

  // Visual feedback when approaching limit
  if (length > limit * 0.9) {
    counter.style.color = 'var(--color-error, #dc2626)';
  } else {
    counter.style.color = 'var(--color-muted)';
  }
}

/**
 * Show form status message (success or error)
 * @param {string} message - The message to display
 * @param {string} type - 'success' or 'error'
 */
function showFormStatus(message, type) {
  const statusDiv = document.getElementById('form-status');
  if (!statusDiv) return;

  statusDiv.textContent = message;
  statusDiv.className = `form-status form-status--${type}`;
  statusDiv.style.display = 'block';

  // Scroll to status message
  statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-hide success message after 10 seconds
  if (type === 'success') {
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 10000);
  }
}

/**
 * Set form loading state
 * @param {HTMLFormElement} form - The form element
 * @param {boolean} loading - True to show loading state
 */
function setFormLoading(form, loading) {
  const submitBtn = form.querySelector('#contact-submit');
  const inputs = form.querySelectorAll('input, select, textarea, button');

  if (loading) {
    submitBtn.classList.add('btn--loading');
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.disabled = true;
    inputs.forEach((input) => (input.disabled = true));
    showLoadingBar(); // Use existing loading bar from app.js
  } else {
    submitBtn.classList.remove('btn--loading');
    submitBtn.setAttribute('aria-busy', 'false');
    submitBtn.disabled = false;
    inputs.forEach((input) => (input.disabled = false));
    hideLoadingBar();
  }
}

/**
 * Handle form submission
 * @param {Event} e - The submit event
 */
async function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;

  // Prevent double submission
  if (isSubmitting) return;

  // Validate form
  if (!validateForm(form)) {
    showFormStatus('Будь ласка, виправте помилки у формі', 'error');
    return;
  }

  // Set submitting state
  isSubmitting = true;
  setFormLoading(form, true);

  // Get form data
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    subject: form.subject.value,
    message: form.message.value.trim(),
  };

  try {
    // TODO: Replace with proper backend API endpoint
    // For now, we'll use mailto: as a temporary solution
    // This will open the user's email client with pre-filled data

    const emailBody = `
Ім'я: ${formData.name}
Email: ${formData.email}
Телефон: ${formData.phone || 'Не вказано'}
Тема: ${formData.subject}

Повідомлення:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:onkoriad@gmail.com?subject=${encodeURIComponent(
      `[Контактна форма] ${formData.subject}`
    )}&body=${encodeURIComponent(emailBody)}`;

    // Track form submission
    trackEvent('Form Submit', { type: formData.subject });

    // Open mailto link
    window.location.href = mailtoLink;

    // Show success message
    showFormStatus(
      'Дякуємо! Ваше повідомлення надіслано. Ми зв\'яжемося з вами найближчим часом.',
      'success'
    );

    // Reset form after successful submission
    form.reset();
    updateCharCounter(form.message);

    // Reset submitting state after a delay
    setTimeout(() => {
      isSubmitting = false;
      setFormLoading(form, false);
    }, 2000);
  } catch (error) {
    console.error('Form submission error:', error);
    showFormStatus(
      'Помилка відправки. Спробуйте пізніше або зателефонуйте нам.',
      'error'
    );
    isSubmitting = false;
    setFormLoading(form, false);
  }
}

/**
 * Initialize contact form
 */
function initContactForm() {
  // Event delegation for form submission
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'contact-form') {
      handleContactFormSubmit(e);
    }
  });

  // Event delegation for real-time validation
  document.addEventListener('blur', (e) => {
    const target = e.target;
    if (
      target.form &&
      target.form.id === 'contact-form' &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA')
    ) {
      validateField(target);
    }
  }, true);

  // Event delegation for character counter
  document.addEventListener('input', (e) => {
    if (e.target.id === 'contact-message') {
      updateCharCounter(e.target);
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

function applyTheme(theme, trackAnalytics = true) {
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

  // Track theme switch (only when user clicks, not on initial load)
  if (trackAnalytics) {
    trackEvent('Theme Switch', { theme: safe });
  }
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // theme (don't track initial load, only user clicks)
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(saved, false);

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(cur === 'dark' ? 'light' : 'dark', true); // track user theme switch
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

  // contact form
  initContactForm();

  // analytics - track navigation clicks
  initNavigationTracking();
});
