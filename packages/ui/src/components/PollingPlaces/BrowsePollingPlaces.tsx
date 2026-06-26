'use client';

import { useMemo, useState } from 'react';
import { PollingPlaceCard } from './PollingPlaceCard';
import { PollingLocationFeature } from '@msb/open-data';

export function BrowsePollingPlaces({
  places,
}: {
  places: PollingLocationFeature[];
}) {
  // Client-side text filter for the full browsable list
  const [listQuery, setListQuery] = useState('');

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = listQuery.trim().toLowerCase();

    if (!normalizedQuery) return places;

    return places.filter((place) => {
      const searchableText = [
        place.attributes.POLLING_PL,
        `Assembly District ${place.attributes.AssemblyDistrict}`,
        place.attributes.ADDRESS,
        place.attributes.DIST_NAME,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [places, listQuery]);

  return (
    <section>
      <h2>Locations & Maps</h2>
      <div className="not-prose mb-4">
        <label htmlFor="polling-place-search" className="sr-only">
          Filter polling places
        </label>
        <input
          id="polling-place-search"
          type="search"
          value={listQuery}
          onChange={(event) => setListQuery(event.target.value)}
          placeholder="Filter by name, district, address, or precinct"
          className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:ring-2 focus:outline-none"
        />
      </div>

      {filteredPlaces.length === 0 && (
        <p className="text-sm text-slate-700">
          No polling places match your search.
        </p>
      )}

      <ul className="not-prose grid gap-4 sm:grid-cols-2">
        {filteredPlaces.map((place) => (
          <li key={place.attributes.OBJECTID}>
            <PollingPlaceCard place={place} />
          </li>
        ))}
      </ul>
    </section>
  );
}
