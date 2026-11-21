# PLF — Progressive Learning Foundation

Static website for the Progressive Learning Foundation. Plain HTML/CSS/JS, no build step.

## Structure
- `public/` — the site (index.html, styles.css, script.js, favicon.svg)
- `wrangler.jsonc` — Cloudflare Workers static-assets config

## Run locally
    npx wrangler dev
or any static server, e.g. `python3 -m http.server -d public`.

## Deploy on Cloudflare
Cloudflare dashboard → Workers & Pages → Create → Import a repository → select `PLF`.
- Build command: (leave empty)
- Deploy command: `npx wrangler deploy`

Every push to `main` redeploys automatically.

## To customise
Replace the placeholder email (`info@example.org` in `index.html` and `script.js`) with PLF's real contact address.
