'use client';

import { cn } from '@matsugov/ui/lib';
import { useEffect, useState } from 'react';

type Feature = {
  attributes: {
    OBJECTID: number;
    P_ID: number;
    ACCOUNT: string;
    TAXID_LOKI: string;
    ROADNME: string;
    LAT: number;
    LONG: number;
    C1_STATUS: number;
    GlobalID: string;
    siteaddid: string;
    DiscrpAgID: string;
    addrrange: string | null;
    unittype: string | null;
    unitid: string | null;
    Country: string;
    stateabbreviation: string;
    municipality: string;
    esn: string;
    ADRSNUM: string;
    CREATION_USER: string;
    MODIFY_USER: string;
    ADDRESS: string;
    CREATION_DATE: number; // timestamp
    COMMUNITY: string;
    DateUpdate: number; // timestamp
    SSAP_NGUID: string;
    roadname: string;
    P_ROADNME: string;
    S_ROADNME: string;
    LOC_SEQ: number;
  };
  geometry: {
    x: number;
    y: number;
  };
};

type SearchResult = {
  displayFieldName: 'ACCOUNT';
  fieldAliases: {
    OBJECTID: string;
    P_ID: string;
    ACCOUNT: string;
    TAXID_LOKI: string;
    ROADNME: string;
    LAT: string;
    LONG: string;
    C1_STATUS: string;
    GlobalID: string;
    siteaddid: string;
    DiscrpAgID: string;
    addrrange: string;
    unittype: string;
    unitid: string;
    Country: string;
    stateabbreviation: string;
    municipality: string;
    esn: string;
    ADRSNUM: string;
    CREATION_USER: string;
    MODIFY_USER: string;
    ADDRESS: string;
    CREATION_DATE: string;
    COMMUNITY: string;
    DateUpdate: string;
    SSAP_NGUID: string;
    roadname: string;
    P_ROADNME: string;
    S_ROADNME: string;
    LOC_SEQ: string;
  };
  geometryType: string;
  spatialReference: {
    wkid: number;
    latestWkid: number;
  };
  fields: Array<{
    name: string;
    type:
      | 'esriFieldTypeOID'
      | 'esriFieldTypeDouble'
      | 'esriFieldTypeString'
      | 'esriFieldTypeGlobalID'
      | 'esriFieldTypeDate'
      | 'esriFieldTypeInteger'
      | 'esriFieldTypeSmallInteger';
    alias: string;
    length?: number;
  }>;
  features: Array<Feature>;
};

type PrecinctFeature = {
  attributes: {
    OBJECTID: number;
    DISTRICT: string;
    POPULATION: number;
    DIST_NAME: string;
    NAME: string;
    GlobalID: string;
  };
};

type PrecinctResult = {
  features: PrecinctFeature[];
};

type PollingLocationFeature = {
  attributes: {
    DISTRICT: string;
    NAME: string;
    ADDRESS: string;
    POLLING_PL: string;
    OBJECTID: number;
    DIST_NAME: string;
    PrecinctMap: string;
    PollingLocationMap: string;
    AssemblyDistrict: number;
  };
  geometry: {
    x: number;
    y: number;
  };
};

type PollingLocationResult = {
  features: PollingLocationFeature[];
};

const SEARCH_API_URL =
  'https://maps.matsugov.us/map/rest/services/OpenData/PublicSafety_Addresses/MapServer/0/query';
const PRECINCT_API_URL =
  'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_VotingPrecincts/FeatureServer/1/query';
const POLLING_LOCATION_API_URL =
  'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_PollingLocations/FeatureServer/0/query';
const DEBOUNCE_MS = 150;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPrecinct, setSelectedPrecinct] =
    useState<PrecinctFeature | null>(null);
  const [selectedPollingLocation, setSelectedPollingLocation] =
    useState<PollingLocationFeature | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const showResultsMenu = isInputFocused && !!query.trim();

  const loadElectionDetails = async (feature: Feature) => {
    const { x, y } = feature.geometry;
    const geometry = `{xmin: ${x}, ymin: ${y}, xmax: ${x}, ymax: ${y}}`;

    setIsDetailsLoading(true);
    setDetailsError(null);
    setSelectedPrecinct(null);
    setSelectedPollingLocation(null);

    try {
      const precinctParams = new URLSearchParams({
        where: '1=1',
        outFields: '*',
        geometry,
        geometryType: 'esriGeometryEnvelope',
        returnGeometry: 'false',
        inSR: '4326',
        spatialRel: 'esriSpatialRelIntersects',
        outSR: '4326',
        f: 'json',
      });

      const precinctResponse = await fetch(
        `${PRECINCT_API_URL}?${precinctParams.toString()}`,
      );

      if (!precinctResponse.ok) {
        throw new Error(
          `Precinct request failed with status ${precinctResponse.status}`,
        );
      }

      const precinctData = (await precinctResponse.json()) as PrecinctResult;
      const precinctFeature = precinctData.features?.[0] ?? null;

      if (!precinctFeature) {
        setDetailsError('No precinct found for the selected address.');
        return;
      }

      setSelectedPrecinct(precinctFeature);

      const pollingParams = new URLSearchParams({
        where: `DISTRICT = '${precinctFeature.attributes.DISTRICT}'`,
        outFields: '*',
        outSR: '4326',
        f: 'json',
      });

      const pollingResponse = await fetch(
        `${POLLING_LOCATION_API_URL}?${pollingParams.toString()}`,
      );

      if (!pollingResponse.ok) {
        throw new Error(
          `Polling location request failed with status ${pollingResponse.status}`,
        );
      }

      const pollingData =
        (await pollingResponse.json()) as PollingLocationResult;
      const pollingFeature = pollingData.features?.[0] ?? null;

      if (!pollingFeature) {
        setDetailsError('No polling location found for this precinct.');
        return;
      }

      setSelectedPollingLocation(pollingFeature);
    } catch {
      setDetailsError('Failed to load precinct and polling location details.');
    } finally {
      setIsDetailsLoading(false);
    }
  };

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const searchParams = new URLSearchParams({
          where: `ADDRESS LIKE '%${trimmedQuery}%'`,
          outFields: '*',
          outSR: '4326',
          f: 'json',
          resultRecordCount: '5',
        });

        const response = await fetch(
          `${SEARCH_API_URL}?${searchParams.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as SearchResult;

        setResults(data.features ?? []);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError('Search request failed.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Search Widget</h1>
      <label htmlFor="search-input" className="mb-2 block text-sm font-medium">
        Search
      </label>
      <div className="relative">
        <input
          id="search-input"
          type="search"
          role="combobox"
          placeholder="Type to search for address..."
          aria-autocomplete="list"
          aria-controls="address-search-results"
          aria-expanded={showResultsMenu}
          aria-activedescendant={
            selectedObjectId ? `address-option-${selectedObjectId}` : undefined
          }
          value={query}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(event) => {
            const nextQuery = event.target.value;

            setSelectedObjectId(null);
            setSelectedAddress(null);
            setSelectedPrecinct(null);
            setSelectedPollingLocation(null);
            setDetailsError(null);

            if (!nextQuery.trim()) {
              setResults([]);
              setIsLoading(false);
              setError(null);
              setIsDetailsLoading(false);
            }

            setQuery(nextQuery);
          }}
          className={cn(
            'w-full rounded border border-slate-300 px-3 py-2 ring-offset-2 outline-none focus:border-slate-500 focus:ring-2',
            {
              'after:icon-[mdi--loading] after:absolute after:inset-0 after:animate-spin after:rounded':
                isLoading,
            },
          )}
        />

        {showResultsMenu && (
          <ul
            id="address-search-results"
            role="listbox"
            className="mt-2 rounded border bg-white p-2 shadow"
          >
            {error && <li className="text-red-600">{error}</li>}
            {!isLoading && !error && results.length === 0 && (
              <li>No results found.</li>
            )}
            {results.map((feature) => {
              const isSelected =
                selectedObjectId === feature.attributes.OBJECTID;

              return (
                <li
                  id={`address-option-${feature.attributes.OBJECTID}`}
                  key={feature.attributes.OBJECTID}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    const displayAddress = `${feature.attributes.ADDRESS.toLocaleUpperCase()}, ${feature.attributes.COMMUNITY}, ${feature.attributes.stateabbreviation}`;

                    setQuery(feature.attributes.ADDRESS.toLocaleUpperCase());
                    setSelectedObjectId(feature.attributes.OBJECTID);
                    setSelectedAddress(displayAddress);
                    setIsInputFocused(false);
                    void loadElectionDetails(feature);
                  }}
                  className={cn('cursor-pointer border-b py-2 last:border-0', {
                    'bg-slate-100': isSelected,
                  })}
                >
                  {feature.attributes.ADDRESS.toLocaleUpperCase()},{' '}
                  {feature.attributes.COMMUNITY},{' '}
                  {feature.attributes.stateabbreviation}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {selectedAddress && (
        <section className="mt-4 rounded border border-slate-200 bg-slate-50 p-3">
          <h2 className="text-sm font-semibold text-slate-700">
            Selected Address
          </h2>
          <p className="mt-1 text-sm text-slate-900">{selectedAddress}</p>

          {isDetailsLoading && (
            <p className="mt-3 text-sm text-slate-600">
              Loading precinct details...
            </p>
          )}

          {detailsError && (
            <p className="mt-3 text-sm text-red-700">{detailsError}</p>
          )}

          {selectedPrecinct && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-slate-700">Precinct</h3>
              <p className="text-sm text-slate-900">
                {selectedPrecinct.attributes.DISTRICT} (
                {selectedPrecinct.attributes.NAME})
              </p>
            </div>
          )}

          {selectedPollingLocation && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-slate-700">
                Polling Location
              </h3>
              <p className="text-sm text-slate-900">
                {selectedPollingLocation.attributes.POLLING_PL}
              </p>
              <p className="text-sm text-slate-700">
                {selectedPollingLocation.attributes.ADDRESS}
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
