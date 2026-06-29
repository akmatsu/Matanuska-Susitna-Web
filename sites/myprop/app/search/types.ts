export type ParcelSearchResult = {
  TAX_ID: string;
  OWNER: string | null;
  BUYER: string | null;
  SUBD_NAME: string | null;
  SITE_MULT: 'Y' | 'N';
  Address: string | null;
  PARCEL_ID: string;
  MAP: string | null;
  basemap_abbr: string | null;
};

export type SubdivisionSearchResult = {
  SUBD_NAME: string;
  SUBD_NUM: string;
  MAP: string;
  basemap_abbr: string | null;
};

export type ApiResponseBody = {
  metaData: {
    page: number;
    pageSize: number;
    MaxRecords?: number;
  };
  data: Array<ParcelSearchResult | SubdivisionSearchResult>;
};

export function toSingleParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}
