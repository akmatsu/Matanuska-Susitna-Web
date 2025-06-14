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
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    orgUnit(where: { slug: $slug }) {
      ...OrgUnitPage
    }
    publicNotices(
      where: { orgUnits: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
