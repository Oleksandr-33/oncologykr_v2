# PROJECT-SETUP.md - Immediate Next Steps

## Quick Start

This document provides actionable next steps to begin implementing the oncologykr development strategy. Start here after reviewing the strategy documents.

---

## Phase 1 Kickoff Summary

### What We're Building (Phase 1)

| Feature | Status | Impact |
|---------|--------|--------|
| Site-wide search | To build | Find content quickly |
| Contact form | To build | Direct communication |
| SEO optimization | To build | Discoverability |
| Service worker | To build | Offline access |
| Loading states | To build | Better UX |
| Analytics | To configure | Usage insights |
| Patient education | To write | Patient empowerment |
| Doctor directory | To enhance | Find specialists |
| FAQ section | To build | Self-service answers |
| Accessibility | To audit/fix | Compliance |

### What We Already Have

| Feature | Status | Quality |
|---------|--------|---------|
| SPA router | Complete | Excellent |
| Theme system | Complete | Excellent |
| Modal system | Complete | Excellent |
| Mobile navigation | Complete | Excellent |
| Department info | Complete | Good |
| Services info | Complete | Good |
| Basic doctor list | Complete | Needs enhancement |
| PWA manifest | Complete | Good |

---

## First 5 Tasks to Start Now

### Task 1: Add Loading States (1 day)

**Why First:** Improves perceived performance, low effort, high impact.

**Implementation:**

1. Add CSS for loading bar:
```css
/* Add to styles.css */
.loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--color-surface);
    z-index: 9999;
    opacity: 0;
    transition: opacity 100ms;
}

.loading-bar.is-visible {
    opacity: 1;
}

.loading-bar__progress {
    height: 100%;
    background: var(--color-accent);
    width: 0;
    transition: width 300ms ease;
}

.loading-bar.is-loading .loading-bar__progress {
    width: 80%;
}

.loading-bar.is-complete .loading-bar__progress {
    width: 100%;
}
```

2. Add HTML to index.html (after opening `<body>`):
```html
<div class="loading-bar" aria-hidden="true">
    <div class="loading-bar__progress"></div>
</div>
```

3. Update app.js loadPage function:
```javascript
const loadingBar = document.querySelector('.loading-bar');

async function loadPage(route) {
    // Show loading
    loadingBar.classList.add('is-visible', 'is-loading');

    // ... existing fetch code ...

    // Complete loading
    loadingBar.classList.remove('is-loading');
    loadingBar.classList.add('is-complete');

    setTimeout(() => {
        loadingBar.classList.remove('is-visible', 'is-complete');
    }, 300);
}
```

**Verification:**
- [ ] Loading bar appears during navigation
- [ ] No flash on fast connections
- [ ] Works on mobile

---

### Task 2: SEO Optimization (1-2 days)

**Why Second:** Essential for discoverability, foundational for growth.

**Implementation:**

1. Create page metadata object in app.js:
```javascript
const pageMeta = {
    home: {
        title: 'Криворізький онкологічний диспансер',
        description: 'Офіційний сайт КНТ «Криворізький онкологічний диспансер». Діагностика, лікування та підтримка онкологічних хворих у Кривому Розі.'
    },
    about: {
        title: 'Про нас | Криворізький онкологічний диспансер',
        description: '15 спеціалізованих відділень для діагностики та лікування онкологічних захворювань. Дізнайтеся про наші послуги та фахівців.'
    },
    doctors: {
        title: 'Наші лікарі | Криворізький онкологічний диспансер',
        description: 'Команда досвідчених онкологів та фахівців. Знайдіть свого лікаря та дізнайтеся про його спеціалізацію та досвід.'
    },
    services: {
        title: 'Медичні послуги | Криворізький онкологічний диспансер',
        description: 'Повний перелік медичних послуг за договором з НСЗУ. Хірургічне лікування, хіміотерапія, променева терапія та діагностика.'
    }
};
```

2. Update meta tags on route change:
```javascript
function updateMeta(route) {
    const meta = pageMeta[route] || pageMeta.home;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
}
```

3. Add to index.html `<head>`:
```html
<meta name="description" content="Офіційний сайт КНТ «Криворізький онкологічний диспансер»...">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Криворізький онкологічний диспансер">
<meta property="og:image" content="/images/og-image.jpg">
<meta property="og:locale" content="uk_UA">
```

4. Create sitemap.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://oncologykr.com/#/home</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://oncologykr.com/#/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

5. Create robots.txt:
```
User-agent: *
Allow: /
Sitemap: https://oncologykr.com/sitemap.xml
```

**Verification:**
- [ ] Each page has unique title
- [ ] Meta descriptions render in search preview
- [ ] sitemap.xml accessible
- [ ] robots.txt accessible

---

### Task 3: Add Analytics (0.5 day)

**Why Third:** Start collecting data immediately to inform decisions.

**Option A: Plausible (Recommended)**

1. Sign up at plausible.io (~$9/month)
2. Add script to index.html before `</head>`:
```html
<script defer data-domain="oncologykr.com" src="https://plausible.io/js/script.js"></script>
```

3. Add custom events tracking:
```javascript
// Track outbound links, form submissions, etc.
function trackEvent(name, props = {}) {
    if (window.plausible) {
        window.plausible(name, { props });
    }
}

// Examples:
trackEvent('Form Submit', { form: 'contact' });
trackEvent('PDF View', { document: 'government-order' });
trackEvent('Search', { query: searchTerm });
```

**Option B: Google Analytics 4**

1. Create GA4 property in Google Analytics
2. Add script to index.html:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
</script>
```

**Verification:**
- [ ] Analytics dashboard shows page views
- [ ] Route changes tracked
- [ ] No console errors

---

### Task 4: Create Contact Form (2-3 days)

**Why Fourth:** Replace Google Form QR code with native experience.

**Implementation:**

1. Create pages/contact.html:
```html
<section class="page contact-page">
    <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="#/home">Головна</a> /
            <span aria-current="page">Контакти</span>
        </nav>

        <h1>Зв'яжіться з нами</h1>

        <div class="contact-grid">
            <div class="contact-form-wrapper">
                <h2>Напишіть нам</h2>
                <form id="contactForm" class="contact-form" novalidate>
                    <div class="form-group">
                        <label for="name">Ваше ім'я *</label>
                        <input type="text" id="name" name="name" required
                               autocomplete="name" aria-describedby="name-error">
                        <span id="name-error" class="error-message" aria-live="polite"></span>
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required
                               autocomplete="email" aria-describedby="email-error">
                        <span id="email-error" class="error-message" aria-live="polite"></span>
                    </div>

                    <div class="form-group">
                        <label for="phone">Телефон</label>
                        <input type="tel" id="phone" name="phone"
                               autocomplete="tel" placeholder="+380">
                    </div>

                    <div class="form-group">
                        <label for="subject">Тема *</label>
                        <select id="subject" name="subject" required>
                            <option value="">Оберіть тему</option>
                            <option value="general">Загальне питання</option>
                            <option value="appointment">Запис на прийом</option>
                            <option value="records">Медичні документи</option>
                            <option value="feedback">Відгук</option>
                            <option value="other">Інше</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Повідомлення *</label>
                        <textarea id="message" name="message" rows="5" required
                                  aria-describedby="message-error"></textarea>
                        <span id="message-error" class="error-message" aria-live="polite"></span>
                    </div>

                    <!-- Honeypot -->
                    <div class="hp-field" aria-hidden="true">
                        <input type="text" name="website" tabindex="-1" autocomplete="off">
                    </div>

                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="consent" required>
                            <span>Я погоджуюся з <a href="#/privacy">політикою конфіденційності</a> *</span>
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        Надіслати повідомлення
                    </button>
                </form>

                <div id="formSuccess" class="form-success" hidden>
                    <h3>Дякуємо!</h3>
                    <p>Ваше повідомлення надіслано. Ми зв'яжемося з вами найближчим часом.</p>
                </div>
            </div>

            <aside class="contact-info">
                <h2>Контактна інформація</h2>

                <div class="contact-item">
                    <h3>Адреса</h3>
                    <address>
                        вул. Героїв АТО, 24<br>
                        м. Кривий Ріг<br>
                        Дніпропетровська область, 50000
                    </address>
                    <a href="https://maps.google.com/..." class="btn btn-outline" target="_blank" rel="noopener">
                        Прокласти маршрут
                    </a>
                </div>

                <div class="contact-item">
                    <h3>Телефони</h3>
                    <p>
                        <a href="tel:+380XXXXXXXXX">+380 XX XXX XX XX</a> (реєстратура)<br>
                        <a href="tel:+380XXXXXXXXX">+380 XX XXX XX XX</a> (приймальня)
                    </p>
                </div>

                <div class="contact-item">
                    <h3>Години роботи</h3>
                    <p>
                        Пн-Пт: 8:00 - 17:00<br>
                        Сб-Нд: Вихідний
                    </p>
                </div>
            </aside>
        </div>
    </div>
</section>
```

2. Add route to app.js:
```javascript
const routes = {
    // existing routes...
    contact: 'pages/contact.html'
};
```

3. Add form handling:
```javascript
// Form submission handler (add to app.js or separate forms.js)
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check
        if (form.website.value) return;

        // Validate
        if (!validateForm(form)) return;

        // Submit
        const formData = new FormData(form);
        try {
            // Option A: Formspree
            const response = await fetch('https://formspree.io/f/YOUR_ID', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.hidden = true;
                document.getElementById('formSuccess').hidden = false;
                trackEvent('Form Submit', { form: 'contact' });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Помилка надсилання. Спробуйте ще раз.');
        }
    });
}
```

4. Add CSS for form:
```css
/* Add to styles.css */
.contact-grid {
    display: grid;
    gap: var(--space-8);
}

@media (min-width: 768px) {
    .contact-grid {
        grid-template-columns: 1fr 300px;
    }
}

.form-group {
    margin-bottom: var(--space-4);
}

.form-group label {
    display: block;
    margin-bottom: var(--space-2);
    font-weight: var(--font-weight-medium);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    background: var(--color-bg);
    color: var(--color-text);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

.error-message {
    color: var(--color-error);
    font-size: var(--font-size-sm);
    margin-top: var(--space-1);
}

.hp-field {
    position: absolute;
    left: -9999px;
}

.form-success {
    padding: var(--space-8);
    background: color-mix(in srgb, var(--color-success) 10%, transparent);
    border-radius: var(--radius-lg);
    text-align: center;
}
```

**Verification:**
- [ ] Form validates correctly
- [ ] Submission works
- [ ] Success message displays
- [ ] Spam protection active
- [ ] Mobile friendly

---

### Task 5: Implement Site Search (2-3 days)

**Why Fifth:** High-value feature for user experience.

**Implementation:**

1. Create search data file (data/search-index.json):
```json
{
    "pages": [
        {
            "title": "Головна",
            "url": "#/home",
            "content": "Криворізький онкологічний диспансер...",
            "type": "page"
        },
        {
            "title": "Відділення хіміотерапії",
            "url": "#/about",
            "content": "35 ліжок, різні види хіміотерапії...",
            "type": "department"
        }
    ],
    "doctors": [
        {
            "name": "Коваленко Петро Іванович",
            "title": "Лікар онколог",
            "url": "#/doctors",
            "type": "doctor"
        }
    ],
    "faq": [
        {
            "question": "Що потрібно взяти на прийом?",
            "answer": "Паспорт, направлення...",
            "url": "#/faq",
            "type": "faq"
        }
    ]
}
```

2. Add search HTML to index.html (inside header):
```html
<button class="search-trigger" aria-label="Пошук" data-search-open>
    <svg>...</svg>
</button>

<!-- Search modal (at end of body) -->
<div id="searchModal" class="search-modal" role="dialog" aria-modal="true" aria-label="Пошук" hidden>
    <div class="search-modal__content">
        <div class="search-input-wrapper">
            <svg class="search-icon">...</svg>
            <input type="search" id="searchInput" placeholder="Пошук..."
                   autocomplete="off" aria-describedby="search-hint">
            <kbd class="search-shortcut">ESC</kbd>
        </div>
        <div id="searchResults" class="search-results" role="listbox"></div>
        <p id="search-hint" class="search-hint">
            Натисніть Enter для пошуку або ESC для закриття
        </p>
    </div>
    <div class="search-modal__backdrop" data-search-close></div>
</div>
```

3. Create search module (js/search.js):
```javascript
export class Search {
    constructor() {
        this.data = null;
        this.modal = document.getElementById('searchModal');
        this.input = document.getElementById('searchInput');
        this.results = document.getElementById('searchResults');
        this.init();
    }

    async init() {
        await this.loadData();
        this.bindEvents();
    }

    async loadData() {
        const response = await fetch('/data/search-index.json');
        this.data = await response.json();
    }

    bindEvents() {
        // Open search
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-search-open]')) {
                this.open();
            }
            if (e.target.closest('[data-search-close]')) {
                this.close();
            }
        });

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape' && !this.modal.hidden) {
                this.close();
            }
        });

        // Search input
        this.input.addEventListener('input', () => {
            this.search(this.input.value);
        });
    }

    open() {
        this.modal.hidden = false;
        this.input.focus();
        document.documentElement.classList.add('search-open');
    }

    close() {
        this.modal.hidden = true;
        this.input.value = '';
        this.results.innerHTML = '';
        document.documentElement.classList.remove('search-open');
    }

    search(query) {
        if (query.length < 2) {
            this.results.innerHTML = '';
            return;
        }

        const q = query.toLowerCase();
        const matches = [];

        // Search pages
        for (const page of this.data.pages) {
            if (page.title.toLowerCase().includes(q) ||
                page.content.toLowerCase().includes(q)) {
                matches.push({
                    ...page,
                    highlight: this.highlight(page.title, q)
                });
            }
        }

        // Search doctors
        for (const doctor of this.data.doctors) {
            if (doctor.name.toLowerCase().includes(q)) {
                matches.push({
                    ...doctor,
                    title: doctor.name,
                    highlight: this.highlight(doctor.name, q)
                });
            }
        }

        this.renderResults(matches.slice(0, 10));
    }

    highlight(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    renderResults(matches) {
        if (matches.length === 0) {
            this.results.innerHTML = `
                <p class="search-no-results">
                    Нічого не знайдено. Спробуйте інший запит.
                </p>
            `;
            return;
        }

        this.results.innerHTML = matches.map(match => `
            <a href="${match.url}" class="search-result" role="option">
                <span class="search-result__title">${match.highlight}</span>
                <span class="search-result__type">${this.getTypeLabel(match.type)}</span>
            </a>
        `).join('');
    }

    getTypeLabel(type) {
        const labels = {
            page: 'Сторінка',
            department: 'Відділення',
            doctor: 'Лікар',
            faq: 'FAQ'
        };
        return labels[type] || type;
    }
}
```

**Verification:**
- [ ] Search opens on button click
- [ ] Keyboard shortcut works (Ctrl+K)
- [ ] Results appear as you type
- [ ] Results are clickable
- [ ] No results state displays
- [ ] Search closes properly

---

## Directory Structure After Phase 1

```
/oncologykr_v2/
├── index.html              # Updated with search, loading bar
├── app.js                  # Updated with new features
├── styles.css              # Updated with new styles
├── sw.js                   # NEW: Service worker
├── manifest.webmanifest
├── robots.txt              # NEW
├── sitemap.xml             # NEW
│
├── /pages/
│   ├── home.html
│   ├── about.html
│   ├── doctors.html
│   ├── services.html
│   ├── contact.html        # NEW
│   ├── faq.html            # NEW
│   ├── education/          # NEW
│   │   ├── index.html
│   │   └── *.html (10 articles)
│   └── 404.html
│
├── /data/                  # NEW
│   ├── search-index.json
│   ├── faq.json
│   └── doctors.json
│
├── /js/                    # NEW (optional modules)
│   ├── search.js
│   └── forms.js
│
├── /images/
│   ├── og-image.jpg        # NEW: Social share image
│   └── (existing images)
│
├── /docs/                  # NEW
│   ├── STRATEGY.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   ├── UX-STRATEGY.md
│   ├── CONTENT-STRATEGY.md
│   ├── QUALITY-PLAN.md
│   └── PROJECT-SETUP.md
│
├── CLAUDE.md               # Update with new features
└── README.md
```

---

## Team Setup

### Roles Needed

| Role | Responsibility | Time Commitment |
|------|----------------|-----------------|
| **Lead Developer** | Technical implementation, code reviews | Primary |
| **Content Writer** | Patient education articles, FAQ | Part-time |
| **Medical Reviewer** | Accuracy verification | As needed |
| **Hospital Liaison** | Gather doctor info, requirements | Part-time |

### Communication Channels

- **Development**: Git repository issues/PRs
- **Content**: Shared document for drafts
- **Decisions**: Weekly sync meeting
- **Urgent**: Direct contact (phone/messenger)

---

## Development Environment Setup

### Required Tools

```bash
# Code editor
- VS Code (recommended)
  - Extensions: Live Server, Prettier, ESLint

# Local server (choose one)
python -m http.server 8000
# OR
npx http-server
# OR
php -S localhost:8000

# Version control
git

# Browser
- Chrome (with DevTools)
- Firefox (for testing)
```

### VS Code Settings

```json
// .vscode/settings.json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2,
    "files.eol": "\n",
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

### Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/search-functionality
# ... make changes ...
git add .
git commit -m "Add site-wide search functionality"
git push origin feature/search-functionality
# Create pull request for review
# Merge to main after review
```

---

## Deployment Checklist (When Ready)

### Pre-Launch

```
Technical:
[ ] All Phase 1 features complete
[ ] Loading states implemented
[ ] SEO meta tags on all pages
[ ] sitemap.xml created
[ ] robots.txt created
[ ] Service worker functional
[ ] Contact form working
[ ] Search functional
[ ] Analytics tracking

Content:
[ ] 10 education articles written
[ ] All articles medically reviewed
[ ] FAQ section populated (50+ questions)
[ ] Doctor profiles complete
[ ] Contact information accurate

Quality:
[ ] Lighthouse > 90 all categories
[ ] Accessibility audit passed
[ ] Browser testing complete
[ ] Mobile testing complete
[ ] Forms tested
[ ] Links checked

Legal:
[ ] Privacy policy page
[ ] Medical disclaimer present
[ ] Consent checkboxes working
```

### Hosting Setup (Netlify)

1. Connect GitHub repository
2. Configure build settings:
   - Build command: (none - static site)
   - Publish directory: `.`
3. Add custom domain
4. Enable HTTPS
5. Configure headers (security headers)
6. Enable form handling
7. Set up environment variables

### DNS Configuration

```
Type    Name    Value
A       @       [Netlify IP]
CNAME   www     [your-site].netlify.app
```

---

## Success Criteria for Phase 1

### Technical Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Lighthouse Performance | > 90 | Chrome DevTools |
| Lighthouse Accessibility | > 95 | Chrome DevTools |
| Page load time | < 2s | Chrome DevTools |
| Zero critical bugs | 0 | Manual testing |

### Content Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Education articles | 10 | Content audit |
| FAQ questions | 50+ | Content audit |
| Doctor profiles | All staff | Content audit |

### User Metrics (1 month post-launch)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Monthly users | 500+ | Analytics |
| Contact form submissions | 20+ | Form service |
| Search usage | 100+ queries | Analytics |

---

## Getting Help

### Documentation Reference

| Topic | Document |
|-------|----------|
| Overall strategy | STRATEGY.md |
| Feature prioritization | FEATURES.md |
| Technical decisions | ARCHITECTURE.md |
| Timeline | ROADMAP.md |
| UX patterns | UX-STRATEGY.md |
| Content guidelines | CONTENT-STRATEGY.md |
| Quality standards | QUALITY-PLAN.md |
| Code patterns | CLAUDE.md |

### Questions?

- **Technical questions**: Review ARCHITECTURE.md and CLAUDE.md
- **Feature questions**: Review FEATURES.md and ROADMAP.md
- **Content questions**: Review CONTENT-STRATEGY.md
- **Design questions**: Review UX-STRATEGY.md

---

## Start Now

1. **Read this document completely**
2. **Set up development environment** (15 minutes)
3. **Start with Task 1: Loading States** (1 day)
4. **Progress through tasks sequentially**
5. **Track progress in Git commits**

Let's build Ukraine's best oncology website.

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Ready to start: Yes*
