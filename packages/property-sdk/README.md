# @msb/property-sdk

Shared client for the MSB property/parcel API. Use this from any site or package that needs to read parcel, search, or taxmap data instead of duplicating the `fetch` plumbing.

## Usage

```ts
import { propertyApiCall } from '@msb/property-sdk';

const { data } = await propertyApiCall<{ data: ParcelDetails }>(
  `/detail/${encodeURIComponent(pid)}`,
);
```

`propertyApiCall` is a Next.js server action (`'use server'`) — call it from Server Components, route handlers, or other server actions. It reads:

- `API_URL` — base URL of the property API (defaults to `http://localhost:3000/api` for local dev).
- `API_KEY` — sent as the `ApiKey` request header.

Path inputs are normalized and rejected if they contain traversal segments (`..`), URL authority (`://`), backslashes, or query/fragment characters — keep arbitrary path construction on the caller side and pass query data through the `params` argument.

## Why a package

Per the monorepo roadmap, the legacy KeystoneJS/GraphQL stack is being replaced with REST APIs consumed via `fetch`. New shared REST clients live here (rather than in each site's `utils/`) so `sites/msb`, `sites/widgets`, and `sites/myprop` can adopt them together when needed.
