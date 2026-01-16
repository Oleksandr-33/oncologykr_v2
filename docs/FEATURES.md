# FEATURES.md - Prioritized Feature List

## Overview

This document provides a comprehensive, prioritized list of features for oncologykr. Features are categorized by priority level and include detailed specifications for implementation.

---

## Priority Definitions

| Priority | Label | Definition |
|----------|-------|------------|
| **P0** | Critical | Essential for launch; site is incomplete without these |
| **P1** | Important | High value features that significantly improve user experience |
| **P2** | Nice-to-Have | Valuable enhancements for future iterations |
| **P3** | Future | Long-term roadmap items |

---

## P0 - Critical Features (Must-Have for Launch)

### F001: Site-Wide Search

**Description:**
Full-text search functionality allowing users to find content across all pages, including services, departments, doctors, and educational articles.

**User Value:**
- Quickly find relevant information
- Reduce navigation time
- Improve accessibility for users who prefer search over browse

**Technical Specification:**
```javascript
// Search component
- Input field in header with search icon
- Keyboard shortcut: Ctrl+K / Cmd+K
- Search overlay with instant results
- Results grouped by type (pages, doctors, services)
- Highlighted matching text
- "No results" state with suggestions
```

**Implementation Details:**
- Pre-built JSON search index
- Client-side search using fuzzy matching
- Ukrainian language support (stemming)
- Index includes: page titles, headings, content excerpts

**Dependencies:** None

**Effort:** Medium (2-3 days)

**Acceptance Criteria:**
- [ ] Search finds content within 200ms
- [ ] Results are accurate and relevant
- [ ] Works on mobile and desktop
- [ ] Keyboard navigation supported
- [ ] Accessible with screen readers

---

### F002: Contact Form

**Description:**
Native contact form replacing the QR code Google Form link, allowing users to send inquiries directly from the website.

**User Value:**
- Direct communication without leaving site
- Immediate feedback on submission
- Better user experience than external forms

**Technical Specification:**
```html
<!-- Form fields -->
- Full name (required)
- Email (required)
- Phone (optional)
- Subject dropdown:
  - General inquiry
  - Appointment request
  - Medical records
  - Billing question
  - Feedback
  - Other
- Message (required)
- Consent checkbox (required)
```

**Implementation Details:**
- Client-side validation
- Honeypot spam protection
- Rate limiting (5 submissions/minute)
- Email notification via SendGrid
- Confirmation message with tracking number

**Dependencies:** Email service (SendGrid account)

**Effort:** Medium (2-3 days)

**Acceptance Criteria:**
- [ ] Form validates all required fields
- [ ] Spam protection blocks bots
- [ ] User receives confirmation
- [ ] Staff receives notification email
- [ ] Works offline (queued submission)

---

### F003: SEO Optimization

**Description:**
Comprehensive search engine optimization to improve discoverability and search rankings.

**User Value:**
- Patients can find the site via Google search
- Proper social media previews when shared
- Improved visibility in local search results

**Technical Specification:**
```html
<!-- Per-page meta tags -->
<title>{Page Title} | Криворізький онкологічний диспансер</title>
<meta name="description" content="{Page-specific description}">
<link rel="canonical" href="https://oncologykr.ua/#/{page}">

<!-- Open Graph -->
<meta property="og:title" content="{Title}">
<meta property="og:description" content="{Description}">
<meta property="og:image" content="https://oncologykr.ua/images/og-image.jpg">
<meta property="og:url" content="https://oncologykr.ua/#/{page}">
<meta property="og:type" content="website">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{Title}">
<meta name="twitter:description" content="{Description}">

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "КНТ «Криворізький онкологічний диспансер»",
  "url": "https://oncologykr.ua",
  "telephone": "+380...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Кривий Ріг",
    "addressRegion": "Дніпропетровська область",
    "postalCode": "...",
    "addressCountry": "UA"
  }
}
</script>
```

**Implementation Details:**
- Dynamic meta tags based on route
- Generate sitemap.xml
- Create robots.txt
- Add JSON-LD for Organization, MedicalOrganization, LocalBusiness

**Dependencies:** None

**Effort:** Medium (2 days)

**Acceptance Criteria:**
- [ ] Each page has unique title and description
- [ ] Google Search Console shows no errors
- [ ] Social shares display correctly
- [ ] Structured data validates in testing tool

---

### F004: Service Worker & Offline Support

**Description:**
Progressive Web App service worker enabling offline access to core content and better performance.

**User Value:**
- Access information without internet connection
- Faster page loads on repeat visits
- App-like experience on mobile

**Technical Specification:**
```javascript
// Cache strategies
const CACHE_NAME = 'oncologykr-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/manifest.webmanifest',
  '/pages/home.html',
  '/pages/about.html',
  '/pages/services.html',
  '/pages/doctors.html',
  '/pages/404.html',
  '/images/onko_kr.webp',
  // icons, favicons
];

// Strategies:
// - Cache-first for static assets
// - Network-first for HTML pages
// - Stale-while-revalidate for images
```

**Implementation Details:**
- Register service worker in app.js
- Implement cache versioning
- Add update notification
- Handle offline form submissions (queue)
- Show offline indicator when disconnected

**Dependencies:** None

**Effort:** Medium (2-3 days)

**Acceptance Criteria:**
- [ ] Core pages work offline
- [ ] Cache updates on new version
- [ ] Offline indicator shows when disconnected
- [ ] Form submissions queue and send when online

---

### F005: Loading States

**Description:**
Visual feedback during page transitions and content loading to improve perceived performance.

**User Value:**
- Clear indication that page is loading
- Reduced user frustration
- Professional user experience

**Technical Specification:**
```html
<!-- Skeleton loader -->
<div class="skeleton-loader">
  <div class="skeleton-header"></div>
  <div class="skeleton-paragraph"></div>
  <div class="skeleton-paragraph short"></div>
</div>

<!-- Loading indicator -->
<div class="loading-bar" aria-hidden="true">
  <div class="loading-bar__progress"></div>
</div>
```

**Implementation Details:**
- Thin progress bar at top of page
- Skeleton screens for content areas
- Minimum display time (300ms) to prevent flash
- Error state with retry button

**Dependencies:** None

**Effort:** Low (1 day)

**Acceptance Criteria:**
- [ ] Loading indicator visible during navigation
- [ ] No blank screens during page load
- [ ] Error state displays on network failure
- [ ] Retry button recovers from errors

---

### F006: Analytics Integration

**Description:**
Privacy-respecting analytics to understand user behavior and improve the site.

**User Value:**
- Site improvements based on usage data
- Identify popular content
- Detect and fix issues

**Technical Specification:**
```javascript
// Events to track
- Page views (route changes)
- Search queries
- Form submissions
- Outbound link clicks
- Document downloads
- Modal opens
- Theme changes
- Scroll depth
```

**Implementation Details:**
- Plausible Analytics (recommended) or Google Analytics 4
- Cookie-less tracking preferred
- IP anonymization if using GA4
- Custom events for key actions
- No personal data collection

**Dependencies:** Analytics service account

**Effort:** Low (1 day)

**Acceptance Criteria:**
- [ ] Page views tracked accurately
- [ ] Custom events firing correctly
- [ ] No cookies required (if Plausible)
- [ ] Dashboard accessible to staff

---

### F007: Patient Education Section (Basic)

**Description:**
Foundation patient education content with articles explaining cancer basics, treatment options, and what to expect.

**User Value:**
- Understand diagnosis and treatment
- Prepare for medical appointments
- Reduce anxiety through information

**Technical Specification:**
```
/pages/education/
├── index.html          # Category listing
├── understanding-cancer.html
├── diagnosis-process.html
├── treatment-overview.html
├── chemotherapy-guide.html
├── radiation-guide.html
├── surgery-preparation.html
├── managing-side-effects.html
├── nutrition-guide.html
├── emotional-support.html
└── financial-resources.html
```

**Article Template:**
- Title with reading time
- Last updated date
- Breadcrumb navigation
- Content with headings
- Related articles
- Medical reviewer attribution
- Print-friendly version

**Implementation Details:**
- New route: `#/education` and `#/education/{article}`
- Category filtering
- Search integration
- Article metadata in JSON

**Dependencies:** Medical content review

**Effort:** High (5-7 days for 10 articles)

**Acceptance Criteria:**
- [ ] 10 articles published
- [ ] All content medically reviewed
- [ ] Readable at 8th grade level
- [ ] Mobile-friendly layout
- [ ] Print styles work

---

### F008: Enhanced Doctor Directory

**Description:**
Expanded doctor profiles with photos, detailed credentials, specialties, and contact information.

**User Value:**
- Find the right specialist
- Build trust through credentials
- Direct contact information

**Technical Specification:**
```json
// data/doctors.json
{
  "id": "doctor-id",
  "name": "Прізвище Ім'я По батькові",
  "title": "Посада",
  "photo": "/images/doctors/doctor-id.webp",
  "department": "department-id",
  "specialties": ["breast-cancer", "lung-cancer"],
  "subspecialties": ["reconstructive-surgery"],
  "experience_years": 15,
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree",
      "year": 2008
    }
  ],
  "certifications": ["Certification 1"],
  "languages": ["uk", "ru", "en"],
  "bio": "Brief professional biography...",
  "contact": {
    "email": "email@oncologykr.ua",
    "phone": "+380..."
  }
}
```

**Features:**
- Grid/list view toggle
- Filter by department
- Filter by specialty
- Search by name
- Individual profile pages
- Contact buttons

**Dependencies:** Doctor photos and bios from staff

**Effort:** Medium (3-4 days)

**Acceptance Criteria:**
- [ ] All doctors have profiles
- [ ] Filtering works correctly
- [ ] Search finds doctors by name
- [ ] Mobile-friendly display
- [ ] Photos optimized (WebP)

---

### F009: FAQ Section

**Description:**
Comprehensive frequently asked questions organized by category with search functionality.

**User Value:**
- Quick answers to common questions
- Reduce need to call for information
- Self-service information access

**Technical Specification:**
```json
// data/faq.json
{
  "categories": [
    {
      "id": "first-visit",
      "name": "Перший візит",
      "icon": "calendar",
      "questions": [
        {
          "id": "what-to-bring",
          "question": "Що потрібно взяти на перший прийом?",
          "answer": "На перший прийом вам потрібно взяти:\n- Паспорт...",
          "tags": ["documents", "preparation"],
          "relatedLinks": ["/services", "/contact"]
        }
      ]
    }
  ]
}
```

**Categories:**
- First Visit
- Appointments
- Services & Procedures
- Insurance & NSZU
- Treatment Questions
- Results & Records
- Visitor Information
- Parking & Directions

**Implementation Details:**
- Accordion-style Q&A
- Search within FAQ
- Category tabs/filters
- FAQ schema for SEO
- Link to related pages

**Dependencies:** Staff input on common questions

**Effort:** Medium (2-3 days)

**Acceptance Criteria:**
- [ ] 50+ questions answered
- [ ] Search finds relevant questions
- [ ] Category filtering works
- [ ] Mobile-friendly accordions
- [ ] FAQ schema validates

---

### F010: Accessibility Compliance

**Description:**
Ensure full WCAG 2.1 AA compliance across all features.

**User Value:**
- Usable by people with disabilities
- Legal compliance
- Better experience for all users

**Technical Specification:**
```
Accessibility Requirements:
- Color contrast ratio ≥ 4.5:1 (normal text)
- Color contrast ratio ≥ 3:1 (large text)
- Focus visible on all interactive elements
- Skip links for keyboard navigation
- Proper heading hierarchy (h1 > h2 > h3)
- Alt text for all images
- Form labels and error messages
- ARIA labels for interactive components
- Screen reader testing (NVDA, VoiceOver)
- Keyboard navigation for all features
```

**Implementation Details:**
- Automated testing (axe, WAVE)
- Manual keyboard testing
- Screen reader testing
- Create accessibility statement page
- Document remediation of issues

**Dependencies:** None

**Effort:** Medium (2-3 days)

**Acceptance Criteria:**
- [ ] Zero critical accessibility issues
- [ ] All pages keyboard navigable
- [ ] Screen reader announces correctly
- [ ] Color contrast passes
- [ ] Accessibility statement published

---

## P1 - Important Features (Should-Have)

### F011: Appointment Request System

**Description:**
Online form for requesting appointments with preferred dates, doctors, and reasons for visit.

**User Value:**
- Request appointments 24/7
- Choose preferred doctor/time
- Reduce phone wait times

**Technical Specification:**
```
Multi-step form:
Step 1: Patient Information
  - Full name
  - Date of birth
  - Phone number
  - Email

Step 2: Appointment Details
  - Department/Service
  - Preferred doctor (optional)
  - Reason for visit
  - New or returning patient

Step 3: Scheduling
  - Preferred dates (date picker, 3 options)
  - Preferred time of day
  - Special requirements

Step 4: Confirmation
  - Review details
  - Insurance information
  - Consent checkbox
  - Submit
```

**Dependencies:** F002 (Contact Form), Staff workflow

**Effort:** High (4-5 days)

**Acceptance Criteria:**
- [ ] Multi-step form works smoothly
- [ ] Validation on each step
- [ ] Confirmation email sent
- [ ] Staff notification received
- [ ] Mobile-friendly date picker

---

### F012: Document Library

**Description:**
Downloadable forms, information sheets, and resources for patients.

**User Value:**
- Access forms before visit
- Print information at home
- Prepare for appointments

**Documents to Include:**
- New patient registration form
- Medical history questionnaire
- Insurance authorization form
- NSZU information sheet
- Department brochures
- Preparation guides (pre-surgery, etc.)
- Contact information card

**Technical Specification:**
```
- Document categories with icons
- Search and filter
- Download count tracking
- PDF viewer integration
- File size display
- Last updated date
```

**Dependencies:** Documents from staff

**Effort:** Medium (2-3 days)

**Acceptance Criteria:**
- [ ] 20+ documents available
- [ ] Search finds documents
- [ ] Downloads tracked
- [ ] Mobile download works

---

### F013: News & Updates Section

**Description:**
Hospital news, announcements, and updates for patients and community.

**User Value:**
- Stay informed about hospital
- Learn about new services
- Health awareness information

**Technical Specification:**
```json
// data/news.json
{
  "articles": [
    {
      "id": "article-slug",
      "title": "Article Title",
      "excerpt": "Brief summary...",
      "content": "Full article content...",
      "date": "2026-01-15",
      "category": "announcement",
      "image": "/images/news/article-slug.webp",
      "author": "Hospital Administration"
    }
  ]
}
```

**Features:**
- Article listing with previews
- Category filtering
- Date-based archive
- Share buttons
- RSS feed
- "Latest News" widget on homepage

**Dependencies:** Content workflow

**Effort:** Medium (3 days)

**Acceptance Criteria:**
- [ ] Articles display correctly
- [ ] Filtering works
- [ ] RSS feed validates
- [ ] Share buttons work
- [ ] Mobile layout good

---

### F014: Newsletter Subscription

**Description:**
Email subscription for hospital updates and health information.

**User Value:**
- Receive updates automatically
- Health tips and information
- Important announcements

**Technical Specification:**
```
- Subscription form (email + name optional)
- Double opt-in confirmation
- Preference center
- Unsubscribe mechanism
- GDPR-compliant consent
```

**Integration Options:**
- Mailchimp
- SendGrid
- Custom implementation

**Dependencies:** Email service account

**Effort:** Medium (2-3 days)

**Acceptance Criteria:**
- [ ] Subscription form works
- [ ] Double opt-in email sent
- [ ] Unsubscribe works
- [ ] GDPR compliant

---

### F015: Feedback System

**Description:**
In-site feedback collection for continuous improvement.

**User Value:**
- Voice opinions and suggestions
- Report issues
- Contribute to improvements

**Technical Specification:**
```
Feedback widget:
- Floating button (corner of screen)
- Modal form:
  - Feedback type (suggestion, issue, praise, other)
  - Page reference (auto-filled)
  - Message
  - Optional email for follow-up
  - Rating (1-5 stars)
```

**Dependencies:** None

**Effort:** Low (1-2 days)

**Acceptance Criteria:**
- [ ] Widget accessible on all pages
- [ ] Form submits correctly
- [ ] Staff receives notifications
- [ ] Anonymous submission option

---

### F016: Breadcrumb Navigation

**Description:**
Show user location within site hierarchy for easier navigation.

**User Value:**
- Understand site structure
- Navigate to parent sections
- Reduce disorientation

**Technical Specification:**
```
Route mapping:
/ → Home
/about → Home > About Us
/doctors → Home > Our Doctors
/services → Home > Services
/education → Home > Patient Education
/education/chemotherapy → Home > Patient Education > Chemotherapy Guide
```

**Implementation:**
- Generate from route structure
- Schema.org BreadcrumbList markup
- Responsive (truncate on mobile)
- Clickable links

**Dependencies:** None

**Effort:** Low (1 day)

**Acceptance Criteria:**
- [ ] Breadcrumbs accurate for all pages
- [ ] Links work correctly
- [ ] Schema validates
- [ ] Mobile-friendly

---

### F017: Print Styles

**Description:**
Optimized print stylesheets for key content pages.

**User Value:**
- Print service information
- Print doctor directory
- Print educational articles

**Technical Specification:**
```css
@media print {
  /* Hide non-essential elements */
  header, footer, nav, .mobile-nav,
  .theme-toggle, .search-bar,
  .no-print { display: none; }

  /* Optimize layout */
  body { font-size: 12pt; }
  a[href]::after { content: " (" attr(href) ")"; }

  /* Page breaks */
  h2, h3 { page-break-after: avoid; }
  .card { page-break-inside: avoid; }
}
```

**Dependencies:** None

**Effort:** Low (1 day)

**Acceptance Criteria:**
- [ ] Pages print cleanly
- [ ] Links show URLs
- [ ] Page breaks sensible
- [ ] No cut-off content

---

### F018: Treatment Journey Guides

**Description:**
Step-by-step guides for common cancer treatment paths.

**User Value:**
- Understand treatment timeline
- Know what to expect
- Reduce anxiety

**Guides to Create:**
- Breast cancer journey
- Lung cancer journey
- Colorectal cancer journey
- Prostate cancer journey
- General surgery journey

**Technical Specification:**
```
Each guide includes:
- Overview and timeline
- Diagnosis phase
- Treatment planning
- Treatment (surgery/chemo/radiation)
- Recovery
- Follow-up care
- Support resources
```

**Dependencies:** Medical content, F007

**Effort:** High (5-7 days for 5 guides)

**Acceptance Criteria:**
- [ ] 5 guides complete
- [ ] Medically accurate
- [ ] Timeline visualization
- [ ] Mobile-friendly
- [ ] Print-friendly

---

### F019: Glossary of Terms

**Description:**
Medical terminology dictionary with plain-language definitions.

**User Value:**
- Understand medical terms
- Reference during appointments
- Reduce confusion

**Technical Specification:**
```json
// data/glossary.json
{
  "terms": [
    {
      "term": "Біопсія",
      "definition": "Процедура взяття зразка тканини для лабораторного дослідження.",
      "related": ["pathology", "diagnosis"],
      "pronunciation": "bee-op-see-ya"
    }
  ]
}
```

**Features:**
- Alphabetical navigation
- Search within glossary
- Auto-linking in articles
- Tooltip definitions on hover

**Dependencies:** Medical translation

**Effort:** Medium (2-3 days + content)

**Acceptance Criteria:**
- [ ] 100+ terms defined
- [ ] Search works
- [ ] A-Z navigation works
- [ ] Terms link from articles

---

### F020: Video Content Integration

**Description:**
Educational video library with facility tours and procedure explanations.

**User Value:**
- Visual learning
- Facility familiarity
- Procedure understanding

**Video Types:**
- Facility virtual tour
- Department introductions
- Treatment explanations
- Patient testimonials (with consent)
- Staff introductions

**Technical Specification:**
```
- YouTube/Vimeo embed or self-hosted
- Lazy loading for performance
- Transcript for accessibility
- Closed captions
- Related videos suggestions
```

**Dependencies:** Video production

**Effort:** Medium (2 days for integration, video production separate)

**Acceptance Criteria:**
- [ ] Videos play smoothly
- [ ] Transcripts available
- [ ] Captions work
- [ ] Mobile-friendly player

---

## P2 - Nice-to-Have Features (Future)

### F021: Symptom Information Guide

**Description:**
Searchable guide to common cancer symptoms and when to seek care.

**User Value:**
- Understand symptoms
- Know when to seek help
- Educational resource

**Effort:** Medium

**Phase:** 2

---

### F022: Resource Bookmarking

**Description:**
Save articles and resources to personal reading list (localStorage).

**User Value:**
- Save for later reading
- Build personal resource library
- Track what you've read

**Effort:** Low

**Phase:** 2

---

### F023: Image CDN Integration

**Description:**
Optimize image delivery with responsive images and WebP conversion.

**User Value:**
- Faster page loads
- Better mobile experience
- Reduced data usage

**Effort:** Medium

**Phase:** 2

---

### F024: Social Media Integration

**Description:**
Links to hospital social media accounts and share buttons.

**User Value:**
- Follow hospital updates
- Share useful content
- Community connection

**Effort:** Low

**Phase:** 2

---

### F025: Hospital Hours Display

**Description:**
Display operating hours, holiday closures, and emergency contacts.

**User Value:**
- Know when to visit
- Plan appointments
- Emergency information

**Effort:** Low

**Phase:** 2

---

## P3 - Future Features

### F026: Symptom Checker (Informational)
Interactive questionnaire providing general guidance (with strong disclaimers).

### F027: Cost Estimator
Basic cost information for common procedures and NSZU coverage.

### F028: Patient Accounts (Optional)
User registration for saved preferences and appointment history.

### F029: Telemedicine Preparation
Information and technical requirements for video consultations.

### F030: Multi-language Support
English translation of core content.

### F031: Patient Stories
Curated patient experiences (with consent).

### F032: Support Group Directory
List of cancer support resources and groups.

### F033: Q&A Section
Moderated patient questions with professional answers.

### F034: Appointment Scheduler
Real-time calendar booking (requires hospital system integration).

### F035: Live Chat Support
Real-time chat with hospital staff.

---

## Feature Comparison Matrix

| Feature | User Impact | Tech Complexity | Dependencies | Priority |
|---------|-------------|-----------------|--------------|----------|
| Search | High | Medium | None | P0 |
| Contact Form | High | Medium | Email service | P0 |
| SEO | High | Low | None | P0 |
| Service Worker | Medium | Medium | None | P0 |
| Loading States | Medium | Low | None | P0 |
| Analytics | Medium | Low | Analytics service | P0 |
| Patient Education | High | Medium | Medical review | P0 |
| Doctor Directory | High | Medium | Staff data | P0 |
| FAQ | High | Low | Staff input | P0 |
| Accessibility | High | Medium | None | P0 |
| Appointment Request | High | High | F002, workflow | P1 |
| Document Library | Medium | Low | Documents | P1 |
| News Section | Medium | Medium | Content workflow | P1 |
| Newsletter | Medium | Medium | Email service | P1 |
| Feedback System | Medium | Low | None | P1 |
| Breadcrumbs | Low | Low | None | P1 |
| Print Styles | Low | Low | None | P1 |
| Treatment Guides | High | Medium | Medical content | P1 |
| Glossary | Medium | Low | Medical content | P1 |
| Video Content | Medium | Low | Videos | P1 |

---

## Implementation Order (Recommended)

### Sprint 1 (Foundation)
1. F005: Loading States
2. F003: SEO Optimization
3. F006: Analytics Integration
4. F016: Breadcrumb Navigation

### Sprint 2 (Search & Contact)
5. F001: Site-Wide Search
6. F002: Contact Form
7. F017: Print Styles

### Sprint 3 (Content)
8. F009: FAQ Section
9. F008: Enhanced Doctor Directory
10. F004: Service Worker

### Sprint 4 (Education)
11. F007: Patient Education Section
12. F010: Accessibility Compliance

### Sprint 5 (Engagement)
13. F011: Appointment Request System
14. F015: Feedback System
15. F012: Document Library

### Sprint 6+ (Enhancement)
- Remaining P1 features
- P2 features as capacity allows

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Owner: Development Team*
*Review Cycle: Per sprint*
