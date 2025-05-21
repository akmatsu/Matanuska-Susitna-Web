import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetParkMetaQuery,
  GetParkMetaQueryVariables,
  GetParkQuery,
  GetParkQueryVariables,
} from '../graphql/graphql';

export const GET_PARK_META_QUERY: TypedDocumentNode<
  GetParkMetaQuery,
  GetParkMetaQueryVariables
> = gql`
  query GetParkMeta($where: ParkWhereUniqueInput!) {
    park(where: $where) {
      title
      description
    }
  }
`;

export const GET_PARK_QUERY: TypedDocumentNode<
  GetParkQuery,
  GetParkQueryVariables
> = gql`
  query GetPark(
    $where: ParkWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    park(where: $where) {
      id
      title
      slug
      body
      heroImage
      contacts {
        id
        title
        phone
        email
        name
      }
      services {
        title
        description
        slug
        id
      }
      address {
        title
        lineOne
        lineOne
        city
        state
        zip
      }
      hours {
        day
        open
        close
      }
      trails {
        title
        description
        slug
        id
      }
      facilities {
        title
        id
        description
        slug
      }
    }

    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      id
      slug
      title
      description
      heroImage
      urgency
    }
  }
`;
