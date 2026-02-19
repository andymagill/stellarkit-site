# stellarkit-site — Deployment Setup

## Overview

`stellarkit-site` deploys as a static Astro site via a hosting platform's GitHub integration. The platform watches your repository, automatically builds on every push to `main`, and deploys without requiring any deployment tokens or secrets in GitHub.

This guide covers three equivalent platforms:
- **Cloudflare Pages** — Zero-config, edge-optimized static hosting
- **Vercel** — Full-stack-ready static hosting  
- **Netlify** — Developer-friendly static hosting with preview deploys

All three platforms:
- ✅ Auto-detect pnpm and Astro
- ✅ Build via `pnpm build` → `dist/`
- ✅ Support per-environment variables
- ✅ Generate preview URLs for PRs
- ✅ Require no GitHub secrets or tokens

Choose one platform and follow its setup section below.

---

## How It Works

1. **GitHub Actions Pre-Flight Checks** (`deploy.yml`)
   - Runs on every push and PR
   - Lint, type check, build validation
   - Lighthouse audit on main branch pushes
   - Results viewable in GitHub Actions logs

2. **Hosting Platform Independent Build**
   - Platform detects push to `main`
   - Platform runs build (pre-configured build command)
   - Platform deploys to CDN/edge
   - Site becomes live at platform domain or custom domain

**Key point:** The platform's GitHub integration is independent of GitHub Actions. Your workflows validate code; the platform handles deployment.

---

## Platform Comparison

| Feature | Cloudflare Pages | Vercel | Netlify |
|---------|-----------------|--------|---------|
| **GitHub Integration** | ✅ | ✅ | ✅ |
| **Auto-build on push** | ✅ | ✅ | ✅ |
| **pnpm auto-detect** | ✅ | ✅ | ✅ |
| **Astro auto-detect** | ✅ | ✅ | ✅ |
| **Build command** | `pnpm build` | `pnpm build` (auto) | `pnpm build` (auto) |
| **Output directory** | `dist/` | `dist/` (auto) | `dist/` (auto) |
| **PR preview URLs** | ✅ | ✅ | ✅ |
| **Env vars per environment** | ✅ | ✅ | ✅ |
| **No GitHub secrets needed** | ✅ | ✅ | ✅ |
| **Custom domain** | ✅ | ✅ | ✅ |

---

## Setup: Cloudflare Pages

### 1. Create Cloudflare Account

1. Visit https://dash.cloudflare.com/
2. Sign up with email and create password
3. Verify email

### 2. Connect GitHub Repository

1. In Cloudflare Dashboard → **Pages** → **Create a project**
2. Select **Connect to Git**
3. Authorize GitHub and select repository: `andymagill/stellarkit-site`
4. On the **Build settings** page:
   - **Framework preset**: Astro (or leave blank for manual config)
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**

Cloudflare will trigger the first build immediately. You can monitor progress in the Cloudflare Pages dashboard.

### 3. Set Environment Variables

1. In project settings → **Environment variables**
2. Under **Production**, add:
   - **`PUBLIC_GTM_ID`** = `GTM-XXXX` (your Google Tag Manager ID)
3. Click **Save and Deploy**

To verify: visit your site and check page source for GTM script tag.

### 4. Configure Custom Domain (Optional)

1. In project settings → **Domain management**
2. Click **Add a domain**
3. Point your DNS records to Cloudflare (instructions provided)
4. DNS propagation usually takes 5–60 minutes

### 5. Verify Automatic Deployments

Push a test commit to `main`:
```bash
git commit --allow-empty -m "trigger deploy test"
git push origin main
```

Watch the Cloudflare Pages dashboard — a new deployment should start within seconds.

---

## Setup: Vercel

### 1. Create Vercel Account

1. Visit https://vercel.com/signup
2. Sign up with GitHub (recommended for streamlined auth)
3. Create team or use personal account

### 2. Connect GitHub Repository

1. In Vercel Dashboard → **Add New** → **Project**
2. Click **Import Git Repository**
3. Authorize GitHub and select: `andymagill/stellarkit-site`
4. On the **Configure Project** page:
   - **Framework**: Astro (or auto-detected)
   - **Build command**: `pnpm build` (auto-filled)
   - **Output directory**: `dist` (auto-filled)
   - **Install command**: `pnpm install` (auto)
5. Click **Deploy**

Vercel will build and deploy immediately.

### 3. Set Environment Variables

1. In project settings → **Environment variables**
2. Under **Production**, add:
   - **`PUBLIC_GTM_ID`** = `GTM-XXXX` (your Google Tag Manager ID)
3. Click **Save and Deploy**

To verify: visit your site and check page source for GTM script tag.

### 4. Configure Custom Domain (Optional)

1. In project **Settings** → **Domains**
2. Click **Add** and enter your domain
3. Follow instructions to update DNS records
4. Vercel provides DNS instructions specific to your registrar

### 5. Verify Automatic Deployments

Push a test commit to `main`:
```bash
git commit --allow-empty -m "trigger deploy test"
git push origin main
```

You should see a new deployment in the Vercel dashboard within seconds. Preview and production URLs are both available.

---

## Setup: Netlify

### 1. Create Netlify Account

1. Visit https://app.netlify.com/signup
2. Sign up with GitHub (recommended)
3. Authorize GitHub access

### 2. Connect GitHub Repository

1. In Netlify → **Sites** → **Add new site** → **Import an existing project**
2. Select **GitHub** as provider
3. Authorize and select repository: `andymagill/stellarkit-site`
4. On the **Build settings** page:
   - **Build command**: `pnpm build` (auto-filled or manually enter)
   - **Publish directory**: `dist` (auto-filled or manually enter)
5. Click **Deploy site**

Netlify will build and deploy immediately.

### 3. Set Environment Variables

1. In site **Settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add for **Production**:
   - **`PUBLIC_GTM_ID`** = `GTM-XXXX` (your Google Tag Manager ID)
4. Click **Save**
5. Trigger redeployment: **Deploys** → **Trigger deploy** → **Deploy site**

### 4. Configure Custom Domain (Optional)

1. In site **Settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain
4. Update your registrar's DNS records (Netlify provides specific instructions)

### 5. Verify Automatic Deployments

Push a test commit to `main`:
```bash
git commit --allow-empty -m "trigger deploy test"
git push origin main
```

A new deploy should appear in Netlify's **Deploys** list within seconds.

---

## Environment Variables

The only required environment variable is set in your hosting platform dashboard:

| Variable | Purpose | Required |
|----------|---------|----------|
| **`PUBLIC_GTM_ID`** | Google Tag Manager account ID | ✅ Yes |

**Local development** (not pushed to GitHub):
Create `.env` with this variable for testing locally:
```
PUBLIC_GTM_ID=GTM-XXXXXX
```

---

## GitHub Actions Workflow

The `deploy.yml` workflow handles pre-flight validation on every push:

```
Push to main / PR
   ↓
1. Check out repo
2. Install dependencies (pnpm)
3. Run linter (pnpm lint)
4. Run type checker (npx astro check)
5. Run build (pnpm build)
6. (Main branch only) Run Lighthouse audit
   ↓
If all pass: Green checkmark in PR
If any fail: Red X — shows which step failed
```

**Note:** This workflow doesn't deploy. Your hosting platform deploys independently after the push is complete.

---

## Form Configuration

Forms are configured with their webhook endpoint directly in the component. This keeps form logic close to its configuration and avoids environment variable proliferation.

### Basic Form with Webhook

Specify the webhook URL directly on the `FormWrapper` component:

```astro
---
// src/pages/contact.astro
import FormWrapper from '@stellar-kit/core/components/FormWrapper.astro';
---

<FormWrapper webhookUrl="https://hooks.example.com/contact">
  <label>
    <span>Your message:</span>
    <textarea name="message" required />
  </label>
  <button type="submit">Send</button>
</FormWrapper>
```

### Multiple Forms with Different Endpoints

Each form specifies its own webhook:

```astro
---
// src/pages/multi-form.astro
import FormWrapper from '@stellar-kit/core/components/FormWrapper.astro';
---

<h2>Contact Us</h2>
<FormWrapper webhookUrl="https://hooks.example.com/contact">
  <input type="text" name="subject" required />
  <textarea name="message" required />
  <button type="submit">Send</button>
</FormWrapper>

<h2>Newsletter Signup</h2>
<FormWrapper webhookUrl="https://hooks.example.com/newsletter">
  <input type="email" name="email" placeholder="your@email.com" required />
  <button type="submit">Subscribe</button>
</FormWrapper>
```

### Benefits of Per-Form Configuration

- **Co-located:** Webhook endpoint lives with the form, not in environment config
- **Explicit:** No implicit fallbacks or environment variable lookup
- **Flexible:** Different forms can target different endpoints without coordination
- **Maintainable:** Easier to track which forms send where

---

## Troubleshooting

### Build Fails: "Command not found: pnpm"

The platform didn't detect pnpm. 

**Fix:**
- Ensure `pnpm-lock.yaml` is committed and pushed (not `.npmrc` files)
- If using pnpm workspaces, explicitly set build command: `pnpm build`

### Build Fails: "dist/ not found"

Astro didn't generate output directory.

**Fix:**
- Verify `astro.config.mjs` has `output: "static"`
- Run locally: `pnpm build` (should create `dist/`)
- Check build logs in platform dashboard for Astro errors

### Environment Variables Not Applied

GTM script isn't appearing in page source; webhooks not receiving data.

**Fix:**
1. Verify variables set in platform dashboard (not `.env`)
2. Redeploy the site (some platforms require explicit redeployment)
3. Clear browser cache (view page source)
4. Check platform build logs to confirm variables were injected

### Lighthouse Audit Fails

Performance or SEO scores below target (95+).

**Fix:**
- Lighthouse runs after build in `deploy.yml` — view GitHub Actions logs for scores
- Current setup: `continue-on-error: true` (doesn't block deployment)
- Debug locally:
  ```bash
  pnpm build
  npx serve dist  # Serves on http://localhost:3000
  # Run lighthouse manually in another terminal
  npx lighthouse http://localhost:3000
  ```
- Check for: unoptimized images, render-blocking CSS, missing meta tags

### Custom Domain DNS Not Working

Custom domain configured but site still inaccessible.

**Fix:**
- Verify DNS records updated at your registrar (can take 5–60 minutes)
- Use `dig` or `nslookup` to check propagation:
  ```bash
  dig mycompany.com
  ```
- Check platform's DNS instructions (each registrar differs slightly)
- Some platforms (Netlify) auto-verify; others require manual CNAME updates

---

## Useful Resources

- **[Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)** — Multi-platform deployment guides
- **[Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)** — Cloudflare-specific features
- **[Vercel Deployment Docs](https://vercel.com/docs/deployments)** — Vercel features and limits
- **[Netlify Docs](https://docs.netlify.com/)** — Netlify setup and configuration
- **[Environment Variables in Astro](https://docs.astro.build/en/guides/environment-variables/)** — Using public and private env vars
- **[Lighthouse CI](https://github.com/treosh/lighthouse-ci-action)** — Performance auditing

---

## Summary

| Step | Action |
|------|--------|
| 1 | Choose platform (Cloudflare / Vercel / Netlify) |
| 2 | Create account |
| 3 | Connect GitHub repository |
| 4 | Set build command (`pnpm build`) and output (`dist/`) |
| 5 | Add environment variables in platform dashboard |
| 6 | Push to `main` and verify automatic deployment |
| 7 | (Optional) Configure custom domain |

No GitHub secrets or tokens required. The platform's GitHub App handles authentication automatically.
