import { gql } from '@apollo/client';
import {
  ActionFields,
  BoardFields,
  CommunityFields,
  ContactFields,
  DistrictDetailFields,
  DocumentFields,
  FacilityFields,
  HighlightFields,
  OrgUnitFields,
  ParkFields,
  PublicNoticeFields,
  ServiceFields,
  TrailFields,
} from './baseFragments';

export const GET_TOPIC = gql`
  ${PublicNoticeFields}
  ${ActionFields}
  ${DocumentFields}
  ${ContactFields}
  ${HighlightFields}
  ${BoardFields}
  ${ServiceFields}
  ${CommunityFields}
  ${FacilityFields}
  ${DistrictDetailFields}
  ${OrgUnitFields}
  ${ParkFields}
  ${TrailFields}

  query GetTopic($where: TopicWhereUniqueInput!) {
    topic(where: $where) {
      id
      body
      description
      slug
      heroImage
      publicNotices {
        ...PublicNoticeFields
      }

      actions {
        ...ActionFields
      }
      documents {
        ...DocumentFields
      }
      contacts {
        ...ContactFields
      }
      highlights {
        ...HighlightFields
      }
      boards {
        ...BoardFields
      }
      services {
        ...ServiceFields
      }
      communities {
        ...CommunityFields
      }
      facilities {
        ...FacilityFields
      }
      districts {
        ...DistrictDetailFields
      }
      orgUnits {
        ...OrgUnitFields
      }
      parks {
        ...ParkFields
      }
      trails {
        ...TrailFields
      }
    }
  }
`;
