<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# MSB Web monorepo

This is a Turborepo + pnpm workspace running Next.js 16 (App Router) and React 19. Project-specific conventions, architecture notes, and per-area rules live in [.github/copilot-instructions.md](.github/copilot-instructions.md) — read it before editing.

## Quick map

- `sites/msb` — main public site (port 3000).
- `sites/widgets` — embeddable widgets, e.g. ArcGIS map and document collections (port 3001).
- `sites/myprop` — `myproperty.matsugov.us`-style property explorer (port 3002, uses Next 16 `cacheComponents`).
- `packages/ui` (`@matsugov/ui`) — shared React/Tailwind component library.
- `packages/sdk` (`@msb/js-sdk`) — Apollo client + generated GraphQL types against the MSB CMS.
- `packages/map` (`@msb/map`) — ArcGIS wrapper used by the widgets map.
- `packages/search-sdk` — TypeSense adapter shared across search UIs.
- `packages/tw-config` — shared Tailwind v4 tokens (`msb.tw.css`, `uswds-colors.tw.css`).

## Commands

Run from the repo root unless noted.

- `pnpm install` — install all workspaces.
- `pnpm msb:dev` / `pnpm wid:dev` / `pnpm myp:dev` / `pnpm ui:dev` — start a single app or Storybook.
- `pnpm msb:build` / `pnpm wid:build` / `pnpm myp:build` / `pnpm ui:build` — production builds.
- `pnpm codegen` / `pnpm codegen:watch` — regenerate GraphQL types (requires the sibling `matanuska-susitna-cms` checkout — see [packages/sdk/codegen.ts](packages/sdk/codegen.ts)).
- `pnpm lint` / `pnpm lint:fix` — ESLint across the repo.

## Hard rules

- Use the App Router. Don't introduce `pages/` directories.
- Default to Server Components. Only add `'use client'` when needed, and place the file under `components/client/` to keep barrels clean (see [sites/msb/components/README.md](sites/msb/components/README.md)).
- The site middleware is `sites/msb/proxy.ts` (Next 16 rename of `middleware.ts`). Preserve the `auth()` wrapper and the inline-literal matcher.
- All GraphQL goes through `@msb/js-sdk`; never instantiate Apollo directly in app code.
- All TypeSense/InstantSearch UI goes through `sites/msb/components/static/search/InstantSearchWrapper.tsx`.
- Format with Prettier (`prettier-plugin-tailwindcss` sorts Tailwind classes — don't reorder by hand).
- Commits follow Conventional Commits; releases are automated via semantic-release.

## Backend & roadmap (decoupled architecture)

This frontend is decoupled from its CMS, and the CMS is mid-migration. Keep both eras in mind when picking patterns:

- **Today:** A KeystoneJS headless CMS serves data over **GraphQL**, consumed via `@msb/js-sdk` (Apollo). The GraphQL surface is intentionally noted as accumulating complexity — don't add to it unless required for shipping legacy features.
- **Coming:** A custom Laravel + Filament headless CMS will replace Keystone. The new API is **REST**, consumed with `fetch` — no GraphQL, no Apollo. For new data layers, prefer thin REST adapters using Next 16 fetch caching (`fetch(..., { next: { tags, revalidate } })`, `'use cache'` + `cacheTag`) so the swap is straightforward. Put shared clients in `packages/sdk` (or a successor) rather than each app.
- **Content field:** Legacy `body` is Markdown, rendered by `sites/msb/components/server/MarkdownRenderer`. The new CMS replaces it with a JSON `content` field using the **TipTap** schema. It is **undecided** whether the backend will pre-render TipTap to HTML or ship raw JSON for the Next.js app to render. Until that lands, keep new rich-text rendering behind a single component boundary so the implementation can be swapped, and sanitize either way (allowlist TipTap node types when rendering client-side; reuse the markdown renderer's sanitization rules when rendering server-supplied HTML).
- Both pipelines may run in parallel during the cutover. Don't rip out Apollo/Markdown code until the migration is announced, but call out new Keystone-only work as migration debt in PR descriptions.

When in doubt about a Next.js API, open the matching file under `node_modules/next/dist/docs/01-app/` instead of guessing.
