// import { AddressLookup } from './AddressLookup';
import { BrowsePollingPlaces } from './BrowsePollingPlaces';
import type { PollingLocationFeature, PollingLocationResponse } from './types';

const POLLING_URL =
  'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_PollingLocations/FeatureServer/0/query';

async function fetchPollingPlaces(): Promise<PollingLocationFeature[]> {
  const params = new URLSearchParams({
    where: '1=1',
    outFields: '*',
    outSR: '4326',
    orderByFields: 'DIST_NAME ASC',
    f: 'json',
  });

  const response = await fetch(`${POLLING_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch polling places (HTTP ${response.status})`);
  }

  const data: PollingLocationResponse = await response.json();
  return data.features ?? [];
}

// Server component — errors bubble up to the nearest error.tsx boundary,
// and loading state is handled by a Suspense fallback in the parent.
export async function PollingPlaces() {
  const places = await fetchPollingPlaces();

  return (
    <>
      {/* <AddressLookup places={places} /> */}
      <BrowsePollingPlaces places={places} />
    </>
  );
}
