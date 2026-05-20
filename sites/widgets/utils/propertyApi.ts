export type ParcelSearchResult = {
  TAX_ID: string;
  OWNER: string | null;
  SUBD_NAME: string | null;
  Address: string | null;
  PARCEL_ID: string;
};

export type ParcelSearchResponse = {
  metaData: {
    page: number;
    pageSize: number;
    MaxRecords?: number;
  };
  data: ParcelSearchResult[];
};

export type ParcelAssessment = {
  YEAR_ID: number | null;
  LAND_ASM: number | null;
  BLDG_ASM: number | null;
  TOTAL_ASM: number | null;
};

export type ParcelAppraisal = {
  YEAR_ID: number | null;
  LAND_APR: number | null;
  BLDG_APR: number | null;
  TOTAL_APR: number | null;
};

export type ParcelTaxBilling = {
  YEAR_ID: number | null;
  MILL: string | null;
};

export type ParcelDetailData = {
  PARCEL_ID: string;
  TAX_ID: string | null;
  CITE_ADDRESS: string | null;
  OWNER: string | null;
  TOTAL: number | null;
  DISABLED_VET?: number | null;
  SENIOR?: number | null;
  ASSESSMENTS?: ParcelAssessment[] | null;
  APPRAISALS?: ParcelAppraisal[] | null;
  TAX_BILLING?: ParcelTaxBilling[] | null;
};

const BASE_URL = process.env.MSB_API_URL || 'http://localhost:3000';
const API_KEY = process.env.MSB_API_KEY || '';

export async function fetchPropertySearch(
  query: string,
  mode = 'wild',
): Promise<ParcelSearchResponse> {
  const url = new URL('/property/search', BASE_URL);
  url.searchParams.set('query', query);
  url.searchParams.set('mode', mode);

  const response = await fetch(url.toString(), {
    headers: { ApiKey: API_KEY },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Property search failed: ${response.status} ${response.statusText}${body ? ` — ${body}` : ''}`,
    );
  }

  return response.json();
}

export async function fetchParcelDetail(
  pid: string,
): Promise<{ data: ParcelDetailData }> {
  // Validate pid to prevent path traversal
  if (!pid || pid.includes('/') || pid.includes('..') || pid.includes('\\')) {
    throw new Error('Invalid parcel ID');
  }

  const url = new URL(`/property/detail/${encodeURIComponent(pid)}`, BASE_URL);

  const response = await fetch(url.toString(), {
    headers: { ApiKey: API_KEY },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Parcel detail fetch failed with status ${response.status}`,
    );
  }

  return response.json();
}

/**
 * Returns the assessment year to use based on the current date in Alaska time.
 * New assessment values take effect July 1st, so before that date we use the
 * previous year's values.
 */
function getTargetAssessmentYear(): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Anchorage',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(new Date());
  const year = parseInt(parts.find((p) => p.type === 'year')!.value, 10);
  const month = parseInt(parts.find((p) => p.type === 'month')!.value, 10);
  // Before July 1: new assessments aren't yet in effect, use prior year
  return month < 7 ? year - 1 : year;
}

export function getMostRecentMillRate(
  billing: ParcelTaxBilling[] | null | undefined,
): number | null {
  if (!billing || billing.length === 0) return null;
  const targetYear = getTargetAssessmentYear();
  const sorted = [...billing].sort(
    (a, b) => (b.YEAR_ID ?? 0) - (a.YEAR_ID ?? 0),
  );
  // Prefer the target year; fall back to the most recent with a valid rate
  const preferred = sorted.find(
    (e) => e.YEAR_ID === targetYear && e.MILL && e.MILL !== '--',
  );
  const candidates = preferred ? [preferred, ...sorted] : sorted;
  for (const entry of candidates) {
    if (entry.MILL && entry.MILL !== '--') {
      const parsed = parseFloat(entry.MILL);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return null;
}

export function getMostRecentAppraisedValue(
  appraisals: ParcelAppraisal[] | null | undefined,
): number | null {
  if (!appraisals || appraisals.length === 0) return null;
  const targetYear = getTargetAssessmentYear();
  const sorted = [...appraisals].sort(
    (a, b) => (b.YEAR_ID ?? 0) - (a.YEAR_ID ?? 0),
  );
  // Prefer the target year; fall back to the most recent available
  const preferred = sorted.find((e) => e.YEAR_ID === targetYear);
  return (preferred ?? sorted[0]).TOTAL_APR;
}

export function getMostRecentTaxableValue(
  assessments: ParcelAssessment[] | null | undefined,
  appraisals: ParcelAppraisal[] | null | undefined,
): number | null {
  if (!assessments || assessments.length === 0) {
    return getMostRecentAppraisedValue(appraisals);
  }
  const targetYear = getTargetAssessmentYear();
  const sorted = [...assessments].sort(
    (a, b) => (b.YEAR_ID ?? 0) - (a.YEAR_ID ?? 0),
  );
  const preferred = sorted.find((e) => e.YEAR_ID === targetYear);
  const selected = preferred ?? sorted[0];
  if (selected.TOTAL_ASM !== null && selected.TOTAL_ASM !== undefined) {
    return selected.TOTAL_ASM;
  }
  return getMostRecentAppraisedValue(appraisals);
}
