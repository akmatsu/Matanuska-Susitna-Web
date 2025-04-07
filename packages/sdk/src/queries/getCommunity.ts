import { gql, TypedDocumentNode } from '@apollo/client';
import { Contact } from './baseTypes';

export interface GetCommunityItemMeta {
  title: string;
  description: string;
}

export interface GetCommunityItemMetaData {
  community: GetCommunityItemMeta;
}

export interface GetCommunityData {
  community: {
    id: string;
    title: string;
    body: string;
    description: string;
    mapId?: string | null;
    heroImage?: string | null;
    services: {
      id: string;
      slug: string;
      title: string;
      description: string;
    }[];
    contacts: Contact[];
    districts: {
      title: string;
      slug: string;
      description?: string;
      memberName?: string;
      photo?: {
        file: {
          url: string;
        };
      };
    }[];
  };
}

export interface GetCommunityVariables {
  where: {
    slug: string;
  };
}

export const GET_COMMUNITY_META_QUERY: TypedDocumentNode<
  GetCommunityItemMetaData,
  GetCommunityVariables
> = gql`
  query GetCommunityMetaQuery($where: CommunityWhereUniqueInput!) {
    community(where: $where) {
      title
      description
    }
  }
`;

export const GET_COMMUNITY_QUERY: TypedDocumentNode<
  GetCommunityData,
  GetCommunityVariables
> = gql`
  query Community($where: CommunityWhereUniqueInput!) {
    community(where: $where) {
      id
      title
      description
      mapId
      heroImage
      services {
        id
        slug
        title
        description
      }
      contacts {
        id
        name
        phone
        email
      }
      districts {
        slug
        title
        description
        memberName
        photo {
          file {
            url
          }
        }
      }
    }
  }
`;
