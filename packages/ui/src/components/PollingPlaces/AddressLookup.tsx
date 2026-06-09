'use client';

import { PhoneLink } from '../PhoneLink';
import { PollingPlaceCard } from './PollingPlaceCard';
import { PollingLocationFeature } from './types';
import { useAddressLookup } from './useAddressLookup';

export function AddressLookup({
  places,
}: {
  places: PollingLocationFeature[];
}) {
  const lookup = useAddressLookup(places);

  return (
    <section>
      <h2>Find your polling place</h2>
      <p>Enter your home address to locate your polling place.</p>

      <div className="not-prose relative">
        <label htmlFor="address-lookup" className="sr-only">
          Enter your address
        </label>
        <div className="flex gap-2">
          <input
            id="address-lookup"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="address-lookup-results"
            aria-expanded={lookup.showAddressDropdown}
            aria-activedescendant={
              lookup.showAddressDropdown &&
              lookup.highlightedIndex >= 0 &&
              lookup.addressResults[lookup.highlightedIndex]
                ? `address-option-${lookup.addressResults[lookup.highlightedIndex].attributes.OBJECTID}`
                : lookup.selectedAddressObjectId
                  ? `address-option-${lookup.selectedAddressObjectId}`
                  : undefined
            }
            value={lookup.addressQuery}
            placeholder="Type your address..."
            onFocus={lookup.onAddressFocus}
            onBlur={lookup.onAddressBlur}
            onChange={(event) => lookup.onAddressChange(event.target.value)}
            onKeyDown={lookup.onAddressKeyDown}
            className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:ring-2 focus:outline-none"
          />
          {lookup.selectedAddress && (
            <button
              type="button"
              onClick={lookup.clearAddressLookup}
              className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-msb-base-dark mt-3 text-sm">
          Need help? Contact the Borough Clerk&apos;s Office at or the Alaska
          State Division of Elections at <PhoneLink phoneNumber="9078618684" />{' '}
          or the Alaska State Division of Elections at{' '}
          <PhoneLink phoneNumber="+1 (866) 952-8683" />
        </p>

        {/* Autocomplete dropdown */}
        {lookup.showAddressDropdown && (
          <ul
            id="address-lookup-results"
            role="listbox"
            className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg"
          >
            {lookup.isAddressLoading && (
              <li className="px-4 py-2 text-sm text-slate-500">Searching...</li>
            )}
            {!lookup.isAddressLoading && lookup.addressResults.length === 0 && (
              <li className="px-4 py-2 text-sm text-slate-500">
                No addresses found.
              </li>
            )}
            {lookup.addressResults.map((feature, index) => (
              <li
                id={`address-option-${feature.attributes.OBJECTID}`}
                key={feature.attributes.OBJECTID}
                role="option"
                aria-selected={
                  lookup.selectedAddressObjectId === feature.attributes.OBJECTID
                }
                // Prevent onBlur from firing before onClick so the dropdown stays open
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => void lookup.onAddressSelect(feature)}
                className={`cursor-pointer border-b px-4 py-2 text-sm text-slate-900 last:border-0 hover:bg-slate-50${
                  index === lookup.highlightedIndex ? 'bg-slate-100' : ''
                }`}
              >
                {feature.attributes.ADDRESS.toLocaleUpperCase()},{' '}
                {feature.attributes.COMMUNITY},{' '}
                {feature.attributes.stateabbreviation}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lookup result */}
      {lookup.selectedAddress && (
        <div className="not-prose mt-4 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            Results for{' '}
            <span className="font-semibold text-slate-900">
              {lookup.selectedAddress}
            </span>
          </p>

          {lookup.isLookupLoading && (
            <p className="text-sm text-slate-600">Looking up precinct...</p>
          )}

          {lookup.lookupError && (
            <p className="text-sm text-red-700">{lookup.lookupError}</p>
          )}

          {lookup.myPrecinct && (
            <p className="text-sm text-slate-700">
              <span className="font-medium">Precinct:</span>{' '}
              {lookup.myPrecinct.attributes.DIST_NAME} (
              {lookup.myPrecinct.attributes.DISTRICT})
            </p>
          )}

          {lookup.myPollingPlace && (
            <div className="grid grid-cols-1">
              <PollingPlaceCard place={lookup.myPollingPlace} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
