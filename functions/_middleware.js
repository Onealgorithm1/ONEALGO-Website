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
  const response = await next();
  const { hostname } = new URL(request.url);

  if (!PRODUCTION_HOSTS.has(hostname)) {
    // Clone before mutating: the response from next() may have immutable
    // headers when it comes from the static asset handler.
    const out = new Response(response.body, response);
    out.headers.set("X-Robots-Tag", "noindex, nofollow");
    return out;
  }

  return response;
}
