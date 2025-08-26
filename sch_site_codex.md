# International School Website — Codebase Codex

This document provides a comprehensive, file-by-file analysis of the project located at `shgh-int-school`. It is written for engineers, collaborators, and AI assistants who need deep context to maintain, extend, or audit the codebase.

- Project type: Static site built with Astro + Tailwind
- Language: TypeScript (with `.astro` components/pages)
- Data layer: Supabase (via `@supabase/supabase-js`)
- Deployment: Static hosting (Netlify config included)
- Repo root: `C:\Users\Yau dev\Documents\project\shgh-int-school`

Note on sensitive data: The repository currently contains a committed `.env` holding Supabase credentials. This is unsafe for public sharing. Values are redacted below and rotation is recommended immediately.

---

## Repository Structure (Top-Level)

```
.
├─ .astro/                 # Astro-generated types and metadata
├─ .bolt/                  # Template/tooling config (Bolt)
├─ .codesandbox/           # Codesandbox dev container
├─ .netlify/               # Netlify local state and config mirror
├─ .vscode/                # Editor recommendations and launch config
├─ dist/                   # Build output (static site)
├─ node_modules/           # Dependencies
├─ public/                 # Static assets served as-is
├─ src/                    # Source code (Astro components/pages)
├─ .env                    # Environment variables (contains Supabase keys)
├─ .gitignore              # Git ignore rules
├─ astro.config.mjs        # Astro configuration
├─ netlify.toml            # Netlify build + headers + redirects
├─ package.json            # Scripts and dependencies
├─ package-lock.json       # Locked dependency tree
├─ README.md               # Project overview and usage
├─ sch_site_bolt.md        # Existing project documentation (Bolt)
├─ sch_site_cc.md          # Existing project documentation
├─ seo_guidelines.md       # SEO strategy and implementation notes
├─ tailwind.config.mjs     # Tailwind theme and plugins
└─ tsconfig.json           # TypeScript config
```

---

## Root Files

### `.gitignore`
- Purpose: Ignore build artifacts, dependencies, and local environment files.
- Key rules:
  - `dist/`, `.astro/`, `node_modules/` are ignored
  - `.env`, `.env.production` ignored (note: a real `.env` is committed — should be removed and rotated)
  - OS/editor: `.DS_Store`, `.idea/`

### `.env` (redacted)
- Purpose: Local environment variables for Supabase.
- Variables:
  - `SUPABASE_URL=...` (server-side use)
  - `SUPABASE_ANON_KEY=...` (server-side use)
  - `VITE_SUPABASE_URL=...` (client-side use in Vite context)
  - `VITE_SUPABASE_ANON_KEY=...` (client-side use)
- Safety note: Actual values are present in repo; remove `.env` from version control and rotate keys.

### `package.json`
- Name: `@example/basics`
- Type: `module`
- Scripts:
  - `dev`: run Astro dev server
  - `build`: static build to `dist`
  - `preview`: preview the build locally
  - `astro`: proxy to Astro CLI
- Dependencies:
  - `astro@^5.2.5`: site framework
  - `@astrojs/tailwind`: Tailwind integration for Astro
  - `tailwindcss`: CSS utility framework
  - `@tailwindcss/typography`: prose plugin
  - `@supabase/supabase-js`: data access
  - `lucide-astro`: icons as Astro components
  - `marked`: Markdown → HTML for article rendering

### `astro.config.mjs`
- Integrations: `tailwind()` enabled.
- `site`: `https://your-school-domain.com` (set to real domain in production).
- `output`: `static` for SSG.
- Vite build tweaks:
  - `assetFileNames: 'assets/[name].[hash][extname]'` for cache-busting
  - HMR timeout increased to `120000` ms
- Build: `inlineStylesheets: 'auto'` to balance inlining vs separate CSS.

### `tailwind.config.mjs`
- Content: scans `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`
- Theme extensions:
  - Color palette: `primary` (greens) and custom `gray` scale
  - Fonts: `Inter`, `system-ui`
  - Spacing: `18 (4.5rem)`, `88 (22rem)`
- Plugins: `@tailwindcss/typography`

### `tsconfig.json`
- Extends: `astro/tsconfigs/strict`
- Include: `.astro/types.d.ts`, all project files
- Exclude: `dist`

### `netlify.toml`
- Build:
  - `command = "npm run build"`
  - `publish = "dist"`
  - `NODE_VERSION = "18"`
- Redirects:
  - `/*` → `/index.html` (SPA-like fallback; optional for Astro but here present)
  - `conditions = { path = "!dist" }`
- Security headers:
  - `X-Frame-Options=DENY`, `X-XSS-Protection=1; mode=block`, `X-Content-Type-Options=nosniff`, `Referrer-Policy=strict-origin-when-cross-origin`

### `README.md`
- Comprehensive project overview and quickstart.
- Includes: features, project structure, tech stack, commands, database schema outline, env setup, deployment notes, troubleshooting, and support.

### `sch_site_bolt.md`, `sch_site_cc.md`
- Existing documentation files with project breakdowns and guidance. Overlap with this codex.

### `seo_guidelines.md`
- In-depth SEO strategy: schema markup, image optimization, Core Web Vitals, content strategy, local SEO, page-specific recommendations, performance tips, link building, analytics, and checklists.

---

## Tooling and Editor

### `.vscode/`
- `extensions.json`: recommends `astro-build.astro-vscode` extension.
- `launch.json`: Node terminal launch to run `./node_modules/.bin/astro dev`.

### `.codesandbox/Dockerfile`
- Minimal base image: `node:18-bullseye` for online sandboxing.

### `.bolt/config.json`
- Simple marker: `{ "template": "astro" }`.

---

## Hosting: `.netlify/`

Local Netlify project metadata mirror of `netlify.toml`:
- `netlify.toml`: same semantics as root `netlify.toml` expressed in TOML with resolved publish path.
- `state.json`: contains `siteId` (consider redacting before sharing). Example: `{ "siteId": "…redacted…" }`.
- `functions-internal/`, `v1/functions/`: internal scaffolding directories (empty by default).

---

## Generated: `.astro/`

Astro’s generated types and content support files; typically not hand-edited:
- `content.d.ts`, `types.d.ts`: generated TypeScript types
- `content-assets.mjs`, `content-modules.mjs`: Astro content system runtime manifests
- `data-store.json`, `settings.json`: framework metadata

These are safe to ignore in day-to-day development; they regenerate on build/dev.

---

## Static Assets: `public/`

Served at site root without processing.

### Root assets
- `favicon.svg`: vector favicon (Astro default style)
- `robots.txt`:
  - `Allow: /`
  - `Sitemap: https://your-school-domain.com/sitemap.xml`
  - Disallows: `/admin/`, `/api/`, `/_astro/`, `/temp/`
  - Allows common resource folders

### Images
- Generic: `logo.png`, `favicon-32x32.png`, school hero images, director/staff portraits, facility images
- Partners/Universities: `harvard-university.png`, `mit.png`, `oxford-university.png`, `stanford-university.png`, `imperial-college-london.png`, `cambridge-university.jpg`, `cambridge-logo.png`, `ib-logo.png`, `wasc-logo.png`, `council-logo.png`
- News images: under `public/images/news/`:
  - `new-library-opening-fall-2024.png`
  - `refer-to-international-school.png`
  - `science-fair-2024.png`
  - `science-fair-winners-2024.png`
  - `soccer-team-regional-championship-2024.png`
  - `student-art-exhibition-march-2024.png`

### Documents & Videos
- `medias/School_Prospectus-2025.pdf`
- `videos/school-vitual-tour.mp4` (note: “vitual” likely a typo for “virtual”)

---

## Source Code: `src/`

### `src/env.d.ts`
Type definitions for env usage via `import.meta.env`:
- `SUPABASE_URL: string`
- `SUPABASE_ANON_KEY: string`

### `src/lib/supabase.ts`
- Creates Supabase client: `createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY)`.
- Exposes typed interfaces used across pages/components:
  - `Category`: `id`, `name`, `slug`, `type ('news'|'event'|'both')`, `is_active`, optional `description`, `color`, timestamps
  - `Tag`: `id`, `name`, `slug`, optional `description`, `is_active`, timestamps
  - `NewsArticle`: core fields including `excerpt`, `content`, `featured_image_id`, `category_id`, `status ('draft'|'published'|'archived')`, `is_featured`, SEO metadata, timestamps, and optionally populated `category`, `tags: Tag[]`
  - `Event`: scheduling fields (`start_date`, `end_date`, `start_time`, `end_time`), location, flags (`is_all_day`, `is_recurring`, `is_featured`), `status ('draft'|'published'|'cancelled'|'completed')`, and optional `category`, `tags`
  - `MediaFile`: generic media metadata

Data-access notes:
- Pages use relational selects, e.g. `category:categories(*)` and join tables: `news_tags(tag:tags(*))`, `event_tags(tag:tags(*))`.
- Returned nested data is normalized in code to plain `Tag[]` arrays via mapping.

### `src/layouts/Layout.astro`
Site-wide layout with SEO and performance foundations:
- Props: `title`, `description`, `ogTitle`, `ogDescription`, `ogImage`, `canonical`, `noindex`.
- Meta: standard `<title>` + meta tags, Open Graph, Twitter Card.
- JSON-LD: `EducationalOrganization` structured data scaffold with placeholders (name, description, URL, logo, address, contact, social links).
- Performance: preloads `Inter` variable font; inlines minimal critical CSS reset.
- Structure: `<slot />` pattern — pages/components render within body; header/footer injected by pages.

### `src/components/`
Declared components (files exist; content may be pending or defined elsewhere):
- `Header.astro`: Site header and navigation (imported in pages).
- `Footer.astro`: Footer with links and contact info (imported in pages).
- `Hero.astro`: Reusable hero section with title/subtitle/CTA and background image.
- `NewsCard.astro`: Card view for `NewsArticle` (used across lists and archives).
- `EventCard.astro`: Card view for `Event` (date/time/location badges, etc.).
- `CalendarWidget.astro`: Sidebar calendar showing upcoming events.

Note: In the current snapshot, these `.astro` files are present but empty when read directly; the pages import and rely on them. If they are truly empty in your working copy, they need implementation (likely omitted or to-be-filled by design system work).

### `src/pages/`
Astro pages define routes, data fetching, and composition with components. Highlights below (grouped by feature):

Core pages (present, content TBD if empty in your copy):
- `index.astro`: Homepage (imports `Header`, `Footer`, `Hero`, etc.).
- `about.astro`, `contact.astro`, `academic-programs.astro`, `academic-year.astro`, `campus-facilities.astro`, `privacy-policy.astro`, `404.astro`: Content pages with standard layout imports. These exist but may be empty placeholders pending content.

Sitemap generation:
- `sitemap.xml.ts`:
  - Returns dynamic XML sitemap via `GET` APIRoute.
  - Combines static routes and dynamic content from Supabase:
    - News slugs (`/news/{slug}`) where `status = 'published'`
    - Event slugs (`/events/{slug}`) where `status = 'published'`
    - Category archives (`/news/category/{slug}`) and tag archives (`/news/tag/{slug}`) for active items
    - Month archives derived from `published_at` dates (`/news/YYYY/MM`)
  - Assigns `changefreq`/`priority` heuristics by route class.

News hub and archives:
- `news/index.astro`:
  - Fetches latest news (up to 9) ordered by `is_featured` then `published_at`.
  - Fetches upcoming events for a sidebar and “Upcoming Events” section.
  - Fetches active categories for sidebar filters (with placeholder counts).
  - UI: featured first article spans full width; rest grid in 2 columns; sidebar includes `CalendarWidget`, category list, tag chips, and quick links.
- `news/archive.astro` (page 1, static-mode):
  - Counts total published articles, fetches paginated set (`limit=12`), computes page numbers.
  - Renders grid of `NewsCard` and static pagination controls to page 2.
- `news/archive/[page].astro`:
  - `getStaticPaths` precomputes pages 2..N based on total count.
  - Each path’s props include the articles for that page.

News taxonomy and article pages:
- `news/category/[slug].astro`:
  - `getStaticPaths`: active categories as routes.
  - Fetches category by slug, then all news in that category.
  - Renders hero with category name/description and a grid of `NewsCard`.
- `news/tag/[slug].astro`:
  - `getStaticPaths`: active tags as routes.
  - Fetches tag by slug, then all news with that tag via inner join on `news_tags`.
  - Renders hero with tag name and a grid of `NewsCard`.
- `news/[slug].astro` (article detail):
  - `getStaticPaths`: all published article slugs.
  - Fetches a single article (with category and tags), 404s to `/404` if not found.
  - Renders metadata, featured image, Markdown content via `marked`, tag chips, share links, and related articles.

Events:
- `events/index.astro`:
  - Fetches upcoming events (>= today) and recent past events (last 6 months).
  - Fetches event categories (`type in ('event','both')`).
  - Groups upcoming events by month for sectioned display.
  - UI: stats cards, featured events grid, month-grouped sections, sidebar calendar and category filter.
- `events/[slug].astro` (event detail):
  - `getStaticPaths`: published event slugs.
  - Fetches single event with category and tags; 404s if not found.
  - Derives helpers for date/time formatting; flags for upcoming/past.
  - Renders status badges, hero image with date overlay, details (date/time/location), organizers, related events, and contact CTAs.

404 page:
- `404.astro`: Present but content not shown in snapshot (likely custom not-found page scaffold).

---

## Data Relationships and Expected Tables (Supabase)

From code usage, the schema expects at minimum:

- `news` (articles)
  - Fields: `id`, `title`, `slug`, `excerpt`, `content`, `featured_image_id`, `category_id`, `status`, `is_featured`, `published_at`, SEO fields, timestamps
  - Relations: `category` via `categories`, tags via join table `news_tags`
- `events`
  - Fields: `id`, `title`, `slug`, `description`, `content`, `featured_image_id`, `category_id`, `start_date`, `end_date`, `start_time`, `end_time`, `location`, `is_all_day`, `is_recurring`, `status`, `is_featured`, timestamps
  - Relations: `category` via `categories`, tags via `event_tags`
- `categories`
  - Fields: `id`, `name`, `slug`, `description`, `type ('news'|'event'|'both')`, `color`, `is_active`, timestamps
- `tags`
  - Fields: `id`, `name`, `slug`, `description`, `is_active`, timestamps
- `news_tags` (join)
  - Fields: `news_id`, `tag_id`
- `event_tags` (join)
  - Fields: `event_id`, `tag_id`

Optional/misc tables referenced by types:
- `media_files` (for images/docs)
- `settings` (site-wide config)

---

## Icons and UI

- `lucide-astro` is used for inline SVG icons in pages (e.g., `Calendar`, `Filter`, `Archive`, `Clock`, `Tag`, `Hash`).
- Tailwind CSS classes drive all layout and typography.
- `@tailwindcss/typography` styles long-form content (`prose` class) for article detail.

---

## Build Output: `dist/`

Static site generated by `npm run build`. Contains hashed assets via Vite/Rollup settings. Not tracked in detail here; artifacts are reproducible from source.

---

## Operational Notes and Recommendations

Security and Secrets
- A real `.env` with Supabase URL and anon keys is committed. Remove from repo, add to deployment environment settings, and rotate the keys immediately.
- Double-check any `.netlify/state.json` or service IDs before sharing externally; redact where appropriate.

Content and Components
- Several component files under `src/components/` appear empty when read directly. If these are placeholders, implement them or restore from the design system to avoid runtime errors.
- Content pages (`about.astro`, `contact.astro`, etc.) exist; if empty, add content or CMS-driven rendering.

Sitemap and SEO
- `sitemap.xml.ts` dynamically queries Supabase; ensure environment credentials are available at build time for SSG to generate routes.
- Layout includes strong SEO defaults and JSON-LD; replace placeholder site info (domain, address, contact, logo URLs).

Assets
- Verify image paths used in pages (e.g., `/images/events/${slug}.jpg` and `/images/news/${slug}.png`) correspond to actual assets or provide fallbacks.
- Consider adding WebP versions and responsive `srcset` where appropriate.

DX
- VS Code launch config provided; recommended Astro extension configured.
- Tailwind theme is set; extend as needed for brand.

Deployment
- Netlify config in root and `.netlify` mirrors are consistent; simple static publish of `dist/` with headers and global redirect.
- If prerendering dynamic routes requires data access, ensure Supabase is reachable during build.

---

## File-by-File Index

Below is a compact index by path with purpose. See sections above for deeper details on key files.

- `./.gitignore` — Ignore build/deps/env and editor files
- `./.env` — Environment variables (redacted; remove from VCS)
- `./astro.config.mjs` — Astro configuration (integrations; Vite build/HMR)
- `./tailwind.config.mjs` — Tailwind theme and plugins
- `./tsconfig.json` — TypeScript settings (strict)
- `./package.json` — Scripts and dependencies
- `./package-lock.json` — Lockfile
- `./netlify.toml` — Build, headers, redirects for Netlify
- `./README.md` — Project guide and setup
- `./sch_site_bolt.md` — Existing documentation
- `./sch_site_cc.md` — Existing documentation
- `./seo_guidelines.md` — SEO plan and details
- `./.vscode/extensions.json` — Editor extensions recommendation
- `./.vscode/launch.json` — Astro dev server launch
- `./.codesandbox/Dockerfile` — Dev container baseline (Node 18)
- `./.bolt/config.json` — Template marker (astro)
- `./.netlify/netlify.toml` — Mirrored Netlify config
- `./.netlify/state.json` — Local Netlify site state (redact siteId)
- `./public/robots.txt` — Crawl rules and sitemap ref
- `./public/favicon.svg` — Favicon
- `./public/images/...` — All image assets (site, logos, news)
- `./public/medias/School_Prospectus-2025.pdf` — Prospectus
- `./public/videos/school-vitual-tour.mp4` — Campus tour video
- `./src/env.d.ts` — Env type declarations
- `./src/lib/supabase.ts` — Supabase client and data interfaces
- `./src/layouts/Layout.astro` — Global layout with SEO + JSON-LD
- `./src/components/Header.astro` — Header (implementation pending)
- `./src/components/Footer.astro` — Footer (implementation pending)
- `./src/components/Hero.astro` — Hero section (implementation pending)
- `./src/components/NewsCard.astro` — News card (implementation pending)
- `./src/components/EventCard.astro` — Event card (implementation pending)
- `./src/components/CalendarWidget.astro` — Calendar widget (pending)
- `./src/pages/index.astro` — Homepage (content TBD/pending)
- `./src/pages/about.astro` — About page (pending)
- `./src/pages/contact.astro` — Contact page (pending)
- `./src/pages/academic-programs.astro` — Programs page (pending)
- `./src/pages/academic-year.astro` — Academic year page (pending)
- `./src/pages/campus-facilities.astro` — Facilities page (pending)
- `./src/pages/privacy-policy.astro` — Privacy policy (pending)
- `./src/pages/404.astro` — Not found page (pending)
- `./src/pages/sitemap.xml.ts` — Dynamic sitemap generator using Supabase
- `./src/pages/news/index.astro` — News hub with events sidebar
- `./src/pages/news/archive.astro` — Archive root (page 1)
- `./src/pages/news/archive/[page].astro` — Archive pagination (2..N)
- `./src/pages/news/[slug].astro` — Article detail (Markdown rendering)
- `./src/pages/news/category/[slug].astro` — Category archive
- `./src/pages/news/tag/[slug].astro` — Tag archive
- `./src/pages/events/index.astro` — Events hub and calendar view
- `./src/pages/events/[slug].astro` — Event detail
- `./.astro/*` — Generated types/metadata (ignore)
- `./dist/*` — Build output
- `./node_modules/*` — Dependencies

---

## Quick Start and Useful Commands

- Install: `npm install`
- Develop: `npm run dev` then open `http://localhost:4321`
- Build: `npm run build` (outputs to `dist/`)
- Preview: `npm run preview`

Environment
- Provide `SUPABASE_URL` and `SUPABASE_ANON_KEY` (and/or Vite-prefixed equivalents) via `.env` or host env.

---

## Final Notes

- Replace placeholder organization metadata in `Layout.astro` and images under `public/images/`.
- Ensure the components under `src/components/` are implemented; pages expect them.
- Audit links, image paths, and copy for accuracy before launch.

