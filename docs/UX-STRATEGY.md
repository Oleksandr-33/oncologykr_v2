# UX-STRATEGY.md - User Experience Strategy

## Overview

This document outlines the user experience strategy for oncologykr, focusing on creating an accessible, intuitive, and supportive digital experience for patients, families, and healthcare providers navigating oncology care.

---

## UX Vision

**"A calm, clear, and supportive digital experience that empowers users with the information and tools they need, when they need them, without adding to their stress."**

---

## UX Principles

### 1. Clarity Over Cleverness
Every interface element should be immediately understandable. Avoid jargon, complex interactions, or hidden functionality. When in doubt, be explicit.

### 2. Calm Aesthetics
Cancer patients and families are often anxious. The design should be visually calming, with ample white space, gentle colors, and no visual clutter.

### 3. Accessibility First
Design for the widest possible audience, including users with:
- Visual impairments
- Motor difficulties
- Cognitive challenges
- Low digital literacy
- Slow internet connections

### 4. Mobile Reality
Most users access on mobile phones, often in waiting rooms or at bedside. Every feature must work flawlessly on mobile.

### 5. Progressive Disclosure
Show the most important information first. Allow users to dig deeper only when they want to. Don't overwhelm.

### 6. Forgiveness
Allow easy error recovery. Confirm destructive actions. Provide undo where possible. Never lose user input.

### 7. Trust Through Transparency
Be clear about who created the content, when it was updated, and how to contact real humans for help.

---

## Information Architecture

### Current Site Structure

```
Home
├── About Us (15 departments)
├── Our Doctors (15 ECPO specialists)
├── Services (2 packages)
└── 404
```

### Target Site Structure

```
Home
│
├── About Us
│   ├── Our Mission
│   ├── Leadership Team
│   └── Departments (15)
│       └── [Department Detail]
│
├── Find a Doctor
│   ├── Doctor Directory
│   │   └── [Doctor Profile]
│   └── Find by Specialty
│
├── Services
│   ├── Service Overview
│   ├── Package #3 (Surgical)
│   ├── Package #4 (Inpatient)
│   └── Equipment & Technology
│
├── Patient Education
│   ├── Understanding Cancer
│   ├── Treatment Options
│   │   ├── Chemotherapy
│   │   ├── Radiation Therapy
│   │   └── Surgery
│   ├── Managing Side Effects
│   ├── Nutrition & Lifestyle
│   ├── Emotional Support
│   └── Financial Resources
│
├── Resources
│   ├── FAQ
│   ├── Document Library
│   ├── Glossary
│   └── Support Groups (future)
│
├── News & Updates
│   ├── Latest News
│   └── [Article]
│
├── Contact
│   ├── Contact Form
│   ├── Location & Directions
│   ├── Hours & Holidays
│   └── Appointment Request
│
└── Utility Pages
    ├── Search Results
    ├── Privacy Policy
    ├── Accessibility Statement
    └── 404 Error
```

### Sitemap Visualization

```
                    ┌──────────────────┐
                    │       HOME       │
                    └────────┬─────────┘
        ┌───────────────┬────┴────┬───────────────┬───────────────┐
        ▼               ▼         ▼               ▼               ▼
   ┌─────────┐    ┌─────────┐ ┌─────────┐   ┌─────────┐    ┌─────────┐
   │  ABOUT  │    │ DOCTORS │ │SERVICES │   │EDUCATION│    │ CONTACT │
   └────┬────┘    └────┬────┘ └────┬────┘   └────┬────┘    └────┬────┘
        │              │           │              │              │
   Departments    Directory    Packages      Articles         Form
                   Profiles                  Glossary        Location
                                               FAQ           Hours
```

---

## Navigation Design

### Primary Navigation

**Desktop (> 1024px):**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo] Криворізький онкологічний    Home  About  Doctors  Services  │
│        диспансер                    Education  Resources  Contact   │
│                                              [Search] [Theme]       │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (< 1024px):**
```
┌─────────────────────────────────────────────┐
│ [Logo] Онко КР            [Search] [☰ Menu] │
├─────────────────────────────────────────────┤
│  Home                                       │
│  About Us                               ▶   │
│  Find a Doctor                          ▶   │
│  Services                               ▶   │
│  Patient Education                      ▶   │
│  Resources                              ▶   │
│  Contact                                    │
│  ─────────────────────────                  │
│  [🌙 Theme] [Accessibility]                 │
└─────────────────────────────────────────────┘
```

### Navigation Patterns

1. **Sticky Header**: Header remains visible when scrolling for constant access to navigation
2. **Hamburger Menu**: Mobile navigation collapsed into hamburger, expands to full menu
3. **Active State**: Current section highlighted in navigation
4. **Breadcrumbs**: Show path on content pages (About > Departments > Radiology)
5. **Back to Top**: Floating button on long pages
6. **Footer Navigation**: Repeated key links for bottom-of-page access

### Search Interaction

```
Trigger: Click search icon OR press Ctrl+K / Cmd+K

┌─────────────────────────────────────────────────────────────────┐
│  🔍 Search oncologykr...                                    ✕   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Recent Searches:                                               │
│  • chemotherapy side effects                                    │
│  • dr. kovalenko                                                │
│                                                                 │
│  Quick Links:                                                   │
│  📅 Request Appointment                                         │
│  📞 Contact Us                                                  │
│  📍 Directions                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

After typing:

┌─────────────────────────────────────────────────────────────────┐
│  🔍 хіміо                                                   ✕   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PAGES                                                          │
│  ├─ Chemotherapy Guide • Patient Education                      │
│  └─ Chemotherapy Department • About Us                          │
│                                                                 │
│  DOCTORS                                                        │
│  └─ Dr. Petrenko Olena • Chemotherapy specialist                │
│                                                                 │
│  FAQ                                                            │
│  └─ What are chemotherapy side effects?                         │
│                                                                 │
│  Press Enter to see all results                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Mobile-First Approach

### Viewport Breakpoints

| Breakpoint | Target Devices | Layout |
|------------|----------------|--------|
| < 480px | Small phones | Single column, stacked |
| 480-640px | Large phones | Single column, larger touch targets |
| 640-768px | Small tablets, landscape phones | Optional 2-column |
| 768-1024px | Tablets | 2-column, tablet navigation |
| > 1024px | Desktop | Full layout, horizontal navigation |

### Mobile Design Guidelines

1. **Touch Targets**: Minimum 44x44px for all interactive elements
2. **Font Size**: Minimum 16px for body text (prevents iOS zoom)
3. **Spacing**: Generous padding for thumbs (bottom-reachable primary actions)
4. **Forms**: Single column, large input fields, smart keyboards
5. **Images**: Responsive, lazy-loaded, optimized for bandwidth
6. **Navigation**: Thumb-reachable menu button, swipe gestures where appropriate

### Mobile-Specific Features

- **Click-to-call**: Phone numbers are tappable
- **Click-to-email**: Email addresses open mail app
- **Maps integration**: Address opens in maps app
- **Share**: Native sharing on mobile browsers
- **Add to Home**: PWA installation prompt

### Mobile Performance Budget

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3s |
| Total Page Weight | < 500KB |
| JavaScript | < 100KB |
| CSS | < 50KB |

---

## Accessibility Compliance

### WCAG 2.1 AA Requirements

#### Perceivable

| Guideline | Requirement | Implementation |
|-----------|-------------|----------------|
| 1.1.1 | Non-text content has text alternatives | Alt text for all images |
| 1.2.1 | Audio/video has alternatives | Transcripts, captions |
| 1.3.1 | Information structure preserved | Semantic HTML |
| 1.4.1 | Color not sole indicator | Icons + text, patterns |
| 1.4.3 | Contrast ratio ≥ 4.5:1 | Verified color palette |
| 1.4.4 | Text resizable to 200% | Fluid typography |
| 1.4.10 | Content reflows at 320px | Responsive design |
| 1.4.11 | Non-text contrast ≥ 3:1 | UI component contrast |

#### Operable

| Guideline | Requirement | Implementation |
|-----------|-------------|----------------|
| 2.1.1 | Keyboard accessible | Tab navigation |
| 2.1.2 | No keyboard traps | Focus management |
| 2.4.1 | Skip links | "Skip to content" link |
| 2.4.2 | Page titles | Unique, descriptive titles |
| 2.4.3 | Focus order | Logical tab order |
| 2.4.4 | Link purpose clear | Descriptive link text |
| 2.4.6 | Headings and labels | Descriptive headings |
| 2.4.7 | Focus visible | Clear focus indicators |

#### Understandable

| Guideline | Requirement | Implementation |
|-----------|-------------|----------------|
| 3.1.1 | Language of page | `lang="uk"` attribute |
| 3.2.1 | On focus | No unexpected changes |
| 3.2.2 | On input | Predictable behavior |
| 3.3.1 | Error identification | Clear error messages |
| 3.3.2 | Labels/instructions | Form labels, hints |

#### Robust

| Guideline | Requirement | Implementation |
|-----------|-------------|----------------|
| 4.1.1 | Valid markup | W3C validation |
| 4.1.2 | Name, role, value | ARIA attributes |

### Accessibility Testing Plan

1. **Automated Testing**
   - axe DevTools browser extension
   - WAVE evaluation tool
   - Lighthouse accessibility audit
   - HTML validator

2. **Manual Testing**
   - Keyboard navigation (Tab, Enter, Escape, Arrow keys)
   - Screen reader (NVDA on Windows, VoiceOver on Mac/iOS)
   - Zoom to 200% and 400%
   - High contrast mode
   - Color blindness simulation

3. **User Testing**
   - Include users with disabilities in testing
   - Gather feedback on accessibility barriers

### Accessibility Statement Template

```markdown
# Accessibility Statement

Криворізький онкологічний диспансер is committed to ensuring
digital accessibility for people with disabilities.

## Conformance Status
This website conforms to WCAG 2.1 Level AA.

## Feedback
We welcome your feedback on accessibility. Please contact us at:
- Email: accessibility@oncologykr.com
- Phone: +380...
- Form: [Contact form link]

## Technical Specifications
This website relies on the following technologies:
- HTML
- CSS
- JavaScript

## Assessment Methods
- Self-evaluation
- Automated testing tools
- Manual testing with assistive technologies

## Date
This statement was created on [Date].
```

---

## User Journey Maps

### Journey 1: Newly Diagnosed Patient

**Persona:** Olena, 52, just received cancer diagnosis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: SHOCK & SEARCH                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ Action: Searches "cancer Kryvyi Rih" on phone                               │
│ Emotion: Scared, overwhelmed, seeking reassurance                           │
│ Touchpoint: Google search → Homepage                                        │
│ Need: Clear, trustworthy information in Ukrainian                           │
│                                                                             │
│ Design Response:                                                            │
│ ✓ Calm, professional homepage                                               │
│ ✓ Clear "About cancer" link visible                                         │
│ ✓ Emergency contact prominently displayed                                   │
│ ✓ Ukrainian language, no jargon                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: LEARNING                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ Action: Reads about cancer, treatment options                               │
│ Emotion: Anxious but engaged, building understanding                        │
│ Touchpoint: Patient Education section                                       │
│ Need: Plain-language explanations, next steps                               │
│                                                                             │
│ Design Response:                                                            │
│ ✓ Patient education content at 8th-grade level                              │
│ ✓ Clear heading hierarchy                                                   │
│ ✓ Print-friendly articles                                                   │
│ ✓ Related articles for deeper learning                                      │
│ ✓ Glossary for unfamiliar terms                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: FINDING CARE                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Action: Searches for specialists, reviews services                          │
│ Emotion: Hopeful, evaluating options                                        │
│ Touchpoint: Doctors + Services pages                                        │
│ Need: Find the right doctor, understand what's available                    │
│                                                                             │
│ Design Response:                                                            │
│ ✓ Doctor profiles with photos and credentials                               │
│ ✓ Filter by specialty/department                                            │
│ ✓ Clear service descriptions                                                │
│ ✓ NSZU coverage information                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: TAKING ACTION                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ Action: Requests appointment, prepares for visit                            │
│ Emotion: Nervous but determined                                             │
│ Touchpoint: Contact/Appointment + FAQ                                       │
│ Need: Easy appointment request, know what to bring                          │
│                                                                             │
│ Design Response:                                                            │
│ ✓ Simple appointment request form                                           │
│ ✓ Confirmation and next steps clear                                         │
│ ✓ FAQ answers "what to bring"                                               │
│ ✓ Directions and parking info                                               │
│ ✓ Downloadable forms to fill at home                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 5: ONGOING CARE                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Action: Returns for treatment info, manages side effects                    │
│ Emotion: Building relationship with care team and site                      │
│ Touchpoint: Education, News, Return visits                                  │
│ Need: Treatment guides, support resources, updates                          │
│                                                                             │
│ Design Response:                                                            │
│ ✓ Treatment journey guides                                                  │
│ ✓ Side effect management articles                                           │
│ ✓ Newsletter signup for updates                                             │
│ ✓ Support group information                                                 │
│ ✓ Bookmarking for favorite resources                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Journey 2: Supporting Family Member

**Persona:** Viktor, 58, wife has cancer

```
STAGE 1: SUPPORTING SPOUSE
┌────────────────────────────────────────────────────────────┐
│ Actions: Accompanies to appointments, researches at night  │
│ Needs: Treatment schedules, caregiver support, logistics   │
│ Design: Clear schedules, caregiver resources, print options│
└────────────────────────────────────────────────────────────┘

STAGE 2: MANAGING LOGISTICS
┌────────────────────────────────────────────────────────────┐
│ Actions: Coordinates appointments, manages medications     │
│ Needs: Contact info, directions, appointment history       │
│ Design: Easy contact, clear location info, downloadables   │
└────────────────────────────────────────────────────────────┘

STAGE 3: SEEKING SUPPORT
┌────────────────────────────────────────────────────────────┐
│ Actions: Looks for caregiver support groups                │
│ Needs: Emotional support, practical tips, community        │
│ Design: Support resources, caregiver articles, directories │
└────────────────────────────────────────────────────────────┘
```

### Journey 3: Referring Physician

**Persona:** Dr. Kovalenko, family physician

```
STAGE 1: QUICK REFERENCE
┌────────────────────────────────────────────────────────────┐
│ Actions: Needs specialist contact for patient referral     │
│ Needs: Fast specialist lookup, contact info                │
│ Design: Quick search, direct contact info, referral forms  │
└────────────────────────────────────────────────────────────┘

STAGE 2: SERVICE VERIFICATION
┌────────────────────────────────────────────────────────────┐
│ Actions: Confirms available services for patient           │
│ Needs: Service details, equipment, procedures              │
│ Design: Professional service info, specifications          │
└────────────────────────────────────────────────────────────┘
```

---

## Interaction Patterns

### Modal Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                                                         ✕   │
│                                                             │
│   Modal Title                                               │
│   ───────────────────────────────────────────────────────   │
│                                                             │
│   Modal content goes here. This modal:                      │
│   • Traps focus within                                      │
│   • Closes on ESC key                                       │
│   • Closes on backdrop click                                │
│   • Returns focus to trigger                                │
│   • Locks body scroll                                       │
│                                                             │
│                                                             │
│                             [ Cancel ]  [ Confirm Action ]  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Accessibility:
- role="dialog"
- aria-modal="true"
- aria-labelledby={titleId}
- Focus trap implemented
- ESC key closes
- Screen reader announces
```

### Form Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Form Title                                                │
│   Brief description of what this form does.                 │
│                                                             │
│   Full Name *                                               │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│   ⚠ Please enter your full name                             │
│                                                             │
│   Email Address *                                           │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ email@example.com                               ✓   │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Phone Number                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ +380                                                │   │
│   └─────────────────────────────────────────────────────┘   │
│   Optional, for callbacks                                   │
│                                                             │
│   [ ✓ ] I agree to the privacy policy *                     │
│                                                             │
│                                     [ Submit Form ]         │
│                                                             │
│   * Required fields                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Accessibility:
- Labels associated with inputs
- Required fields marked
- Error messages linked to fields
- Success state confirmed
- Instructions before form
```

### Accordion/FAQ Pattern

```
┌─────────────────────────────────────────────────────────────┐
│ ▶ Question one goes here?                                   │
├─────────────────────────────────────────────────────────────┤
│ ▼ Question two goes here? (expanded)                        │
│   ─────────────────────────────────────────────────────     │
│   Answer content is revealed when the question is           │
│   clicked or focused and Enter is pressed.                  │
│                                                             │
│   Related: [Link to page] [Another link]                    │
├─────────────────────────────────────────────────────────────┤
│ ▶ Question three goes here?                                 │
└─────────────────────────────────────────────────────────────┘

Accessibility:
- <details> and <summary> elements OR
- ARIA accordion pattern
- Keyboard navigation (Enter, Space)
- Screen reader announces expanded/collapsed
```

### Card Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌───────────────────┐                                     │
│   │      [Image]      │                                     │
│   │                   │                                     │
│   └───────────────────┘                                     │
│                                                             │
│   Card Title                                                │
│   Brief description or excerpt that gives context           │
│   about what this card links to.                            │
│                                                             │
│   [ Learn More → ]                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Accessibility:
- Entire card clickable (optional)
- Clear link purpose
- Alt text for image
- Sufficient color contrast
```

### Loading Pattern

```
Initial Load:
┌─────────────────────────────────────────────────────────────┐
│ ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ (thin bar)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────────────────────────────────────────────┐  │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  │  (skeleton)
│   └──────────────────────────────────────────────────────┘  │
│                                                             │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│   │ ░░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░░ │   │
│   │ ░░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░░ │   │
│   └───────────────┘  └───────────────┘  └───────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Accessibility:
- aria-busy="true" during load
- aria-live region for status
- Focus managed after load
```

---

## Design Tokens

### Colors

```css
/* Light Theme */
--color-bg: #ffffff;
--color-surface: #f6f8fb;
--color-surface-elevated: #ffffff;
--color-text: #0b1220;
--color-text-muted: #4b5563;
--color-accent: #0b5f66;
--color-accent-hover: #094a50;
--color-success: #059669;
--color-warning: #d97706;
--color-error: #dc2626;
--color-border: #e5e7eb;

/* Dark Theme */
--color-bg: #0b1220;
--color-surface: #0f1a2b;
--color-surface-elevated: #162033;
--color-text: #e7eefc;
--color-text-muted: #9ca3af;
--color-accent: #36c2c7;
--color-accent-hover: #4dd4d9;
```

### Typography

```css
--font-family: system-ui, -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, sans-serif;
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */

--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Spacing

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Pill shape */
```

### Shadows

```css
--shadow-sm: 0 1px 2px color-mix(in srgb, var(--color-text) 5%, transparent);
--shadow-md: 0 4px 6px color-mix(in srgb, var(--color-text) 10%, transparent);
--shadow-lg: 0 10px 15px color-mix(in srgb, var(--color-text) 10%, transparent);
--shadow-xl: 0 20px 25px color-mix(in srgb, var(--color-text) 10%, transparent);
```

---

## Responsive Behavior

### Component Behavior by Breakpoint

| Component | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|-----------|-----------------|---------------------|-------------------|
| Navigation | Hamburger menu | Hamburger menu | Horizontal nav |
| Doctor cards | 1 column | 2 columns | 3 columns |
| Service packages | Full width | Full width | 2 columns |
| Search | Full-screen | Full-screen | Overlay |
| Footer | Stacked | 2 columns | 4 columns |
| Article sidebar | Hidden/below | Hidden/below | Right sidebar |

### Touch Interactions (Mobile)

- Swipe left/right: None (avoid confusion)
- Pull to refresh: Native (PWA)
- Long press: None (no right-click menus)
- Pinch to zoom: Allowed for images only
- Double tap: Native zoom (allowed)

---

## Performance UX

### Perceived Performance Techniques

1. **Skeleton screens**: Show layout structure immediately
2. **Optimistic updates**: Show action completed before confirmation
3. **Lazy loading**: Load below-fold content on demand
4. **Prefetching**: Preload likely next pages
5. **Progressive images**: Low-quality placeholder → full image

### Loading States Hierarchy

```
0ms     : Navigation starts
0-100ms : Show previous page (no change)
100ms   : Show thin loading bar
200ms   : Show skeleton content
2000ms  : Show timeout warning
5000ms  : Show error with retry
```

---

## Error Handling UX

### Error Types and Messages

| Error Type | User Message | Recovery Action |
|------------|--------------|-----------------|
| Network | "Unable to connect. Check your internet." | Retry button |
| Not found | "Page not found. It may have moved." | Search, home link |
| Form error | "Please check the highlighted fields." | Focus first error |
| Server error | "Something went wrong. Please try again." | Retry, contact |
| Timeout | "This is taking longer than expected." | Wait or retry |

### Error Page Template

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [Illustration]                                            │
│                                                             │
│   Сторінку не знайдено                                      │
│   The page you're looking for doesn't exist or has moved.   │
│                                                             │
│   [ Search the site ]                                       │
│                                                             │
│   Or try these pages:                                       │
│   • Home                                                    │
│   • Find a Doctor                                           │
│   • Patient Education                                       │
│   • Contact Us                                              │
│                                                             │
│   Still need help? Call us at +380...                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Testing Strategy

### Usability Testing Plan

1. **Task-based testing** with 5 representative users
2. **Think-aloud protocol** during navigation
3. **A/B testing** for key pages (if traffic sufficient)
4. **Heatmap analysis** for click patterns
5. **Session recordings** for journey analysis

### Key Tasks to Test

1. Find information about chemotherapy side effects
2. Find a doctor who specializes in breast cancer
3. Request an appointment
4. Find directions to the hospital
5. Download the new patient form

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Owner: UX/Development Team*
*Review Cycle: Quarterly*
