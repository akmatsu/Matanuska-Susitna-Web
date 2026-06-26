import { retry } from '../shared';
import { ADDRESS_SEARCH_URL } from './constants';
import { AddressSearchResponse } from './types';

/**
 * Searches for addresses matching the given query string using the ArcGIS REST
 * API. Due to quirks in the ArcGIS API, we implement a retry mechanism to
 * handle potential transient failures, such as stale responses or network
 * issues.
 */
export async function searchAddresses(
  query: string,
  options?: {
    /** The maximum number of results to return. Default is 5 */
    count?: number;
    /** cache-busting timestamp to prevent stale ArcGIS responses, default is the current date */
    date?: Date;
    init?: RequestInit;
  },
): Promise<AddressSearchResponse | undefined> {
  const controller = new AbortController();
  return retry(async (signal) => {
    const trimmed = query.trim();

    const params = new URLSearchParams({
      where: `ADDRESS LIKE '%${trimmed}%'`,
      outFields: 'OBJECTID,ADDRESS,COMMUNITY,stateabbreviation',
      outSR: '4326',
      f: 'json',
      resultRecordCount: String(options?.count ?? 5),
      // Cache-busting timestamp to prevent stale ArcGIS responses
      _ts: String(options?.date?.getTime() ?? Date.now()),
    });

    const response = await fetch(`${ADDRESS_SEARCH_URL}?${params.toString()}`, {
      ...options?.init,
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch address data: ${response.statusText} with code ${response.status}`,
      );
    }

    return response.json();
  }, controller.signal);
}
