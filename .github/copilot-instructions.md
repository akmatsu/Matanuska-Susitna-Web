## Monorepo & Workflows

- Follow the prerequisites in [README.md](README.md) (Node, pnpm, TypeSense, MSB CMS) before running anything; the repo is split into deployable apps under sites/_ and shared packages under packages/_.
- Use `pnpm msb:dev`, `pnpm msb:build`, `pnpm wid:dev`, `pnpm ui:dev`, `pnpm codegen`, `pnpm codegen:watch`, and `pnpm lint` from the repo root—these scripts are orchestrated via turbo as defined in [package.json](package.json).
- When debugging only the main site, the Next-specific `dev`, `build`, `build:analyze`, and `start` scripts with tracing flags live in [sites/msb/package.json](sites/msb/package.json).
- GraphQL code generation depends on the local CMS schema path set in [packages/sdk/codegen.ts](packages/sdk/codegen.ts), so ensure that repo exists and the relative path stays valid before running `pnpm codegen*`.

## Data & SDKs

- GraphQL traffic flows through `@msb/js-sdk`'s `registerClient` in [packages/sdk/src/client/ApolloClient.ts](packages/sdk/src/client/ApolloClient.ts); passing `NEXT_PUBLIC_API_URL` keeps both msb and widget apps pointed at the same CMS.
- Server components should call `getClientHandler` from [sites/msb/utils/apollo/utils.ts](sites/msb/utils/apollo/utils.ts) so every query is `fetchPolicy: 'no-cache'` and carries the default `NEXT_PUBLIC_DEFAULT_REVALIDATE` from [sites/msb/configs/config.ts](sites/msb/configs/config.ts).
- Wrap the tree with `ApolloWrapper` as done in [sites/msb/app/layout.tsx](sites/msb/app/layout.tsx); the provider defined in [packages/sdk/src/components/ApolloWrapper.tsx](packages/sdk/src/components/ApolloWrapper.tsx) hydrates Apollo on the client while server components keep streaming data.
- Use the generated `gql` tag from `@msb/js-sdk/gql` when composing fragments (see [sites/msb/app/page.tsx](sites/msb/app/page.tsx)), and delegate metadata lookups to `getPageMeta` in [sites/msb/utils/pageHelpers.ts](sites/msb/utils/pageHelpers.ts) for consistent SEO output.

## App Architecture

- Navigation, hero chrome, and org branding live in [sites/msb/app/layout.tsx](sites/msb/app/layout.tsx) and pull items from [sites/msb/configs/config.ts](sites/msb/configs/config.ts); reuse `primaryNav` rather than hard-coding links.
- Detail routes follow the pattern in [sites/msb/app/%5Bslug%5D/page.tsx](sites/msb/app/%5Bslug%5D/page.tsx): fetch data via GraphQL, render with `BasePage`, and compose sidebar modules like `PageFacilities` and `PageListItems`.
- Respect the client/server/static split documented in [sites/msb/components/README.md](sites/msb/components/README.md) (and child READMEs) to avoid mixing component types in a single barrel file.
- Platform-level settings such as `basePath`, workspace transpilation, and remote image hosts live in [sites/msb/next.config.mjs](sites/msb/next.config.mjs); update them there instead of ad-hoc configuration inside components.

## Search & Routing

- All InstantSearch experiences must go through [sites/msb/components/static/search/InstantSearchWrapper.tsx](sites/msb/components/static/search/InstantSearchWrapper.tsx), which bootstraps the TypeSense adapter with `NEXT_PUBLIC_TYPESENSE_*` values.
- Client entry points such as [sites/msb/components/client/search/SearchDynamicWrapper.tsx](sites/msb/components/client/search/SearchDynamicWrapper.tsx) dynamically import the UI to disable SSR; follow the same pattern for any new TypeSense-driven widget.
- Middleware in [sites/msb/middleware.ts](sites/msb/middleware.ts) runs the search redirect handler first ([sites/msb/middleware/handlers/searchRedirect.ts](sites/msb/middleware/handlers/searchRedirect.ts)), then CMS-managed redirects ([sites/msb/middleware/handlers/cmsRedirects.ts](sites/msb/middleware/handlers/cmsRedirects.ts) + [sites/msb/utils/stringHelpers.ts](sites/msb/utils/stringHelpers.ts)), and finally logs page views—keep the order when adding handlers.
- When adding new top-level resource routes, update the matcher arrays in the search redirect handler so `/route` visitors still land on `/search` with the correct refinement.

## Widgets & Shared Packages

- The widgets map route ([sites/widgets/app/map/page.tsx](sites/widgets/app/map/page.tsx)) sanitizes query params before rendering `MapWrapper`, which shells `@msb/map`; the map itself ([packages/map/src/Map.tsx](packages/map/src/Map.tsx), [packages/map/src/utils.ts](packages/map/src/utils.ts)) dynamically loads ArcGIS, injects vector/feature layers, and exposes `filterAndZoom`.
- Document collection embeds render via `@matsugov/ui/DocumentCollection` in [sites/widgets/app/document-collection/%5Bid%5D/page.tsx](sites/widgets/app/document-collection/%5Bid%5D/page.tsx), honoring `link_style`, `center_label`, and `hide_title` query params for per-site customization.
- Shared GraphQL helpers live in [sites/widgets/utils/index.ts](sites/widgets/utils/index.ts); reuse that registrar for new widgets instead of spinning up ad-hoc Apollo instances.
- UI tokens/components are centralized in [packages/tw-config/msb.css](packages/tw-config/msb.css) and [packages/ui/package.json](packages/ui/package.json); prefer importing from `@matsugov/ui` rather than recreating markup so typography and spacing stay consistent.

## Auth, Analytics & Environment

- Authentication is centralized in [sites/msb/auth.ts](sites/msb/auth.ts); call `auth()`, `signIn`, and `signOut` via server actions like the Footer implementation in [sites/msb/app/layout.tsx](sites/msb/app/layout.tsx) so Microsoft Entra continues to handle the flow.
- Analytics must go through [sites/msb/components/client/AnalyticsScript.tsx](sites/msb/components/client/AnalyticsScript.tsx), which checks `CookieBannerProvider` consent before loading Crazy Egg.
- Key environment variables include `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_DEFAULT_REVALIDATE`, `NEXT_PUBLIC_BASE_PATH`, and the TypeSense credentials consumed in [sites/msb/components/static/search/InstantSearchWrapper.tsx](sites/msb/components/static/search/InstantSearchWrapper.tsx); keep them in sync across deployment targets.
- Middleware is wrapped by `auth` inside [sites/msb/middleware.ts](sites/msb/middleware.ts), ensuring anonymous users see CMS redirects while admins skip them—leave the wrapper in place for any new handlers.
