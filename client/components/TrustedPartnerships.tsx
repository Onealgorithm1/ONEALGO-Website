import React from "react";

/**
 * Footer platform marquee.
 *
 * The motion, the edge fade and the pause-on-hover are unchanged from the
 * version that scrolled plain company names -- `.marquee` in global.css still
 * does all of it. What changed is what scrolls: 31 real marks instead of 18
 * words.
 *
 * WHY IT WAS TYPE BEFORE: every SVG in public/media/logos/ except four is a
 * PLACEHOLDER -- some are literally the company name typed in Inter -- so
 * shipping them would have put fake Salesforce, Oracle and Microsoft marks on
 * the site. The marks used here were pulled from Wikimedia Commons, rendered,
 * and checked by eye against each company's current official mark before being
 * allowed in. Provenance per file is in public/media/platforms/README.txt, and
 * they sit in their own folder so nobody can reach into the placeholder folder
 * by accident.
 *
 * ⛔ EIGHT PLATFORMS WE WORK ON ARE NOT SHOWN: MuleSoft, Aircall, Hootsuite,
 * Metricool, Oneflow, Groq, Higgsfield and Tripo3D have no official mark
 * obtainable from a citable source. They are named in type below instead. Do not "fix" that by drawing
 * something approximate -- an invented mark is the exact bug this section
 * already had once.
 *
 * Two decisions worth keeping:
 *
 * 1. BRAND COLOUR ON THE NIGHT GROUND, WITH SIX EXCEPTIONS. Two treatments
 *    were built and rejected before this one. A reversed all-white set failed
 *    because flattening a mark to one colour destroys any logo whose counter is
 *    a white shape -- the "in" in LinkedIn, the N in Notion and the wordmark
 *    inside the Salesforce cloud all became solid blobs. A white rail then
 *    failed because on a phone it rendered as a tall white capsule the width of
 *    the screen and read as a giant button.
 *
 *    What actually works: measure every mark against #04182b and treat only the
 *    ones that fail. 25 of the 31 come in at 4.5:1 or better and keep full
 *    brand colour. Six do not -- GitHub 1.05:1, Zendesk 1.37, Ghost 2.16,
 *    WordPress 3.49, and OpenAI and Grok which carry no fill and paint black by
 *    inheritance -- and every one of those is MONOCHROME, so its reversed form
 *    is the same artwork in white and there is no brand hue to lose. Those load
 *    from on-dark/. ⛔ Do not extend on-dark/ to a mark that carries colour;
 *    that is recolouring, which the assets' README forbids.
 *
 * 2. EQUAL OPTICAL AREA, NOT EQUAL HEIGHT. See HEIGHTS below.
 *
 * ⛔ These are platforms we work across. They are NOT clients, customers or
 * partners, and nothing here may imply endorsement -- the notice further down
 * the footer carries that, and AGENTS.md carries the rule.
 */

/**
 * HEIGHTS — why each mark has its own.
 *
 * Sizing 31 logos to one height does not make them look the same size. These
 * marks run from 0.8:1 (Google Ads, taller than wide) to 10:1 (monday.com) -- a
 * twelvefold spread. One shared height turns the wide wordmarks into
 * billboards; one shared width shrinks the square glyphs to nothing.
 *
 * Base is equal INK AREA: h = 26 / sqrt(aspectRatio), so every mark covers
 * ~675px^2 whatever its shape, with ratios read from each file's real viewBox
 * rather than guessed. Seven were then corrected by eye off renders at 1440 and
 * 390, because equal area is not equal weight -- a bold black wordmark carries
 * far more ink per px^2 than a thin outline. TikTok and GitHub were dominating
 * a row in which monday.com and Dynamics had gone faint.
 *
 * ⛔ If you swap a file, recompute from the new viewBox. Do not reuse the old
 * number: a different drawing of the same brand has different padding baked in.
 */
/* ownGround: this mark supplies its own light background, so it must load the
   ORIGINAL file rather than the reversed one. Only Notion qualifies -- its
   black N and rule sit on the logo's own white page, and whitening them would
   merge the N into the page and produce a solid white blob. */
type Mark = { name: string; file: string; h: number; ownGround?: boolean };

const PLATFORMS: Mark[] = [
  // Enterprise platforms and CRM
  { name: "Salesforce", file: "salesforce", h: 21.7 },
  { name: "Oracle", file: "oracle", h: 9.4 },
  { name: "Microsoft", file: "microsoft", h: 12 },
  { name: "Microsoft Dynamics 365", file: "dynamics-365", h: 18.5 },
  { name: "ServiceNow", file: "servicenow", h: 10 },
  { name: "Zendesk", file: "zendesk", h: 22 },
  { name: "HubSpot", file: "hubspot", h: 14.1 },
  { name: "Zoho", file: "zoho", h: 17.2 },
  { name: "monday.com", file: "monday", h: 10.5 },
  { name: "QuickBooks", file: "quickbooks", h: 14.5 },
  { name: "DocuSign", file: "docusign", h: 11.7 },
  { name: "Twilio", file: "twilio", h: 14.2 },
  // Marketing, advertising and social
  { name: "Zapier", file: "zapier", h: 17.6 },
  { name: "Google Ads", file: "google-ads", h: 29.1 },
  { name: "Google Analytics", file: "google-analytics", h: 16.5 },
  { name: "Meta", file: "meta", h: 11.7 },
  { name: "Instagram", file: "instagram", h: 26 },
  { name: "LinkedIn", file: "linkedin", h: 13.1 },
  { name: "TikTok", file: "tiktok", h: 10 },
  // Build, commerce and infrastructure
  { name: "Cloudflare", file: "cloudflare", h: 16.5 },
  { name: "WordPress", file: "wordpress", h: 26 },
  { name: "Shopify", file: "shopify", h: 14.6 },
  { name: "Stripe", file: "stripe", h: 16.8 },
  { name: "GitHub", file: "github", h: 11 },
  { name: "Notion", file: "notion", h: 22, ownGround: true },
  { name: "Ghost", file: "ghost", h: 18 },
  /* AI. These are the models and tools actually in the working stack, not a
     list of what is fashionable: Claude runs the build agent, and GPT, Gemini,
     Grok and DeepSeek are the four families the fleet-review process sends work
     to. ⛔ Groq, Higgsfield and Tripo3D are also in use but have no official
     mark from a citable source, so they are named in type below, not drawn. */
  { name: "Claude", file: "claude", h: 12 },
  { name: "OpenAI", file: "openai", h: 13.5 },
  { name: "Google Gemini", file: "google-gemini", h: 15.8 },
  { name: "Grok", file: "grok", h: 13.7 },
  { name: "DeepSeek", file: "deepseek", h: 12 },
];

/* Worked on, but shown as type: no official mark exists from a citable source,
   and an approximated one is worse than an honest word. */
const NO_MARK = [
  "MuleSoft",
  "Aircall",
  "Hootsuite",
  "Metricool",
  "Oneflow",
  "Groq",
  "Higgsfield",
  "Tripo3D",
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      className={`flex shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0 ${
        /* ⛔ The wrap has to happen HERE, not on the track. global.css puts
           flex-wrap on .marquee-track, but the track's only children are these
           two <ul>s -- so it wrapped the lists, not the logos, and this row
           stayed one long strip clipped by the rail with most marks off-screen.
           That was true of the old text marquee too and nobody caught it,
           because a clipped row still looks like a row. */
        ""
      }${
        /* The duplicate exists only to make the -50% translate loop. Under
           reduced motion the track stops and wraps to rows, and a second copy
           would then be visibly duplicated content rather than an invisible
           tail -- so it is dropped there entirely. */
        ariaHidden ? "motion-reduce:hidden" : ""
      }`}
      aria-hidden={ariaHidden || undefined}
    >
      {PLATFORMS.map((p) => (
        <li key={p.file} className="flex shrink-0 items-center">
          {/* Fixed-height slot so the strip's height never depends on which
              marks have decoded, and 62 images cannot shift the footer. */}
          <span className="flex h-8 items-center">
            <img
              src={`/media/platforms/${p.ownGround ? "" : "on-dark/"}${p.file}.svg`}
              alt={ariaHidden ? "" : p.name}
              /* Meaningful on the real row -- no adjacent text names the
                 platform, so the alt IS the content. Empty on the duplicate so
                 the list is not announced twice. */
              width={Math.round(p.h * 4)}
              height={Math.round(p.h)}
              /* ⛔ NOT lazy, and NOT async-decoded. Both were here and both
                 caused the flicker the client reported: inside a track that is
                 permanently translating, the browser kept deferring decode
                 until a mark crossed into view, so logos visibly popped in on
                 every loop. The whole set is 79KB of SVG. Nothing to defer. */
              loading="eager"
              decoding="sync"
              style={{ height: `${p.h}px` }}
              className="w-auto max-w-none object-contain"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function TrustedPartnerships() {
  return (
    <section
      aria-labelledby="platform-band-heading"
      className="border-b border-white/10 pb-6"
    >
      {/* Not uppercase. This renders on all 27 routes, and at 32 characters it
          is a sentence set as a label -- measurably slower to read in caps.
          Small caps are for one- or two-word markers, not statements. */}
      <h2
        id="platform-band-heading"
        className="font-mono text-xs text-oa-nightInk3"
      >
        Experts across leading platforms
      </h2>

      {/* ⛔ THIS LINE SITS ABOVE THE RAIL ON PURPOSE. It used to sit below it.
          A heading that claims expertise, followed by 31 enterprise and AI
          marks, reads as an approved-partner roster no matter what the small
          print says afterwards -- and a reader who has already formed that
          impression does not un-form it two lines later. Putting the
          qualification before the marks is the difference between a
          clarification and a correction. */}
      <p className="mt-1 text-xs leading-relaxed text-oa-nightInk3">
        Platforms we build on and support — not clients, and no endorsement
        implied.
      </p>

      {/* ⛔ NO PLATE. There was a white rounded rail here so that unmodified
          near-black marks stayed legible. On a phone it rendered as a tall
          white capsule the full width of the screen and read as a giant
          button, not a logo strip. The marks now sit straight on the footer
          ground.

          Legibility is handled in the ASSETS, not here. Rendering all 31 on
          #04182b showed 17 with ink that sank into the ground -- not only the
          obvious all-black marks but the dark wordmark half of Claude,
          Cloudflare, LinkedIn, Meta, monday.com, QuickBooks, ServiceNow,
          Shopify, TikTok, HubSpot and Dynamics. So each mark has a reversed
          twin in on-dark/, built by one rule: ink that is BOTH invisible on the
          ground (<3:1) AND a dark neutral (lightness <0.35) becomes white;
          everything else is untouched. That is what an official reversed
          lockup does -- LinkedIn keeps its blue box, Cloudflare its orange
          cloud, ServiceNow its green "o" -- so no brand colour is lost and
          nothing is recoloured in the sense the assets' README forbids.
          ⛔ Notion is the one exception and loads the original: see ownGround. */}
      {/* ⛔ overflow-hidden is LOAD-BEARING, and it has been lost once already:
          the white plate wrapper used to carry it, and removing the plate
          removed the clip with it. Without it the ~5,000px track paints across
          the whole viewport -- logos sail PAST the fade overlays and cut hard
          at the screen edge (photographed on an iPhone 2026-08-30), and the
          giant unclipped paint region is itself a flicker source on iOS. The
          clip is what pins the fades to the strip's real edges. */}
      <div className="marquee relative mt-3 overflow-hidden">
        {/* ⛔ motion-reduce:w-full is load-bearing. global.css switches the
            track to flex-wrap under reduced motion so nothing scrolls out of
            reach -- but an element at width:max-content is exactly as wide as
            its content, so it can never wrap. The fallback silently did
            nothing and the row just overflowed, hidden, with most of the
            marks unreachable. Releasing the width is what lets it wrap. */}
        <div className="marquee-track flex w-max motion-reduce:w-full">
          <Row />
          <Row ariaHidden />
        </div>
      </div>

      {/* The eight with no citable official mark. "Also" is doing real work
          here: it says the rail is not the whole roster, which is true, and
          avoids implying the marks shown are a complete or certified list. */}
      <p className="mt-3 text-xs leading-relaxed text-oa-nightInk3">
        Also worked on: {NO_MARK.join(", ")}.
      </p>
    </section>
  );
}
