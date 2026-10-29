import { WORK } from "../../client/data/work.ts";
import { frameAllowed } from "../../shared/frame-policy.js";

/*
 * GET /api/frame-check?slug=phantom-arcades -> { allowed, reason }
 * Can the page that asked show that client site in its Preview iframe? A refused frame fires no error event in
 * the browser (it just paints blank), and a client can add security headers any day (Phantom did on 2026-10-29),
 * so the Preview asks this before it renders the iframe and shows the dated full-page capture when the answer is no.
 * Only slugs in client/data/work.ts are fetched, so this is not an open proxy. Cached 10 minutes at the edge.
 */
export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const item = WORK.find((w) => w.slug === url.searchParams.get("slug"));
  if (!item) return json({ allowed: false, reason: "unknown slug" }, 404);
  let body;
  try {
    // Ask the way a browser's iframe navigation asks, so a WAF or a Sec-Fetch-Dest rule answers us the same way.
    const r = await fetch(item.url, {
      redirect: "follow",
      signal: AbortSignal.timeout(3000),
      headers: { "user-agent": request.headers.get("user-agent") || "Mozilla/5.0", "sec-fetch-dest": "iframe", "sec-fetch-mode": "navigate" },
      cf: { cacheTtl: 600 },
    });
    r.body?.cancel();
    body = r.ok ? frameAllowed(r.headers, url.origin) : { allowed: false, reason: `HTTP ${r.status}` };
  } catch (e) {
    body = { allowed: false, reason: "unreachable" }; // a site that does not answer in 3 s would frame as blank too
  }
  return json(body, 200);
}

const json = (b, status) => new Response(JSON.stringify(b), { status, headers: { "content-type": "application/json", "cache-control": "public, max-age=600" } });
