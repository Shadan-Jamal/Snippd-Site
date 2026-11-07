# Snippd site

Marketing and documentation site for [Snippd](https://github.com/Shadan-Jamal/Snippd), built with React Router 8, Vite, React 19, and Tailwind CSS 4.

The site uses React Router framework mode with `ssr: false` and pre-rendering. Every public route is rendered to static HTML at build time for SEO, then hydrated on the client.

## Scripts

```bash
npm install
npm run dev        # React Router dev server
npm run build      # Build + prerender static HTML
npm run preview    # Serve dist/client with directory-index resolution
npm run typecheck  # Generate route types + TypeScript check
npm run lint       # oxlint
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/docs` | Documentation index |
| `/docs/:id` | Guide or command reference |

The `/docs/:id` pages are generated from `src/data/docs.ts`. Add or rename a doc there and it is automatically included in the prerender list and `sitemap.xml`.

## SEO

- Per-route `<title>`, description, canonical, Open Graph, and Twitter tags via React Router `meta` exports (`src/routes/*.tsx`, `src/lib/seo.ts`).
- JSON-LD structured data for the home page and documentation articles.
- `sitemap.xml` and `robots.txt` are generated into `dist/client` during the build (`react-router.config.ts`).
- Social preview image at `public/og-image.png`.
- The production URL is defined once in `src/lib/site.ts`; change `SITE_URL` there if the site moves to a custom domain, then rebuild so canonicals, Open Graph URLs, `sitemap.xml`, and `robots.txt` stay in sync.

## Deployment

`npm run build` writes the static site to `dist/client`. `vercel.json` sets the output directory and serves `__spa-fallback.html` for unknown client-side routes.

For other static hosts, publish `dist/client` and configure the same fallback:

```text
/*    /__spa-fallback.html   200
```
