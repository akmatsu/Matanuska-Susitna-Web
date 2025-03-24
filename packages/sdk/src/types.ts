import {
  GET_COMMUNITY_QUERY,
  GET_ORG_UNIT_QUERY,
  GET_SERVICE_QUERY,
  GetCommunityData,
  GetOrgUnitData,
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
  | GetOrgUnitData['orgUnit'];

export type PageMerged = MergeUnion<PageTypes>;

export type PageType = 'service' | 'community' | 'orgUnit';
