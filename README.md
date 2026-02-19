# stellarkit-site

The reference site implementation for StellarKit. Demonstrates how to consume `@stellarkit/core` as an Astro Integration, structure site-specific pages and components, and deploy to Cloudflare Pages.

This repo is the starting point for any new StellarKit marketing or product-validation site.

---

## What It Is

- A fully static Astro site
- Consumes `@stellarkit/core` for layout, SEO, analytics, and form handling
- Owns all routes, content, components, and styles
- Deploys to Cloudflare Pages via GitHub Actions

---

## Prerequisites

- Node ≥ 18.17.1
- npm ≥ 9

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-org/stellarkit-site.git
cd stellarkit-site

# 2. Install dependencies
npm install
```

### How the core dependency works

`@stellarkit/core` is referenced via a local `file:` path during development:

```json
"dependencies": {
  "@stellarkit/core": "file:../stellarkit-core"
}
```

This means `stellarkit-core` must be cloned as a sibling directory. After any changes to the core package, re-run `npm install` in this repo to pick them up.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `PUBLIC_GTM_ID` | Recommended | Google Tag Manager container ID (e.g. `GTM-XXXX`) |
| `FORM_WEBHOOK_URL` | Required for forms | Webhook endpoint for form submission |

---

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local dev server at `http://localhost:4321` |
| `npm run build` | Build static output to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Run Astro type-checking |

---

## Project Structure

```
src/
  components/       Site-specific components (Hero, FeatureGrid, etc.)
  pages/            Astro file-based routes
    index.astro
    about.astro
  styles/
    global.css      Site owns all CSS — no styles from @stellarkit/core
astro.config.mjs    Registers @stellarkit/core integration
.env.example        Environment variable template
```

---

## Using Core Components

```astro
---
import BaseLayout from '@stellarkit/core/components/BaseLayout.astro';
import { defineSeo } from '@stellarkit/core/utils/seo';

const seo = defineSeo({
  title: 'Home',
  description: 'Product validation site.',
  canonical: 'https://example.com',
});
---

<BaseLayout seo={seo}>
  <link rel="stylesheet" href="/styles/global.css" slot="head" />
  <Hero />
</BaseLayout>
```

---

## Cloudflare Pages Deployment

1. Connect the `stellarkit-site` GitHub repo in the Cloudflare Pages dashboard.
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in the Cloudflare dashboard:
   - `PUBLIC_GTM_ID`
   - `FORM_WEBHOOK_URL`

---

## Creating a New Site from This Starter

1. Fork or copy this repo.
2. Update `astro.config.mjs` with site-specific settings.
3. Replace `src/components/` with your marketing blocks.
4. Update `src/pages/` with your routes and content.
5. Set your own `src/styles/global.css`.
6. Configure Cloudflare Pages deployment.

A new site should be fully running in under 30 minutes.
