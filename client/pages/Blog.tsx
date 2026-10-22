import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero, Section, CTABand, Eyebrow, HeroRail } from "../components/site";
import { JSONLDScript } from "../components/JSONLDScript";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { usePosts, isJob, longDate, shareImage, metaDescription, type Post } from "../lib/blogger";
import { AUTHOR } from "../lib/authors";
import { loadTurnstile, TURNSTILE_SITE_KEY, submitBlogSubscription } from "../lib/lead";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

/* /blog and /blog/:slug — articles written in Blogger (see lib/blogger.ts).
 * Job listings share the feed but live on /careers, never here.
 *
 * Index layout (Smart Brevity, Axios' own pattern, checked live 2026-10-22):
 * a numbered, scannable list — bold headline, a small circular avatar + name
 * directly under it, a landscape thumbnail (not a cropped square), and the
 * excerpt folded behind a native <details> instead of sitting open and
 * taking permanent space. Meta — date, read time — set in JetBrains Mono,
 * like every measured value elsewhere on the site.
 */

const META = "font-mono text-[12px] uppercase tracking-wider text-oa-ink3";

// No headshot confirmed yet — AUTHOR.photo is unset until Louis points at a
// real file (3 candidates found in Drive, filenames too generic to confirm
// without asking). An honest initials circle beats guessing which one, or
// inventing one. Set AUTHOR.photo in lib/authors.ts and this swaps itself.
function Avatar({ size = 40 }: { size?: number }) {
  if (AUTHOR.photo) {
    return (
      <img src={AUTHOR.photo} srcSet={`${AUTHOR.photo} 1x, ${AUTHOR.photo.replace(/\.jpg$/, "@2x.jpg")} 2x`}
        alt="" width={size} height={size} loading="lazy"
        style={{ width: size, height: size }} className="shrink-0 rounded-full border border-oa-hairline object-cover" />
    );
  }
  return (
    <span aria-hidden="true" style={{ width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-oa-blue font-mono text-[13px] font-semibold text-white">
      LR
    </span>
  );
}

// Plain monoline marks, not the platforms' trademarked logos — this is a
// share link, not a brand placement, so a generic glyph is the honest choice.
const SHARE_ICONS = {
  x: <path d="M4 4l16 16M20 4L4 20" />,
  linkedin: <path d="M6 9v10M6 5.5v.01M11 19V9m0 4c0-2.5 2-4 4-4s4 1.5 4 4v6" />,
  facebook: <path d="M14 20v-7h2.5l.5-3H14V8.3c0-.9.3-1.5 1.7-1.5H17V4.1C16.7 4 15.7 4 14.6 4 12.3 4 10.7 5.4 10.7 8v2H8v3h2.7v7" />,
  email: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
};

function ShareBar({ p }: { p: Post }) {
  const [copied, setCopied] = useState(false);
  const url = getCanonicalUrl(`/blog/${p.slug}`);
  const links: { key: keyof typeof SHARE_ICONS; label: string; href: string }[] = [
    { key: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(p.title)}` },
    { key: "linkedin", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { key: "facebook", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { key: "email", label: "Share by email", href: `mailto:?subject=${encodeURIComponent(p.title)}&body=${encodeURIComponent(url)}` },
  ];
  const iconBtn = "flex h-11 w-11 items-center justify-center rounded-full border border-oa-hairlineStrong text-oa-ink2 transition-colors hover:border-oa-ink hover:text-oa-ink";
  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={iconBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {SHARE_ICONS[l.key]}
          </svg>
        </a>
      ))}
      <button type="button" aria-label="Copy link" className={iconBtn}
        onClick={() => { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }); }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
        </svg>
      </button>
      <span role="status" className={`${META} transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}>Link copied</span>
    </div>
  );
}

function Meta({ p }: { p: Post }) {
  return (
    <p className={META}>
      <time dateTime={p.published}>{longDate(p.published)}</time> · {p.minutes} min read
    </p>
  );
}

function Labels({ labels }: { labels: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {labels.map((l) => (
        <li key={l} className="border border-oa-hairlineStrong px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-oa-ink2">
          {l}
        </li>
      ))}
    </ul>
  );
}

function AuthorLine({ size = 28 }: { size?: number }) {
  return (
    <Link to={`/blog/author/${AUTHOR.slug}`} className="group/author inline-flex items-center gap-2">
      <Avatar size={size} />
      <span className="text-sm text-oa-ink2 group-hover/author:text-oa-blue">{AUTHOR.name}</span>
    </Link>
  );
}

// The numbered, scannable list Axios actually uses (checked live, 2026-10-22):
// bold headline, byline directly under it, long text folded behind a native
// <details> instead of sitting open by default — "Read the breakdown" costs
// nothing until someone asks for it, which is the fold Louis asked for.
function ListItem({ n, p }: { n: number; p: Post }) {
  return (
    <li className="border-t border-oa-hairline py-12 first:pt-0">
      <div className="grid gap-6 md:grid-cols-[1fr_18rem] md:items-start md:gap-10">
        <div>
          {p.labels[0] && <Eyebrow>{p.labels[0]}</Eyebrow>}
          <Link to={`/blog/${p.slug}`} className="group mt-2 block">
            <h2 className="text-balance text-[1.75rem] font-semibold leading-tight tracking-tight text-oa-ink group-hover:text-oa-blue md:text-[2rem]">
              {n}. {p.title}
            </h2>
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <AuthorLine />
            <Meta p={p} />
          </div>
          <details className="group/fold mt-3 max-w-[60ch]">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-oa-blue hover:text-oa-blue700 [&::-webkit-details-marker]:hidden">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform group-open/fold:rotate-180 motion-reduce:transition-none"><path d="M6 9l6 6 6-6" /></svg>
              <span className="group-open/fold:hidden">Read the breakdown</span>
              <span className="hidden group-open/fold:inline">Hide the breakdown</span>
            </summary>
            <p className="pb-2 text-oa-ink2">{p.summary}</p>
          </details>
        </div>
        {p.heroImage ? (
          <Link to={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true">
            <img src={p.heroImage} alt="" width={320} height={213} loading="lazy" decoding="async"
              className="aspect-[3/2] w-full rounded-[16px] object-cover" />
          </Link>
        ) : (
          <div aria-hidden="true" className="aspect-[3/2] w-full rounded-[16px] border border-oa-hairline bg-oa-surface" />
        )}
      </div>
    </li>
  );
}

function Index({ posts }: { posts: Post[] }) {
  const [topic, setTopic] = useState("");
  const [q, setQ] = useState("");
  const topics = [...new Set(posts.flatMap((p) => p.labels))].sort();
  // Plain substring search over title, labels and the full body text. With
  // at most 50 posts in the feed this runs per keystroke without any index.
  const needle = q.trim().toLowerCase();
  const matches = (p: Post) =>
    !needle || [p.title, p.labels.join(" "), p.lede ?? "", p.html.replace(/<[^>]+>/g, " ")].join(" ").toLowerCase().includes(needle);
  const shown = posts.filter((p) => (!topic || p.labels.includes(topic)) && matches(p));
  return (
    <>
      <PageHero eyebrow="Blog" siblings={false}
        title="Notes from the work"
        lede={<>Case notes, measured results and straight answers from the Salesforce, website and SEO projects we run.{" "}
          <a href="#subscribe" className="text-oa-blue underline underline-offset-4 hover:text-oa-blue700">Get new posts by email.</a></>} />
      <Section compact tone="paper">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          {topics.length > 1 && (
          <div role="group" aria-label="Filter by topic" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
            {["", ...topics].map((t) => (
              <button key={t || "all"} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t}
                className={`min-h-[44px] shrink-0 border px-4 font-mono text-[12px] uppercase tracking-wider transition-colors ${topic === t ? "border-oa-night bg-oa-night text-oa-nightInk" : "border-oa-hairlineStrong text-oa-ink2 hover:border-oa-ink"}`}>
                {t || "All"}
              </button>
            ))}
          </div>
          )}
          <div className="flex w-full items-center gap-4 sm:w-auto">
            <label className="relative block w-full sm:w-60">
              <span className="sr-only">Search posts</span>
              <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-oa-ink3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
              </svg>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts" autoComplete="off"
                className="min-h-[44px] w-full border border-oa-hairlineStrong bg-oa-paper pl-9 pr-3 text-sm text-oa-ink placeholder:text-oa-ink3 focus:border-oa-ink" />
            </label>
            <p className={`${META} hidden shrink-0 sm:block`}>
              {needle ? `${shown.length} ${shown.length === 1 ? "match" : "matches"}` : `Newest first · ${shown.length} ${shown.length === 1 ? "post" : "posts"}`}
            </p>
          </div>
        </div>
        {shown.length
          ? <ul>{shown.map((p, i) => <ListItem key={p.slug} n={i + 1} p={p} />)}</ul>
          : <p className="text-oa-ink2">{needle ? <>Nothing matches “{q}”. Try a shorter word, or clear the search.</> : "No posts yet."}</p>}
        <Subscribe source="" />
      </Section>
      <CTABand />
    </>
  );
}

function AuthorPage({ posts }: { posts: Post[] }) {
  useSEO({
    title: `${AUTHOR.name} — OneAlgorithm Blog`,
    description: AUTHOR.bio,
    canonical: getCanonicalUrl(`/blog/author/${AUTHOR.slug}`),
    ogTitle: `${AUTHOR.name} — OneAlgorithm Blog`,
    ogDescription: AUTHOR.bio,
  });
  return (
    <Layout>
      <JSONLDScript data={{
        "@context": "https://schema.org", "@type": "ProfilePage",
        dateModified: posts[0]?.updated,
        mainEntity: {
          "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.role, description: AUTHOR.bio,
          url: getCanonicalUrl(`/blog/author/${AUTHOR.slug}`), sameAs: [AUTHOR.linkedin],
          ...(AUTHOR.photo && { image: new URL(AUTHOR.photo, "https://onealgorithm.com").href }),
        },
      }} />
      <HeroRail dark={false} crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: AUTHOR.name }]} />
      <Section compact tone="paper">
        <div className="flex items-center gap-4">
          <Avatar size={64} />
          <div>
            <h1 className="text-h2 font-semibold text-oa-ink">{AUTHOR.name}</h1>
            <p className="mt-1 text-oa-ink2">{AUTHOR.role}</p>
          </div>
        </div>
        <p className="mt-4 max-w-[60ch] text-oa-ink2">{AUTHOR.bio}</p>
        <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-oa-blue underline underline-offset-4 hover:text-oa-blue700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9v10M6 5.5v.01M11 19V9m0 4c0-2.5 2-4 4-4s4 1.5 4 4v6" />
          </svg>
          LinkedIn
        </a>
        <p className={`${META} mt-10`}>Newest first · {posts.length} {posts.length === 1 ? "post" : "posts"} by {AUTHOR.name}</p>
        <ul className="mt-2">{posts.map((p, i) => <ListItem key={p.slug} n={i + 1} p={p} />)}</ul>
      </Section>
      <CTABand />
    </Layout>
  );
}

function Subscribe({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  // Load failures are remembered, not shown. The prerender runs on a host the
  // widget refuses, so a message set on failure was being baked into the
  // static HTML of every post ("The anti-spam check failed" before React even
  // ran). Now the reader only hears about it when they actually press
  // Subscribe without a passed check.
  const loadFailed = useRef(false);

  useEffect(() => {
    if (sent) return;
    let cancelled = false;
    let started = false;
    // The anti-spam widget is ~800KB of third-party script (measured: 591 +
    // 112 + 90 KB on one post page) and the form sits at the foot of the
    // article. Fetch it when the form comes within 600px of the viewport,
    // not on page load — nothing above it pays for it.
    const start = () => {
      if (started || cancelled) return;
      started = true;
      loadTurnstile().then(() => {
      if (cancelled || !host.current || !window.turnstile) return;
      widget.current = window.turnstile.render(host.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        "error-callback": () => {
          setToken("");
          loadFailed.current = true;
        },
        theme: "light",
      });
      }).catch(() => {
        if (!cancelled) loadFailed.current = true;
      });
    };
    const el = host.current;
    const io = el && "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { start(); io?.disconnect(); } }, { rootMargin: "600px" })
      : null;
    if (io && el) io.observe(el); else start();
    return () => {
      cancelled = true;
      io?.disconnect();
      if (widget.current !== null) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [sent]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setError("");
    if (!token) {
      setError(loadFailed.current
        ? "The anti-spam check could not load. Please reload the page and try again."
        : "Please complete the anti-spam check, then subscribe again.");
      return;
    }
    setSending(true);
    try {
      await submitBlogSubscription(email, source, token);
      setSent(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We could not save your request. Please try again.");
      setToken("");
      if (widget.current !== null) window.turnstile?.reset(widget.current);
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="subscribe" className="mt-12 max-w-[68ch] scroll-mt-24 border-t border-oa-hairlineStrong pt-8">
      <h2 className="text-h3 font-semibold text-oa-ink">Get new posts by email</h2>
      {sent ? <p role="status" className="mt-4 text-oa-ink2">Your subscription request has been received.</p> : (
        <form onSubmit={submit} className="mt-4" aria-label="Blog subscription">
          <label htmlFor="blog-email" className="text-sm font-medium text-oa-ink">Email address</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Input id="blog-email" name="email" type="email" autoComplete="email" required maxLength={80}
              value={email} onChange={(event) => setEmail(event.target.value)}
              className="min-h-11 min-w-0 flex-1" aria-describedby={error ? "blog-subscribe-error" : undefined} />
            <Button type="submit" disabled={sending} className="min-h-11 bg-oa-blue text-white hover:bg-oa-blue600">
              {sending ? "Sending…" : "Subscribe"}
            </Button>
          </div>
          <div ref={host} className="mt-4 min-h-[65px]" />
          {error && <p id="blog-subscribe-error" role="alert" className="mt-3 text-sm text-oa-ink2">{error}</p>}
          <p className="mt-3 text-sm text-oa-ink2">By subscribing, you ask for new blog posts by email. <Link to="/privacy" className="text-oa-blue underline">Privacy policy</Link></p>
        </form>
      )}
    </div>
  );
}

// A plain, short, title-only link — the right weight for "you might also
// like" at the foot of an article; the full numbered/fold treatment belongs
// to the index and author page, not a recirculation footer.
function RelatedItem({ p }: { p: Post }) {
  return (
    <li className="border-t border-oa-hairline py-5">
      <Link to={`/blog/${p.slug}`} className="group flex items-baseline justify-between gap-4">
        <span className="font-semibold text-oa-ink group-hover:text-oa-blue">{p.title}</span>
        <span className={`${META} shrink-0`}>{longDate(p.published)}</span>
      </Link>
    </li>
  );
}

// Which section is on screen. The lowest heading that has crossed the upper
// third of the viewport wins, so the rail tracks reading position, not just
// "something is visible".
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const update = () => {
      const line = window.innerHeight * 0.33;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids.join("|")]);
  return active;
}

function Toc({ toc, className = "" }: { toc: Post["toc"]; className?: string }) {
  const active = useActiveHeading(toc.map((h) => h.id));
  return (
    <nav aria-label="In this post" className={className}>
      <p className={META}>In this post</p>
      <ol className="mt-3 space-y-1 border-l border-oa-hairline">
        {toc.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} aria-current={active === h.id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${active === h.id ? "border-oa-orange font-medium text-oa-ink" : "border-transparent text-oa-ink2 hover:border-oa-hairlineStrong hover:text-oa-ink"}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Topic label -> the service page it feeds. The one internal link that
// matters most for a post on a low-authority domain (blog-engine §4).
const SERVICE_FOR_LABEL: Record<string, [string, string]> = {
  SEO: ["/services/seo", "SEO services"],
  Websites: ["/services/website-development", "Website development"],
  Salesforce: ["/services/salesforce", "Salesforce consulting"],
};

function Article({ p, related, older, newer }: { p: Post; related: Post[]; older?: Post; newer?: Post }) {
  const url = getCanonicalUrl(`/blog/${p.slug}`);
  const hasToc = p.toc.length >= 3;
  const service = p.labels.map((l) => SERVICE_FOR_LABEL[l]).find(Boolean);
  return (
    <>
      <div aria-hidden="true" className="oa-progress" />
      <JSONLDScript data={{
        "@context": "https://schema.org", "@type": "BlogPosting",
        headline: p.title, datePublished: p.published, dateModified: p.updated,
        author: {
          "@type": "Person", name: AUTHOR.name, url: getCanonicalUrl(`/blog/author/${AUTHOR.slug}`),
          ...(AUTHOR.photo && { image: new URL(AUTHOR.photo, "https://onealgorithm.com").href }), sameAs: [AUTHOR.linkedin],
        },
        publisher: { "@type": "Organization", name: "OneAlgorithm", url: "https://onealgorithm.com" },
        mainEntityOfPage: url, ...(shareImage(p) && { image: shareImage(p)!.url }),
        keywords: p.labels.join(", "),
      }} />
      {/* The same breadcrumb rail every other page has (it carries the
          BreadcrumbList schema too), with the post latched on the end. */}
      <HeroRail dark={false} crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: p.title }]} />
      <Section compact allowSticky tone="paper">
        {/* One content width for the title, the hero and the body (the first
            version used three), with the "In this post" rail beside it. */}
        <div className={hasToc ? "lg:grid lg:grid-cols-[minmax(0,68ch)_minmax(0,1fr)] lg:items-start lg:gap-16" : ""}>
          <div className="min-w-0 max-w-[68ch]">
            <header>
              {p.labels[0] && <Eyebrow>{p.labels[0]}</Eyebrow>}
              <h1 className="mt-3 text-balance text-h1 font-semibold text-oa-ink">{p.title}</h1>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <AuthorLine size={36} />
                <ShareBar p={p} />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-oa-hairline py-4">
                <Meta p={p} />
                {p.updated.slice(0, 10) > p.published.slice(0, 10) && (
                  <p className={META}>Updated <time dateTime={p.updated}>{longDate(p.updated)}</time></p>
                )}
                {p.labels.length > 1 && <Labels labels={p.labels.slice(1)} />}
              </div>
            </header>
            {p.heroImage && (
              <img src={p.heroImage} alt={p.heroAlt || ""} width={1200} height={630} fetchPriority="high" decoding="async"
                className="mt-8 aspect-[1200/630] w-full rounded-[16px] border border-oa-hairline object-cover" />
            )}
            {/* The post's own opening sentences, set apart — the Smart Brevity
                lede device (checked live on axios.com, 2026-10-22). Labelled
                "The gist" rather than Axios' "Why it matters": same idea, our
                own words, and it is the post's real text, not a line invented
                to fill the box. */}
            <p className="mt-8 border-l-2 border-oa-orange pl-5 text-lede text-oa-ink [&_a]:text-oa-blue [&_a]:underline [&_a]:underline-offset-4">
              <span className="font-semibold">The gist:</span>{" "}
              {p.lede ? <span dangerouslySetInnerHTML={{ __html: p.lede }} /> : p.summary}
            </p>
            {hasToc && (
              <details className="mt-8 border border-oa-hairline p-4 lg:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-medium text-oa-ink [&::-webkit-details-marker]:hidden">In this post ({p.toc.length} sections)</summary>
                <Toc toc={p.toc} className="mt-3 [&>p]:hidden" />
              </details>
            )}
            {/* Authored by our own Blogger account, not by visitors. */}
            <article className="oa-article mt-8" dangerouslySetInnerHTML={{ __html: p.html }} />
            {service && (
              <aside className="mt-10 border border-oa-hairlineStrong bg-oa-surface p-5">
                <p className={META}>Related service</p>
                <p className="mt-2 text-oa-ink2">
                  This is the kind of work we do under{" "}
                  <Link to={service[0]} className="font-medium text-oa-blue underline underline-offset-4 hover:text-oa-blue700">{service[1]} →</Link>
                </p>
              </aside>
            )}
            <div className="mt-10 border-t border-oa-hairline pt-6"><ShareBar p={p} /></div>
            {(older || newer) && (
              <nav aria-label="More posts" className="mt-10 grid gap-4 border-t border-oa-hairline pt-6 sm:grid-cols-2">
                {older ? (
                  <Link to={`/blog/${older.slug}`} className="group">
                    <span className={META}>← Older</span>
                    <span className="mt-1 block font-semibold text-oa-ink group-hover:text-oa-blue">{older.title}</span>
                  </Link>
                ) : <span />}
                {newer && (
                  <Link to={`/blog/${newer.slug}`} className="group sm:text-right">
                    <span className={META}>Newer →</span>
                    <span className="mt-1 block font-semibold text-oa-ink group-hover:text-oa-blue">{newer.title}</span>
                  </Link>
                )}
              </nav>
            )}
            <Subscribe key={p.slug} source={p.slug} />
          </div>
          {hasToc && <Toc toc={p.toc} className="hidden lg:sticky lg:top-24 lg:block lg:pt-2" />}
        </div>
      </Section>
      {related.length > 0 && (
        <Section tone="surface" compact>
          <h2 className="text-h3 font-semibold text-oa-ink">Keep reading</h2>
          <ul className="mt-2">{related.map((r) => <RelatedItem key={r.slug} p={r} />)}</ul>
        </Section>
      )}
      <CTABand />
    </>
  );
}

// /blog/author/louis-rubino — a separate named export (not a param on the
// post route) so it never collides with a post whose slug happens to be
// "author"; registered as its own route in App.tsx, which react-router
// matches ahead of the single-segment /blog/:slug regardless of order.
export function BlogAuthor() {
  const { posts, error } = usePosts();
  const articles = posts?.filter((p) => !isJob(p));
  if (error) return <Layout><Section><p className="text-oa-ink2">The blog could not be loaded ({error}).</p></Section></Layout>;
  if (!articles) return <Layout><Section><p className="text-oa-ink2">Loading…</p></Section></Layout>;
  return <AuthorPage posts={articles} />;
}

export default function Blog() {
  const { slug } = useParams();
  const { posts, error } = usePosts();
  const articles = posts?.filter((p) => !isJob(p));
  const post = slug ? articles?.find((p) => p.slug === slug) : undefined;

  const pageTitle = post ? `${post.title} — OneAlgorithm` : "Blog — OneAlgorithm";
  const pageDescription = post ? metaDescription(post) : "Case notes, measured results and straight answers from OneAlgorithm's Salesforce, website and SEO projects.";
  const share = post ? shareImage(post) : undefined;
  useSEO({
    title: pageTitle,
    description: pageDescription,
    canonical: getCanonicalUrl(slug ? `/blog/${slug}` : "/blog"),
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    ...(share && { ogImage: share.url, ogImageSize: share.size, twitterImage: share.url }),
  });

  const status = (msg: React.ReactNode) => <Section><p className="text-oa-ink2">{msg}</p></Section>;
  return (
    <Layout>
      {error ? status(`The blog could not be loaded (${error}).`)
        : !articles ? status("Loading…")
        : !slug ? <Index posts={articles} />
        : !post ? status(<>Post not found. <Link className="text-oa-blue underline" to="/blog">All posts</Link></>)
        : <Article p={post} older={articles[articles.indexOf(post) + 1]} newer={articles[articles.indexOf(post) - 1]}
            related={articles.filter((r) => r !== post && r.labels.some((l) => post.labels.includes(l))).slice(0, 2)} />}
    </Layout>
  );
}
