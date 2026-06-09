import Link from 'next/link';

import type { PollingLocationFeature } from './types';

/** Renders a single polling place as a card with address and precinct map links. */
export function PollingPlaceCard({ place }: { place: PollingLocationFeature }) {
  return (
    <div className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex h-full">
        <div className="flex h-full items-center bg-slate-100 p-4">
          <div className="bg-primary flex aspect-square w-18 items-center justify-center rounded-full p-3 text-white">
            <span className="icon-[mdi--where-to-vote-outline] size-full"></span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-base font-semibold text-slate-900">
            {place.attributes.POLLING_PL}
          </p>
          <p className="text-msb-base text-sm font-semibold">
            Assembly District {place.attributes.AssemblyDistrict}
          </p>

          <p className="mt-3 text-sm text-slate-700">
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                place.attributes.ADDRESS,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="before:icon-[mdi--map-marker] before:mr-1"
            >
              {place.attributes.ADDRESS}
            </Link>
          </p>

          <p className="mt-2 text-sm text-slate-700">
            <Link
              href={`https://matsugov.us/documents/cdn/${place.attributes.PrecinctMap}`}
              target="_blank"
              rel="noreferrer"
              className="before:icon-[mdi--map] before:mr-1"
            >
              {place.attributes.DIST_NAME}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
