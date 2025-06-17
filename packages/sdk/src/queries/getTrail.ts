import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetTrailMetaQuery,
  GetTrailMetaQueryVariables,
  GetTrailQuery,
  GetTrailQueryVariables,
} from '../graphql/graphql';
import {
  ActionFields,
  AddressFields,
  ContactFields,
  DocumentFields,
  ParkFields,
  PublicNoticeFields,
  ServiceFields,
  TopicFields,
} from './baseFragments';

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
  ${DocumentFields}
  ${ActionFields}
  ${ContactFields}
  ${AddressFields}
  ${TopicFields}
  ${PublicNoticeFields}

  query GetTrail(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    trail(where: { slug: $slug }) {
      id
      title
      body
      heroImage
      description
      length
      atv
      biking
      crossCountrySkiing
      difficulty
      dirtBiking
      dogWalking
      elevationChange
      fall
      frisbeeGolf
      hiking
      horsebackRiding
      mushing
      open
      running
      snowMachining
      snowshoeing
      spring
      summer
      winter

      topics {
        ...TopicFields
      }
      actions {
        ...ActionFields
      }
      documents {
        ...DocumentFields
      }
      park {
        ...ParkFields
      }
      contacts {
        ...ContactFields
      }
      address {
        ...AddressFields
      }
      services {
        ...ServiceFields
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
