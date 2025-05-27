import { TypedDocumentNode } from '@apollo/client';
import type {
  GetAssemblyDistrictQuery,
  GetBoardQuery,
  GetCommunityQuery,
  GetFacilityQuery,
  GetOrgUnitQuery,
  GetParkQuery,
  GetPublicNoticeQuery,
  GetServiceQuery,
  GetTrailQuery,
} from './graphql/graphql.ts';

export type * from './graphql/graphql.ts';

// Converts a union into an intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type Distribute<T> = T extends any ? T : never;

// Takes a union of object types and makes shared properties required, non-shared optional
type MergeUnion<T> = {
  __typename?: Exclude<
    // for each member of T, pull out its __typename type (if it has one)
    Distribute<T> extends { __typename?: infer U } ? U : never,
    undefined
  >;
} & {
  [K in Exclude<
    keyof UnionToIntersection<T>,
    '__typename'
  >]: UnionToIntersection<T>[K];
} & {
  [K in Exclude<
    keyof T,
    keyof UnionToIntersection<T> | '__typename'
  >]?: T extends Record<K, infer V> ? V : never;
};
// Example usage with your types
export type PageTypes =
  | NonNullable<GetServiceQuery['service']>
  | NonNullable<GetCommunityQuery['community']>
  | NonNullable<GetOrgUnitQuery['orgUnit']>
  | NonNullable<GetParkQuery['park']>
  | NonNullable<GetTrailQuery['trail']>
  | NonNullable<GetFacilityQuery['facility']>
  | NonNullable<GetPublicNoticeQuery['publicNotice']>
  | NonNullable<GetAssemblyDistrictQuery['assemblyDistrict']>
  | NonNullable<GetBoardQuery['board']>;

export type PageMerged = MergeUnion<PageTypes>;

export type PageType =
  | 'service'
  | 'community'
  | 'orgUnit'
  | 'park'
  | 'trail'
  | 'facility'
  | 'publicNotice'
  | 'assemblyDistrict'
  | 'board';

export type PageConfig = {
  query: TypedDocumentNode<any, any>;
  metaQuery: TypedDocumentNode<any, any>;
  map?: {
    layerId?: string;
    layerUrl?: string;
    layerOpacity?: number;
    itemKey?: string;
  };
};
