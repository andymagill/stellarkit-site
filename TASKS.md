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

### 2.5 Styles

- [x] Create `src/styles/global.css`
  - Site owns all CSS (no styles from `@stellarkit/core`)
  - CSS custom properties for brand colors and typography
  - Base reset and body styles

---

### 2.6 Verification

- [x] Run `npx astro check` — no type errors
- [x] Run `pnpm dev` — site renders at `http://localhost:4321`
- [x] Confirm GTM `<script>` appears in page `<head>` (requires `PUBLIC_GTM_ID` in `.env`)
- [x] Confirm SEO meta tags render correctly in page source
- [x] Run `pnpm build` — `dist/` produced with no errors
- [ ] Run Lighthouse — 95+ score for Performance and SEO

---

## Phase 3: Deployment Automation ⏳ NOT STARTED

### 3.1 Cloudflare Pages Configuration

- [ ] Link GitHub repository to Cloudflare Pages
- [ ] Configure build command: `pnpm build`
- [ ] Set build output directory: `dist/`
- [ ] Configure environment variables in Cloudflare dashboard:
  - `PUBLIC_GTM_ID`
  - `FORM_WEBHOOK_URL`

### 3.2 GitHub Actions: Site Build & Deploy

- [ ] Create `.github/workflows/deploy.yml`
  - On push to main: Run `pnpm lint`, `pnpm build`, deploy to Cloudflare
  - On PR: Lint and build checks only (no deploy)
  - Cloudflare automatic deployment integration

### 3.3 Pre-Deployment Checks

- [ ] Verify Lighthouse scores (95+ Performance, 95+ SEO)
- [ ] Verify `astro check` passes
- [ ] Verify all env vars are set

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
- [ ] CSS minification and critical path optimization
- [ ] Font optimization (subsetting, variable fonts)
- [ ] Caching strategies for static assets

### 5.2 Additional Features

- [ ] Newsletter signup form integration
- [ ] Contact form with validation feedback
- [ ] Dark mode support
- [ ] Multi-language support (i18n)
