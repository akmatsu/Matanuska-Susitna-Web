import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetTrailMetaQuery,
  GetTrailMetaQueryVariables,
  GetTrailQuery,
  GetTrailQueryVariables,
} from '../graphql/graphql';

export const GET_TRAIL_META_QUERY: TypedDocumentNode<
  GetTrailMetaQuery,
  GetTrailMetaQueryVariables
> = gql`
  query GetTrailMeta($where: TrailWhereUniqueInput!) {
    trail(where: $where) {
      title
      description
    }
  }
`;

export const GET_TRAIL_QUERY: TypedDocumentNode<
  GetTrailQuery,
  GetTrailQueryVariables
> = gql`
  query GetTrail(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    trail(where: { slug: $slug }) {
      ...TrailPage
    }
    publicNotices(
      where: { trails: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
