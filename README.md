# Anay Srivastav — Portfolio

A dark, sassy developer portfolio built with vanilla HTML, CSS, and JavaScript. No frameworks, no bloat.

## 📁 Structure

```
portfolio/
├── index.html        ← main page
├── resume.pdf        ← your résumé (add this)
├── README.md
├── css/
│   └── style.css     ← all styles
├── js/
│   └── script.js     ← particles, typewriter, reveal, nav
└── images/           ← add your profile photo here (optional)
```

## ✨ Features

- **Animated particle mesh** background (canvas-based, no libs)
- **Typewriter terminal** hero with rotating dev one-liners
- **Scroll-reveal** animations on every section
- **Sticky navbar** with frosted-glass blur on scroll
- **Mobile hamburger** menu with animated state
- **Cursor glow** effect on desktop
- Fully **responsive** — mobile, tablet, desktop
- Respects **prefers-reduced-motion**

## 🚀 Setup

1. Drop your `resume.pdf` into the root folder
2. Open `index.html` in a browser — no build step needed
3. To deploy: upload the whole folder to GitHub Pages, Netlify, or Vercel

## 🎨 Customise

All design tokens live at the top of `css/style.css` under `:root`:

```css
--indigo: #6C63FF;   /* primary accent */
--cyan:   #00F5FF;   /* highlight */
--bg:     #0A0E1A;   /* page background */
```

Typewriter lines are in `js/script.js` → `lines` array.

## 📦 Dependencies (CDN, no install)

- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — display font
- [Inter](https://fonts.google.com/specimen/Inter) — body font
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — monospace / terminal