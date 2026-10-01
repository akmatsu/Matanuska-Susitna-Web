<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# MyProperty (`sites/myprop`)

Public property lookup for the Matanuska-Susitna Borough at https://myproperty.matsu.gov, replacing the legacy ASP.NET site. Users search parcels (owner, address, tax ID, PID, subdivision), view parcel details, and download tax maps. Root rules in [../../AGENTS.md](../../AGENTS.md) still apply; this file covers what is specific to myprop.

Next.js is hoisted to the repo root, so the bundled docs are at `../../node_modules/next/dist/docs/`. For caching work, read `01-app/01-getting-started/08-caching.md`, `01-app/03-api-reference/01-directives/use-cache.md`, and `01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md` first.

## Commands (from repo root)

- `pnpm myp:dev`: dev server at http://localhost:3002
- `pnpm myp:build`: production build. Run it before handing off; it surfaces Cache Components prerender errors.
- `npx tsc --noEmit -p sites/myprop`: type-check
- `pnpm lint`: ESLint (the per-site `lint` script calls the removed `next lint`)

## Data

- All parcel and tax map data comes from the GOVERN-backed property API via `propertyApiCall` in `@msb/property-sdk`. Don't `fetch` the property API directly.
- `API_URL` and `API_KEY` are server-only. Never expose them as `NEXT_PUBLIC_*`, and never call `propertyApiCall` from a client component. Client components go through this app's route handlers (e.g. `app/api/search/route.ts`).
- `app/(backend)/api/v1/parcels` is faker mock data. Don't import from it in real code.

## Rendering and caching (`cacheComponents: true`)

- Reference data that rarely changes (tax map lists, insets) uses `'use cache'` + `cacheLife(...)`. Follow `app/taxmaps/components/TaxMapTable/TaxMapTableBody.tsx`.
- Per-request data (search, parcel detail) stays uncached and renders under `<Suspense>` or a route `loading.tsx`.
- Wrap client components that call `useSearchParams()` in `<Suspense>` (see `components/SearchField/index.tsx`).
- Don't use `export const revalidate` / `dynamic` segment config; use the caching primitives above.

## Routes

| Route                           | Notes                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `/`                             | Search form                                                                                                       |
| `/search`                       | Server-rendered first page (`Results.tsx`), then client infinite scroll via `/api/search` (`ResultsInfinite.tsx`) |
| `/parcels/[pid]`                | Parcel detail; `noindex`; Back link reads `returnTo`                                                              |
| `/taxmaps`, `/taxmaps/[abbr]`   | Tax map index and insets; cached                                                                                  |
| `(old-system-redirects)/*.aspx` | Legacy URL redirects. Keep them: old bookmarks and external sites link here                                       |
| `[...slug]`                     | Catch-all that renders `not-found.tsx`                                                                            |

## UI

- Server Components by default; `'use client'` only for interactivity. Myprop doesn't use the msb `components/client|server` barrel split: client components sit next to their route or in `components/`.
- Reuse `@matsugov/ui` (e.g. `Dialog`, `cn` from `@matsugov/ui/lib`) and the local `components/Tables` before adding markup.
- Tailwind v4 tokens and the `msb-btn-*` utility live in `app/global.tw.css`. Icons use Iconify classes (`icon-[mdi--...]`).
- Print is a supported output: parcel pages get printed. Keep `print:` variants working and mark interactive controls `print:hidden`.
- Icon-only links and buttons need `sr-only` text; decorative icons get `aria-hidden`.

## Untrusted input and privacy

- Build URLs with `URLSearchParams` / `encodeURIComponent`, for both internal links and external map links.
- Only link or redirect to same-site relative paths taken from query params (`returnTo`).
- Owner names and addresses are personal data. Don't log them on the client or server, and don't add parcel URLs to `sitemap.ts`.

## Known gaps

- `tsconfig.json` has `strict: false` (only 10 errors under `--strict`, all in `app/parcels/[pid]/page.tsx`). Write code that would pass strict mode.
- There are no tests for this app yet. Verify in the browser.

## Verify

With `pnpm myp:dev` running, check `/`, `/search?mode=owner&query=smith`, a parcel page from the results, `/taxmaps`, and one `/taxmaps/[abbr]`. Use the Next.js MCP server (`next-devtools-mcp`) to read compile and runtime errors. Run `pnpm myp:build` before finishing.
