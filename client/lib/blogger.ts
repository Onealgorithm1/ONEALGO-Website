import { useEffect, useState } from "react";

/* Posts and job listings both come from one Google Blogger blog
 * (blogger.com, signed in as onealgorithm@gmail.com). A post labelled
 * "Careers" is a job and shows on /careers; every other post shows on /blog.
 * /api/blog returns the blog's public JSON feed: the Vite proxy locally,
 * functions/api/blog.js in production.
 *
 * ponytail: one feed page (max 50 entries), fetched once per page view.
 * Past 50 posts, page with start-index.
 */

export const CAREERS = "Careers";

// Posts migrated from Ghost on 2026-10-22 keep the exact URL they ranked under.
// Blogger gave them its own permalinks; this maps those back. New posts use
// Blogger's permalink as-is (set it under Post settings → Permalink).
const KEEP_URL: Record<string, string> = {
  "home-inspector-website-design-what": "home-inspector-website-design",
  "build-it-price-it-send-it-what-product": "product-configurator-case-study-phantom-arcades",
  "seo-case-study-phantom-arcades-search": "seo-case-study-phantom-arcades",
  "senior-business-systems-engineer-i": "senior-business-systems-engineer",
};

export type Post = {
  slug: string;
  title: string;
  html: string; // body only — the hero image (if any) is pulled out of this
  heroImage?: string;
  heroAlt?: string;
  published: string;
  updated: string;
  labels: string[];
  summary: string; // whole sentences, never cut mid-word — the index excerpt
  lede?: string; // the opening paragraph (HTML), promoted out of the body
  toc: { id: string; text: string }[]; // the body's h2s, for the "In this post" rail
  sections: { id: string; title: string; html: string }[]; // body split at each h2 (open part first, id "")
  minutes: number;
};

// A lede that stops mid-sentence with "…" reads as a mistake, so the summary
// is the first whole sentence(s) up to ~240 chars. Only when a single sentence
// runs past that (a long-winded opener) is it cut at a word, and then the
// ellipsis is part of the string, so no caller ever appends one.
export function leadSentences(text: string, max = 240): string {
  const sentences = text.match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? [];
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > max) break;
    out = (out + s).trim();
    if (out.length >= 140) break;
  }
  if (out && out.length <= max) return out;
  const cut = text.slice(0, max).replace(/\s\S*$/, "");
  return cut.length < text.length ? cut + "…" : cut;
}

const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Give every h2 an id so the post can carry a table of contents that jumps to
// it. Blogger writes plain <h2>; an author who typed an id by hand keeps it.
function withHeadingIds(html: string): { html: string; toc: Post["toc"] } {
  const toc: Post["toc"] = [];
  const out = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (whole, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!text) return whole;
    const existing = attrs.match(/\bid="([^"]*)"/)?.[1];
    const id = existing || slugify(text) || `section-${toc.length + 1}`;
    toc.push({ id, text });
    return existing ? whole : `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });
  return { html: out, toc };
}

// A post's first element, if it is a single <img>, is its hero/thumbnail —
// that's exactly how migrate.mjs wrote every migrated Ghost post (feature
// image prepended), and it's what writing the image first in Blogger's own
// editor produces too. Pulling it out stops it from also appearing inline,
// full-size, under its own heading.
const LEADING_IMAGE = /^\s*(?:<div[^>]*>|<p>)?\s*(<img\b[^>]*>)\s*(?:<\/div>|<\/p>)?/i;

function splitHero(html: string): { html: string; heroImage?: string; heroAlt?: string } {
  const m = html.match(LEADING_IMAGE);
  if (!m) return { html };
  const tag = m[1];
  const src = tag.match(/\bsrc="([^"]*)"/)?.[1];
  if (!src) return { html };
  return { html: html.slice(m[0].length), heroImage: src, heroAlt: tag.match(/\balt="([^"]*)"/)?.[1] || undefined };
}

// Every link into the post body is either ours (stays in-tab, normal
// navigation) or someone else's — a client's site, a Maps link (opens in a
// new tab so reading the post isn't abandoned to leave it). A bare path like
// /services/seo has no host at all, so it's ours by definition.
function externalizeLinks(html: string): string {
  return html.replace(/<a\s+([^>]*?)href="([^"]*)"([^>]*)>/gi, (whole, before, href, after) => {
    let host: string;
    try {
      host = new URL(href, "https://onealgorithm.com").host;
    } catch {
      return whole;
    }
    // Our own post links drop a trailing slash: /blog/<slug>/ 308-redirects to /blog/<slug> (hub SEO crawl 2026-11-02:
    // "internal link to a redirect" from the migrated Ghost posts and marketing-chicago).
    if (host === "onealgorithm.com" || host === "www.onealgorithm.com") return whole.replace(/(href="(?:https?:\/\/(?:www\.)?onealgorithm\.com)?\/blog\/[a-z0-9-]+)\/"/i, '$1"');
    const attrs = before + after;
    const target = /\btarget=/i.test(attrs) ? "" : ' target="_blank"';
    const rel = /\brel=/i.test(attrs) ? "" : ' rel="noopener noreferrer"';
    return `<a ${before}href="${href}"${after}${target}${rel}>`;
  });
}

// The opening paragraph is shown once, styled as the lede ("The gist") — not
// styled at the top and then repeated as the first body paragraph a line
// later, which is what showing the summary above an unchanged body did.
// A one-liner or a wall of text is left in place; only a real opener moves.
function promoteLede(html: string): { lede?: string; body: string } {
  const m = html.match(/^\s*<p\b[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return { body: html };
  const text = m[1].replace(/<[^>]+>/g, "").trim();
  if (text.length < 40 || text.length > 420) return { body: html };
  return { lede: m[1], body: html.slice(m[0].length) };
}

// Split the body at every h2 so the post can fold each section behind its
// label (Smart Brevity's own device: the lede stays open, "Go deeper" opens
// the rest). The part before the first h2 has id "" and is always open.
export function splitSections(html: string): Post["sections"] {
  const parts = html.split(/(?=<h2\b)/i);
  return parts.map((part) => {
    const m = part.match(/^<h2\b([^>]*)>([\s\S]*?)<\/h2>/i);
    if (!m) return { id: "", title: "", html: part };
    return { id: m[1].match(/\bid="([^"]*)"/)?.[1] ?? "", title: m[2].replace(/<[^>]+>/g, "").trim(), html: part.slice(m[0].length) };
  }).filter((sec) => sec.html.trim() || sec.title);
}

// Exported for client/lib/blogger.spec.ts only — the feed-parsing logic
// (hero extraction, external-link handling) is worth testing directly rather
// than only through the live network fetch in usePosts.
export function toPost(e: any): Post {
  const href: string = e.link.find((l: any) => l.rel === "alternate").href;
  const raw: string = e.content?.$t ?? "";
  // Block tags become a space; inline tags (strong, a, em) vanish, so a bold
  // number inside parentheses does not come out as "( +92% )".
  const text = raw.replace(/<\/?(p|div|li|ul|ol|h[1-6]|br|tr|td|th|table|blockquote|figure)b[^>]*>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const hero = splitHero(raw);
  const { html: withIds, toc } = withHeadingIds(externalizeLinks(hero.html));
  const { lede, body } = promoteLede(withIds);
  return {
    slug: KEEP_URL[href.split("/").pop()!.replace(/\.html$/, "")] ?? href.split("/").pop()!.replace(/\.html$/, ""),
    title: e.title.$t,
    html: body,
    sections: splitSections(body),
    lede,
    heroImage: hero.heroImage,
    heroAlt: hero.heroAlt,
    published: e.published.$t,
    updated: e.updated.$t,
    labels: (e.category ?? []).map((c: any) => c.term),
    summary: leadSentences(text),
    toc,
    minutes: Math.max(1, Math.round(text.split(" ").length / 230)),
  };
}

let cache: Promise<Post[]> | null = null;

export function usePosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    cache ??= fetch("/api/blog")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => (j.feed.entry ?? []).map(toPost));
    cache.then(setPosts).catch((e) => {
      cache = null;
      setError(String(e));
    });
  }, []);
  return { posts, error };
}

export const isJob = (p: Post) => p.labels.includes(CAREERS);

const SITE = "https://onealgorithm.com";

// The share image is always a 1200x630 JPEG (Google's Article guidance wants
// 16:9 at >=50k pixels; Facebook/LinkedIn want 1.91:1 JPEG, no alpha):
//  - migrated heroes live under /blog-media/ and have a pre-cut copy in
//    /blog-media/og/<name>.jpg (scratchpad og-images.cjs made them);
//  - a Blogger-hosted image takes a size directive in its URL, so it is asked
//    for a 1200x630 centre crop directly (=w1200-h630-p).
export function shareImage(p: Post): { url: string; size: [number, number] } | undefined {
  const src = p.heroImage;
  if (!src) return undefined;
  if (src.startsWith("/blog-media/")) {
    const name = src.split("/").pop()!.replace(/\.[a-z0-9]+$/i, "");
    return { url: `${SITE}/blog-media/og/${name}.jpg`, size: [1200, 630] };
  }
  if (/\.(googleusercontent|blogspot)\.com\//.test(src)) {
    const sized = src.replace(/\/(s|w)\d+(-h\d+)?(-[a-z-]+)?\//, "/w1200-h630-p/").replace(/=w\d+(-h\d+)?(-[a-z-]+)?$/, "=w1200-h630-p");
    return { url: sized, size: [1200, 630] };
  }
  return { url: new URL(src, SITE).href, size: [1200, 630] };
}

// Meta description: the post's own lede, cut at a word, ~155 chars, so the
// snippet is specific to the post (Google: unique per page, human-readable).
export function metaDescription(p: Post, max = 155): string {
  const text = (p.lede ?? p.summary).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s\S*$/, "").replace(/[,;:]$/, "") + "…";
}

export const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
