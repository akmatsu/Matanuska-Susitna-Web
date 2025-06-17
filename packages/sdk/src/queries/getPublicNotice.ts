import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetPublicNoticeMetaQuery,
  GetPublicNoticeMetaQueryVariables,
  GetPublicNoticeQuery,
  GetPublicNoticeQueryVariables,
} from '../graphql/graphql';
import {
  ActionFields,
  AssemblyDistrictFields,
  BoardFields,
  CommunityFields,
  ContactFields,
  DocumentFields,
  FacilityFields,
  OrgUnitFields,
  ParkFields,
  ServiceFields,
  TopicFields,
  TrailFields,
} from './baseFragments';

export const GET_PUBLIC_NOTICE_META: TypedDocumentNode<
  GetPublicNoticeMetaQuery,
  GetPublicNoticeMetaQueryVariables
> = gql`
  query GetPublicNoticeMeta($slug: String!) {
    publicNotice(where: { slug: $slug }) {
      title
      description
    }
  }
`;

export const GET_PUBLIC_NOTICE: TypedDocumentNode<
  GetPublicNoticeQuery,
  GetPublicNoticeQueryVariables
> = gql`
  ${DocumentFields}
  ${ActionFields}
  ${ContactFields}
  ${TopicFields}
  ${CommunityFields}
  ${AssemblyDistrictFields}
  ${ParkFields}
  ${FacilityFields}
  ${TrailFields}
  ${OrgUnitFields}
  ${BoardFields}
  ${ServiceFields}

  query GetPublicNotice($slug: String!) {
    publicNotice(where: { slug: $slug }) {
      id
      slug
      title
      heroImage
      body
      description
      effectiveDate
      endDate
      contacts {
        ...ContactFields
      }
      documents {
        ...DocumentFields
      }
      actions {
        ...ActionFields
      }

      contacts {
        ...ContactFields
      }
      topics {
        ...TopicFields
      }
      communities {
        ...CommunityFields
      }
      assemblyDistricts {
        ...AssemblyDistrictFields
      }
      parks {
        ...ParkFields
      }
      facilities {
        ...FacilityFields
      }
      trails {
        ...TrailFields
      }
      orgUnits {
        ...OrgUnitFields
      }
      boards {
        ...BoardFields
      }
      services {
        ...ServiceFields
      }
    }
  }
`;
