import { gql, TypedDocumentNode } from '@apollo/client';
import {
  Contact,
  District,
  PageListItem,
  PublicNoticeWhere,
  TakeVariable,
  WhereSlugVariables,
} from './baseTypes';

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
    districts?: District[] | null;
  };
  publicNotices?: (PageListItem & { heroImage?: string | null })[];
}

export const GET_COMMUNITY_META_QUERY: TypedDocumentNode<
  GetCommunityItemMetaData,
  WhereSlugVariables
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
  WhereSlugVariables & PublicNoticeWhere & TakeVariable
> = gql`
  query Community(
    $where: CommunityWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    community(where: $where) {
      id
      title
      description
      body
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
