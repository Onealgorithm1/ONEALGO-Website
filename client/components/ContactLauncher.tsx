import { useEffect, useRef, useState } from "react";
import { Phone, MessageSquare, X, Loader2, CheckCircle } from "lucide-react";
import { TURNSTILE_SITE_KEY, loadTurnstile } from "../lib/turnstile";
import OneAlgorithmText from "./OneAlgorithmText";

/* Floating "Talk to us" launcher, on every page.

   Replaces Ooma's Contact Us widget, which could not be branded and showed a
   consent paragraph we could not edit. Ooma is still the phone system behind
   it: "Call" dials the main line, which Ooma answers (menu, ring group,
   recording), and a callback request lands in Salesforce through /api/lead for
   someone to return from Ooma. Ooma Office has no API (support, 2026-08-24),
   so there is nothing to call directly.

   ponytail: Turnstile loads only when the panel opens, so the 26 pages nobody
   opens this on pay nothing for it. "Text us" goes to Louis's ext 1002
   number, the only one with Ooma texting (ticket 11834499, enabled 2026-10-12). */

const MAIN_LINE = "+16108909711";
const MAIN_LINE_SHOWN = "(610) 890-9711";
const TEXT_LINE = "+16108909722";
const TEXT_LINE_SHOWN = "(610) 890-9722";

export default function ContactLauncher() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [when, setWhen] = useState("As soon as possible");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const widgetHost = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || status === "sent") return;
    let cancelled = false;
    loadTurnstile().then(() => {
      if (cancelled || !widgetHost.current || widgetId.current !== null || !window.turnstile) return;
      widgetId.current = window.turnstile.render(widgetHost.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
        theme: "light",
        size: "flexible",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [open, status]);

  // Closing unmounts the widget host, so the next open needs a fresh widget.
  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLElement>("a, input")?.focus();
      return;
    }
    if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
    widgetId.current = null;
    setToken("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!token) return setError("Please complete the check above the button.");
    setStatus("sending");
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        lastName: name,
        phone,
        whatYouNeed: "Callback request",
        message: `Best time to call: ${when}\nPage: ${location.pathname}`,
        turnstileToken: token,
      }),
    }).catch(() => null);
    const payload = res ? await res.json().catch(() => ({})) : {};
    if (!res || !res.ok) {
      setStatus("idle");
      setError(payload.error ?? `We couldn't send that. Please call ${MAIN_LINE_SHOWN}.`);
      setToken("");
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
      return;
    }
    window.trackFormSubmission?.();
    setStatus("sent");
  };

  const field =
    "mt-1 min-h-11 w-full rounded-md border border-slate-300 px-3 py-2.5 text-base text-[#04182b] focus:outline-none focus:ring-2 focus:ring-[#04182b]";

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 font-sans print:hidden">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="oa-talk-title"
          className="w-[min(340px,calc(100vw-2rem))] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg bg-white shadow-xl ring-1 ring-black/10"
        >
          <div className="flex items-center justify-between border-b-4 border-[#ffa634] bg-white px-4 py-2">
            <h2 id="oa-talk-title">
              <span className="sr-only">Talk to One Algorithm</span>
              <span aria-hidden="true"><OneAlgorithmText size="sm" /></span>
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-2 grid h-11 w-11 place-items-center rounded text-[#04182b]/70 hover:text-[#04182b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#04182b]"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <a
              href={`tel:${MAIN_LINE}`}
              onClick={() => window.trackContactClick?.("phone")}
              className="flex items-center gap-3 rounded-md bg-[#ffa634] px-4 py-3 font-semibold text-[#04182b] hover:bg-[#ffb85c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04182b]"
            >
              <Phone className="h-5 w-5" aria-hidden />
              <span>
                Call {MAIN_LINE_SHOWN}
                <span className="block text-sm font-normal">Malvern, PA</span>
              </span>
            </a>

            <a
              href={`sms:${TEXT_LINE}`}
              onClick={() => window.trackContactClick?.("sms")}
              className="flex items-center gap-3 rounded-md border-2 border-[#04182b] px-4 py-3 font-semibold text-[#04182b] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04182b]"
            >
              <MessageSquare className="h-5 w-5" aria-hidden />
              <span>
                Text {TEXT_LINE_SHOWN}
                <span className="block text-sm font-normal">We reply by text</span>
              </span>
            </a>

            {status === "sent" ? (
              <p className="flex gap-2 text-[15px] text-[#04182b]" role="status">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-700" aria-hidden />
                Got it. We'll call {phone} {when === "As soon as possible" ? "shortly" : when.toLowerCase()}.
              </p>
            ) : (
              <form onSubmit={submit} className="space-y-3" noValidate>
                <p className="text-sm font-semibold text-[#04182b]">Or we'll call you</p>
                <label className="block text-sm text-slate-700">
                  Name
                  <input className={field} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                </label>
                <label className="block text-sm text-slate-700">
                  Phone
                  <input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" autoComplete="tel" inputMode="tel" />
                </label>
                <label className="block text-sm text-slate-700">
                  Best time
                  <select className={field} value={when} onChange={(e) => setWhen(e.target.value)}>
                    <option>As soon as possible</option>
                    <option>This morning</option>
                    <option>This afternoon</option>
                    <option>Tomorrow</option>
                  </select>
                </label>
                <div ref={widgetHost} />
                {error && (
                  <p className="text-sm text-red-700" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#04182b] px-4 py-3 font-semibold text-white hover:bg-[#0b2a47] disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffa634]"
                >
                  {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                  Call me back
                </button>
                <p className="text-xs text-slate-600">
                  We'll only use your number to return this call.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-12 items-center gap-2 rounded-full bg-[#ffa634] px-5 font-semibold text-[#04182b] shadow-lg hover:bg-[#ffb85c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04182b]"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Phone className="h-5 w-5" aria-hidden />}
        {open ? "Close" : "Talk to us"}
      </button>
    </div>
  );
}
