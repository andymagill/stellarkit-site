# StellarKit Marketing MiniToolkit

A reusable, open-source foundation for building marketing and product-validation sites using **Astro**.

This project separates infrastructure from implementation to prevent code fragmentation, repeated bug fixes, and long-term maintenance overhead.

**Status:** Core package (v0.1.0) complete. Reference site implementation (stellarkit-site) complete. Phases 3 & 4 (CI/CD automation and documentation) pending.

---

# Overview

This platform is designed for:

- Marketing websites
- Product validation sites
- Multi-route promotional sites
- Experiment-driven web properties

It prioritizes:

- Static pre-rendered output
- Strong SEO fundamentals
- Automated deployment to static hosting (Cloudflare Pages, Vercel, or Netlify)
- Centralized analytics and form handling
- Long-term maintainability

Primary audience: internal developer (initially)  
Secondary audience: open-source contributors

---

# Architecture

## Two-Layer Model

### 1️⃣ Core (Package Repository) ✅ COMPLETE

A versioned, installable Astro package that provides shared infrastructure. **Published as `@stellar-kit/core@0.1.0`.**

**Owns:**

- Base layout shell (`BaseLayout.astro`)
- SEO utilities (`SEO.astro`, `defineSeo()`)
- Analytics injection (GTM via Astro Integration hook)
- Form handling abstraction (`FormWrapper.astro`, `submitForm()`)
- Shared utilities and TypeScript types

**Does not own:**

- Marketing sections (hero, pricing, testimonials)
- Brand styles
- Route definitions
- Page content
- Site-specific layouts

The core package is infrastructure-only.

---

### 2️⃣ Site Implementations (Consumer Repositories) ✅ REFERENCE SITE COMPLETE

**stellarkit-site** — A fully functional reference implementation.

Each site:

- Installs the engine as a dependency (via `file:../stellarkit-core` in local dev)
- Defines its own routes using Astro folder-based routing
- Owns layouts and page composition
- Owns content
- Owns styling and visual identity
- Can create custom components

Each site deploys independently.

**Current Status:**
- `src/pages/index.astro` and `src/pages/about.astro` implemented
- `Hero.astro` and `FeatureGrid.astro` components created
- **Tailwind CSS v4 styling system:** Global utilities via `@import "tailwindcss"`, brand tokens configured in `@theme`
- Environment variables configured (`.env` for local dev)
- Lighthouse verification: Pending

---

# Technology Stack

## Framework

- Astro
- Fully static pre-rendered output
- No runtime content fetching in production
- No React compatibility layer

---

## Deployment

- Static hosting platform (Cloudflare Pages, Vercel, or Netlify)
- GitHub integration for automatic builds and deployments
- Static site output (no server required)

---

## Styling ✅ IMPLEMENTED

- **Tailwind CSS v4:** CSS-first utility framework with `@import "tailwindcss"` single directive
- **Theme Configuration:** Brand tokens (colors, typography) centralized via `@theme` in `global.css`
- **No scoped styles:** Components use Tailwind utilities directly in markup; no `<style>` blocks
- **Responsive Design:** Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.) for mobile-first layouts
- **Hover & Interactive States:** Built-in support for `:hover`, `:focus`, and other states via Tailwind variants

---

## Analytics ✅ IMPLEMENTED

- Google Tag Manager injection handled by core's Astro Integration hook (`astro:config:setup`)
- Configurable via `PUBLIC_GTM_ID` environment variable
- No runtime SDK logic in site repos
- GTM script automatically injected when `PUBLIC_GTM_ID` is set

---

## Forms ✅ IMPLEMENTED

- Core provides form wrapper logic (`FormWrapper.astro`, `submitForm()` utility)
- Each form configures submission endpoint via `webhookUrl` prop
- No provider-specific SDK required
- Form submission abstraction handles webhook POSTing
- Configuration co-located with form (no environment variables)

---

## SEO ✅ IMPLEMENTED

Core provides:

- Meta tag management via `SEO.astro` component
- Open Graph support
- Twitter card support
- Canonical URL handling
- Schema validation via `defineSeo()` utility

Sites supply metadata per page using `defineSeo()`.

No runtime SEO fetching.

---

# Routing Strategy

- Folder-based routing (Astro default)
- Defined entirely in site repositories
- Engine does not control routing

Supports:

- Single-page sites
- Multi-route marketing sites
- Nested sections
- Documentation-style structures

---

# Content Strategy

No global JSON abstraction layer.

Content may live:

- Directly inside Astro pages
- In Astro Content Collections (optional)
- In Markdown files (optional)

Engine does not enforce a content schema.

---

## CI/CD Workflow — Phase 3 ⏳ PENDING

### Core Package Repository — TO DO

1. Lint (eslint)
2. Type check (tsc)
3. Build (tsup)
4. Publish new npm version (via GitHub Actions + changesets)

### Site Repository — TO DO

1. Lint (eslint)
2. Type check (astro check)
3. Build (Astro pre-render)
4. Deploy to Cloudflare Pages

Sites upgrade engine intentionally via dependency updates.

No automatic upstream merging.

---

# Versioning Strategy

Engine follows semantic versioning:

- **MAJOR** → breaking changes
- **MINOR** → new non-breaking features
- **PATCH** → bug fixes

Sites:

- Pin or range engine versions
- Upgrade intentionally
- Validate before deployment

No forking of core code.

---

## Local Development ✅ WORKING

During local development, `stellarkit-site` references `@stellar-kit/core` via a `file:` path in its `package.json`:

```json
"dependencies": {
  "@stellar-kit/core": "file:../stellarkit-core"
}
```

**Verified:**
- `pnpm install` correctly resolves core from local file path
- `pnpm dev` runs dev server at http://localhost:4321
- GTM script injection works when `PUBLIC_GTM_ID` is set
- SEO meta tags render correctly in page source
- Components import and render without errors

Run `pnpm install` in `stellarkit-site` after any changes to `stellarkit-core` to pick up updates.

---

# Governance Rules

To prevent fragmentation:

### Rule 1: Engine Must Stay Small

Engine owns only infrastructure:

- Layout shell
- SEO
- Analytics
- Form abstraction
- Base CSS

Marketing components belong in sites.

---

### Rule 2: No Feature Creep

If a feature applies to only one site, it does not go into the engine.

---

### Rule 3: Stable Public API

Engine API must be:

- Minimal
- Clearly documented
- Versioned intentionally

---

### Rule 4: No Copy-Paste Reuse

All shared logic must be consumed as a dependency.

---

# What This Is Not

- Not a CMS
- Not a marketing block builder
- Not a visual theme marketplace
- Not framework-agnostic
- Not a full frontend platform

It is a lightweight Astro infrastructure layer.

---

# Long-Term Vision

- Multiple sites consume the core package
- Core stabilizes and changes infrequently
- Sites evolve independently
- Analytics and forms remain consistent
- Deployment remains automated

The goal is:

**Stable infrastructure + fast experimentation at the site layer**

---

# Why Astro

Astro provides:

- Static pre-rendering
- Excellent SEO support
- Minimal client-side JavaScript
- Flexible content modeling
- Clean layout/page separation
- Simple Cloudflare deployment

It aligns well with marketing-focused site architecture.

---

# Summary

This project establishes:

> A versioned Astro infrastructure package for marketing and validation sites, consumed by independent site repositories that own presentation and content.

The result:

- Fewer repeated bugs
- Cleaner upgrades
- Reduced fragmentation
- Faster experimentation
- Long-term maintainability
