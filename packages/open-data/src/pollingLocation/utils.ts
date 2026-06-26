import { POLLING_URL } from './constants';
import { PollingLocationResponse } from './types';

export async function getPollingPlaces(): Promise<PollingLocationResponse> {
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

  return response.json();
}
