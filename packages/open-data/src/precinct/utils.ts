import { PRECINCT_URL } from './constants';
import { PrecinctResponse } from './types';

export async function getPrecinctByGeometry(
  geo: { x: number; y: number },
  options?: { init?: RequestInit },
): Promise<PrecinctResponse> {
  const params = new URLSearchParams({
    geometry: JSON.stringify(geo),
    geometryType: 'esriGeometryPoint',
    inSR: '4326',
    where: '1=1',
    outFields: 'DISTRICT,NAME,DIST_NAME',
    f: 'json',
  });

  const response = await fetch(
    `${PRECINCT_URL}?${params.toString()}`,
    options?.init,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch precinct data: ${response.statusText} with code ${response.status}`,
    );
  }

  return response.json();
}
