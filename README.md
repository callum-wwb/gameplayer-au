# GamePlayer

**GamePlayer | News and Gaming Reviews** — a modern editorial rebuild of [gameplayer.com.au](https://www.gameplayer.com.au), inspired by the [March 2020 archive](https://web.archive.org/web/20200313122159/http://www.gameplayer.com.au/).

GamePlayer brings a fresh perspective on the world of video gaming. From Xbox to Playstation, PC to Mac, Nintendo to Atari, all the latest reviews, opinions and news can be found on GamePlayer.

This is a native Next.js App Router site (not WordPress): scored reviews, news, previews, opinion, videos, platform filters, evergreen game hubs, search, RSS, and SEO schema.

## Stack

- Next.js App Router (TypeScript) + Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- MDX seed archive in `content/articles/` (~25 stories)
- Review scores out of 10 + schema.org `Review` / `Article` / `Organization` / `WebSite`
- Dark charcoal + neon editorial theme
- Server-only [SerpAPI](https://serpapi.com) Google Search helpers

## Local development

```bash
npm install
cp .env.example .env.local
# optional: add SERPAPI_API_KEY for the editor research tool
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Featured hero, latest grid, Recent + Reviews sidebar |
| `/news` `/reviews` `/previews` `/opinion` `/videos` | Section archives |
| `/pc` `/mobile` `/classic` `/playstation` `/xbox` `/nintendo` | Platform filters |
| `/games/[slug]` | Hubs: Dota 2, Skyrim, StarCraft 2, Elden Ring, Baldur's Gate 3 |
| `/{article-slug}/` | Clean SEO article URLs |
| `/search?q=` | Full-archive search |
| `/about` | Masthead and site notes |
| `/feed.xml` | RSS |
| `/sitemap.xml` `/robots.txt` | Crawlers |
| `/tools/serp` | Editor SERP research UI (**gate before production**) |
| `/api/serp/search` `/api/serp/related` | Server-only SerpAPI proxies |

## SerpAPI

Server routes call SerpAPI (`serpapi` npm package → `https://serpapi.com/search.json`). The key is read from `SERPAPI_API_KEY` and is never sent to the client.

1. Copy `.env.example` to `.env.local`.
2. Add a key from [serpapi.com](https://serpapi.com).
3. Open `/tools/serp` and run a Google query.

If the key is missing, the API returns a graceful empty snapshot with an explanatory message. `/tools/serp` is a staff research UI (SERP snapshot + related searches / People Also Ask). **Do not leave it public in production** — put it behind auth, IP allowlisting, or remove the route.

`.env*` is gitignored. Only `.env.example` is committed.

## Deploy on Vercel

1. Import this GitHub repo in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js**. Build command `npm run build`, output detected automatically.
3. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.gameplayer.com.au` (or the preview URL while testing)
   - `SERPAPI_API_KEY` = your server-only key (Production / Preview as needed)
4. Deploy.

### Attach gameplayer.com.au

1. In the Vercel project: **Settings → Domains**.
2. Add `gameplayer.com.au` and `www.gameplayer.com.au`.
3. Prefer `www` as the canonical host (matches `NEXT_PUBLIC_SITE_URL`) and redirect the apex to `www`.
4. At your DNS host, add the records Vercel shows (usually `A` for apex and `CNAME` for `www`).
5. Wait for SSL. Confirm `https://www.gameplayer.com.au` serves this app.

After the domain is live, keep `NEXT_PUBLIC_SITE_URL=https://www.gameplayer.com.au` so sitemap, RSS, canonicals, and JSON-LD stay consistent.

## Content

Seed articles live in `content/articles/*.mdx` with frontmatter (`type`, `platforms`, `score`, `games`, etc.). Add a file, rebuild, and the story appears in archives, search, RSS, and the sitemap.

Reviews should include `score` (0–10), `verdict`, and `gameTitle` so Review JSON-LD can attach to a `VideoGame`.
