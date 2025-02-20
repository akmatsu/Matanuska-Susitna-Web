import { gql, TypedDocumentNode } from '@apollo/client';

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
    contacts: {
      id: string;
      name: string;
      email?: string | null;
      phone?: string | null;
      user: {
        name: string;
      };
    }[];
    parent: {
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
  query GetOrgUnitMeta($where: OrgUnitMetaWhereUniqueInput!) {
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
  query GetOrgUnit($where: OrgUnitWhereUniqueInput!) {
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
