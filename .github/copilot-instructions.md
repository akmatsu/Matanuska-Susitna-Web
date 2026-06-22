# MSB Web Copilot Instructions

These are always-on instructions for the Matanuska-Susitna Borough public web monorepo. Read [AGENTS.md](../AGENTS.md) first — it tells you to consult the version-matched Next.js docs bundled under `node_modules/next/dist/docs/` before writing any Next.js code, because training data is older than the Next 16 + React 19 baseline used here.

## Stack baseline

- pnpm 10 + Turborepo workspaces (Node 20+, see [README.md](../README.md) prerequisites).
- Next.js 16 (App Router only) + React 19 across [sites/msb](../sites/msb/), [sites/widgets](../sites/widgets/), [sites/myprop](../sites/myprop/).
- TypeScript 6, ESLint flat config in [eslint.config.mjs](../eslint.config.mjs), Prettier with `prettier-plugin-tailwindcss` ([.prettierrc](../.prettierrc)).
- Tailwind CSS v4 via `@tailwindcss/postcss`; shared tokens live in [packages/tw-config/msb.tw.css](../packages/tw-config/msb.tw.css) and [packages/tw-config/uswds-colors.tw.css](../packages/tw-config/uswds-colors.tw.css).
- Shared UI in [packages/ui](../packages/ui/) (`@matsugov/ui`), GraphQL SDK in [packages/sdk](../packages/sdk/) (`@msb/js-sdk`), search adapter in [packages/search-sdk](../packages/search-sdk/), ArcGIS wrapper in [packages/map](../packages/map/) (`@msb/map`).

## Next.js 16 specifics (do not regress)

- The middleware file is named `proxy.ts` in Next 16, not `middleware.ts`. The site entry point is [sites/msb/proxy.ts](../sites/msb/proxy.ts); preserve the `auth(...)` wrapper, the inline-literal `config.matcher` (Next requires a literal for static analysis), and the handler execution order (search redirect → CMS redirect → page-view tracker).
- Server Components are the default. Only add `'use client'` when a component needs browser APIs, state, or event handlers — and place such files under `components/client/` so the barrel split is preserved (see [sites/msb/components/README.md](../sites/msb/components/README.md), [sites/msb/components/client/README.md](../sites/msb/components/client/README.md), [sites/msb/components/server/README.md](../sites/msb/components/server/README.md), [sites/msb/components/static/README.md](../sites/msb/components/static/README.md)). Never mix client/server in the same barrel.
- [sites/myprop/next.config.ts](../sites/myprop/next.config.ts) enables `cacheComponents`; keep that on and use Next 16 caching primitives (`'use cache'`, `cacheLife`, `cacheTag`) rather than ad-hoc revalidate windows. Confirm exact API names in the bundled docs before using.
- Use the `Image` component from `next/image`; new remote hosts go in the `images.remotePatterns` array of the relevant `next.config.{mjs,ts}` (don't disable optimization).

## Monorepo workflows

- Run repo-root scripts from [package.json](../package.json): `pnpm msb:dev`, `pnpm msb:build`, `pnpm wid:dev`, `pnpm myp:dev`, `pnpm ui:dev`, `pnpm codegen`, `pnpm codegen:watch`, `pnpm lint`. For msb-only debugging the tracing-enabled `dev`/`build`/`build:analyze`/`start` scripts in [sites/msb/package.json](../sites/msb/package.json) are fine.
- GraphQL codegen depends on the sibling CMS checkout path in [packages/sdk/codegen.ts](../packages/sdk/codegen.ts); ensure it exists before running `pnpm codegen*`. Re-run codegen after editing any `.graphql` fragment.

## Data & SDKs

- GraphQL traffic flows through `@msb/js-sdk`'s `registerClient` in [packages/sdk/src/client/ApolloClient.ts](../packages/sdk/src/client/ApolloClient.ts); `NEXT_PUBLIC_API_URL` keeps msb and widgets pointed at the same CMS.
- Server Components must call `getClientHandler` from [sites/msb/utils/apollo/utils.ts](../sites/msb/utils/apollo/utils.ts); it forces `fetchPolicy: 'no-cache'` and the `NEXT_PUBLIC_DEFAULT_REVALIDATE` from [sites/msb/configs/config.ts](../sites/msb/configs/config.ts).
- Wrap the client tree with `ApolloWrapper` ([packages/sdk/src/components/ApolloWrapper.tsx](../packages/sdk/src/components/ApolloWrapper.tsx)) as in [sites/msb/app/layout.tsx](../sites/msb/app/layout.tsx) so server streams stay intact while the client gets a hydrated Apollo cache.
- Compose fragments with the generated `gql` tag from `@msb/js-sdk/gql` (example: [sites/msb/app/page.tsx](../sites/msb/app/page.tsx)). Delegate SEO metadata to `getPageMeta` in [sites/msb/utils/pageHelpers.ts](../sites/msb/utils/pageHelpers.ts) instead of hand-rolling `generateMetadata`.

## App architecture

- Navigation, hero chrome, and org branding belong to [sites/msb/app/layout.tsx](../sites/msb/app/layout.tsx) and pull from [sites/msb/configs/config.ts](../sites/msb/configs/config.ts) (`primaryNav`). Don't hard-code nav links.
- Detail routes follow [sites/msb/app/%5Bslug%5D/page.tsx](../sites/msb/app/%5Bslug%5D/page.tsx): fetch via GraphQL, render with `BasePage`, compose sidebar modules (`PageFacilities`, `PageListItems`, etc.).
- Platform-level config (`basePath`, `transpilePackages`, `optimizePackageImports`, remote image hosts) lives in [sites/msb/next.config.mjs](../sites/msb/next.config.mjs) — update there rather than scattering config into components.
- Prefer composing `@matsugov/ui` exports over rebuilding markup so typography/spacing stay consistent. New UI primitives go in `packages/ui/src/components/` with a Storybook story, then are re-exported from the package entry.

## Search & routing

- All InstantSearch surfaces go through [sites/msb/components/static/search/InstantSearchWrapper.tsx](../sites/msb/components/static/search/InstantSearchWrapper.tsx), which bootstraps the TypeSense adapter from `NEXT_PUBLIC_TYPESENSE_*`. The JS client is pinned to `typesense ^3.0.6` (3.1 isn't published).
- Client entry points like [sites/msb/components/client/search/SearchDynamicWrapper.tsx](../sites/msb/components/client/search/SearchDynamicWrapper.tsx) use `dynamic(..., { ssr: false })` so the TypeSense bundle doesn't ship to the server. Mirror that pattern for new TypeSense widgets.
- Search UX is manual submit (`/search?query=`); popular-query suggestions live in [sites/msb/configs/search.ts](../sites/msb/configs/search.ts).
- The site proxy ([sites/msb/proxy.ts](../sites/msb/proxy.ts)) runs handlers in order: [searchRedirect](../sites/msb/middleware/handlers/searchRedirect.ts) → [cmsRedirects](../sites/msb/middleware/handlers/cmsRedirects.ts) (which uses helpers in [sites/msb/utils/stringHelpers.ts](../sites/msb/utils/stringHelpers.ts)) → page-view tracking. Keep that order. When adding a top-level resource route, extend the matcher arrays in `searchRedirect` so `/route` visitors still land on `/search` with the right refinement.

## Widgets & shared packages

- The widgets map route ([sites/widgets/app/map/page.tsx](../sites/widgets/app/map/page.tsx)) sanitizes query params before rendering `MapWrapper`, which shells `@msb/map`. The map itself ([packages/map/src/Map.tsx](../packages/map/src/Map.tsx), [packages/map/src/utils.ts](../packages/map/src/utils.ts)) dynamically loads ArcGIS, injects vector/feature layers, and exposes `filterAndZoom`.
- Document-collection embeds render via `@matsugov/ui/DocumentCollection` in [sites/widgets/app/document-collection/%5Bid%5D/page.tsx](../sites/widgets/app/document-collection/%5Bid%5D/page.tsx), honoring `link_style`, `center_label`, and `hide_title` query params for per-site customization.
- Shared GraphQL helpers live in [sites/widgets/utils/index.ts](../sites/widgets/utils/index.ts); reuse that registrar rather than spinning up ad-hoc Apollo instances.

## Auth, analytics, environment

- Authentication is centralized in [sites/msb/auth.ts](../sites/msb/auth.ts) (NextAuth v5 + Microsoft Entra). Call `auth()`, `signIn`, `signOut` through server actions (see Footer in [sites/msb/app/layout.tsx](../sites/msb/app/layout.tsx)). The proxy wrapper in [sites/msb/proxy.ts](../sites/msb/proxy.ts) is what lets anonymous users see CMS redirects while admins skip them — leave it in place when adding handlers.
- Analytics goes through [sites/msb/components/client/AnalyticsScript.tsx](../sites/msb/components/client/AnalyticsScript.tsx), which checks `CookieBannerProvider` consent before loading Crazy Egg.
- Critical env vars: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_DEFAULT_REVALIDATE`, `NEXT_PUBLIC_BASE_PATH`, the `NEXT_PUBLIC_TYPESENSE_*` credentials consumed by [sites/msb/components/static/search/InstantSearchWrapper.tsx](../sites/msb/components/static/search/InstantSearchWrapper.tsx), and NextAuth Entra secrets. Keep them in sync across deployment targets.

## Coding conventions

- Format with Prettier ([.prettierrc](../.prettierrc)) — single quotes, trailing commas, LF line endings, Tailwind class sorting via `prettier-plugin-tailwindcss`. Don't reorder Tailwind classes manually.
- Lint with `pnpm lint` before sending changes; use `pnpm lint:fix` for autofixable items.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, etc. Releases are automated via semantic-release ([.releaserc.json](../.releaserc.json)), so the commit subject drives the changelog.
- Branch naming: `feature/...`, `fix/...`, `hotfix/...`.
- TypeScript is strict; don't add `any` to silence errors — narrow the type or fix the call site.
- Cross-package imports use the workspace alias (`@matsugov/ui`, `@msb/js-sdk`, `@msb/map`); intra-app imports use the `@/` alias defined in each app's `tsconfig.json`.

## Security

- Never log or commit secrets; `.env*` files are git-ignored per [.gitignore](../.gitignore).
- Treat all CMS/query input as untrusted in middleware and server actions — see how [sites/widgets/app/map/page.tsx](../sites/widgets/app/map/page.tsx) sanitizes its query string before passing it to client components.
- Follow OWASP Top 10 hygiene: validate redirect targets, escape user-supplied HTML before rendering (the markdown renderer in [sites/msb/components/server/MarkdownRenderer](../sites/msb/components/server/MarkdownRenderer/) already does this — reuse it).

## Roadmap / future context

This frontend is the public face of a **decoupled** system. The backend CMS is mid-migration — keep both worlds in mind when making changes:

- **Today (legacy):** A KeystoneJS-based headless CMS exposes a GraphQL API. All current data fetching goes through `@msb/js-sdk` (Apollo + generated types) per the _Data & SDKs_ section. The GraphQL surface has accumulated significant query complexity; avoid deepening that complexity in new code unless it's strictly necessary for shipping legacy features.
- **Coming:** A new custom headless CMS built with **Laravel + Filament** will replace Keystone. The new API is **REST**, consumed via `fetch` — no GraphQL, no Apollo. When designing new data layers, prefer thin REST adapters and Next.js fetch caching (`fetch(..., { next: { tags, revalidate } })`, `'use cache'` + `cacheTag` per Next 16) over new GraphQL fragments. Any new shared client should live in `packages/sdk` (or a successor package) so msb, widgets, and myprop can swap implementations together.
- **Content model change:** The legacy `body` field is Markdown (rendered today by [sites/msb/components/server/MarkdownRenderer](../sites/msb/components/server/MarkdownRenderer/)). The new CMS replaces it with a JSON `content` field using the **TipTap** schema. Server-side vs. client-side rendering of TipTap JSON is **not yet decided** — the backend may pre-render to HTML, or it may ship raw JSON for the Next.js app to render programmatically. Until that decision lands:
  - Don't bake either assumption into shared UI. Keep new rich-text rendering behind a single component boundary so it can be swapped between an HTML pass-through (sanitized) and a TipTap-JSON renderer.
  - If you render TipTap JSON client-side, sanitize/validate node types against an allowlist; if you render server-side HTML, sanitize with the same rules the markdown renderer uses.
- During the transition, both pipelines may coexist. Don't delete the Apollo/Markdown stack until the Laravel/Filament cutover is announced — but flag new Keystone-only work as a migration cost in PR descriptions.
