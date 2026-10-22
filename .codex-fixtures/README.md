A snapshot of the live Blogger feed, fetched 2026-10-22 from a network this
sandbox may not have. Used ONLY by prerender.mjs when BLOG_FEED_FIXTURE is
set, so Codex's cloud sandbox (no outbound network) can verify the build
without needing to reach blogspot.com. Production always fetches live;
nothing here is read unless that env var is explicitly set.
