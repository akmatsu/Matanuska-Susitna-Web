import { NextRequest, NextResponse } from 'next/server';

import {
  DEFAULT_PARCEL_COUNT,
  DEFAULT_PARCEL_SEED,
  MAX_PARCEL_COUNT,
  getMockParcels,
} from './mockParcels';

type SearchType = 'ALL' | 'PARCEL_ID' | 'TAX_ID' | 'OWNER' | 'ADDRESS';

const supportedTypes: SearchType[] = [
  'ALL',
  'PARCEL_ID',
  'TAX_ID',
  'OWNER',
  'ADDRESS',
];

function getSearchFields(type: SearchType) {
  switch (type) {
    case 'PARCEL_ID':
      return ['PARCEL_ID'] as const;
    case 'TAX_ID':
      return ['TAX_ID'] as const;
    case 'OWNER':
      return ['OWNER', 'BUYER'] as const;
    case 'ADDRESS':
      return ['CITE_ADDRESS', 'OWNER_ADDRESS', 'BUYER_ADDRESS'] as const;
    default:
      return ['PARCEL_ID', 'TAX_ID', 'OWNER', 'BUYER', 'CITE_ADDRESS'] as const;
  }
}

function parseInteger(value: string | null) {
  if (value === null) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return parsed;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestedType = searchParams.get('type')?.toUpperCase() as
    | SearchType
    | undefined;

  const query = (searchParams.get('query') ?? '').trim().toLowerCase() || '';

  const type: SearchType =
    requestedType && supportedTypes.includes(requestedType)
      ? requestedType
      : 'ALL';

  const seed = parseInteger(searchParams.get('seed')) ?? DEFAULT_PARCEL_SEED;
  const sourceCount = clamp(
    parseInteger(searchParams.get('count')) ?? DEFAULT_PARCEL_COUNT,
    1,
    MAX_PARCEL_COUNT,
  );
  const page = Math.max(parseInteger(searchParams.get('page')) ?? 1, 1);
  const limit = clamp(parseInteger(searchParams.get('limit')) ?? 10, 1, 100);

  const parcels = getMockParcels({ seed, count: sourceCount });

  const fields = getSearchFields(type);
  const filtered = query
    ? parcels.filter((parcel) =>
        fields.some((field) => parcel[field].toLowerCase().includes(query)),
      )
    : parcels;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * limit;

  const results = filtered.slice(start, start + limit).map((parcel) => ({
    PARCEL_ID: parcel.PARCEL_ID,
    TAX_ID: parcel.TAX_ID,
    OWNER: parcel.OWNER,
    CITE_ADDRESS: parcel.CITE_ADDRESS,
    STATUS: parcel.STATUS,
    BALANCE: parcel.BALANCE,
  }));

  return NextResponse.json({
    type,
    query,
    count: results.length,
    total,
    page: currentPage,
    limit,
    totalPages,
    seed,
    sourceCount,
    results,
  });
}
