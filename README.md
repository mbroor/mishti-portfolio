# Mishti Broor Portfolio

A minimal Astro portfolio for bioelectronics, neural sensing, research, and technical writing.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in Terminal.
3. Run:

```bash
npm install
npm run dev
```

Astro will show a local URL, usually `http://localhost:4321`.

## Build

```bash
npm run build
```

The static site is generated in `dist/`.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `mishti-portfolio`.
2. Upload this project.
3. In GitHub, go to **Settings → Pages**.
4. Use **GitHub Actions** as the source.
5. Add the workflow in `.github/workflows/deploy.yml` (included in this project).
6. In your domain registrar, point `www.mishtibroor.com` to GitHub Pages following GitHub's custom-domain instructions.
7. Keep your old Google Site live until the new site is confirmed working.

## What to replace first

- Project image placeholders on the homepage and EEG project page.
- LinkedIn and GitHub URLs in `src/layouts/BaseLayout.astro`.
- Add your resume PDF to `public/docs/` and link it from navigation.
- Add 6–8 strongest technical-writing links to `src/pages/writing.astro`.
- Add your final SfN poster PDF after November 2026.

## Easy editing

Most content lives directly inside files in `src/pages/`. You can edit the text without touching the design system in `src/styles/global.css`.
