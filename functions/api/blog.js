// Blogger test: the blog's public JSON feed under our own domain, cached 5 minutes.
export async function onRequestGet({ env }) {
  const base = env.BLOGGER_URL || "https://onealgorithm-blog-test.blogspot.com";
  const r = await fetch(`${base}/feeds/posts/default?alt=json&max-results=50`, { cf: { cacheTtl: 300 } });
  return new Response(r.body, { status: r.status, headers: { "content-type": "application/json", "cache-control": "public, max-age=300" } });
}
