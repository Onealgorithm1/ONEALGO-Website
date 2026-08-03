# www-redirect

301s `www.onealgorithm.com` to the apex domain, preserving path and query string.

## Why this is a Worker and not a Redirect Rule

A zone Redirect Rule is the correct tool - native, no compute, no cost. It needs
`zone rulesets: edit`. The only working Cloudflare credential available is
`CLOUDFLARE_DNS_TOKEN` (on the Railway `blog` service), which is DNS-scoped and
returns `403 request is not authorized` on that endpoint. The account's other
token, `CLOUDFLARE_API_TOKEN`, is invalid entirely - both on that service and in
the local shell environment.

**If a zone-edit token is ever created, replace this with a Redirect Rule and
delete both this Worker and its route.** It exists to work around a permission
gap, not because it is the better design.

## Deploying

Run from THIS directory, never the repo root:

    cd workers/www-redirect
    wrangler deploy

The repository root contains its own `wrangler.jsonc` for a different, unused
Worker. Deploying from the root hits that one instead and silently changes
nothing about this redirect.

If `CLOUDFLARE_API_TOKEN` is set in your shell it will shadow wrangler's working
OAuth credentials and every command fails as unauthorised. Prefix with
`env -u CLOUDFLARE_API_TOKEN`.

## Verifying

    curl -sI https://www.onealgorithm.com/about | head -2
    # expect: HTTP/1.1 301 ... Location: https://onealgorithm.com/about

    curl -sI https://onealgorithm.com/ | head -1
    # expect: HTTP/1.1 200 - the apex must NEVER redirect, or it is a loop

Route propagation takes a few seconds; a single early request can still see 200.

## Rolling back

    wrangler delete            # removes the Worker and its route

`www` then serves the site directly again, exactly as before.
