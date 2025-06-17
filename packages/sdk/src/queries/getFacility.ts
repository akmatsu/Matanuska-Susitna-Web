import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetFacilityMetaQuery,
  GetFacilityMetaQueryVariables,
  GetFacilityQuery,
  GetFacilityQueryVariables,
} from '../graphql/graphql';
import {
  ActionFields,
  AddressFields,
  ContactFields,
  DocumentFields,
  HourFields,
  ParkFields,
  PublicNoticeFields,
  ServiceFields,
  TopicFields,
  TrailFields,
} from './baseFragments';

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
  ${DocumentFields}
  ${ActionFields}
  ${ContactFields}
  ${AddressFields}
  ${HourFields}
  ${ServiceFields}
  ${TopicFields}
  ${ParkFields}
  ${TrailFields}
  ${PublicNoticeFields}

  query GetFacility(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    facility(where: { slug: $slug }) {
      id
      slug
      title
      liveUrl
      heroImage
      description
      body
      actions {
        ...ActionFields
      }
      documents {
        ...DocumentFields
      }

      topics {
        ...TopicFields
      }
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

    publicNotices(
      where: { communities: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
