import { gql, TypedDocumentNode } from '@apollo/client';
import { Contact } from '../types';

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

export interface GetOrgUnitVariables {
  where: {
    slug: string;
  };
}

export const GET_ORG_UNIT_META_QUERY: TypedDocumentNode<
  GetOrgUnitMetaData,
  GetOrgUnitVariables
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
  GetOrgUnitVariables
> = gql`
  query OrgUnit($where: OrgUnitWhereUniqueInput!) {
    orgUnit(where: $where) {
      id
      title
      description
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
        user {
          name
        }
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
  }
`;
