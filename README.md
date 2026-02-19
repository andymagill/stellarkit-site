# StellarKit Reference Site

A fully functional marketing site implementation using `@stellar-kit/core` and styled with **Tailwind CSS v4**.

This serves as the blueprint for creating new marketing and product-validation sites with StellarKit.

---

## 🎨 Styling with Tailwind CSS v4

This site uses **Tailwind CSS v4** for all styling. Tailwind utilities are applied directly in markup — no scoped `<style>` blocks.

### Brand Token Configuration

Brand colors and design tokens are centralized in `src/styles/global.css` using Tailwind's `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-brand: #667eea;
  --color-brand-dark: #764ba2;
  --color-text: #2d3748;
  --color-text-muted: #4a5568;
}
```

To customize brand colors for your own site, edit the `@theme` block in `global.css`.

### Responsive Design

Tailwind's responsive prefixes enable mobile-first design:

```html
<div class="px-8 md:px-16 lg:px-32">Responsive padding</div>
```

### Component Styling

Components use Tailwind utility classes directly in markup:

```astro
<section class="py-16 px-8 bg-gray-50">
  <h2 class="text-4xl font-bold text-[var(--color-brand)]">Title</h2>
</section>
```

No separate CSS files or `<style>` blocks are used for component styling.

---

## 🚀 Project Structure

```
src/
├── components/
│   ├── Hero.astro          # Hero section with gradient background
│   └── FeatureGrid.astro   # Responsive feature cards
├── pages/
│   ├── index.astro         # Home page
│   └── about.astro         # About page
└── styles/
    └── global.css          # Tailwind setup + brand tokens
```

---

## 🧞 Commands

All commands are run from the project root:

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `pnpm install`    | Installs dependencies                         |
| `pnpm dev`        | Starts local dev server at `localhost:4321`   |
| `pnpm build`      | Build production site to `./dist/`            |
| `pnpm preview`    | Preview production build locally               |
| `pnpm astro ...`  | Run Astro CLI commands                        |

---

## 📦 Core Integration

This site imports components and utilities from `@stellar-kit/core`:

- **BaseLayout:** Base HTML shell with head/body structure
- **SEO:** Meta tag management via `SEO.astro` component
- **FormWrapper:** Form handling with webhook submission
- **defineSeo():** Schema validation utility

The core package is referenced via `file:../stellarkit-core` in `package.json` for local development.

---

## 🌐 Deploying

This site is configured for automated deployment to **Cloudflare Pages**.

**Setup:**
1. Link this repository to Cloudflare Pages
2. Set environment variables:
   - `PUBLIC_GTM_ID` — Google Tag Manager ID
   - `FORM_WEBHOOK_URL` — Webhook endpoint for form submissions
3. Cloudflare will auto-deploy on every push to main

See [PHASE_3_SETUP.md](../PHASE_3_SETUP.md) for detailed deployment instructions.

---

## 📖 Learn More

- [StellarKit PLAN](../PLAN.md) — Implementation roadmap
- [StellarKit PROJECT](../PROJECT.md) — Architecture and philosophy
- [Tailwind CSS v4 Docs](https://tailwindcss.com) — Styling reference
- [Astro Docs](https://docs.astro.build) — Framework documentation
