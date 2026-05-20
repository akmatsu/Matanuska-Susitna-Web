'use server';

import {
  fetchParcelDetail,
  fetchPropertySearch,
  getMostRecentAppraisedValue,
  getMostRecentMillRate,
  getMostRecentTaxableValue,
} from '@/utils/propertyApi';
import type { ParcelSearchResult } from '@/utils/propertyApi';

export async function searchParcels(
  query: string,
): Promise<{ results: ParcelSearchResult[]; error?: string }> {
  try {
    const data = await fetchPropertySearch(query);
    return { results: data.data };
  } catch (err) {
    return {
      results: [],
      error: err instanceof Error ? err.message : 'Search failed.',
    };
  }
}

export async function getParcelPropertyValues(pid: string): Promise<{
  appraisedValue: number | null;
  taxableValue: number | null;
  address: string | null;
  millRate: number | null;
  disabledVet: number;
  senior: number;
}> {
  const detail = await fetchParcelDetail(pid);
  const appraisedValue = getMostRecentAppraisedValue(detail.data.APPRAISALS);
  const taxableValue = getMostRecentTaxableValue(
    detail.data.ASSESSMENTS,
    detail.data.APPRAISALS,
  );
  const millRate = getMostRecentMillRate(detail.data.TAX_BILLING);
  const disabledVet = detail.data.DISABLED_VET ?? 0;
  const senior = detail.data.SENIOR ?? 0;
  return {
    appraisedValue,
    taxableValue,
    address: detail.data.CITE_ADDRESS,
    millRate,
    disabledVet,
    senior,
  };
}
