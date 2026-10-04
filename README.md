# Silly Bon — Marketing Site

Public marketing site for **Silly Bon**, built with Vite + React.

Live domain: [sillybon.com](https://sillybon.com)

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| Support | `/support` |
| Terms | `/terms` |
| Privacy | `/privacy` |

## Quick start

```bash
npm install
npm run dev
```

Optional social overrides in `.env.local`:

```bash
VITE_INSTAGRAM_URL=
VITE_TIKTOK_URL=
VITE_YOUTUBE_URL=
```

## Build

```bash
npm run build
npm run preview
```

Output is static files in `dist/` (SPA fallback via `404.html`, Netlify `_redirects`, and `vercel.json`).

## Deploy (any static host)

1. `npm run build`
2. Publish the `dist/` folder to Cloudflare Pages, Netlify, Vercel, or nginx.
3. Point `sillybon.com` DNS at that host.

Example Netlify / Cloudflare: build command `npm run build`, publish directory `dist`.

## SEO / AI discovery

- Canonical, robots, Open Graph / Twitter, JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`)
- `public/robots.txt` (allows major AI crawlers) + `public/sitemap.xml`
- `public/llms.txt` + `public/llms-full.txt` for LLM / AI-assistant citations
- On-page FAQ section for generative engines

After deploy, submit `https://sillybon.com/sitemap.xml` in Google Search Console.


| Path | Role |
|------|------|
| `public/assets/app_icon.png` | Logo |
| `public/assets/google-play-badge.webp` | Play Store badge |
| `public/assets/Screenshots/01–05.png` | Hero carousel |
| `public/og-banner.png` | Open Graph image |
