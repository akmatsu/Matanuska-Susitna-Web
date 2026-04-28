import { NextResponse } from 'next/server';

import {
  DEFAULT_PARCEL_COUNT,
  DEFAULT_PARCEL_SEED,
  MAX_PARCEL_COUNT,
  getParcelById,
} from '../mockParcels';

type RouteParams = {
  params: Promise<{
    parcelId: string;
  }>;
};

export async function GET(_: Request, { params }: RouteParams) {
  const parseInteger = (value: string | null) => {
    if (value === null) {
      return undefined;
    }

    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return undefined;
    }

    return parsed;
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const url = new URL(_.url);
  const seed =
    parseInteger(url.searchParams.get('seed')) ?? DEFAULT_PARCEL_SEED;
  const count = clamp(
    parseInteger(url.searchParams.get('count')) ?? DEFAULT_PARCEL_COUNT,
    1,
    MAX_PARCEL_COUNT,
  );

  const { parcelId } = await params;
  const parcel = getParcelById(parcelId, { seed, count });

  if (!parcel) {
    return NextResponse.json(
      {
        error: 'Parcel not found.',
        parcelId,
        seed,
        count,
      },
      { status: 404 },
    );
  }

  return NextResponse.json(parcel);
}
