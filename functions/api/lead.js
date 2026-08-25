/**
 * POST /api/lead — the contact form's only route to Salesforce.
 *
 * WHY THIS EXISTS AT ALL
 *
 * The form used to build a hidden <form> in the browser and POST it straight
 * to webto.salesforce.com, with the Salesforce org id sitting in the page
 * source. That has two consequences worth stating plainly:
 *
 *   1. A bot check on the page would have been theatre. Anything that renders
 *      the page can read the org id and POST to Salesforce directly, skipping
 *      the widget entirely. A CAPTCHA is only worth anything if something the
 *      attacker does not control refuses to proceed without it. That has to be
 *      a server, and this is the server.
 *   2. Every visitor's browser talked to Salesforce whether or not they ever
 *      submitted anything, which is a third party in the page for no reason.
 *
 * So the token is verified HERE, against Cloudflare's siteverify endpoint, with
 * a secret the browser never sees, and only then is the lead forwarded.
 *
 * ENVIRONMENT (Cloudflare Pages → Settings → Environment variables)
 *   TURNSTILE_SECRET_KEY  secret. Never in the repo, never in the client.
 *   SALESFORCE_OID        the Web-to-Lead org id. Not secret exactly -- it is
 *                         in every Web-to-Lead form on the internet -- but
 *                         there is no longer any reason to publish ours.
 *
 * FAILS CLOSED. If either variable is missing the endpoint returns 503 and
 * forwards nothing. A misconfigured deploy that silently accepted unverified
 * submissions would be worse than an outage: nobody would notice.
 */

const SALESFORCE_ENDPOINT =
  "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Salesforce silently truncates over-long values; these are its documented
 *  Lead field lengths. Trimming here means a 40,000-character paste is
 *  rejected at the edge rather than becoming a mangled record. */
const LIMITS = {
  firstName: 40,
  lastName: 80,
  email: 80,
  company: 255,
  whatYouNeed: 255,
  message: 30000,
};

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

/* One handler, switching on the method itself. Pages also supports
   `onRequestPost`, but exporting both that and an `onRequest` fallback leaves
   the precedence between them to be remembered correctly by whoever reads this
   next. This version has no precedence to know. */
export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { allow: "POST" },
    });
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.SALESFORCE_OID) {
    return json(503, {
      error: "The contact form is not configured. Please email us instead.",
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "Malformed request." });
  }

  // Validate before spending a siteverify call.
  const field = (name) =>
    typeof body[name] === "string" ? body[name].trim().slice(0, LIMITS[name]) : "";

  const email = field("email");
  const lastName = field("lastName") || field("firstName");
  const message = field("message");

  if (!lastName) return json(400, { error: "Please tell us your name." });
  // Deliberately permissive: one @, something either side, no whitespace. The
  // real check is that Salesforce accepts it. Rejecting valid-but-unusual
  // addresses loses a lead, which is worse than accepting a typo.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json(400, { error: "That email address does not look right." });
  // "Tell us more" is labelled OPTIONAL on the page; the service dropdown is
  // the required one. Until 2026-08-25 this required `message`, so anyone who
  // picked a service and left the optional box empty got "Please tell us what
  // you need", the bot check reset, and the form read as broken. Louis found
  // it the day the redesign went live. One of the two is enough.
  const need = field("whatYouNeed");
  if (!message && !need) return json(400, { error: "Please tell us what you need." });

  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!token) return json(400, { error: "Please complete the check below." });

  // --- the actual gate ---------------------------------------------------
  const verify = await fetch(SITEVERIFY, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      // Binds the token to the client that solved it, so a token scraped from
      // one session cannot be replayed from somewhere else.
      remoteip: request.headers.get("CF-Connecting-IP") || undefined,
    }),
  }).catch(() => null);

  const outcome = verify && verify.ok ? await verify.json().catch(() => null) : null;

  if (!outcome || outcome.success !== true) {
    // Tokens are single-use and expire after ~5 minutes, so a genuine person
    // who left the tab open overnight lands here. Say something they can act
    // on rather than accusing them of being a robot.
    return json(403, {
      error: "That check expired. Please tick the box again and resend.",
    });
  }

  // --- forward -----------------------------------------------------------
  const lead = new URLSearchParams();
  lead.set("oid", env.SALESFORCE_OID);
  // first_name only when it is genuinely a separate name. If someone filled
  // one box, that value is the last name (Web-to-Lead requires it) rather than
  // being thrown away.
  if (field("firstName") && field("firstName") !== lastName)
    lead.set("first_name", field("firstName"));
  lead.set("last_name", lastName);
  lead.set("email", email);
  lead.set("company", field("company"));
  lead.set(
    "description",
    [need && `Service: ${need}`, message].filter(Boolean).join("\n\n"),
  );
  lead.set("lead_source", "Web");

  const sent = await fetch(SALESFORCE_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: lead.toString(),
  }).catch(() => null);

  // Web-to-Lead answers 200 (or a redirect) for anything it accepted and does
  // not report per-record validation. A non-2xx/3xx means it did not take it.
  if (!sent || sent.status >= 400) {
    return json(502, {
      error:
        "We could not deliver that. Please email service@onealgorithm.com and we will pick it up.",
    });
  }

  return json(200, { ok: true });
}
