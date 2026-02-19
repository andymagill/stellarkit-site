# stellarkit-site — Implementation Tasks

## Phase 2: Site Scaffold

**Build this after Phase 1** — Requires @stellarkit/core to be initialized and available.

### 2.1 Scaffold and initialize
- [ ] Run `pnpm create astro@latest . -- --template minimal --typescript strict` in `stellarkit-site/`
- [ ] Update `package.json`: add `"@stellarkit/core": "file:../stellarkit-core"` to dependencies
- [ ] Add `astro.config.mjs` — import and register `stellarKitCore()` from `@stellarkit/core`, set `output: "static"`
- [ ] Run `pnpm install` and verify `@stellarkit/core` resolves from `file:` path

---

### 2.2 Environment

- [ ] Create `.env.example`
  ```
  PUBLIC_GTM_ID=GTM-XXXX
  FORM_WEBHOOK_URL=https://hooks.example.com/...
  ```
- [ ] Create `.env` (local only, git-ignored) with real values for development

---

### 2.3 Pages

- [ ] Create `src/pages/index.astro`
  - Import `BaseLayout` from `@stellarkit/core/components/BaseLayout.astro`
  - Use `defineSeo()` from `@stellarkit/core/utils/seo` for page metadata
  - Render `<Hero />` site component
- [ ] Create `src/pages/about.astro`
  - Same pattern as `index.astro`
  - Appropriate `defineSeo()` metadata for the about page

---

### 2.4 Site Components

- [ ] Create `src/components/Hero.astro`
  - Site-specific, no `@stellarkit/core` dependency
  - Headline, subheadline, CTA button
- [ ] Create `src/components/FeatureGrid.astro`
  - Site-specific feature/benefit grid
  - Accepts a `features` prop (array of `{ title, description }`)

---

### 2.5 Styles

- [ ] Create `src/styles/global.css`
  - Site owns all CSS (no styles from `@stellarkit/core`)
  - CSS custom properties for brand colors and typography
  - Base reset and body styles

---

### 2.6 Verification

- [ ] Run `npx astro check` — no type errors
- [ ] Run `pnpm dev` — site renders at `http://localhost:4321`
- [ ] Confirm GTM `<script>` appears in page `<head>` (requires `PUBLIC_GTM_ID` in `.env`)
- [ ] Confirm SEO meta tags render correctly in page source
- [ ] Run `pnpm build` — `dist/` produced with no errors
- [ ] Run Lighthouse — 95+ score for Performance and SEO
