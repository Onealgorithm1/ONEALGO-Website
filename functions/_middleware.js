/**
 * Keep preview deployments out of search results.
 *
 * Every branch deploy gets a public, guessable *.pages.dev URL — this one is
 * literally https://redesign-2026-refresh.onealgo-builderio.pages.dev. The
 * pages there serve `<meta name="robots" content="index, follow">` and a
 * robots.txt that allows everything, because those are written for production
 * and the build has no idea where it landed.
 *
 * The canonical tag points at onealgorithm.com, which usually stops a preview
 * being indexed in its own right, but "usually" is doing a lot of work for a
 * full copy of the marketing site sitting on a crawlable host. A preview that
 * gets indexed competes with the real site for its own terms, and every fix
 * for that is slower than this.
 *
 * `X-Robots-Tag` is used rather than the meta tag because a header covers the
 * PDF, the sitemap and every other non-HTML asset too, and because it cannot be
 * forgotten by a page that renders its own head.
 *
 * The allowlist is the production hostnames. Anything else — a pages.dev
 * preview, a branch alias, a future staging domain nobody has thought of yet —
 * is noindex by default. Failing closed is the right direction here: the cost
 * of accidentally hiding a preview is zero.
 */
const PRODUCTION_HOSTS = new Set(["onealgorithm.com", "www.onealgorithm.com"]);

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const { hostname } = url;
  const isPreview = !PRODUCTION_HOSTS.has(hostname);

  /* The blog only exists on the production zone.
     /blog is served by the `oa-blog-debrand` Worker, which proxies Ghost and is
     bound to a route on onealgorithm.com — that route intercepts before Pages
     is reached. A pages.dev preview is not in that zone, so no Worker runs and
     Pages answers /blog with its own 404. `public/_redirects` deliberately has
     no rule for it, and says so.

     Nothing is broken, but on a preview the header's Careers link 301s to
     /blog/tag/careers/ and lands on a 404, which reads exactly like a
     regression to anyone reviewing the site. Sending blog paths to the live
     blog keeps the navigation honest during review.

     Preview hosts only. On production this branch never runs and the Worker
     handles /blog exactly as it does today. */
  if (isPreview && url.pathname.startsWith("/blog")) {
    return Response.redirect(
      `https://onealgorithm.com${url.pathname}${url.search}`,
      302, // temporary: this is an artifact of previewing, not a real rule
    );
  }

  const response = await next();

  if (isPreview) {
    // Clone before mutating: the response from next() may have immutable
    // headers when it comes from the static asset handler.
    const out = new Response(response.body, response);
    out.headers.set("X-Robots-Tag", "noindex, nofollow");
    return out;
  }

  return response;
}
