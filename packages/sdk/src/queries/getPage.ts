import { gql, TypedDocumentNode } from '@apollo/client';
import { GetPageQuery, GetPageQueryVariables } from '../types';

export const GET_PAGE: TypedDocumentNode<GetPageQuery, GetPageQueryVariables> =
  gql`
    query GetPage(
      $slug: String!
      $type: String!
      $publicNoticeWhere: PublicNoticeWhereInput
    ) {
      getPage(slug: $slug, type: $type) {
        __typename
        ... on AssemblyDistrict {
          ...AssemblyDistrictPage
        }
        ... on Board {
          ...BoardPage
        }
        ... on Community {
          ...CommunityPage
        }
        ... on Facility {
          ...FacilityPage
        }
        ... on OrgUnit {
          ...OrgUnitPage
        }
        ... on Park {
          ...ParkPage
        }
        ... on PublicNotice {
          ...PublicNoticePage
        }
        ... on Service {
          ...ServicePage
        }
        ... on Trail {
          ...TrailPage
        }
        ... on Topic {
          ...TopicPage
        }
      }

      publicNotices(where: $publicNoticeWhere) {
        ...PublicNoticeFields
      }
    }
  `;
