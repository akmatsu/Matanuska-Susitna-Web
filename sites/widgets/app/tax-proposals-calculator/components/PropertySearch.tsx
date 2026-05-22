'use client';

import { useState, useTransition } from 'react';
import { getParcelPropertyValues, searchParcels } from '../actions';
import type { ParcelSearchResult } from '@/utils/propertyApi';
import { formatCurrency } from './formatCurrency';
import type { SelectedProperty } from '../hooks/useTaxCalculator';

interface PropertySearchProps {
  selectedProperties: SelectedProperty[];
  onPropertiesChange: (properties: SelectedProperty[]) => void;
}

export function PropertySearch({
  selectedProperties,
  onPropertiesChange,
}: PropertySearchProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ParcelSearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingParcelId, setAddingParcelId] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [isSearchPending, startSearchTransition] = useTransition();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchError(null);
    startSearchTransition(async () => {
      const { results: data, error } = await searchParcels(trimmed);
      if (error) {
        setSearchError(error);
      } else {
        setResults(data);
        setHasSearched(true);
      }
    });
  };

  const handleAdd = async (result: ParcelSearchResult) => {
    if (selectedProperties.some((p) => p.parcelId === result.PARCEL_ID)) {
      return;
    }
    setAddingParcelId(result.PARCEL_ID);
    setAddError(null);
    try {
      const {
        appraisedValue,
        taxableValue,
        address,
        millRate,
        disabledVet,
        senior,
      } = await getParcelPropertyValues(result.PARCEL_ID);
      const newProperty: SelectedProperty = {
        parcelId: result.PARCEL_ID,
        taxId: result.TAX_ID,
        address: address ?? result.Address,
        owner: result.OWNER,
        appraisedValue,
        taxableValue,
        millRate,
        disabledVet,
        senior,
      };
      const updated = [...selectedProperties, newProperty];
      onPropertiesChange(updated);
    } catch {
      setAddError('Failed to fetch property details. Please try again.');
    } finally {
      setAddingParcelId(null);
    }
  };

  const handleRemove = (parcelId: string) => {
    const updated = selectedProperties.filter((p) => p.parcelId !== parcelId);
    onPropertiesChange(updated);
  };

  const isAlreadyAdded = (parcelId: string) =>
    selectedProperties.some((p) => p.parcelId === parcelId);

  const totalAppraisedValue = selectedProperties.reduce(
    (sum, p) => sum + (p.appraisedValue ?? 0),
    0,
  );
  const totalTaxableValue = selectedProperties.reduce(
    (sum, p) => sum + (p.taxableValue ?? 0),
    0,
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Property Value ($)
      </label>

      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
        <p className="text-xs font-medium text-gray-600">
          Search for your property to auto-fill Taxable Value (Assessed) and
          Appraised Value
        </p>
        <button
          type="button"
          onClick={() => setIsSearchModalOpen(true)}
          className="shrink-0 rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          Add Property
        </button>
      </div>

      {isSearchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Search for a property"
        >
          <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Find Property
              </h3>
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
                aria-label="Close property search"
              >
                Close
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by address, owner, or parcel ID"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearchPending || !query.trim()}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSearchPending && (
                  <span
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/50 border-t-white"
                    aria-hidden="true"
                  />
                )}
                {isSearchPending ? 'Searching…' : 'Search'}
              </button>
            </div>

            {searchError && (
              <p className="mt-2 text-xs text-red-600">{searchError}</p>
            )}

            {/* Search results */}
            {hasSearched && !isSearchPending && (
              <div className="mt-3">
                {results.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    No results found for &ldquo;{query}&rdquo;.
                  </p>
                ) : (
                  <ul className="max-h-80 divide-y divide-gray-200 overflow-y-auto rounded-md border border-gray-200 bg-white">
                    {results.map((result) => {
                      const added = isAlreadyAdded(result.PARCEL_ID);
                      const isAdding = addingParcelId === result.PARCEL_ID;
                      return (
                        <li
                          key={result.PARCEL_ID}
                          className="flex items-start justify-between gap-2 px-3 py-2 text-xs"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">
                              {result.Address ?? result.PARCEL_ID}
                            </p>
                            <p className="text-gray-500">
                              {result.OWNER ?? 'Unknown owner'} &middot;{' '}
                              {result.TAX_ID}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAdd(result)}
                            disabled={added || isAdding}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold enabled:cursor-pointer enabled:bg-blue-600 enabled:text-white enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={
                              added
                                ? `${result.PARCEL_ID} already added`
                                : `Add ${result.PARCEL_ID}`
                            }
                          >
                            {isAdding && (
                              <span
                                className="h-3 w-3 animate-spin rounded-full border-2 border-white/50 border-t-white"
                                aria-hidden="true"
                              />
                            )}
                            {isAdding ? 'Adding…' : added ? 'Added' : 'Add'}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}

            {addError && (
              <p className="mt-2 text-xs text-red-600">{addError}</p>
            )}
          </div>
        </div>
      )}

      {/* Selected properties list */}
      {selectedProperties.length > 0 && (
        <div className="space-y-1 rounded-md border border-gray-200 bg-white p-2">
          <p className="text-[11px] font-medium text-gray-600">
            Added properties ({selectedProperties.length})
          </p>
          <ul className="max-h-28 divide-y divide-gray-100 overflow-y-auto rounded-md border border-gray-200 bg-white">
            {selectedProperties.map((prop) => (
              <li
                key={prop.parcelId}
                className="flex items-center justify-between gap-2 px-2 py-1.5 text-[11px]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-gray-700">
                    {prop.address ?? prop.parcelId}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Appraised: {formatCurrency(prop.appraisedValue ?? 0)}
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-blue-700">
                  {prop.taxableValue != null
                    ? formatCurrency(prop.taxableValue)
                    : 'N/A'}
                </p>
                <button
                  type="button"
                  onClick={() => handleRemove(prop.parcelId)}
                  className="shrink-0 cursor-pointer rounded px-1.5 py-0.5 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                  aria-label={`Remove ${prop.parcelId}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {selectedProperties.length > 0 && (
            <div className="space-y-1 text-right text-xs font-semibold text-gray-700">
              <p>
                Taxable Value (Assessed): {formatCurrency(totalTaxableValue)}
              </p>
              <p>Appraised Value: {formatCurrency(totalAppraisedValue)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
