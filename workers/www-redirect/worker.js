/**
 * Redirects www.onealgorithm.com to the apex domain.
 *
 * Why a Worker and not a Redirect Rule: a zone Redirect Rule is the right tool
 * and costs no compute, but it needs zone-ruleset write. The available token is
 * DNS-scoped and returns 403 on that endpoint. This does the same job with the
 * access that exists. If a zone-edit token appears later, replace this with a
 * Redirect Rule and delete the Worker and its route.
 *
 * Path and query string are preserved: sending every www visitor to the
 * homepage would lose the very links this is meant to consolidate.
 */
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Defensive: only ever rewrite the www host. If this Worker is somehow
    // bound to another route, pass the request through untouched rather than
    // redirecting traffic that was never meant to move.
    if (url.hostname !== "www.onealgorithm.com") {
      return fetch(request);
    }

    url.hostname = "onealgorithm.com";
    url.protocol = "https:";
    url.port = "";

    // 301, not 302: this is permanent, and only a permanent redirect passes
    // accumulated ranking signal to the apex domain.
    return Response.redirect(url.toString(), 301);
  },
};
