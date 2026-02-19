# stellarkit-site — Implementation Tasks

## Phase 2: Site Scaffold

**Build this after Phase 1** — Requires @stellarkit/core to be initialized and available.

### 2.1 Scaffold and initialize
- [x] Run `pnpm create astro@latest . -- --template minimal --typescript strict` in `stellarkit-site/`
- [x] Update `package.json`: add `"@stellarkit/core": "file:../stellarkit-core"` to dependencies
- [x] Add `astro.config.mjs` — import and register `stellarKitCore()` from `@stellarkit/core`, set `output: "static"`
- [x] Run `pnpm install` and verify `@stellarkit/core` resolves from `file:` path

---

### 2.2 Environment

- [x] Create `.env.example`
  ```
  PUBLIC_GTM_ID=GTM-XXXX
  FORM_WEBHOOK_URL=https://hooks.example.com/...
  ```
- [x] Create `.env` (local only, git-ignored) with real values for development

---

### 2.3 Pages

- [x] Create `src/pages/index.astro`
  - Import `BaseLayout` from `@stellarkit/core/src/layouts/BaseLayout.astro`
  - Use `defineSeo()` from `@stellarkit/core/dist/utils/seo` for page metadata
  - Render `<Hero />` site component
- [x] Create `src/pages/about.astro`
  - Same pattern as `index.astro`
  - Appropriate `defineSeo()` metadata for the about page

---

### 2.4 Site Components

- [x] Create `src/components/Hero.astro`
  - Site-specific, no `@stellarkit/core` dependency
  - Headline, subheadline, CTA button
- [x] Create `src/components/FeatureGrid.astro`
  - Site-specific feature/benefit grid
  - Accepts a `features` prop (array of `{ title, description }`)

---

### 2.5 Styles ✅ TAILWIND CSS V4

- [x] Install `tailwindcss` and `@tailwindcss/vite` as dev dependencies
- [x] Register Tailwind Vite plugin in `astro.config.mjs`
- [x] Create `src/styles/global.css` with:
  - `@import "tailwindcss"` — Single CSS directive for v4
  - `@theme { }` block for brand tokens (`--color-brand`, `--color-brand-dark`, `--color-text`, `--color-text-muted`)
  - Site owns all styling; no styles from `@stellarkit/core`
- [x] Remove scoped `<style>` blocks from components — use Tailwind utilities in markup instead
- [x] Replace inline `style=""` attributes with Tailwind utility classes
- [x] Verify responsive design with Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`)

---

### 2.6 Verification

- [x] Run `npx astro check` — no type errors
- [x] Run `pnpm dev` — site renders at `http://localhost:4321`
- [x] Confirm GTM `<script>` appears in page `<head>` (requires `PUBLIC_GTM_ID` in `.env`)
- [x] Confirm SEO meta tags render correctly in page source
- [x] Run `pnpm build` — `dist/` produced with no errors
- [ ] Run Lighthouse — 95+ score for Performance and SEO

---

## Phase 3: Deployment Automation ✅ MOSTLY COMPLETE

### 3.1 GitHub Actions: Site Build & Deploy ✅

- [x] Create `.github/workflows/deploy.yml`
  - On push/PR: Run `pnpm lint`, `astro check`, `pnpm build`
  - On push to main: Run Lighthouse audit
  - Pre-deployment checks and automated testing
  - Tests on Node 18 and 20

### 3.2 Lighthouse Performance Auditing ✅

- [x] Create `lighthouserc.json` configuration
  - Target: 95+ Performance and SEO scores
  - Target: 90+ Best Practices and Accessibility
  - Audit runs on main branch deployments

### 3.3 Cloudflare Pages Configuration ⏳ MANUAL SETUP REQUIRED

- [ ] Link GitHub repository to Cloudflare Pages
  - Go to Cloudflare Dashboard → Pages → Create project
  - Connect GitHub repository `andymagill/stellarkit-site`
- [ ] Configure build settings:
  - Build command: `pnpm build`
  - Build output directory: `dist/`
- [ ] Set environment variables in Cloudflare:
  - `PUBLIC_GTM_ID` (your GTM ID)
  - `FORM_WEBHOOK_URL` (your webhook endpoint)
- [ ] Enable automatic deployments on push to main

### 3.4 Pre-Deployment Checks ✅

- [x] `pnpm lint` in CI workflow
- [x] `astro check` type validation in CI
- [x] `pnpm build` pre-render check
- [x] Lighthouse 95+ score configuration in place

### 3.5 Custom Domain Setup ⏳ OPTIONAL

- [ ] Configure custom domain in Cloudflare Pages
- [ ] Point DNS records to Cloudflare
- [ ] Enable SSL/TLS (automatic with Cloudflare)

---

## Phase 4: Documentation & Reference ⏳ NOT STARTED

### 4.1 Site-Specific Documentation

- [ ] Create `SETUP.md` — How to customize this site
  - Adding new pages
  - Modifying components
  - Updating branding (colors, typography)
  - Form webhook setup

### 4.2 Content Management

- [ ] Document page metadata structure (SEO, social cards)
- [ ] Document component prop interfaces
- [ ] Create content style guide

### 4.3 Deployment Guide

- [ ] Document Cloudflare Pages setup
- [ ] Document environment variable configuration
- [ ] Document custom domain setup
- [ ] Document SSL/TLS configuration

### 4.4 Troubleshooting Guide

- [ ] Common build errors and solutions
- [ ] Env var configuration issues
- [ ] GTM injection verification
- [ ] Form submission debugging

---

## Phase 5: Optimization (Optional/Future)

### 5.1 Performance Improvements

- [ ] Image optimization and lazy loading
- [ ] Font optimization (subsetting, variable fonts)
- [ ] Caching strategies for static assets
- [ ] CSS minification (handled automatically by Tailwind in production)

### 5.2 Additional Features

- [ ] Newsletter signup form integration
- [ ] Contact form with validation feedback
- [ ] Dark mode support via Tailwind's dark mode utilities
- [ ] Multi-language support (i18n)
