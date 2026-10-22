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
  summary: string;
  minutes: number;
};

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
    if (host === "onealgorithm.com" || host === "www.onealgorithm.com") return whole;
    const attrs = before + after;
    const target = /\btarget=/i.test(attrs) ? "" : ' target="_blank"';
    const rel = /\brel=/i.test(attrs) ? "" : ' rel="noopener noreferrer"';
    return `<a ${before}href="${href}"${after}${target}${rel}>`;
  });
}

// Exported for client/lib/blogger.spec.ts only — the feed-parsing logic
// (hero extraction, external-link handling) is worth testing directly rather
// than only through the live network fetch in usePosts.
export function toPost(e: any): Post {
  const href: string = e.link.find((l: any) => l.rel === "alternate").href;
  const raw: string = e.content?.$t ?? "";
  const text = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const { html, heroImage, heroAlt } = splitHero(raw);
  return {
    slug: KEEP_URL[href.split("/").pop()!.replace(/\.html$/, "")] ?? href.split("/").pop()!.replace(/\.html$/, ""),
    title: e.title.$t,
    html: externalizeLinks(html),
    heroImage,
    heroAlt,
    published: e.published.$t,
    updated: e.updated.$t,
    labels: (e.category ?? []).map((c: any) => c.term),
    summary: text.slice(0, 200).replace(/\s\S*$/, ""),
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

export const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
