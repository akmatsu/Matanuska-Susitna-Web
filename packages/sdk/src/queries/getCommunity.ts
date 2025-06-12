import { gql, TypedDocumentNode } from '@apollo/client';

import {
  GetCommunityMetaQuery,
  GetCommunityMetaQueryVariables,
  GetCommunityQuery,
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
  GetCommunityMetaQueryVariables
> = gql`
  query GetCommunity(
    $where: CommunityWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    community(where: $where) {
      id
      title
      description
      body
      heroImage
      services {
        ...ServiceFields
      }
      contacts {
        ...ContactFields
      }
      districts {
        ...DistrictDetailFields
      }
    }

    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
