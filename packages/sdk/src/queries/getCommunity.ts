import { gql, TypedDocumentNode } from '@apollo/client';

import {
  GetCommunityMetaQuery,
  GetCommunityMetaQueryVariables,
  GetCommunityQuery,
  GetCommunityQueryVariables,
} from '../graphql/graphql';

export const GET_COMMUNITY_META_QUERY: TypedDocumentNode<
  GetCommunityMetaQuery,
  GetCommunityMetaQueryVariables
> = gql`
  query GetCommunityMeta($where: CommunityWhereUniqueInput!) {
    community(where: $where) {
      title
      description
    }
  }
`;

export const GET_COMMUNITY_QUERY: TypedDocumentNode<
  GetCommunityQuery,
  GetCommunityQueryVariables
> = gql`
  query GetCommunity(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    community(where: { slug: $slug }) {
      ...CommunityPage
    }

    publicNotices(
      where: { communities: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
