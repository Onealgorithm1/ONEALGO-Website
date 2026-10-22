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
  html: string;
  published: string;
  updated: string;
  labels: string[];
  summary: string;
  image?: string;
  minutes: number;
};

function toPost(e: any): Post {
  const href: string = e.link.find((l: any) => l.rel === "alternate").href;
  const html: string = e.content?.$t ?? "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return {
    slug: KEEP_URL[href.split("/").pop()!.replace(/\.html$/, "")] ?? href.split("/").pop()!.replace(/\.html$/, ""),
    title: e.title.$t,
    html,
    published: e.published.$t,
    updated: e.updated.$t,
    labels: (e.category ?? []).map((c: any) => c.term),
    summary: text.slice(0, 200).replace(/\s\S*$/, ""),
    image: html.match(/<img[^>]+src="([^"]+)"/)?.[1],
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
