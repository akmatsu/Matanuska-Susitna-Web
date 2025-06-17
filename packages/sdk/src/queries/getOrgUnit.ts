import { gql, type TypedDocumentNode } from '@apollo/client';

import {
  GetOrgUnitMetaQuery,
  GetOrgUnitMetaQueryVariables,
  GetOrgUnitQuery,
  GetOrgUnitQueryVariables,
} from '../graphql/graphql';
import {
  ActionFields,
  ContactFields,
  DocumentFields,
  OrgUnitFields,
  ServiceFields,
  TopicFields,
} from './baseFragments';

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
  ${DocumentFields}
  ${ActionFields}
  ${ContactFields}
  ${TopicFields}
  ${ServiceFields}
  ${OrgUnitFields}

  query GetOrgUnit(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    orgUnit(where: { slug: $slug }) {
      id
      title
      description
      body
      heroImage
      actions {
        ...ActionFields
      }
      documents {
        ...DocumentFields
      }
      topics {
        ...TopicFields
      }
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
    publicNotices(
      where: { orgUnits: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
