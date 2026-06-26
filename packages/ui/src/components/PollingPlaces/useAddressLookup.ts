import {
  AddressFeature,
  getPrecinctByGeometry,
  PollingLocationFeature,
  PrecinctFeature,
  searchAddresses,
} from '@msb/open-data';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

/** Milliseconds to wait after the user stops typing before querying address autocomplete. */
const ADDRESS_DEBOUNCE_MS = 150;

export type UseAddressLookupResult = {
  /** Current value of the address input. */
  addressQuery: string;
  /** Autocomplete suggestions for the current query. */
  addressResults: AddressFeature[];
  /** True while the autocomplete request is in flight. */
  isAddressLoading: boolean;
  /** The address string the user confirmed from the dropdown. */
  selectedAddress: string | null;
  /** OBJECTID of the selected address — used for aria-activedescendant. */
  selectedAddressObjectId: number | null;
  /** Precinct resolved from the selected address coordinates. */
  myPrecinct: PrecinctFeature | null;
  /** Polling place matched to the resolved precinct. */
  myPollingPlace: PollingLocationFeature | null;
  /** True while the precinct/polling-place lookup is in flight. */
  isLookupLoading: boolean;
  /** Error message from the precinct/polling-place lookup, if any. */
  lookupError: string | null;
  /** Whether the autocomplete dropdown should be visible. */
  showAddressDropdown: boolean;
  /** Call when the address input receives focus. */
  onAddressFocus: () => void;
  /** Call when the address input loses focus. */
  onAddressBlur: () => void;
  /**
   * Call when the address input value changes.
   * Clears any previous selection before updating the query.
   */
  onAddressChange: (value: string) => void;
  /** Call when the user picks a suggestion from the autocomplete dropdown. */
  onAddressSelect: (feature: AddressFeature) => Promise<void>;
  /** Resets all address lookup state so the user can start a new search. */
  clearAddressLookup: () => void;
  /** Index of the keyboard-highlighted suggestion (-1 means none). */
  highlightedIndex: number;
  /** Call on input keydown to support ArrowUp/ArrowDown/Enter/Escape navigation. */
  onAddressKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

/**
 * Manages the three-step address lookup flow:
 *   1. Debounced type-ahead autocomplete against the MSB address layer.
 *   2. Spatial intersection query to find the user's voting precinct.
 *   3. In-memory match of the precinct to an already-loaded polling place.
 *
 * Accepts the pre-loaded `places` array to avoid an extra API call in step 3.
 */
export function useAddressLookup(
  places: PollingLocationFeature[],
): UseAddressLookupResult {
  const [addressQuery, setAddressQuery] = useState('');
  const [addressResults, setAddressResults] = useState<AddressFeature[]>([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isAddressFocused, setIsAddressFocused] = useState(false);

  // Set when the user picks a suggestion from the dropdown; clears the dropdown
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  // Tracks which option is highlighted for aria-activedescendant
  const [selectedAddressObjectId, setSelectedAddressObjectId] = useState<
    number | null
  >(null);

  const [myPrecinct, setMyPrecinct] = useState<PrecinctFeature | null>(null);
  const [myPollingPlace, setMyPollingPlace] =
    useState<PollingLocationFeature | null>(null);
  const [isLookupLoading, setIsLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Incremented each time a new search starts so stale in-flight responses can be discarded
  const currentRequestId = useRef(0);

  // Index of the keyboard-highlighted option in the dropdown (-1 = none)
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Show the autocomplete dropdown only when the field is focused, has text,
  // and the user hasn't already made a selection
  const showAddressDropdown =
    isAddressFocused && !!addressQuery.trim() && !selectedAddress;

  // ---------------------------------------------------------------------------
  // Effect: debounced address autocomplete
  // Re-runs whenever addressQuery changes; aborts the previous in-flight request
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const trimmed = addressQuery.trim();

    // Skip when the field is empty or the user already chose an address
    if (!trimmed || selectedAddress) return;

    const requestId = ++currentRequestId.current;
    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      try {
        setIsAddressLoading(true);

        const data = await searchAddresses(addressQuery);

        // Discard results that arrived after a newer request was already issued
        if (requestId !== currentRequestId.current) return;

        setAddressResults(data?.features ?? []);
        setHighlightedIndex(-1);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        if (requestId !== currentRequestId.current) return;

        console.error('Address search failed:', err);
        setAddressResults([]);
      } finally {
        setIsAddressLoading(false);
      }
    }, ADDRESS_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [addressQuery, selectedAddress]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const clearAddressLookup = () => {
    setAddressQuery('');
    setAddressResults([]);
    setSelectedAddress(null);
    setMyPrecinct(null);
    setMyPollingPlace(null);
    setLookupError(null);
    setSelectedAddressObjectId(null);
    setHighlightedIndex(-1);
    // Invalidate any in-flight autocomplete request
    ++currentRequestId.current;
  };

  const onAddressKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showAddressDropdown) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < addressResults.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : addressResults.length - 1,
        );
        break;
      case 'Enter':
        if (highlightedIndex >= 0 && addressResults[highlightedIndex]) {
          event.preventDefault();
          void onAddressSelect(addressResults[highlightedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsAddressFocused(false);
        break;
    }
  };

  const onAddressChange = (value: string) => {
    // If the user edits after selecting, reset the lookup before updating the query
    if (selectedAddress) clearAddressLookup();
    setAddressQuery(value);
  };

  /**
   * Performs a spatial intersection query against the precinct layer to identify
   * the user's voting precinct, then matches it to an already-loaded polling place
   * by DISTRICT code — avoiding a second API call.
   */
  const onAddressSelect = async (feature: AddressFeature) => {
    setSelectedAddress(feature.attributes.ADDRESS);
    setSelectedAddressObjectId(feature.attributes.OBJECTID);
    setAddressQuery(feature.attributes.ADDRESS);
    setIsLookupLoading(true);
    setLookupError(null);
    setMyPrecinct(null);
    setMyPollingPlace(null);

    try {
      const precinctResponse = await getPrecinctByGeometry(feature.geometry);

      const precinct = precinctResponse.features?.[0] ?? null;

      if (!precinct) {
        setLookupError(
          'No voting precinct found for this address. Please verify the address is within Matanuska-Susitna Borough.',
        );
        return;
      }

      setMyPrecinct(precinct);

      // Match the precinct to a polling place by DISTRICT code
      const pollingPlace =
        places.find(
          (p) => p.attributes.DISTRICT === precinct.attributes.DISTRICT,
        ) ?? null;

      if (!pollingPlace) {
        setLookupError('No polling location found for this precinct.');
        return;
      }

      setMyPollingPlace(pollingPlace);
    } catch {
      setLookupError('Failed to look up precinct and polling location.');
    } finally {
      setIsLookupLoading(false);
    }
  };

  return {
    addressQuery,
    addressResults,
    isAddressLoading,
    selectedAddress,
    selectedAddressObjectId,
    myPrecinct,
    myPollingPlace,
    isLookupLoading,
    lookupError,
    showAddressDropdown,
    onAddressFocus: () => setIsAddressFocused(true),
    onAddressBlur: () => setIsAddressFocused(false),
    onAddressChange,
    onAddressSelect,
    clearAddressLookup,
    highlightedIndex,
    onAddressKeyDown,
  };
}
