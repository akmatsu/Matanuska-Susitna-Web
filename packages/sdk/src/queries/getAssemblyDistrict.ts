import { gql, TypedDocumentNode } from '@apollo/client';
import { Contact, GQLPageMeta, WhereSlugVariables } from './baseTypes';

export interface AssemblyDistrictItem {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  body?: string | null;
  heroImage?: string | null;
  memberName?: string | null;
  bio?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  fax?: string | null;
  termStart?: string | null;
  termEnd?: string | null;
  contacts?: Contact[] | null;
  photo?: {
    id: string;
    title: string;
    description: string;
    file: {
      id: string;
      width: number;
      height: number;
      url: string;
    };
  } | null;
}

export interface GetAssemblyDistrictData<T = any> {
  assemblyDistrict: T;
}

export const GET_ASSEMBLY_DISTRICT_META_QUERY: TypedDocumentNode<
  GetAssemblyDistrictData<GQLPageMeta>,
  WhereSlugVariables
> = gql`
  query AssemblyDistrictMeta($where: AssemblyDistrictWhereUniqueInput!) {
    assemblyDistrict(where: $where) {
      title
      description
    }
  }
`;

export const GET_ASSEMBLY_DISTRICT_QUERY: TypedDocumentNode<
  GetAssemblyDistrictData<AssemblyDistrictItem>,
  WhereSlugVariables
> = gql`
  query AssemblyDistrict($where: AssemblyDistrictWhereUniqueInput!) {
    assemblyDistrict(where: $where) {
      id
      heroImage
      title
      description
      slug
      body
      contacts {
        id
        name
        title
        phone
        email
      }
      photo {
        id
        title
        description
        file {
          id
          width
          height
          url
        }
      }
      memberName
      bio
      address
      email
      phone
      fax
      termStart
      termEnd
    }
  }
`;
