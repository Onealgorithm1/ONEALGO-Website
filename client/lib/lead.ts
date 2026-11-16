declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

/* Cloudflare Turnstile. The site key is PUBLIC by design -- it is in the markup
   of every page that shows the widget -- so it lives here rather than in an env
   var that would only add a way for the build to be wrong. The SECRET half is
   in the Pages environment and is only ever read by functions/api/lead.js.

   Turnstile rather than reCAPTCHA: this site is already on Cloudflare, so it
   adds no new vendor and no new company receiving visitor data. It also does
   not exist to profile people, which is a materially easier thing to describe
   truthfully in a privacy policy. */
export const TURNSTILE_SITE_KEY = "0x4AAAAAAEOYL_vp6l13AYq-";

/**
 * Resolves once `window.turnstile` is genuinely callable.
 *
 * ⚠️ The script's own `load` event is NOT that moment. Turnstile attaches its
 * API a tick later, so rendering from a `load` listener throws "Cannot read
 * properties of undefined" intermittently — and when it does, the form shows
 * no widget at all and every submit is refused by the server. That failure was
 * caught in a browser, not by any type or unit check. `onload=` is the
 * documented signal, so it is the one used.
 *
 * Module-scoped so a remount reuses the in-flight load rather than appending a
 * second copy of the script.
 */
let turnstileLoading: Promise<void> | null = null;
export function loadTurnstile(): Promise<void> {
  if (typeof window !== "undefined" && window.turnstile) return Promise.resolve();
  if (turnstileLoading) return turnstileLoading;

  turnstileLoading = new Promise((resolve, reject) => {
    (window as unknown as { onloadTurnstileCallback?: () => void })
      .onloadTurnstileCallback = () => resolve();
    const s = document.createElement("script");
    s.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback";
    s.async = true;
    s.defer = true;
    s.onerror = () => {
      turnstileLoading = null;
      s.remove();
      reject(new Error("The anti-spam check could not load. Please reload and try again."));
    };
    document.head.appendChild(s);
  });
  return turnstileLoading;
}

/** Everything the Salesforce lead path sends. `topic` and `page` become the
 *  "Topic:" and "Submitted on:" lines of the Lead description (functions/api/lead.js). */
export type LeadPayload = {
  firstName?: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  whatYouNeed?: string;
  message?: string;
  topic?: string;
  page?: string;
  turnstileToken: string;
};

export const LEAD_ERROR = "We could not send that. Call (610) 890-9711, or try again.";

/**
 * The one way a form posts a lead. Adds the first-touch record captured in
 * index.html (landing page, referrer, UTM campaign), exactly as Contact.tsx
 * always did. Resolves `{ ok: true }` or `{ ok: false, error }` (the
 * server's own message); REJECTS only when the request never left the browser
 * (offline, blocked), so each caller keeps its own wording for that case.
 */
export async function submitLead(
  payload: LeadPayload,
  fallbackError: string = LEAD_ERROR,
): Promise<{ ok: boolean; error: string }> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...payload,
      firstTouch: (() => {
        try {
          return JSON.parse(sessionStorage.getItem("oa_first_touch") || "null");
        } catch {
          return null;
        }
      })(),
      // The ad click (gclid/gbraid/wbraid + utm_*) index.html kept in the oa_ad cookie; functions/api/lead.js
      // writes it into the Lead description as "Ad click:".
      adClick: readAdClick(),
    }),
  });
  if (res.ok) return { ok: true, error: "" };
  const body = (await res.json().catch(() => ({}))) as { error?: string };
  return { ok: false, error: body.error ?? fallbackError };
}

export async function submitBlogSubscription(email: string, slug: string, turnstileToken: string) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: email.trim(),
      // Salesforce requires last_name. Use the supplied email, never an invented name.
      lastName: email.trim(),
      // lead_source is fixed to Web; these accepted fields tag its description.
      whatYouNeed: "Blog subscription",
      message: `Please email me new blog posts. Subscribed from /blog/${slug}`,
      turnstileToken,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "We could not save your request. Please try again.");
}

/* ---- Google Ads click attribution -------------------------------------------------------------------------
   index.html stores gclid, gbraid, wbraid and utm_* from the landing URL in the first-party cookie `oa_ad`
   (90 days, SameSite=Lax, Secure). submitLead() sends it with every lead. */

const AD_KEYS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function readAdClick(): Record<string, string> | null {
  try {
    const raw = document.cookie.split("; ").find((c) => c.startsWith("oa_ad="));
    if (!raw) return null;
    const v = JSON.parse(decodeURIComponent(raw.slice(6)));
    const out: Record<string, string> = {};
    for (const k of AD_KEYS) if (typeof v?.[k] === "string" && v[k]) out[k] = v[k];
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

/** The visitor came from a Google ad: a click id, not just UTM tags. */
export const isAdVisitor = () => {
  const a = readAdClick();
  return !!(a && (a.gclid || a.gbraid || a.wbraid));
};

/**
 * Ad visitors see the ad line (610) 561-5004 (a Twilio tracking number that rings the office) in place of
 * (610) 890-9711. Everyone else, the prerendered HTML and the structured data keep the office number.
 * Swaps every visible 890-9711 under `root` for 561-5004, tel: links included, and keeps doing
 * it as React renders more of the page. Layout calls it from an effect, i.e. AFTER hydration, so React's first
 * render still matches the prerendered HTML. Script and style text (JSON-LD) is left alone. Returns the cleanup.
 * ponytail: a text-node rewrite instead of threading the number through ~40 components that hard-code it.
 * Ceiling: the number in an attribute other than href (aria-label, title) is not swapped; none exists today.
 */
export function swapToAdPhone(root: HTMLElement): () => void {
  const NUM = /890([-.\s]?)9711/g;
  const run = () => {
    root.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((a) => {
      const h = a.getAttribute("href") || "";
      const next = h.replace(NUM, "561$15004");
      if (next !== h) a.setAttribute("href", next);
    });
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const tag = n.parentElement?.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || !n.nodeValue?.includes("9711")) continue;
      const next = n.nodeValue.replace(NUM, "561$15004");
      if (next !== n.nodeValue) n.nodeValue = next;
    }
  };
  run();
  let queued = false;
  const mo = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      run();
    });
  });
  mo.observe(root, { childList: true, subtree: true, characterData: true });
  return () => mo.disconnect();
}

