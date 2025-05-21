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
      park {
        id
        title
        description
        slug
      }
      services {
        id
        title
        description
        slug
      }
      description
      body
      address {
        title
        lineOne
        lineTwo
        city
        state
        zip
      }
      contacts {
        id
        name
        email
        phone
        title
      }
      hours {
        day
        open
        close
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
