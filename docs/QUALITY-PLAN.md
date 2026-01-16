# QUALITY-PLAN.md - Quality Assurance Plan

## Overview

This document outlines the quality assurance strategy for oncologykr, ensuring the website meets high standards for code quality, performance, security, accessibility, and user experience.

---

## Quality Objectives

1. **Reliability**: Zero critical bugs in production
2. **Performance**: Lighthouse score > 90 in all categories
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Security**: No known vulnerabilities
5. **Compatibility**: Works on 95% of browsers in target audience
6. **Code Quality**: Consistent, maintainable, documented code

---

## Code Quality Standards

### JavaScript Standards

**File Organization:**
```javascript
// File structure
// 1. Module imports (if using ES modules)
// 2. Constants and configuration
// 3. Helper functions (private)
// 4. Main functions (public API)
// 5. Event listeners and initialization
// 6. Export statements (if applicable)
```

**Naming Conventions:**
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `pageContent`, `isLoading` |
| Constants | UPPER_SNAKE | `MAX_TIMEOUT`, `API_URL` |
| Functions | camelCase, verb | `loadPage()`, `initModal()` |
| DOM IDs | kebab-case | `content-modal`, `search-input` |
| CSS classes | kebab-case | `modal-open`, `fade-in` |
| Data attributes | kebab-case | `data-modal-open`, `data-pdf` |

**Code Guidelines:**
```javascript
// Good practices:

// 1. Use const by default, let when needed
const routes = { home: 'pages/home.html' };
let currentPage = 'home';

// 2. Use template literals for strings
const message = `Loading page: ${pageName}`;

// 3. Use arrow functions for callbacks
document.addEventListener('click', (e) => {
    // handler code
});

// 4. Use async/await for async operations
async function loadPage(route) {
    const response = await fetch(routes[route]);
    return await response.text();
}

// 5. Use early returns to reduce nesting
function handleClick(e) {
    if (!e.target.matches('[data-action]')) return;
    // main logic here
}

// 6. Comment WHY, not WHAT
// Prevents iOS Safari scroll-to-top bug
document.body.scrollTop = 0;
```

**Anti-patterns to Avoid:**
```javascript
// Avoid:
// - var (use const/let)
// - == (use ===)
// - eval()
// - inline event handlers in HTML
// - document.write()
// - Magic numbers without constants
// - Deep nesting (> 3 levels)
// - Functions longer than 50 lines
// - Files longer than 500 lines
```

### HTML Standards

**Structure:**
```html
<!-- Semantic structure -->
<header>
    <nav aria-label="Main navigation">...</nav>
</header>
<main id="content">
    <article>...</article>
</main>
<footer>...</footer>

<!-- Accessibility attributes -->
<button aria-label="Close modal" aria-expanded="false">
<img src="..." alt="Descriptive alt text">
<a href="..." aria-describedby="...">
```

**Required Attributes:**
- `lang` on `<html>` element
- `alt` on all `<img>` elements
- `aria-label` on interactive elements without visible text
- `type` on `<script>` elements (when not JavaScript)

### CSS Standards

**Organization:**
```css
/* Component styling order */
.component {
    /* 1. Layout (position, display, flex/grid) */
    position: relative;
    display: flex;

    /* 2. Box model (margin, padding, border) */
    margin: 0;
    padding: var(--space-4);

    /* 3. Typography */
    font-size: var(--font-size-base);
    color: var(--color-text);

    /* 4. Visual (background, shadow, etc.) */
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);

    /* 5. Animation/Transition */
    transition: opacity 200ms ease;
}
```

**Best Practices:**
```css
/* Use CSS custom properties */
color: var(--color-text); /* Good */
color: #0b1220;           /* Avoid - use variable */

/* Use relative units */
font-size: 1rem;          /* Good */
font-size: 16px;          /* Avoid - less flexible */

/* Use modern layout */
display: grid;            /* Good */
display: flex;            /* Good */
float: left;              /* Avoid */

/* Use color-mix for variations */
background: color-mix(in srgb, var(--color-accent) 10%, transparent);
```

---

## Testing Strategy

### Testing Pyramid

```
                    ┌───────────┐
                   /│   E2E     │\      Manual/Exploratory
                  / │  Tests    │ \     Critical paths only
                 /  └───────────┘  \
                /   ┌───────────┐   \
               /    │Integration│    \   Key interactions
              /     │  Tests    │     \
             /      └───────────┘      \
            /       ┌───────────┐       \
           /        │   Unit    │        \  Helper functions
          /         │  Tests    │         \
         /          └───────────┘          \
        /           ┌───────────┐           \
       /            │  Static   │            \  Linting, types
      /             │ Analysis  │             \
     /              └───────────┘              \
```

### Manual Testing Checklist

**Before Each Release:**

```
Navigation & Routing:
[ ] All navigation links work
[ ] Hash routing functions correctly
[ ] Active state updates on navigation
[ ] Mobile menu opens/closes
[ ] Mobile menu closes on route change
[ ] Back/forward browser buttons work
[ ] 404 page displays for invalid routes

Page Loading:
[ ] All pages load successfully
[ ] Content displays correctly
[ ] Images load (no broken images)
[ ] PDF documents open
[ ] External links work (open in new tab)

Modals:
[ ] Content modals open correctly
[ ] PDF modal displays PDF
[ ] Close button works
[ ] ESC key closes modal
[ ] Backdrop click closes modal
[ ] Body scroll locks when modal open
[ ] Focus returns to trigger on close

Theme System:
[ ] Theme toggle works
[ ] Theme persists on refresh
[ ] Favicon changes with theme
[ ] Meta theme-color updates
[ ] All colors update correctly
[ ] No contrast issues in either theme

Forms:
[ ] Contact form validates
[ ] Error messages display
[ ] Success confirmation shows
[ ] Form submission works
[ ] Honeypot field hidden

Search:
[ ] Search opens on click
[ ] Keyboard shortcut works (Ctrl+K)
[ ] Results appear as you type
[ ] Results are clickable
[ ] No results state displays
[ ] Search closes properly

Mobile:
[ ] Responsive at all breakpoints
[ ] Touch targets adequate (44x44px)
[ ] No horizontal scroll
[ ] Text readable without zoom
[ ] Forms usable on mobile

Accessibility:
[ ] Tab navigation works throughout
[ ] Focus visible on all elements
[ ] Screen reader announces correctly
[ ] Skip link works
[ ] Color contrast passes
[ ] Zoom to 200% works
```

### Automated Testing (Future)

**Recommended Tools:**

| Test Type | Tool | Coverage Target |
|-----------|------|-----------------|
| Static Analysis | ESLint | 100% of JS |
| Unit Tests | Vitest | Helper functions |
| Integration | Playwright | Key user flows |
| E2E | Playwright | Critical paths |
| Accessibility | axe-core | All pages |
| Performance | Lighthouse CI | All pages |

**Sample Test Structure:**
```javascript
// tests/router.test.js
import { describe, it, expect } from 'vitest';
import { getRoute } from '../js/router.js';

describe('Router', () => {
    it('returns correct page for valid route', () => {
        expect(getRoute('#/home')).toBe('pages/home.html');
    });

    it('returns 404 for unknown route', () => {
        expect(getRoute('#/unknown')).toBe('pages/404.html');
    });

    it('handles empty hash', () => {
        expect(getRoute('')).toBe('pages/home.html');
    });
});
```

---

## Performance Benchmarks

### Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | When main content loads |
| **FID** (First Input Delay) | < 100ms | Responsiveness to interaction |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |
| **FCP** (First Contentful Paint) | < 1.5s | First render |
| **TTI** (Time to Interactive) | < 3s | Full interactivity |

### Lighthouse Targets

| Category | Target Score |
|----------|--------------|
| Performance | > 90 |
| Accessibility | > 95 |
| Best Practices | > 90 |
| SEO | > 90 |
| PWA | All checks pass |

### Performance Budget

| Resource | Budget |
|----------|--------|
| HTML | < 50KB |
| CSS | < 50KB |
| JavaScript | < 100KB |
| Total page weight | < 500KB |
| Images per page | < 500KB |
| Number of requests | < 20 |

### Performance Testing Process

**Weekly:**
1. Run Lighthouse on all main pages
2. Record scores in tracking spreadsheet
3. Investigate any regressions

**Pre-release:**
1. Run full Lighthouse audit
2. Test on throttled connection (3G)
3. Test on low-end device

**Tools:**
- Chrome DevTools Lighthouse
- WebPageTest.org
- PageSpeed Insights
- Chrome DevTools Network throttling

---

## Security Measures

### Security Headers

```
# Required Security Headers (configure in hosting)

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
    form-action 'self' https://formspree.io;

X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Input Validation

```javascript
// Client-side validation patterns
const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?380\d{9}$/,
    name: /^[\p{L}\s'-]{2,100}$/u,  // Unicode letters
};

// Sanitize user input
function sanitize(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Rate limiting (server-side)
// Maximum 5 form submissions per minute per IP
```

### Security Checklist

```
Infrastructure:
[ ] HTTPS enforced (no HTTP)
[ ] Security headers configured
[ ] CSP policy active
[ ] HSTS enabled
[ ] No sensitive files exposed (no .env, .git, etc.)

Code:
[ ] No inline scripts (except necessary)
[ ] No eval() or similar
[ ] User input sanitized
[ ] External links have rel="noopener"
[ ] Forms have CSRF protection
[ ] No hardcoded credentials

Dependencies:
[ ] External scripts from trusted sources only
[ ] External scripts use integrity hashes (if possible)
[ ] Minimal external dependencies

Data:
[ ] No sensitive data in localStorage
[ ] No unnecessary data collection
[ ] Privacy policy current
[ ] Consent obtained for data collection
```

### Security Testing

**Monthly:**
- Check security headers (securityheaders.com)
- Review CSP violations
- Check for exposed files

**Quarterly:**
- Full security audit
- Dependency review
- Policy compliance check

---

## Accessibility Testing

### Automated Testing

**Tools:**
- axe DevTools browser extension
- WAVE evaluation tool
- Lighthouse accessibility audit
- HTML validator

**Automated Tests:**
```javascript
// Example: Run axe-core on page
import { axe } from 'axe-core';

async function runAccessibilityTests() {
    const results = await axe.run();
    if (results.violations.length > 0) {
        console.error('Accessibility violations:', results.violations);
    }
    return results;
}
```

### Manual Testing

**Keyboard Navigation:**
1. Tab through entire page
2. Verify logical tab order
3. Test all interactive elements
4. Verify focus visibility
5. Test modal focus trapping
6. Test keyboard shortcuts

**Screen Reader Testing:**
- NVDA (Windows, free)
- VoiceOver (Mac/iOS, built-in)

**Test Scenarios:**
1. Navigate to homepage
2. Use search
3. Open a modal
4. Fill out contact form
5. Navigate through articles

**Zoom Testing:**
1. Zoom to 200%
2. Zoom to 400%
3. Verify no content cut off
4. Verify no horizontal scroll
5. Verify text reflows

**Color Testing:**
- Use color blindness simulator
- Verify with high contrast mode
- Check contrast ratios

### Accessibility Checklist

```
Perceivable:
[ ] All images have alt text
[ ] Video has captions/transcripts
[ ] Color contrast ≥ 4.5:1 (normal text)
[ ] Color contrast ≥ 3:1 (large text)
[ ] Information not conveyed by color alone
[ ] Content works at 200% zoom

Operable:
[ ] All functionality keyboard accessible
[ ] No keyboard traps
[ ] Focus visible on all elements
[ ] Skip link present and working
[ ] No timing-dependent content
[ ] Page titles descriptive

Understandable:
[ ] Language set (lang="uk")
[ ] Error messages clear
[ ] Labels on all form fields
[ ] Consistent navigation
[ ] Instructions clear

Robust:
[ ] Valid HTML
[ ] ARIA used correctly
[ ] Works with assistive technology
```

---

## Browser Compatibility

### Supported Browsers

| Browser | Versions | Support Level |
|---------|----------|---------------|
| Chrome | Last 2 versions | Full |
| Firefox | Last 2 versions | Full |
| Safari | Last 2 versions | Full |
| Edge | Last 2 versions | Full |
| Chrome Android | Last 2 versions | Full |
| Safari iOS | Last 2 versions | Full |
| Samsung Internet | Last 2 versions | Full |
| Opera | Last 2 versions | Best effort |
| IE 11 | - | Not supported |

### Feature Detection

```javascript
// Progressive enhancement pattern
if ('IntersectionObserver' in window) {
    // Use IntersectionObserver
} else {
    // Fallback: Show content immediately
}

// Check for features before use
const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;

// CSS feature detection
@supports (color-mix(in srgb, red 50%, blue)) {
    /* Use color-mix */
}
```

### Browser Testing Checklist

```
Desktop:
[ ] Chrome (Windows)
[ ] Chrome (Mac)
[ ] Firefox (Windows)
[ ] Firefox (Mac)
[ ] Safari (Mac)
[ ] Edge (Windows)

Mobile:
[ ] Chrome (Android)
[ ] Safari (iOS)
[ ] Samsung Internet (Android)

Specific Tests:
[ ] Scrolling works correctly
[ ] Touch interactions work
[ ] Forms usable
[ ] Modals display correctly
[ ] Theme switching works
[ ] PWA installs correctly
```

---

## Code Review Process

### Pre-Commit Checklist

```
Before committing:
[ ] Code follows naming conventions
[ ] No console.log statements (except errors)
[ ] No commented-out code
[ ] Functions documented (if complex)
[ ] HTML is valid
[ ] CSS is valid
[ ] No new accessibility issues
[ ] Tested in browser
[ ] Mobile tested (responsive)
[ ] Theme tested (light/dark)
```

### Code Review Criteria

**Reviewer Checklist:**
```
Functionality:
[ ] Feature works as intended
[ ] Edge cases handled
[ ] No broken existing functionality
[ ] Error handling present

Code Quality:
[ ] Follows project conventions
[ ] No code duplication
[ ] Functions are focused
[ ] Code is readable

Security:
[ ] User input validated/sanitized
[ ] No security vulnerabilities
[ ] No exposed sensitive data

Performance:
[ ] No unnecessary operations
[ ] Efficient DOM manipulation
[ ] Images optimized
[ ] No memory leaks

Accessibility:
[ ] ARIA attributes correct
[ ] Keyboard accessible
[ ] Screen reader friendly
[ ] Focus management correct

Documentation:
[ ] Complex logic commented
[ ] CLAUDE.md updated if needed
[ ] README updated if needed
```

### Review Process

```
1. Developer creates feature branch
2. Developer completes pre-commit checklist
3. Developer opens pull request
4. Automated checks run (if configured):
   - HTML validation
   - CSS validation
   - JavaScript linting
   - Lighthouse audit
5. Reviewer reviews code
6. Reviewer tests functionality
7. Feedback addressed
8. Merge to main
9. Deploy and verify
```

---

## Deployment Quality Gates

### Pre-Deployment Checklist

```
Before deploying to production:

Code Quality:
[ ] All tests passing
[ ] No linting errors
[ ] Code review approved
[ ] No TODOs/FIXMEs in new code

Functionality:
[ ] All pages load
[ ] All forms work
[ ] All links work
[ ] Modal system works
[ ] Theme system works
[ ] Mobile navigation works

Performance:
[ ] Lighthouse Performance > 90
[ ] Page load < 3 seconds
[ ] No large unoptimized images

Accessibility:
[ ] Lighthouse Accessibility > 95
[ ] Keyboard navigation works
[ ] No critical axe violations

Security:
[ ] Security headers configured
[ ] No console errors
[ ] No exposed sensitive data

SEO:
[ ] All pages have titles
[ ] All pages have meta descriptions
[ ] Sitemap valid
[ ] robots.txt valid

Content:
[ ] No placeholder content
[ ] All text proofread
[ ] Medical content reviewed
[ ] Links to external resources work
```

### Post-Deployment Verification

```
After deploying:

[ ] Site accessible (no downtime)
[ ] HTTPS working
[ ] All pages load
[ ] Forms submit successfully
[ ] Analytics tracking
[ ] No console errors
[ ] Check error monitoring (if enabled)
[ ] Spot-check on mobile device
```

---

## Issue Tracking

### Bug Classification

| Severity | Definition | Response Time |
|----------|------------|---------------|
| **Critical** | Site down, data loss, security breach | Immediate |
| **High** | Major feature broken, affects many users | Same day |
| **Medium** | Feature partially broken, workaround exists | Next sprint |
| **Low** | Minor issue, cosmetic, edge case | Backlog |

### Bug Report Template

```markdown
## Bug Report

**Severity:** [Critical/High/Medium/Low]

**Summary:**
Brief description of the issue

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop / Mobile
- Screen size: 1920x1080

**Screenshots:**
[Attach if applicable]

**Additional Context:**
Any other relevant information
```

### Quality Metrics to Track

| Metric | Target | Frequency |
|--------|--------|-----------|
| Open bugs | < 10 | Weekly |
| Critical bugs | 0 | Continuous |
| Time to fix (critical) | < 4 hours | Per incident |
| Time to fix (high) | < 24 hours | Per incident |
| Lighthouse scores | > 90 | Weekly |
| Accessibility violations | 0 critical | Weekly |
| User-reported issues | < 5/month | Monthly |

---

## Continuous Improvement

### Quality Review Cycle

**Weekly:**
- Review open bugs
- Check performance metrics
- Review user feedback

**Monthly:**
- Full Lighthouse audit
- Accessibility audit
- Security header check
- Browser compatibility check

**Quarterly:**
- Comprehensive code review
- Documentation review
- Process improvement review
- Update testing procedures

### Feedback Loops

1. **User Feedback**: Collect via feedback form, analyze monthly
2. **Analytics**: Review user behavior, identify problem areas
3. **Error Tracking**: Monitor errors, prioritize fixes
4. **Performance Monitoring**: Track trends, investigate regressions
5. **Accessibility Audits**: Regular testing, continuous improvement

---

## Quality Tools Summary

| Category | Tool | Purpose |
|----------|------|---------|
| **Linting** | ESLint | JavaScript code quality |
| **Validation** | W3C Validator | HTML/CSS validation |
| **Performance** | Lighthouse | Performance auditing |
| **Accessibility** | axe DevTools | Accessibility testing |
| **Security** | securityheaders.com | Security header check |
| **Browser Testing** | BrowserStack (optional) | Cross-browser testing |
| **Monitoring** | UptimeRobot | Uptime monitoring |

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Owner: Development Team*
*Review Cycle: Quarterly*
