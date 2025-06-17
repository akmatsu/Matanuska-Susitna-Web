import { gql, TypedDocumentNode } from '@apollo/client';

import {
  GetCommunityMetaQuery,
  GetCommunityMetaQueryVariables,
  GetCommunityQuery,
  GetCommunityQueryVariables,
} from '../graphql/graphql';
import {
  ActionFields,
  BoardFields,
  ContactFields,
  DistrictDetailFields,
  DocumentFields,
  PublicNoticeFields,
  ServiceFields,
  TopicFields,
} from './baseFragments';

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
  ${DocumentFields}
  ${ActionFields}
  ${ContactFields}
  ${BoardFields}
  ${ServiceFields}
  ${TopicFields}
  ${DistrictDetailFields}
  ${PublicNoticeFields}

  query GetCommunity(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    community(where: { slug: $slug }) {
      id
      title
      description
      body
      heroImage
      boards {
        ...BoardFields
      }
      topics {
        ...TopicFields
      }
      documents {
        ...DocumentFields
      }
      actions {
        ...ActionFields
      }
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

    publicNotices(
      where: { communities: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
