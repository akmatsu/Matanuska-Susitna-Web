# @msb/open-data

Shared helpers for querying MSB ArcGIS Open Data endpoints from server or client code.

## What this package exports

The package root exports:

- Address search helpers (`searchAddresses`) and types.
- Polling location helpers (`getPollingPlaces`) and types.
- Precinct helpers (`getPrecinctByGeometry`) and types.
- Shared `ESRIResponse<T>` type.

```ts
import {
	searchAddresses,
	getPollingPlaces,
	getPrecinctByGeometry,
	type AddressSearchResponse,
	type PollingLocationResponse,
	type PrecinctResponse,
} from '@msb/open-data';
```

## API

### `searchAddresses(query, options?)`

Searches the Public Safety Addresses ArcGIS layer using:

- `where: ADDRESS LIKE '%<trimmed query>%'`
- `outSR: 4326`
- `resultRecordCount: options.count ?? 5`

Function signature:

```ts
function searchAddresses(
	query: string,
	options?: {
		count?: number;
		date?: Date;
		init?: RequestInit;
	},
): Promise<AddressSearchResponse | undefined>;
```

Notes:

- Includes a cache-busting `_ts` query parameter (`options.date` or `Date.now()`).
- Uses an internal retry helper for transient failures.
- Throws on non-OK HTTP responses.

Example:

```ts
import { searchAddresses } from '@msb/open-data';

const results = await searchAddresses('350 E Dahlia Ave', {
	count: 10,
	init: {
		headers: {
			Accept: 'application/json',
		},
	},
});

const first = results?.features[0];
if (first) {
	console.log(first.attributes.ADDRESS, first.geometry.x, first.geometry.y);
}
```

### `getPollingPlaces()`

Fetches polling place features ordered by district name.

Function signature:

```ts
function getPollingPlaces(): Promise<PollingLocationResponse>;
```

Notes:

- Requests all fields (`outFields=*`) from the polling location layer.
- Throws on non-OK HTTP responses.

Example:

```ts
import { getPollingPlaces } from '@msb/open-data';

const data = await getPollingPlaces();
for (const feature of data.features) {
	console.log(feature.attributes.DIST_NAME, feature.attributes.POLLING_PL);
}
```

### `getPrecinctByGeometry(geo, options?)`

Looks up precinct features for a point geometry (`esriGeometryPoint`, WGS84 / 4326).

Function signature:

```ts
function getPrecinctByGeometry(
	geo: { x: number; y: number },
	options?: { init?: RequestInit },
): Promise<PrecinctResponse>;
```

Notes:

- Sends `geometry` as JSON in query params.
- Returns district fields: `DISTRICT`, `NAME`, `DIST_NAME`.
- Throws on non-OK HTTP responses.

Example:

```ts
import { getPrecinctByGeometry } from '@msb/open-data';

const precinct = await getPrecinctByGeometry({
	x: -149.9003,
	y: 61.2181,
});

const first = precinct.features[0];
if (first) {
	console.log(first.attributes.DISTRICT, first.attributes.DIST_NAME);
}
```

## Response types

All endpoint-specific response types are based on:

```ts
export interface ESRIResponse<T = unknown> {
	features: Array<T>;
	error?: {
		code?: number;
		message?: string;
	};
}
```

Feature types exported by the package:

- `AddressFeature` / `AddressSearchResponse`
- `PollingLocationFeature` / `PollingLocationResponse`
- `PrecinctFeature` / `PrecinctResponse`

## Endpoint constants

This package currently targets:

- Public Safety Addresses layer
- Administrative Polling Locations layer
- Administrative Voting Precincts layer

The concrete ArcGIS REST URLs are defined in each module's `constants.ts` file.
