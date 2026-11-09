# @msb/cms-sdk

A typed client for the sites REST API of the Laravel/Filament CMS (`laravel-based-cms`).

This package replaces `@msb/js-sdk` (Keystone GraphQL) one page type at a time. Services is the first page type to use it.

## Server only

- Every call sends the site's API key. The `server-only` import makes a build fail if this package ends up in a Client Component.
- Client Components may still import **types** from this package (`import type { ... }`).
- The CMS API has no CORS, so it can't be called from the browser anyway.

## Environment variables

Set these in each site that uses the package. Don't use a `NEXT_PUBLIC_` prefix.

| Name          | Example                              | Notes                                                    |
| ------------- | ------------------------------------ | -------------------------------------------------------- |
| `CMS_API_URL` | `http://localhost:8000/api/sites/v1` | Base URL of the sites API, including `/api/sites/v1`.    |
| `CMS_API_KEY` | (secret)                             | The site's key. For msb this is the CMS's `API_KEY_MSB`. |

A missing value throws a clear error on the first request.

## Usage

```ts
import { getService } from '@msb/cms-sdk';

const result = await getService('animal-care', {
  include: ['contacts', 'topics'],
  revalidate: 60,
});

if (!result) notFound(); // missing or unpublished
result.data.contacts; // typed as present, because it was included
result.data.tags; // type error: not included
```

- **`getService()`** returns `null` on a 404. Other non-2xx responses throw a `CmsApiError` with `status`, `path` and, for a 422, `errors`.
- **`listServices()`** returns one page.
- **`listAllServices()`** walks every page.

## Caching

Requests use the Next.js data cache through `fetch`'s `next` option. The default is `revalidate: 60`.

Every request is tagged (`cms`, `cms:services` and `cms:services:<slug>`), so a future publish webhook can call `revalidateTag()`. In apps with `cacheComponents` turned on, wrap calls in `'use cache'`.

## Types

`src/generated/sites.d.ts` is generated from the CMS's committed OpenAPI spec. Don't edit it by hand. To regenerate it after the spec changes, run this from the repo root:

```sh
pnpm cms:codegen
```

This needs the `laravel-based-cms` repo checked out next to this one (`../laravel-based-cms`).

`src/types.ts` gives the generated schemas friendly names. `src/tiptap.ts` hand-types the TipTap rich text nodes, because the spec only describes a generic node.

## Adding a page type

1. Regenerate the types once the CMS has the new endpoint.
2. Add `src/<resource>.ts` following `services.ts`. It should:
   - call `cmsGet()` with the path,
   - use `cacheConfig()` with `cmsTags`,
   - use `WithIncludes` for the included relations.
3. Export it from `src/index.ts`.
