import { gql, type TypedDocumentNode } from '@apollo/client';

import {
  GetOrgUnitMetaQuery,
  GetOrgUnitMetaQueryVariables,
  GetOrgUnitQuery,
  GetOrgUnitQueryVariables,
} from '../graphql/graphql';

export const GET_ORG_UNIT_META_QUERY: TypedDocumentNode<
  GetOrgUnitMetaQuery,
  GetOrgUnitMetaQueryVariables
> = gql`
  query GetOrgUnitMeta($where: OrgUnitWhereUniqueInput!) {
    orgUnit(where: $where) {
      id
      title
      description
    }
  }
`;

export const GET_ORG_UNIT_QUERY: TypedDocumentNode<
  GetOrgUnitQuery,
  GetOrgUnitQueryVariables
> = gql`
  query GetOrgUnit(
    $where: OrgUnitWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    orgUnit(where: $where) {
      id
      title
      description
      body
      heroImage
      children {
        ...OrgUnitFields
      }
      contacts {
        ...ContactFields
      }
      parent {
        ...OrgUnitFields
      }
      services {
        ...ServiceFields
      }
    }
    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
