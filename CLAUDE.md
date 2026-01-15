# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ukrainian medical website for КНТ «Криворізький онкологічний диспансер» (Krivoy Rog Oncological Dispensary). This is a **zero-dependency, vanilla JavaScript Single Page Application (SPA)** with PWA capabilities. No build tools, frameworks, or package managers - just HTML, CSS, and ES6+ JavaScript.

## Development Commands

**Run local server:**
```bash
# Python (recommended for WSL)
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

**No build, lint, or test commands** - this project has no build pipeline. Changes are immediately visible on browser refresh.

## Architecture Overview

### SPA Router System (`app.js`)

The entire application is orchestrated by a **hash-based router** in `app.js`:

- **Routes object** (line 6-12): Maps route names to HTML partials in `/pages`
- **Router lifecycle** (line 142-180):
  1. Fetch partial HTML
  2. Inject into `#content` div
  3. Scroll to top (critical for SPA UX)
  4. Initialize fade-in animations with IntersectionObserver
  5. Clean up any open modals from previous page

**Critical pattern**: All page-specific event handlers use **event delegation** on `document`, not direct element listeners. This ensures handlers work after SPA navigation loads new HTML partials.

### Modal System (Two Types)

1. **PDF Modal** (`app.js` line 185-235):
   - Used on Doctors page (`#/doctors`) for viewing government orders
   - Opens PDFs in iframe: `<button data-pdf="res/document.pdf">`
   - Modal element: `#pdfModal`, iframe: `#pdfFrame`

2. **Content Modal** (`app.js` line 240-301):
   - Used on About page (`#/about`) for department details
   - Content stored in `<template id="tpl-{key}">` tags
   - Opens via: `<button data-modal-open="department-key">`
   - Modal element: `#contentModal`

**Both modals**:
- Lock body scroll when open (`modal-open` class on `<html>`)
- Close via ESC key, close button, or clicking backdrop
- Are cleaned up automatically on route change (line 149-153)

### Theme System (`app.js` line 308-358)

- **Persistent theme** saved to `localStorage` with key `'theme'`
- **Three synchronized elements** on theme change:
  1. `data-theme` attribute on `<html>` (drives CSS variables)
  2. Favicon (`favicon.ico` for light, `favicon-dark.ico` for dark)
  3. `<meta name="theme-color">` (browser UI color on mobile)
- Theme toggle button updates ARIA attributes for accessibility

### Mobile Navigation (`app.js` line 72-116)

- Hamburger menu controlled by `nav-open` class on `<html>`
- Automatically closes:
  - After selecting a navigation link
  - On ESC key
  - When clicking outside header
  - On route change

### Fade-in Animations (`app.js` line 28-58)

- Uses **IntersectionObserver** for performant scroll-triggered animations
- Elements need class `fade-in` to animate in
- **Respects `prefers-reduced-motion`** - immediately shows content if user prefers reduced motion
- Re-initialized on every route change to work with newly loaded HTML

### Scroll-to-Top Strategy (`app.js` line 118-139)

**Critical for Android/iOS compatibility**: Uses 5 different methods to ensure scroll works across all mobile browsers:
1. `window.scrollTo({ top: 0, behavior: 'instant' })`
2. `window.scrollTo(0, 0)` fallback
3. `document.documentElement.scrollTop = 0`
4. `document.body.scrollTop = 0` (Safari iOS)
5. `requestAnimationFrame` wrapper (Android Chrome)

### CSS Architecture (`styles.css`)

- **CSS custom properties** for theming (line 5-37)
- No CSS preprocessor - uses modern CSS:
  - `clamp()` for fluid typography/spacing
  - `color-mix()` for shadows
  - CSS Grid and Flexbox for layouts
- **Theme switching**: All colors use `var(--color-*)` that change when `[data-theme='dark']` is applied
- **Dark theme is blue-graphite** (`#0b1220`), not pure black - for better eye comfort

## File Structure

```
/
├── index.html              # Shell with header, footer, #content div
├── app.js                  # SPA router, modals, theme, mobile nav
├── styles.css              # All styling (no CSS modules/preprocessor)
├── manifest.webmanifest    # PWA manifest
├── pages/                  # HTML partials loaded by router
│   ├── home.html
│   ├── about.html          # 15 departments with modal content
│   ├── doctors.html        # ECPO team with PDF modal
│   ├── services.html
│   └── 404.html
├── images/                 # WebP optimized images
├── icons/                  # PWA icons (192x192, 512x512)
├── res/                    # PDF documents
└── favicon*.ico            # Theme-aware favicons
```

## Key Implementation Patterns

### Adding a New Page

1. Create `/pages/newpage.html` with content wrapped in `<section class="page">`
2. Add route to `routes` object in `app.js`: `newpage: 'pages/newpage.html'`
3. Add navigation link in `index.html` header: `<a href="#/newpage">New Page</a>`
4. Add to mobile nav if needed

### Using Modals

**PDF Modal:**
```html
<button data-pdf="res/document.pdf">View Document</button>
```

**Content Modal:**
```html
<!-- Trigger button -->
<button data-modal-open="section-key">Section Title</button>

<!-- Template with content (anywhere in page) -->
<template id="tpl-section-key">
  <p>Content goes here</p>
</template>
```

### Adding Animations

Add `fade-in` class to any element:
```html
<section class="fade-in">Content will fade in on scroll</section>
```

## Language & Accessibility

- **Primary language**: Ukrainian (`<html lang="uk">`)
- **Semantic HTML**: Uses `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`
- **ARIA labels**: All interactive elements have proper labels
- **Keyboard navigation**: All modals and menus work with keyboard
- **Focus management**: Modals trap focus, close buttons are focused when modal opens

## Important Constraints

1. **No dependencies** - don't suggest npm packages or build tools
2. **No JSX/templates** - all HTML is plain strings
3. **Event delegation required** - since HTML is dynamically loaded, use `document.addEventListener` with event delegation pattern
4. **Hash routing only** - uses `#/route` format (works on any static host)
5. **Manual scroll management** - SPA navigation requires explicit scroll-to-top (line 163)

## Common Gotchas

- **Modal cleanup**: Always close modals before loading new page (handled in router line 149-153)
- **Theme-color meta**: Must sync with theme changes for proper mobile browser UI
- **Favicon caching**: Browsers aggressively cache favicons - may need hard refresh
- **IntersectionObserver reset**: Must remove `is-visible` class before re-observing (line 39)
- **Android scroll**: Multiple scroll methods needed for cross-browser compatibility
