import { getPollingPlaces } from '@msb/open-data';
import { BrowsePollingPlaces } from './BrowsePollingPlaces';

// Server component — errors bubble up to the nearest error.tsx boundary,
// and loading state is handled by a Suspense fallback in the parent.
export async function PollingPlaces() {
  const data = await getPollingPlaces();
  const places = data.features;

  return (
    <>
      <BrowsePollingPlaces places={places} />
    </>
  );
}
