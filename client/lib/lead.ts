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

