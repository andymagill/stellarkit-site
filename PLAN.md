# **StellarKit Implementation Plan**

## **1\. Project Phase Overview**

| Phase | Focus | Key Deliverable | Status |
| :---- | :---- | :---- | :---- |
| **Phase 0: Repository Setup** | GitHub repo creation & local dev linking | `stellarkit-core` + `stellarkit-site` repos | ✅ COMPLETE |
| **Phase 1: Foundation** | Core architecture & Core APIs | `@stellarkit/core` (v0.1.0) | ✅ COMPLETE |
| **Phase 2: Validation** | Reference Site implementation | `stellarkit-site` | ✅ MOSTLY COMPLETE* |
| **Phase 3: Automation** | CI/CD & Publishing pipeline | Automated pnpm/Cloudflare flows | ✅ MOSTLY COMPLETE** |
| **Phase 4: Scaling** | Documentation & Contributor guide | Developer Docs & Migration Guide | ⏳ NOT STARTED |

## **2\. Technical Roadmap**

*\*Phase 2 is functionally complete; pending final Lighthouse verification (95+ Performance & SEO scores)*
**Phase 3 is code-complete; pending manual Cloudflare Pages setup and GitHub Secrets configuration*

### **Phase 0: Repository Setup** ✅ COMPLETE

* **GitHub Repositories:**
  * Create `stellarkit-core` repository on GitHub.
  * Create `stellarkit-site` repository on GitHub.
* **Local Initialization:**
  * `git init` in each project folder.
  * Create `.gitignore` (Node) in each repo.
  * Initial commit with `README.md` and `TASKS.md`.
  * Add GitHub remote and push `main` branch.
* **Local Dev Linking:**
  * `stellarkit-site/package.json` references `@stellarkit/core` via `file:../stellarkit-core`.
  * Run `pnpm install` in `stellarkit-site` after `stellarkit-core` has a valid `package.json`.

✅ **Status:** Both repos initialized on GitHub, local dev linking verified.

---

### **Phase 1: The Core Package (stellarkit-core)** ✅ COMPLETE

The goal is to build a versioned npm package (`@stellarkit/core`) that sites install as an Astro Integration with exported components and utilities.

* **Infrastructure Setup:** ✅
  * TypeScript-first repository configured with `tsup`.  
  * Exports in `package.json` expose components and utilities.  
* **Core Components:** ✅
  * `BaseLayout.astro`: Standard \<head\> and \<body\> shell implemented.  
  * `SEO.astro`: Handles \<meta\>, OpenGraph, and Twitter cards via props.  
  * `FormWrapper.astro`: Form handling abstraction with submission logic.  
* **Logic & Utilities:** ✅
  * `submitForm()`: Standard form submission utility for webhooks.  
  * `defineSeo()`: Schema validation for SEO metadata.  
  * GTM Integration: Astro Integration hook for conditional GTM script injection.

✅ **Status:** Published as `@stellarkit/core@0.1.0`. Build passes with zero type errors.  
### **Phase 2: Site Implementation (stellarkit-site)** ✅ MOSTLY COMPLETE

This serves as the blueprint for all future marketing sites.

* **Dependency Integration:** ✅
  * `@stellarkit/core` installed via `file:../stellarkit-core` in local development.  
* **Route Definition:** ✅
  * `src/pages/index.astro` and `src/pages/about.astro` created.  
  * Page-level metadata implemented with `defineSeo()`.  
* **Visual Identity:** ✅
  * **Tailwind CSS v4:** Single-directive CSS framework via `@import "tailwindcss"` and `@theme` for brand token configuration.
  * **Brand Token System:** Centralized in `global.css` using CSS custom properties (`--color-brand`, `--color-brand-dark`, `--color-text`, `--color-text-muted`).  
  * **Site-specific components:** `Hero.astro`, `FeatureGrid.astro` styled with Tailwind utilities, no scoped `<style>` blocks.  

⏳ **Pending:** Lighthouse verification (95+ Performance & SEO scores).

### **Phase 3: CI/CD & Publishing Pipeline** ✅ MOSTLY COMPLETE

Automated testing, versioning, and deployment workflows configured.

**Core Package (`stellarkit-core`):**
* **GitHub Actions Workflows:** ✅
  * `test.yml`: Lint, type check, and build on Node 18 & 20
  * `changesets.yml`: Automatic version bump PR creation
  * `publish.yml`: Automated npm publishing
* **Changesets Integration:** ✅
  * `@changesets/cli` installed
  * `.changeset/config.json` configured for public npm publishing
  * `publish-packages` script added to package.json

**Site Repository (`stellarkit-site`):**
* **GitHub Actions Workflow:** ✅
  * `deploy.yml`: Lint, type check, build, and Lighthouse audit on Node 18 & 20
* **Lighthouse Configuration:** ✅
  * `lighthouserc.json` configured with 95+ targets for Performance & SEO
  * Automated audit runs on main branch deployments

⏳ **Pending Manual Setup:**
  * Configure `NPM_TOKEN` secret in GitHub (stellarkit-core)
  * Link stellarkit-site to Cloudflare Pages
  * Set Cloudflare environment variables (`PUBLIC_GTM_ID`, `FORM_WEBHOOK_URL`)
  * ✅ **See:** [PHASE_3_SETUP.md](PHASE_3_SETUP.md) for detailed instructions

## **3\. Repository Architecture**

### **Core Package Repository (stellarkit-core)**

/src  
  /components  
    SEO.astro  
    Analytics.astro  
    FormWrapper.astro  
  /layouts  
    BaseLayout.astro  
  /utils  
    forms.ts  
    seo.ts  
  index.ts (Entry point — Astro Integration)  
package.json (name: @stellarkit/core)

### **Site Repository (stellarkit-site)**

/src  
  /components (Marketing blocks)  
    Hero.astro  
    FeatureGrid.astro  
  /pages  
    index.astro (Uses Core's BaseLayout)  
  /styles  
    global.css (Site-specific branding)  
package.json (dependency: @stellarkit/core via file:../stellarkit-core)  
astro.config.mjs

## **4\. CI/CD Workflow Detail**

### **Phase 3: Automation** ✅ MOSTLY COMPLETE

#### **Core Package Pipeline (GitHub Actions)** ✅

1. **Validation:** Run eslint and astro check. ✅
2. **Versioning:** On merge to main, use changesets to determine if a Major, Minor, or Patch release is required. ✅
3. **Distribution:** Publish to npm (or a private GitHub Packages registry). ✅

**Implementation:**
- `.github/workflows/test.yml`: Validates on Node 18 & 20
- `.github/workflows/changesets.yml`: Manages version bumps
- `.github/workflows/publish.yml`: Publishes to npm

**Setup Required:** Configure `NPM_TOKEN` secret in GitHub Actions

#### **Site Pipeline (Cloudflare Pages)** ✅

1. **Build:** Execute `pnpm build` (Astro Static Mode). ✅
2. **Environment:** Inject GTM\_ID and FORM\_WEBHOOK\_URL via Cloudflare Dashboard variables. ⏳
3. **Deploy:** Atomic deployment to Cloudflare Pages edge. ⏳

**Implementation:**
- `.github/workflows/deploy.yml`: Pre-deployment checks and Lighthouse audit
- `lighthouserc.json`: Performance and SEO verification

**Setup Required:** Link repository to Cloudflare Pages and configure environment variables

See [PHASE_3_SETUP.md](PHASE_3_SETUP.md) for complete setup instructions.

## **5\. Governance & Maintenance Rules**

### **The "Engine-Only" Test**

Before adding code to the Engine, ask:

1. Does this affect the visual "Brand" of the site? (If yes → **Site Repo**)  
2. Is this required for SEO, Tracking, or Core Security? (If yes → **Core Repo**)  
3. Will more than 80% of sites use this exact logic? (If no → **Site Repo**)

### **Versioning Policy**

* **Breaking Changes:** Any change to the BaseLayout props or the SEO schema requires a **Major** version bump.  
* **Non-Breaking:** Adding a new utility function (e.g., a new currency formatter) is a **Minor** bump.

## **5\. Phase 4: Scaling** ⏳ NOT STARTED

### **Documentation & Contributor Guide** — TO DO

1. Developer onboarding guide for using StellarKit in new projects
2. Migration guide for upgrading between core versions
3. Contribution guidelines for core maintainers
4. Architecture decision records (ADRs)

---

## **6\. Success Metrics**

* **Speed to Value:** A developer should be able to spin up a new, SEO-optimized validation site in under 30 minutes.  
* **Maintenance:** Bug fixes in the Analytics logic should propagate to all sites via a single `pnpm update`.  
* **Performance:** Sites must maintain a 95+ Lighthouse score for SEO and Performance by default.