import { gql, TypedDocumentNode } from '@apollo/client';

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
    mapId?: string | null;
    heroImage?: string | null;
    services: {
      id: string;
      slug: string;
      title: string;
      description: string;
    }[];
    contacts: {
      id: string;
      name: string;
      phone: string;
      email: string;
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
  query GetCommunity($where: CommunityWhereUniqueInput!) {
    community(where: $where) {
      body
      id
      title
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
    }
  }
`;
