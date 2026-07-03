# OneAlgorithm Website — Work Summary (2026-07-02)

Branch: `review-fixes` · Base: `b5188f0` (ONEALGO-Website `main`) · Not deployed, not pushed at time of writing.

This document summarizes the reviewed batch of website changes prepared on the local working copy and grouped into the commit sequence below. It is a reconciliation of a single reviewed batch — the commit groups are logical groupings, not independently-deployed states.

## What changed, by area

### 1. Builder.io removal + local asset rehosting
- Removed the Builder.io CDN dependency for media. Hero video, team photos, logo, and the Government industry image are now served from `/public/media/` (`hero.mp4`, `hero.webm`, `hero-poster.webp`, `oa-logo.webp`, `team-1..4.webp`, `government.webp`).
- Updated `TeamSection.tsx`, `StructuredData.tsx`, `Index.tsx` (hero `<video>`), and `industries/Government.tsx` to reference local assets.
- Deleted `.builder/` rules/analysis files.

### 2. Dead dependencies, stale docs, duplicate config removed
- Removed unused 3D deps (`three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`) and `ffmpeg-static`; added `sharp` (favicons) and `puppeteer` (prerender). `package.json` + `pnpm-lock.yaml` updated.
- Deleted stale status docs (`COMPLETE_SEO_STATUS.md`, `COMPREHENSIVE_DEBUG_REPORT.md`, `DEPLOYMENT_READY.md`, `SEO_SUBMISSION_GUIDE.md`), duplicate/optimized variants (`client/App.optimized.tsx`, `vite.config.optimized.ts`, `client/pages/sections/*`), dead `netlify.toml` (Cloudflare uses `public/_headers` + `_redirects`), and duplicate `public/site.webmanifest`.

### 3. Contact form + Salesforce Web-to-Lead hardening
- `Contact.tsx`: spam honeypot, email regex validation, delivery-confirmation via hidden-iframe `load` event + 15s failure timeout (no more false "Thank you"), `lead_source` = "Web" (matches the org picklist), removed non-real intl office phone numbers (kept the real US number).
- Added `CONTACT_FORM_SALESFORCE_CONNECTION.md` project note + admin verification steps. Points at the correct Salesforce BPO org.

### 4. Zendesk service page + navigation
- New `/services/zendesk` page; route wired in `App.tsx`; partner positioning in `TrustedPartnerships.tsx`; contact-form dropdown option.

### 5. Capabilities page — route + cleanup
- `/capabilities` route; `CapabilitiesMainContent.tsx` deduped; official certifications reflected in `capabilities-data.ts` (EDWOSB, WOSB, WBENC, NMSDC MBE, VA SWaM, SDB/SB, Nassau Co. LI MWBE — all Certified). Compliance/quality claims not backed by certificates removed from `companyProfile.ts`. Capability statement PDF at `/public/docs/capability-statement.pdf`.

### 6. Homepage clarity, honest stats, visible content
- `Index.tsx`: removed the Oracle ERP section + button; new page title; un-collapsed "Learn More/Read More" blocks into visible content; softened unverifiable stats to honest, defensible phrasing.

### 7. CTA unification
- Unified calls-to-action to **"Talk to an Expert"** across all page/section files and the nav (`Layout.tsx`), which also carries the new Capabilities nav link, larger mobile tap targets, and a dynamic footer year.

### 8. SEO, sitemap, security headers, favicon, prerender
- `public/_headers`: HSTS + fuller Permissions-Policy (CSP deliberately deferred — would break the contact form/Maps/video without testing).
- `index.html`: new title/OG/Twitter, removed deprecated `X-XSS-Protection` meta and the Builder dns-prefetch.
- `public/sitemap.xml`: expanded to full route set.
- Full favicon/app-icon set regenerated from the globe logo (`scripts/generate-favicons.cjs`; `favicon.*`, `apple-icon-*`, `android-icon`, `ms-icon`, `icon-192/512(+maskable)`, `manifest.json`).
- `scripts/prerender.mjs`: Puppeteer static-HTML-per-route prerender to fix the SPA blank-shell SEO problem. **Built but NOT wired into the production build command** — enabling it is a separate, deliberate deploy-time decision.

### 9. Docs
- This work summary + the Salesforce connection note.

## Explicitly EXCLUDED from these commits
- `node_modules/`, `.env`, `dist/` — gitignored.
- `public/marquee-example.html` — throwaway local preview, not part of the live site.
- `public/media/logos/*` — preview-only logo assets used solely by the throwaway marquee preview, not by the live site.

## Post-deployment checklist (NOT done yet — requires live site + approvals)
1. Deploy to a Cloudflare **preview** first (via PR), verify.
2. Decide on enabling the prerender step in the production build; decide on a tested CSP.
3. Run a **controlled** contact-form Web-to-Lead test (with Salesforce admin) — not a production test without approval.
4. **Salesforce campaign capability-link swap (post-production, gated):** After the site is live, replace old Google Docs / Google Drive capability-statement links in Salesforce campaign email templates with `https://onealgorithm.com/capabilities` (use `https://onealgorithm.com/docs/capability-statement.pdf` only where a direct-PDF link is required). Preconditions before proposing any change:
   - `https://onealgorithm.com/capabilities` returns 200 live
   - `https://onealgorithm.com/docs/capability-statement.pdf` returns 200 live
   - Confirm the deployed Capabilities page has the correct capability-statement download
   - Identify every campaign template using the old Google link and report a replacement plan
   - **Do not modify any Salesforce template until the plan is approved.** No Salesforce metadata or record changes.
