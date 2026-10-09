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

  turnstileLoading = new Promise((resolve) => {
    (window as unknown as { onloadTurnstileCallback?: () => void })
      .onloadTurnstileCallback = () => resolve();
    const s = document.createElement("script");
    s.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  });
  return turnstileLoading;
}
