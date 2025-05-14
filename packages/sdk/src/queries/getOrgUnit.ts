import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  Contact,
  PublicNoticeWhere,
  TakeVariable,
  WhereSlugVariables,
} from './baseTypes';

export interface GetOrgUnitMetaData {
  orgUnit: {
    title: string;
    description?: string | null;
    heroImage?: string | null;
  };
}

export interface GetOrgUnitData {
  orgUnit: {
    id: string;
    title: string;
    description?: string | null;
    heroImage?: string | null;
    children: {
      id: string;
      description?: string | null;
      title: string;
      slug: string;
    }[];
    contacts: Contact[];
    parent?: {
      id: string;
      slug: string;
      title: string;
      description?: string | null;
    };
    services: {
      id: string;
      slug: string;
      title: string;
      description?: string | null;
    }[];
  };
}

export const GET_ORG_UNIT_META_QUERY: TypedDocumentNode<
  GetOrgUnitMetaData,
  WhereSlugVariables
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
  GetOrgUnitData,
  WhereSlugVariables & PublicNoticeWhere & TakeVariable
> = gql`
  query OrgUnit(
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
        id
        description
        title
        slug
      }
      contacts {
        id
        name
        title
        email
        phone
      }
      parent {
        id
        slug
        title
        description
      }
      services {
        id
        slug
        title
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
