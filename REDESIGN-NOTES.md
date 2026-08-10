# Site redesign — 2026 refresh

## Scope: the whole site is now converted

All 27 pages are rebuilt on one design system. The shared primitives live in
`client/components/site.tsx` — `PageHero`, `Section`, `SectionHeading`, `Card`,
`CardGrid`, `ProcessSteps`, `CheckList`, `CTABand`, `Split`, `Prose`,
`PrimaryCTA`, `SecondaryCTA`. **Build pages from these.** If a page needs
something new, add it to `site.tsx` rather than hand-rolling it locally —
that file is what stops the site drifting back into 27 different card styles.

Verified: `npx tsc --noEmit` clean · `node scripts/contrast-check.mjs` 20/20 ·
`npm test` 5/5 · `npm run build:client` clean.

### Substantive things found and fixed during the rebuild

- **`/capabilities` presented individual prior employment as company past
  performance.** 17 organizations (BMC, Cigna, T-Mobile, PepsiCo, Republic
  Services…) sat under a "Past Performance" heading with the line "One Algorithm
  has partnered with leading organizations to deliver transformative IT
  solutions." You confirmed these are prior employment. Relabelled **"Key
  Personnel Experience"** with an explicit note that they reflect individual
  experience, not contracts held by the company. FAR 15.305 permits key-personnel
  experience where corporate past performance is limited — but it has to be
  labelled as such. This was the single most consequential item on the site.
- **"Federal clients" claimed in four places** — the capabilities hero, the
  company description in `shared/companyProfile.ts` (which feeds Organization
  JSON-LD), and the capabilities meta + OG descriptions (what Google and
  LinkedIn display). All reframed to certification and eligibility. No awards
  have been made, so the claim was not supportable on the one page contracting
  officers actually verify.
- **"Cleared technical specialists"** on the government page — an active
  clearance is normally contract-sponsored, so the word implied prior federal
  work. Removed. Confirm before restoring.
- **Two dead buttons** on the website-development pages rendered
  "Schedule a Consultation" with no handler — clicking did nothing. Now link to
  `/contact`.
- **The Oracle ERP and Salesforce "Four Pillars" accordions** were `<div>`s with
  `onClick` — not focusable, not keyboard-operable, no ARIA state, and they hid
  the detail buyers scan for. Content is now visible.
- **`/404` had no nav or footer** — it did not use `Layout`, so a bad URL was a
  dead end with one text link. Fixed, with recovery links.
- **`/ai-info` nested `<main>` inside `<main>`** — duplicate landmark. Fixed.
- **The procurement registrations list existed twice** — once in shared data,
  once hard-coded in the component — and the copies had already drifted (the
  hard-coded one had lost the SAM.gov UEI row). Now single-sourced.
- **Three empty "Success Stories" sections** (SEO, MarTech, Google Ads) were
  headings with "available on request" and nothing behind them. Deleted rather
  than filled — nothing was invented.
- **Contact page**: the phone number was plain text, so the only tappable phone
  on the site sat *behind* the form — reachable only after converting. Phone and
  email are now links. Emoji used as UI icons (📞 ✉️) replaced with real icons.
- **The mobile menu's primary CTA** was still white-on-orange at 1.95:1 after
  the homepage fix. Now uses the ink label.
- Empty data arrays no longer render bare headings; every array-backed section
  is length-guarded.

### Motion, glass and gradients

framer-motion was in `package.json` and **completely unused** — the install cost
was being paid for nothing. It now drives the scroll reveals.

**What was added**

- **Scroll reveal** on every section heading, card grid and process list. It is
  wired into `SectionHeading`, `CardGrid` and `ProcessSteps` inside `site.tsx`,
  so all 27 pages got it without a single page edit — and it stays consistent.
- **Stagger** at 60ms across a grid, capped by grid size.
- **Glass on the sticky nav.** The single legitimate use: a bar that content
  scrolls under. `bg-white/70` + `backdrop-blur-xl`, with a `bg-white/90`
  fallback for browsers where `backdrop-filter` is unavailable or disabled —
  a bar that depends on blur for legibility must fail open.
- **Gradients** are atmospheric only: a single radial luminance shift on the
  dark ground, a directional scrim over the hero video, and ~1KB of SVG grain
  at 4-5% over both to kill banding.

**Numbers, and why they are these numbers**

| | Used | Why not the usual |
|---|---|---|
| Travel | **16px** | 40px is the AOS-script tell |
| Duration | **350ms** | over ~500ms reads sluggish |
| Easing | `[0.22, 1, 0.36, 1]` | browser-default `ease` reads generic |
| Repeat | **once only** | re-animating on scroll-up is dated |
| Stagger | **60ms** | 12 items at 150ms takes 1.8s and looks broken |
| Properties | **transform + opacity only** | both composite on the GPU; neither triggers layout |

Deliberately **not** added: gradient text, gradient buttons, a two-stop brand
gradient hero, glass on content cards, parallax, animated counters, or anything
that animates above the fold. The hero H1 never animates in — an H1 that fades
in is an H1 that is invisible when Largest Contentful Paint is measured.

Reduced motion is honored at the component level, not just in CSS: `Reveal`,
`Stagger` and `ProcessSteps` return plain elements when `useReducedMotion()` is
true, so no animation is registered at all.

### Inner-page heroes: a substance panel, not a photograph

Every page except the homepage looked like it was missing a hero image. The
actual problem was different: the hero text is left-aligned in a 1200px
container, so the right ~40% was dead space.

A photograph is the obvious fix and the wrong one. There is no owned
photography beyond the hero video and four team portraits, and stock imagery on
a consulting site makes a firm indistinguishable from every competitor while
adding 150-400KB that becomes the Largest Contentful Paint element. One
competitor site reviewed during research ships a hero image still named
`iStock-507754074_Main-Cover.png`.

So `PageHero` gained a `panel` prop: a right-hand card carrying the page's own
key points and, where applicable, a credential the reader can verify. It fills
the space with something a buyer actually reads, weighs nothing, and needs no
assets or licensing.

**The content rule, enforced across all 20 pages that got one:** panel items are
**relocated, never written**. Most pages already passed a `bullets` array to the
hero — those moved into the panel and the `bullets` prop was deleted, so nothing
renders twice. Pages without bullets use their own feature or capability titles,
read via `.map()` off the same array the section below renders, so the panel and
the page cannot drift apart. No new claim, number, capability or outcome was
introduced anywhere.

Credential footers are restricted to what is true and relevant:
`SBA Certified WOSB / EDWOSB` company-wide; `Salesforce Consulting Partner` on
the Salesforce page only; `UEI` and `CAGE` on the government page, imported from
`shared/companyProfile.ts` rather than typed. The government panel describes
eligibility and registration only — it names no agency, award or past
performance.

### Logo: 315KB → 15KB

`globe-logo.png` is a 512×512, 315KB PNG that was loaded **eagerly on every
page** to fill a box between 20 and 44 pixels wide. It was the heaviest asset on
the site and ~95% of those bytes were discarded by the downscale.

It now loads a 128px derivative (15KB webp, 25KB png fallback), which still
covers a 44px box at 3× device pixel ratio. The original is kept because
`index.html` cites it as the Organization logo in JSON-LD, where a larger image
is correct — it is simply no longer downloaded to render a 30px glyph.

### The bug the animations caused, and the guard that now prevents it

Adding scroll reveals silently broke the prerender. framer-motion parks an
element at `opacity: 0` until it scrolls into view; Puppeteer renders at one
viewport height, so everything below the fold was captured mid-animation.
**22 of 27 pages shipped static HTML whose main content was invisible without
JavaScript** — `/capabilities` alone had 27 hidden blocks. Nothing caught it:
the pages built, had correct titles, and passed the existing content-length
check.

Two fixes in `scripts/prerender.mjs`:
1. The prerenderer now scrolls each page to settle every reveal, then forces any
   stragglers to their resting state (twice — the animation loop can re-apply an
   inline style between the sweep and serialization).
2. **The build now fails** if any page is about to ship `opacity: 0` or an
   unresolved `translateY`. This caught `/services` on the first run, whose
   11-card stagger outlasted my original settle time. That is the check working,
   not a false positive.

### Known remaining work

- `client/pages/Events.tsx` is **orphaned** — not routed, not linked, not in the
  sitemap — and contains placeholder events plus two fabricated past events with
  attendee counts. It was left untouched because it is unreachable. **Delete it
  or rewrite it; do not route it as-is.**
- The industry and service versions of Website Development and Marketing still
  share word-for-word body copy. Framing was differentiated; the sentences were
  not. Someone needs to decide which page owns them.
- The logo keeps `#ffa634` on white in the nav. That is correct — WCAG exempts
  logotypes from contrast requirements.

---

# Homepage redesign — 2026 refresh

Branch `redesign/2026-refresh`. Nothing is deployed. Production is still `main`.

Preview locally with `npm run dev`:

- **http://localhost:8080/** — the new homepage
- **http://localhost:8080/legacy-home** — the current live homepage, kept
  temporarily so the two can be compared in two browser tabs

---

## Branding: unchanged

Both brand colours are byte-identical — `#005eaa` and `#ffa634` — and so is the
`One` + `Alg` + globe + `rithm` wordmark, its hover animation, the favicons and
the OG image. **The hero background video is kept**, and so is the
"From Strategy to Support" tagline. The `onealgo.*` Tailwind ramp is untouched,
which is why all 27 other pages still render exactly as before.

What changed is **how the orange is spent**. It was doing five jobs at once:
headings, card icons, hover borders, checkmarks and every button. An accent that
marks everything marks nothing. It now marks the tagline, the primary CTA and
dark-section accents, and nothing else.

## The accessibility fix (the most important change here)

`#ffa634` is **1.95:1 on white**. That fails WCAG AA for body text (4.5:1),
fails AA for large text (3:1), and fails even the 3:1 floor for non-text UI. The
old primary CTA was white text on that orange — so **"Talk to an Expert", the
most important button on the site, was the least readable element on it.**

This is commercial, not just ethical: the firm sells to government buyers who
are themselves bound by Section 508, and an inaccessible site from an IT
integrator reads as a competence signal.

The fix keeps the brand orange and changes only what sits against it:

| | Before | After |
|---|---|---|
| Primary CTA | white on `#ffa634` — **1.95:1** | ink `#0d1b2a` on `#ffa634` — **8.91:1** |
| Orange as text on light | `#ffa634` — **1.95:1** | `#9a4f00` — **6.01:1** |
| Orange as accent | on white, unreadable | on night `#04182b` — **9.19:1** |

`node scripts/contrast-check.mjs` verifies every pairing and exits non-zero on a
regression. It also asserts the three forbidden pairings still fail, so the
guard can't quietly stop meaning anything.

## Typography

The site had **no `fontFamily` set at all** and rendered in Segoe UI / SF for its
entire life. A previous attempt to ship Inter and Roboto failed because all
three `.woff2` files were saved HTML 404 pages rather than fonts.

Now self-hosted and verified by magic bytes: **Instrument Sans** (variable,
30KB) and **JetBrains Mono** (variable, 40KB, for labels and identifiers). Latin
subset, `font-display: swap`, no Google Fonts request. 70KB total.

This is the single largest visual change on the page.

## The hero video

Kept, with a changed treatment. It previously sat under a flat two-stop
brand-blue wash — the most recognisably 2018-era agency treatment there is, and
it reads as a filter laid over footage. It now has a directional scrim: dark at
the top and bottom, lighter through the middle, plus ~1KB of SVG grain. The
footage stays visible in the band where there is no text, and the headline sits
at full contrast instead of competing with the busiest part of the frame.

The reduced-motion handling is preserved exactly: when a visitor has asked their
system to reduce motion the `<source>` elements are never rendered, so the 1.3MB
of video is not merely paused, it is never fetched. That was already better than
most production sites.

## Structure

The old homepage ran hero → 4 cards → 4 icon tiles → ~1,100 words of SEO prose →
CTA, with roughly four screens of scroll between the hero and the next ask.

The new order:

1. **Hero** — video, headline, tagline, two CTAs, then a strip carrying UEI /
   CAGE / primary NAICS / SAM status / founded. A contracting officer
   copy-pastes a UEI; it previously existed only inside JSON-LD.
2. **Independently verifiable** — the four third-party credentials, each linking
   to the registry that confirms it.
3. **What we do** — **staff augmentation and website development lead**, because
   that is where revenue actually comes from today. Oracle ERP, Salesforce, IT
   consulting, operations technology, MarTech/SEO and Zendesk follow. Every tile
   links to a service page that already exists — the old SEO block carried 1,100
   words and not one internal link.
4. **How we work** — the four-step engagement already described on the IT
   Consulting, Operations Technology and Oracle ERP pages.
5. **Why OneAlgorithm** — 24/7 support, senior people, platform-agnostic,
   strategy-through-support.
6. **Industries.**
7. **Government** — eligibility and identifiers (see below).
8. **FAQ** — visible at last. The page was already emitting FAQPage structured
   data with no on-page content behind it, which is exactly what Google asks you
   not to do.
9. **Closing CTA.**

## Footer and the platform list

The footer sat on bright brand blue `#005eaa` while the new dark sections use
navy `#04182b`, so it read as a different site bolted onto the bottom. It now
shares the navy ground, and the boundary with the closing section is a hairline
rather than a colour change. Column headings, link colours and borders were
retuned to match; the six social icons had six different hover colours
(including a purple-to-pink Instagram gradient) and are now uniform.

**The platform marquee is kept.** It scrolled 18 chunky filled chips — rounded
boxes on a blue ground, each with its own hover-scale. The motion was never the
problem; the weight was. At that weight a row of boxed company names reads as a
client logo wall, which is why a trademark disclaimer sits further down.

The rebuilt version keeps the scroll and drops the weight: plain type on the
footer ground, hairline diamond separators, a single compact line sharing a row
with its label, and an edge fade instead of a hard cut. It also now **pauses on
hover and on keyboard focus**, so a name can actually be read, and under
`prefers-reduced-motion` it stops and wraps to multiple rows rather than leaving
half the list unreachable. The duplicate set that makes the loop seamless is
`aria-hidden`, so a screen reader hears the list once instead of twice.

**Footer height.** It was roughly three screens. The worst offender was the
bottom: copyright, trademark disclaimer and E-Verify were three separately
bordered blocks stacked vertically, each with its own margin and padding —
about 180px to say three short things. They now share one row and one rule.
Everything else was tightened rather than removed: link text to 14px, tighter
leading, smaller social buttons, smaller wordmark, trimmed section padding.
**No links were deleted** — every page in the footer is still linked, which
matters for both navigation and crawling.

## Government framing — deliberate and important

You confirmed **no government contract has been awarded yet**. Every government
reference on the new homepage is therefore phrased as *eligibility and
registration*, never as experience or past performance:

- "Set-aside eligible and registered to receive award"
- "so a contracting officer can verify eligibility during market research"
- Certifications are described as certifications, not as delivery

Nothing on the page implies federal past performance.

**Related risk on another page:** `/capabilities` renders the 17 organisations in
`shared/capabilities-data.ts` (BMC Software, Cigna, T-Mobile, PepsiCo, Republic
Services…) under a "Past Performance" heading. You have confirmed these are
**individual prior employment, not company engagements**. Presented under that
heading on a capability statement, a contracting officer will read them as
corporate past performance. FAR 15.305 does allow key-personnel experience to
count where corporate past performance is limited — but it has to be *labelled
as individual experience*. I have not changed that page; it needs relabelling
before it goes in front of a government buyer. This is the most consequential
item on this list.

## Claims

**I invented nothing.** Every claim on the new page already existed in this
repository or was confirmed by you.

- **24/7 support — kept.** You confirmed it is real, so it is now a named
  differentiator rather than a buried bullet.
- **"200+ technology projects" and "40+ years combined" — not carried over.**
  Nothing in the repo substantiates them and they conflict with "hundreds of
  businesses" on the contact page. If you can substantiate them they should go
  back; quantified proof outperforms credentials.

## Fixed in this branch

- **Malvern, not Philadelphia.** You confirmed Malvern, so this was a
  straightforward bug. `index.html`'s Organization JSON-LD said Philadelphia
  with no street address; `public/llms.txt` and `/ai-info` said Philadelphia in
  seven more places. All now say Malvern, and the JSON-LD carries the full
  street address. Wording like "serving the Philadelphia metro area" was left
  alone — Malvern is in that metro, so it is a market statement, not a location
  claim. This mattered: those three files are what search engines and LLMs read.
- **`npm run dev` was broken.** `vite.config.ts` limited `server.fs.allow` to
  `./client` and `./shared`, but `index.html` sits at the repo root, so the dev
  server answered `403 Restricted` before reaching the app. Production builds
  were unaffected.

## Still needs your decision

1. **"24/7 support" vs "we'll get back to you within 24 hours"** — both on the
   contact page. Now that 24/7 is confirmed real, the contact-page wording is
   the one undermining it.
2. **"200+ projects" vs "hundreds of businesses"** — still contradictory on the
   live pages I did not touch.
3. **`/about` and `/capabilities` give the same three people different titles.**
4. **The FAQ structured data** still asserts "3-5x faster than traditional
   agencies", "200+ successful integrations", "95% client retention rate" and a
   "$15K to $500K+" price range. That schema is live and being fed to Google
   today. I used only the confirmed entries in the visible FAQ, but the schema
   itself should be reviewed.
5. **`public/media/logos/` holds 19 partner logo SVGs that are placeholders**,
   not real brand assets — its own README says so. Wiring them into a marquee
   would display fake Salesforce, Oracle and Microsoft marks.
6. **Three service pages** (SEO, MarTech, Google Ads) have "Success Stories"
   headings with "available on request" and nothing behind them.

## Recommended next

1. **Put Cal.com booking behind "Talk to an Expert."** Booking is already live
   for your email campaigns, so website visitors — your warmest traffic — get a
   worse path than campaign traffic. Two independent datasets covering ~5M form
   submissions put qualified-to-booked at 62–67% with instant scheduling.
2. Relabel the `/capabilities` past-performance section as key-personnel
   experience.
3. Two or three real case studies from the staff-augmentation and
   web-development work that is actually earning.
4. Roll the foundation onto the inner pages — they already inherit the font and
   tokens, but still use the old layout patterns.
5. Restore a CTA to the desktop header. Mobile has one; desktop has none.

## Before merging to `main`

- Delete the `/legacy-home` route from `client/App.tsx` and
  `client/pages/IndexLegacy.tsx`. It is absent from the sitemap and nav, but it
  should not ship.
- Run `node scripts/contrast-check.mjs` and `npx tsc --noEmit`.
- Remember that pushing `main` auto-deploys production in about two minutes.
