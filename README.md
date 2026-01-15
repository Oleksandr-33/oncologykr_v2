# КОМУНАЛЬНЕ НЕКОМЕРЦІЙНЕ ТОВАРИСТВО  
# "КРИВОРІЗЬКИЙ ОНКОЛОГІЧНИЙ ДИСПАНСЕР"  
# ДНІПРОПЕТРОВСЬКОЇ ОБЛАСНОЇ РАДИ

Website for Krivoy Rog Oncological Dispensary - a Ukrainian medical facility specializing in oncology care.

## About

This is a Progressive Web App (PWA) built as a lightweight, accessible Single Page Application using vanilla JavaScript, HTML, and CSS. The website provides information about the medical facility, its departments, doctors, and services.

## Features

- **Single Page Application (SPA)** with hash-based routing
- **Progressive Web App (PWA)** - installable on mobile devices
- **Light/Dark Theme** with persistent storage
- **Fully Responsive** - mobile-first design
- **Accessible** - WCAG compliant with ARIA support
- **Modal System** - for department details and PDF documents
- **Zero Dependencies** - no frameworks or build tools required

## Technologies

- **HTML5** - semantic markup with accessibility features
- **CSS3** - modern CSS with variables, Grid, Flexbox
- **Vanilla JavaScript (ES6+)** - no frameworks
- **PWA APIs** - service worker ready with manifest
- **IntersectionObserver API** - for lazy-loaded animations

## Project Structure

```
oncologykr_v2/
├── index.html              # Main entry point
├── app.js                  # SPA router & JavaScript logic
├── styles.css              # All styling
├── manifest.webmanifest    # PWA manifest
├── pages/                  # SPA page partials
│   ├── home.html           # Home page
│   ├── about.html          # Departments & facilities
│   ├── doctors.html        # ECPO team listing
│   ├── services.html       # Medical services catalog
│   └── 404.html            # Not found page
├── images/                 # Optimized images (WebP)
├── icons/                  # PWA icons
├── favicon-*.ico/svg       # Theme-aware favicons
└── res/                    # Resources (PDFs)
```

## Getting Started

### Prerequisites

Any static web server. No build process or package installation required.

### Running Locally

**Option 1: Python**
```bash
python -m http.server 8000
```

**Option 2: Node.js (http-server)**
```bash
npx http-server
```

**Option 3: PHP**
```bash
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

## Deployment

This is a static website with no server-side dependencies. Simply copy all files to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any web server (Apache, Nginx, etc.)

## Pages & Routes

The application uses hash-based routing:

- `#/home` - Home page with location and contact info
- `#/about` - 15 departments with detailed modal information
- `#/doctors` - List of specialist doctors (ECPO team)
- `#/services` - Comprehensive medical services catalog

## Key Features

### Theme Switching
Users can toggle between light and dark themes. Preference is saved to localStorage and persists across sessions. Even the favicon changes based on theme.

### Modal System
Two types of modals:
- **PDF Modals** - for displaying documents
- **Content Modals** - for department details

Both support keyboard navigation (ESC to close) and click-outside dismissal.

### Accessibility
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- `prefers-reduced-motion` respect
- Focus management in modals

### Performance
- Lazy loading images
- WebP image format
- CSS-based animations
- IntersectionObserver for efficient scrolling
- No external dependencies (zero network requests)

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Development

This project uses no build tools or package managers. All code is vanilla JavaScript, making it easy to modify and deploy.

### Making Changes

1. Edit HTML files in `/pages` for content changes
2. Edit `styles.css` for styling
3. Edit `app.js` for JavaScript functionality
4. Changes are reflected immediately (just refresh the browser)

### Adding New Pages

1. Create a new HTML file in `/pages` directory
2. Add route to the routes object in `app.js`
3. Add navigation link in `index.html`

## License

This project is maintained by КНТ "Криворізький онкологічний диспансер".

## Repository

https://github.com/Oleksandr-33/oncologykr_v2.git

## Contact

For medical inquiries and appointments, visit the website's home page for contact information and location details.
