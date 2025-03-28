import {
  GetCommunityData,
  GetOrgUnitData,
  GetParkItem,
  GetServiceData,
} from './queries';

// Converts a union into an intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

// Takes a union of object types and makes shared properties required, non-shared optional
type MergeUnion<T> = {
  [K in keyof UnionToIntersection<T>]: UnionToIntersection<T>[K];
} & {
  [K in Exclude<keyof T, keyof UnionToIntersection<T>>]?: T extends Record<
    K,
    infer V
  >
    ? V
    : never;
};

// Example usage with your types
type PageTypes =
  | GetServiceData['service']
  | GetCommunityData['community']
  | GetOrgUnitData['orgUnit']
  | GetParkItem;

export type PageMerged = MergeUnion<PageTypes>;

export type PageType = 'service' | 'community' | 'orgUnit' | 'park';

export type ExternalLink = {
  id: string;
  label?: string | null;
  url: SavedUrl;
};

export type SavedUrl = {
  id: string;
  url: string;
  title: string;
};

// Not sure if I need this. Not being used atm.
// export type BasePage = {
//   id: string;
//   title: string;
//   slug?: string;
//   body?: string | null;
//   description?: string | null;
// };

export type Contact = {
  id: string;
  name: string;
  title?: string | null;
  phone?: string | null;
  email?: string | null;
};

export type PageListItem = {
  slug: string;
  id: string;
  title: string;
  description?: string | null;
};

export type Service = {
  slug: string;
  id: string;
  title: string;
  description?: string | null;
};

export type Address = {
  title: string;
  lineOne: string;
  lineTwo?: string | null;
  city: string;
  state: string;
  zip: string;
};

export type Hour = {
  day: string;
  open: string;
  close: string;
};
