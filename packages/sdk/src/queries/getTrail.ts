import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetTrailMetaQuery,
  GetTrailMetaQueryVariables,
  GetTrailQuery,
  GetTrailQueryVariables,
} from '../graphql/graphql';

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
  query GetTrail(
    $where: TrailWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    trail(where: $where) {
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
      park {
        id
        slug
        title
        description
      }
      contacts {
        id
        name
        title
        phone
        email
      }
      address {
        id
        title
        lineOne
        lineTwo
        state
        city
        zip
      }
      services {
        id
        title
        slug
        description
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
