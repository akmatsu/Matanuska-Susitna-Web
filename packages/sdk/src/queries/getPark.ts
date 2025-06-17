import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetParkMetaQuery,
  GetParkMetaQueryVariables,
  GetParkQuery,
  GetParkQueryVariables,
} from '../graphql/graphql';
import {
  ActionFields,
  AddressFields,
  ContactFields,
  DocumentFields,
  FacilityFields,
  HourFields,
  ParkFields,
  PublicNoticeFields,
  ServiceFields,
  TopicFields,
  TrailFields,
} from './baseFragments';

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
  ${DocumentFields}
  ${ActionFields}
  ${ContactFields}
  ${AddressFields}
  ${HourFields}
  ${ServiceFields}
  ${TrailFields}
  ${FacilityFields}
  ${TopicFields}
  ${ParkFields}
  ${PublicNoticeFields}

  query GetPark(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    park(where: { slug: $slug }) {
      id
      title
      slug
      body
      heroImage
      description
      actions {
        ...ActionFields
      }
      documents {
        ...DocumentFields
      }
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

    publicNotices(
      where: { trails: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
