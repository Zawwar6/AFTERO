# AFTERO — Agency Website

A premium, one-page agency website built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/       # All page sections + shared UI (cursor, loader, orbit mark)
├── data/              # Services, projects, testimonials content
├── hooks/             # useMediaQuery, reduced-motion, touch-device helpers
├── App.jsx
├── main.jsx
└── index.css          # Tailwind v4 theme tokens + custom utilities
```

## Notes

- Portfolio images are pulled from Unsplash — swap the URLs in `src/data/projects.js` for real project photography.
- Colors, typography and content follow the AFTERO brief: black/white/silver base with electric purple (#6C63FF) and cyan (#00E5FF) accents.
- Respects `prefers-reduced-motion` and disables the custom cursor / heavy hover effects on touch devices.
