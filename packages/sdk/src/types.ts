import { TypedDocumentNode } from '@apollo/client';
import type {
  GetAssemblyDistrictQuery,
  GetCommunityMetaQuery,
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
  | NonNullable<GetServiceQuery['service']>
  | NonNullable<GetCommunityMetaQuery['community']>
  | NonNullable<GetOrgUnitQuery['orgUnit']>
  | NonNullable<GetParkQuery['park']>
  | NonNullable<GetTrailQuery['trail']>
  | NonNullable<GetFacilityQuery['facility']>
  | NonNullable<GetPublicNoticeQuery['publicNotice']>
  | NonNullable<GetAssemblyDistrictQuery['assemblyDistrict']>;

export type PageMerged = MergeUnion<PageTypes>;

export type PageType =
  | 'service'
  | 'community'
  | 'orgUnit'
  | 'park'
  | 'trail'
  | 'facility'
  | 'publicNotice';

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
