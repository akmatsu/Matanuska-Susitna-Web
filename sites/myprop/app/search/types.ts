export type ParcelSearchResult = {
  TAX_ID: string;
  OWNER: string | null;
  BUYER: string | null;
  SUBD_NAME: string | null;
  SITE_MULT: 'Y' | 'N';
  ADDRESS: string | null;
  PARCEL_ID: string;
  MAP: string | null;
  BASEMAP_ABBR: string | null;
};

export type SubdivisionSearchResult = {
  SUBD_NAME: string;
  SUBD_NUM: string;
  MAP: string;
  BASEMAP_ABBR: string | null;
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

export type SortField =
  | 'TAX_ID'
  | 'PARCEL_ID'
  | 'OWNER'
  | 'ADDRESS'
  | 'SUBD_NAME';
export type SortDirection = 'ASC' | 'DESC';

export type SortParams = {
  sortField: SortField;
  sortDirection: SortDirection;
  sortField2: SortField | 'NONE';
  sortDirection2: SortDirection;
};

export const DEFAULT_SORT: SortParams = {
  sortField: 'OWNER',
  sortDirection: 'ASC',
  sortField2: 'ADDRESS',
  sortDirection2: 'ASC',
};

const VALID_SORT_FIELDS: SortField[] = [
  'TAX_ID',
  'PARCEL_ID',
  'OWNER',
  'ADDRESS',
  'SUBD_NAME',
];
const VALID_SORT_DIRECTIONS: SortDirection[] = ['ASC', 'DESC'];

export function parseSortParams(
  params: Record<string, string | string[] | undefined>,
): SortParams {
  const raw = {
    sortField: toSingleParam(params.sortField).toUpperCase(),
    sortDirection: toSingleParam(params.sortDirection).toUpperCase(),
    sortField2: toSingleParam(params.sortField2).toUpperCase(),
    sortDirection2: toSingleParam(params.sortDirection2).toUpperCase(),
  };

  return {
    sortField: VALID_SORT_FIELDS.includes(raw.sortField as SortField)
      ? (raw.sortField as SortField)
      : DEFAULT_SORT.sortField,
    sortDirection: VALID_SORT_DIRECTIONS.includes(
      raw.sortDirection as SortDirection,
    )
      ? (raw.sortDirection as SortDirection)
      : DEFAULT_SORT.sortDirection,
    sortField2:
      raw.sortField2 === 'NONE' ||
      VALID_SORT_FIELDS.includes(raw.sortField2 as SortField)
        ? (raw.sortField2 as SortField | 'NONE')
        : DEFAULT_SORT.sortField2,
    sortDirection2: VALID_SORT_DIRECTIONS.includes(
      raw.sortDirection2 as SortDirection,
    )
      ? (raw.sortDirection2 as SortDirection)
      : DEFAULT_SORT.sortDirection2,
  };
}
