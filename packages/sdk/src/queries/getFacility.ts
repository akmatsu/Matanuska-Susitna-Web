import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetFacilityMetaQuery,
  GetFacilityMetaQueryVariables,
  GetFacilityQuery,
  GetFacilityQueryVariables,
} from '../graphql/graphql';

export const GET_FACILITY_META: TypedDocumentNode<
  GetFacilityMetaQuery,
  GetFacilityMetaQueryVariables
> = gql`
  query GetFacilityMeta($where: FacilityWhereUniqueInput!) {
    facility(where: $where) {
      title
      description
    }
  }
`;

export const GET_FACILITY_QUERY: TypedDocumentNode<
  GetFacilityQuery,
  GetFacilityQueryVariables
> = gql`
  query GetFacility(
    $where: FacilityWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    facility(where: $where) {
      id
      slug
      title
      liveUrl
      heroImage
      description
      body
      park {
        ...ParkFields
      }
      services {
        ...ServiceFields
      }
      address {
        ...AddressFields
      }
      contacts {
        ...ContactFields
      }
      hours {
        ...HourFields
      }
    }
    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
