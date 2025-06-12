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
        ...ContactFields
      }
      services {
        ...ServiceFields
      }
      address {
        ...AddressFields
      }
      hours {
        ...HourFields
      }
      trails {
        ...TrailFields
      }
      facilities {
        ...FacilityFields
      }
    }

    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
