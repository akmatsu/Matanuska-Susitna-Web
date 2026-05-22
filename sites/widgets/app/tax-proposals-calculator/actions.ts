'use server';

import {
  fetchParcelDetail,
  fetchPropertySearch,
  getMostRecentAppraisedValue,
  getMostRecentMillRate,
  getMostRecentTaxableValue,
} from '@/utils/propertyApi';
import type { ParcelSearchResult } from '@/utils/propertyApi';

function toExemptionFlag(value: unknown): number {
  if (typeof value === 'number') {
    return value > 0 ? 1 : 0;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim().toLowerCase();
    if (trimmed === 'y' || trimmed === 'yes' || trimmed === 'true') {
      return 1;
    }
    const parsed = Number(trimmed);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return 1;
    }
  }
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  return 0;
}

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
  const disabledVet = toExemptionFlag(detail.data.DISABLED_VET);
  const senior = toExemptionFlag(detail.data.SENIOR);
  return {
    appraisedValue,
    taxableValue,
    address: detail.data.CITE_ADDRESS,
    millRate,
    disabledVet,
    senior,
  };
}
