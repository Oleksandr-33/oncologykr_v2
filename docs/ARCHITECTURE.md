# ARCHITECTURE.md - Technical Architecture Plan

## Overview

This document outlines the technical architecture for oncologykr, balancing the current zero-dependency philosophy with the need for enhanced functionality. The architecture prioritizes simplicity, performance, and maintainability while enabling future growth.

---

## Architecture Principles

### 1. Progressive Enhancement

Start with the simplest solution that works, add complexity only when necessary.

### 2. Zero-Dependency Core

Maintain vanilla HTML/CSS/JS for core functionality; external services for specialized features only.

### 3. Static-First

Generate static assets where possible; dynamic functionality via lightweight serverless functions.

### 4. Performance Budget

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Total Page Weight: < 500KB (excluding images)
- Lighthouse Score: > 90 all categories

### 5. Accessibility by Default

WCAG 2.1 AA compliance built into all components from the start.

---

## Current Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
├─────────────────────────────────────────────────────────────┤
│  index.html (Shell)                                         │
│  ├── Header (nav, theme toggle, hamburger)                  │
│  ├── Main (#content) ◄─── Dynamic page loading              │
│  └── Footer                                                 │
├─────────────────────────────────────────────────────────────┤
│  app.js (382 lines)                                         │
│  ├── Hash-based Router (#/route)                            │
│  ├── Page Loader (fetch HTML partials)                      │
│  ├── Modal System (PDF + Content)                           │
│  ├── Theme System (localStorage)                            │
│  ├── Mobile Navigation                                      │
│  └── Scroll/Animation Management                            │
├─────────────────────────────────────────────────────────────┤
│  styles.css (1104 lines)                                    │
│  ├── CSS Custom Properties (theming)                        │
│  ├── Component Styles                                       │
│  └── Responsive Breakpoints                                 │
├─────────────────────────────────────────────────────────────┤
│  /pages/ (HTML Partials)                                    │
│  ├── home.html                                              │
│  ├── about.html (15 department modals)                      │
│  ├── doctors.html (15 doctor cards)                         │
│  ├── services.html (service packages)                       │
│  └── 404.html                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Static Hosting                          │
│         (Any web server - no backend required)              │
└─────────────────────────────────────────────────────────────┘
```

---

## Target Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              Client Browser                               │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                        Application Shell                           │  │
│  │  index.html + app.js + styles.css                                  │  │
│  │  • Router (enhanced with history API option)                       │  │
│  │  • Theme System                                                    │  │
│  │  • Modal System                                                    │  │
│  │  • Search Component                                                │  │
│  │  • Loading States                                                  │  │
│  │  • Error Handling                                                  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                     │                                    │
│                                     ▼                                    │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                        Content Modules                             │  │
│  │  /pages/          HTML Partials (routed content)                   │  │
│  │  /components/     Reusable HTML snippets                           │  │
│  │  /data/           JSON data files                                  │  │
│  │  /content/        Markdown articles (optional)                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                     │                                    │
│                                     ▼                                    │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                        Service Worker                              │  │
│  │  sw.js                                                             │  │
│  │  • Offline caching                                                 │  │
│  │  • Background sync (form submissions)                              │  │
│  │  • Push notifications (future)                                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────────┐
│    Static Hosting     │ │   Edge Functions  │ │   External Services   │
│   (Netlify/Vercel)    │ │   (Serverless)    │ │                       │
├───────────────────────┤ ├───────────────────┤ ├───────────────────────┤
│ • HTML/CSS/JS         │ │ • Form handling   │ │ • Email (SendGrid)    │
│ • Images/assets       │ │ • Search API      │ │ • Analytics (Plausible)│
│ • PDF documents       │ │ • Contact form    │ │ • Maps (Google)       │
│ • PWA manifest        │ │ • Newsletter      │ │ • Video (YouTube)     │
│ • JSON data files     │ │ • Feedback        │ │ • CDN (Cloudflare)    │
└───────────────────────┘ └───────────────────┘ └───────────────────────┘
```

---

## Frontend Architecture

### Directory Structure (Target)

```
/oncologykr_v2/
├── index.html                 # Application shell
├── app.js                     # Core application logic
├── styles.css                 # Main stylesheet
├── sw.js                      # Service worker (new)
├── manifest.webmanifest       # PWA manifest
│
├── /pages/                    # Routed page partials
│   ├── home.html
│   ├── about.html
│   ├── doctors.html
│   ├── services.html
│   ├── education/             # Education section (new)
│   │   ├── index.html
│   │   └── [articles].html
│   ├── faq.html               # FAQ page (new)
│   ├── news/                  # News section (new)
│   │   ├── index.html
│   │   └── [articles].html
│   ├── contact.html           # Contact page (new)
│   ├── search.html            # Search results (new)
│   └── 404.html
│
├── /components/               # Reusable HTML components (new)
│   ├── search-bar.html
│   ├── breadcrumbs.html
│   ├── doctor-card.html
│   ├── article-card.html
│   └── loading-skeleton.html
│
├── /data/                     # JSON data files (new)
│   ├── doctors.json
│   ├── departments.json
│   ├── services.json
│   ├── faq.json
│   ├── glossary.json
│   └── search-index.json
│
├── /js/                       # JavaScript modules (new)
│   ├── router.js              # Enhanced router
│   ├── search.js              # Search functionality
│   ├── forms.js               # Form handling
│   ├── analytics.js           # Analytics wrapper
│   └── utils.js               # Utility functions
│
├── /css/                      # CSS modules (optional)
│   └── print.css              # Print styles
│
├── /images/
│   ├── /doctors/              # Doctor photos (new)
│   ├── /departments/          # Department images (new)
│   └── /content/              # Article images (new)
│
├── /icons/                    # PWA and UI icons
├── /res/                      # PDF documents
│
├── /docs/                     # Project documentation
│   ├── STRATEGY.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   └── ...
│
├── /functions/                # Serverless functions (if needed)
│   ├── contact-form.js
│   └── newsletter-signup.js
│
├── CLAUDE.md                  # AI development guidelines
├── README.md                  # Project readme
├── robots.txt                 # Search engine directives (new)
├── sitemap.xml                # XML sitemap (new)
└── .gitignore
```

### JavaScript Module Structure

```javascript
// app.js - Main entry point (enhanced)

// Module imports (ES6 modules for modern browsers)
import { Router } from './js/router.js';
import { Search } from './js/search.js';
import { Forms } from './js/forms.js';
import { Analytics } from './js/analytics.js';

// Application initialization
const app = {
  router: null,
  search: null,

  async init() {
    // Initialize core systems
    this.initTheme();
    this.initRouter();
    this.initSearch();
    this.initMobileNav();
    this.initModals();
    this.initServiceWorker();

    // Start application
    this.router.start();
  },

  // ... existing functionality
};

document.addEventListener('DOMContentLoaded', () => app.init());
```

### CSS Architecture

```css
/* styles.css structure */

/* ==========================================================================
   1. Custom Properties (Design Tokens)
   ========================================================================== */
:root {
  /* Colors - Light theme */
  --color-bg: #ffffff;
  --color-surface: #f6f8fb;
  /* ... */
}

[data-theme='dark'] {
  /* Colors - Dark theme */
  --color-bg: #0b1220;
  /* ... */
}

/* ==========================================================================
   2. Reset & Base Styles
   ========================================================================== */

/* ==========================================================================
   3. Layout Components
   - Header
   - Footer
   - Navigation
   - Content containers
   ========================================================================== */

/* ==========================================================================
   4. UI Components
   - Buttons
   - Cards
   - Modals
   - Forms
   - Alerts
   ========================================================================== */

/* ==========================================================================
   5. Page-Specific Styles
   - Home
   - About
   - Doctors
   - Services
   - Education (new)
   - FAQ (new)
   ========================================================================== */

/* ==========================================================================
   6. Utility Classes
   - Spacing
   - Typography
   - Visibility
   - Animations
   ========================================================================== */

/* ==========================================================================
   7. Print Styles
   ========================================================================== */
@media print {
  /* ... */
}
```

---

## Backend Architecture

### Option 1: Serverless Functions (Recommended)

**Use Case:** Form handling, email sending, simple API endpoints

**Platform:** Netlify Functions or Vercel Serverless Functions

```
/functions/
├── contact-form.js          # Handle contact form submissions
├── appointment-request.js   # Handle appointment requests
├── newsletter-signup.js     # Handle newsletter subscriptions
└── feedback.js              # Handle user feedback
```

**Example: Contact Form Handler**

```javascript
// functions/contact-form.js
const sendgrid = require('@sendgrid/mail');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    // Validation
    if (!data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Honeypot check
    if (data.website) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    // Send email
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    await sendgrid.send({
      to: 'contact@oncologykr.com',
      from: 'noreply@oncologykr.com',
      subject: `Website Contact: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Message:
${data.message}
            `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' }),
    };
  }
};
```

### Option 2: Third-Party Form Services

**Use Case:** Simple form handling without custom code

| Service       | Free Tier             | Features               |
| ------------- | --------------------- | ---------------------- |
| Netlify Forms | 100 submissions/month | Built-in, spam filter  |
| Formspree     | 50 submissions/month  | Email notifications    |
| Basin         | 100 submissions/month | Webhooks, integrations |

### Option 3: Full Backend (Future Consideration)

**Use Case:** Complex data requirements, user accounts, real-time features

**Not recommended initially** - wait until Phase 2/3 requirements are clear.

---

## Database Design

### Phase 1: JSON Files (Recommended)

Static JSON files stored in `/data/` directory.

```json
// data/doctors.json
{
  "lastUpdated": "2026-01-15",
  "doctors": [
    {
      "id": "kovalenko-petro",
      "name": "Коваленко Петро Іванович",
      "title": "Лікар онколог вищої категорії",
      "department": "oncology",
      "specialties": ["breast-cancer", "lung-cancer"],
      "experience": 15,
      "education": ["Дніпропетровська медична академія, 2008"],
      "languages": ["uk", "ru", "en"],
      "photo": "/images/doctors/kovalenko-petro.webp",
      "contact": {
        "email": "kovalenko@oncologykr.com",
        "phone": "+380 XX XXX XXXX"
      }
    }
    // ... more doctors
  ]
}
```

```json
// data/faq.json
{
  "lastUpdated": "2026-01-15",
  "categories": [
    {
      "id": "first-visit",
      "name": "Перший візит",
      "questions": [
        {
          "id": "what-to-bring",
          "question": "Що потрібно взяти на перший прийом?",
          "answer": "На перший прийом візьміть...",
          "relatedPages": ["#/services", "#/contact"]
        }
      ]
    }
  ]
}
```

### Phase 2+: Serverless Database (If Needed)

| Option          | Pros                    | Cons                |
| --------------- | ----------------------- | ------------------- |
| **Firebase**    | Free tier, real-time    | Google lock-in      |
| **Supabase**    | PostgreSQL, open-source | Self-hosting option |
| **PlanetScale** | MySQL, serverless       | Limited free tier   |
| **FaunaDB**     | Serverless, GraphQL     | Learning curve      |

**Recommended:** Supabase for its PostgreSQL foundation and generous free tier.

### Data Schema (Future)

```sql
-- Users (if accounts implemented)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    preferences JSONB
);

-- Form Submissions
CREATE TABLE submissions (
    id UUID PRIMARY KEY,
    type VARCHAR(50),
    data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- Appointments
CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    patient_name VARCHAR(255),
    patient_email VARCHAR(255),
    patient_phone VARCHAR(50),
    doctor_id VARCHAR(100),
    preferred_date DATE,
    preferred_time TIME,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Structure

### Internal API Endpoints (Serverless)

```
POST /api/contact
POST /api/appointment
POST /api/newsletter
POST /api/feedback
GET  /api/search?q={query}
```

### API Response Format

```json
// Success response
{
    "success": true,
    "data": { ... }
}

// Error response
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Email is required"
    }
}
```

### Rate Limiting

| Endpoint     | Limit                     |
| ------------ | ------------------------- |
| Contact form | 5 requests/minute per IP  |
| Appointment  | 3 requests/hour per IP    |
| Search       | 30 requests/minute per IP |

---

## Third-Party Integrations

### Required Integrations

| Service           | Purpose            | Integration Method |
| ----------------- | ------------------ | ------------------ |
| **Google Maps**   | Location display   | Embed iframe       |
| **Email Service** | Send notifications | SendGrid API       |
| **Analytics**     | Usage tracking     | Script tag         |

### Optional Integrations

| Service         | Purpose             | Phase   |
| --------------- | ------------------- | ------- |
| **YouTube**     | Video content       | Phase 2 |
| **Calendar**    | Appointment booking | Phase 2 |
| **Newsletter**  | Email campaigns     | Phase 2 |
| **Chat Widget** | Live support        | Phase 3 |

### Integration Guidelines

1. **Lazy load** all third-party scripts
2. **Fallback** gracefully if service unavailable
3. **Privacy** - disclose all third-party data sharing
4. **Performance** - defer non-critical integrations

---

## Deployment Strategy

### Recommended: Netlify

**Benefits:**

- Free tier generous for this project
- Built-in forms, functions, redirects
- Automatic HTTPS
- Global CDN
- Git-based deployment
- Preview deployments for PRs

**Configuration:**

```toml
# netlify.toml
[build]
  publish = "."

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://www.google.com https://www.youtube.com;"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}
```

### Alternative: Vercel

**Benefits:**

- Excellent serverless functions
- Fast deployments
- Good developer experience

### Deployment Workflow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Develop    │───►│  Git Push    │───►│   Deploy     │
│   Locally    │    │  to main     │    │   Auto       │
└──────────────┘    └──────────────┘    └──────────────┘
        │                                       │
        ▼                                       ▼
┌──────────────┐                       ┌──────────────┐
│   Feature    │                       │  Production  │
│   Branch     │                       │  Site Live   │
└──────────────┘                       └──────────────┘
        │
        ▼
┌──────────────┐
│   Preview    │
│   Deploy     │
└──────────────┘
```

### Environment Variables

```bash
# .env (local development)
SENDGRID_API_KEY=SG.xxxxx
ANALYTICS_ID=xxxxx
SITE_URL=http://localhost:8000

# Netlify environment variables (production)
SENDGRID_API_KEY=SG.xxxxx
ANALYTICS_ID=xxxxx
SITE_URL=https://oncologykr.com
```

---

## Scalability Considerations

### Current Capacity

Static site hosting handles virtually unlimited traffic for read operations.

### Growth Scenarios

| Scenario                   | Solution                   |
| -------------------------- | -------------------------- |
| **10x traffic**            | CDN already handles        |
| **Heavy form submissions** | Scale serverless functions |
| **User accounts**          | Add authentication service |
| **Real-time features**     | Add WebSocket service      |
| **Large media files**      | External media hosting     |

### Performance Optimization Path

1. **Image CDN** - Cloudflare or Imgix for responsive images
2. **Edge caching** - Cache API responses at edge
3. **Code splitting** - Lazy load JavaScript modules
4. **Preloading** - Prefetch likely next pages

---

## Security Measures

### Headers Configuration

```
Content-Security-Policy:
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://plausible.io;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    frame-src https://www.google.com https://www.youtube.com;
    connect-src 'self' https://plausible.io;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';

X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Form Security

1. **Honeypot fields** - Hidden fields to catch bots
2. **Rate limiting** - Prevent abuse
3. **Input validation** - Server-side validation
4. **CSRF protection** - Token validation
5. **Sanitization** - Clean user input

### Data Protection

1. **Minimal collection** - Only collect necessary data
2. **Encryption** - HTTPS everywhere
3. **No tracking** - Privacy-respecting analytics
4. **Clear policy** - Transparent privacy policy
5. **GDPR compliance** - Consent for data collection

### Sensitive Data Handling

```
DO NOT store:
- Passwords (if user accounts, use auth service)
- Medical records
- Financial information
- Full government IDs

DO store (with consent):
- Contact information
- Appointment preferences
- Newsletter subscriptions
- Anonymous analytics
```

---

## Monitoring & Observability

### Uptime Monitoring

| Tool            | Cost               | Features            |
| --------------- | ------------------ | ------------------- |
| **UptimeRobot** | Free (50 monitors) | Alerts, status page |
| **Pingdom**     | Paid               | Detailed metrics    |
| **Netlify**     | Included           | Basic uptime        |

### Performance Monitoring

1. **Lighthouse CI** - Automated performance testing
2. **Web Vitals** - Core Web Vitals tracking
3. **Real User Monitoring** - Via analytics

### Error Tracking

| Tool          | Free Tier         | Use Case          |
| ------------- | ----------------- | ----------------- |
| **Sentry**    | 5k events/month   | JavaScript errors |
| **LogRocket** | 1k sessions/month | Session replay    |

### Health Checks

```javascript
// Simple health endpoint
// functions/health.js
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.4.0',
  }),
});
```

---

## Disaster Recovery

### Backup Strategy

1. **Code** - Git repository (GitHub/GitLab)
2. **Content** - JSON files in Git
3. **Documents** - PDF copies in Git
4. **Form data** - Export to email/spreadsheet

### Recovery Procedures

| Scenario               | Recovery                     |
| ---------------------- | ---------------------------- |
| **Site down**          | Netlify auto-failover to CDN |
| **DNS issues**         | Multiple DNS providers       |
| **Content corruption** | Git rollback                 |
| **Service outage**     | Graceful degradation         |

### Failover Plan

```
Primary: Netlify CDN
    │
    ▼ (if down)
Secondary: GitHub Pages (static only)
    │
    ▼ (if down)
Emergency: Local backup deployment
```

---

## Development Environment

### Local Setup

```bash
# Clone repository
git clone https://github.com/org/oncologykr_v2.git
cd oncologykr_v2

# Start local server
python -m http.server 8000
# OR
npx http-server

# Open browser
open http://localhost:8000
```

### IDE Configuration

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "css.validate": false,
  "editor.tabSize": 2,
  "files.associations": {
    "*.html": "html"
  }
}
```

### Recommended Extensions

- **Live Server** - Auto-reload on save
- **Prettier** - Code formatting
- **ESLint** - JavaScript linting
- **axe Accessibility Linter** - Accessibility checks

---

## Technical Debt Management

### Current Technical Debt

| Issue                            | Priority | Resolution             |
| -------------------------------- | -------- | ---------------------- |
| Long services.html (1533 lines)  | Medium   | Split into components  |
| Mobile menu max-height animation | Low      | Use CSS Grid animation |
| No loading states                | High     | Add skeleton screens   |
| Favicon caching issues           | Low      | Add version parameter  |

### Code Quality Standards

1. **No file > 500 lines** - Split large files
2. **Functions < 50 lines** - Extract helpers
3. **Comments for why, not what** - Self-documenting code
4. **Consistent naming** - camelCase for JS, kebab-case for CSS
5. **No magic numbers** - Use constants

---

## Migration Path

### From Current to Target Architecture

**Phase 1: Non-Breaking Additions**

- Add `/data/` JSON files
- Add `/js/` modules (optional loading)
- Add service worker
- Add new pages

**Phase 2: Refactoring**

- Extract doctor data to JSON
- Extract department data to JSON
- Modularize app.js
- Add serverless functions

**Phase 3: Enhancement**

- Add database (if needed)
- Add user accounts (if needed)
- Add real-time features (if needed)

---

## Technology Decisions

### Decisions Made

| Decision      | Choice      | Rationale                       |
| ------------- | ----------- | ------------------------------- |
| **Framework** | Vanilla JS  | Zero dependencies, full control |
| **Styling**   | Vanilla CSS | No build step, CSS custom props |
| **Routing**   | Hash-based  | Works on any static host        |
| **Hosting**   | Netlify     | Free tier, functions, forms     |
| **Analytics** | Plausible   | Privacy-first, GDPR compliant   |

### Decisions Deferred

| Decision     | Options                | When to Decide                   |
| ------------ | ---------------------- | -------------------------------- |
| **Database** | Supabase vs Firebase   | Phase 2, based on needs          |
| **Auth**     | Auth0 vs Firebase Auth | Phase 3, if accounts needed      |
| **CMS**      | Headless vs static     | Phase 2, based on content volume |

---

_Document Version: 1.0_
_Last Updated: January 2026_
_Owner: Development Team_
_Review Cycle: Quarterly_
