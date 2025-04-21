import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  Address,
  Contact,
  Hour,
  PageListItem,
  PublicNoticeWhere,
  TakeVariable,
  WhereSlugVariables,
} from './baseTypes';

export interface GetParkItemMetaData {
  park: {
    title: string;
    description: string;
  };
}

export interface GetParkItem {
  id: string;
  title: string;
  slug: string;
  body?: string | null;
  description?: string | null;
  heroImage?: string | null;
  contacts?: Contact[];
  services?: PageListItem[] | null;
  address?: Address | null;
  trails?: PageListItem[] | null;
  facilities?: PageListItem[] | null;
  hours?: Hour[] | null;
}

export interface GetParkData {
  park: GetParkItem;
  publicNotices?: (PageListItem & { heroImage?: string | null })[];
}

export const GET_PARK_META_QUERY: TypedDocumentNode<
  GetParkItemMetaData,
  WhereSlugVariables
> = gql`
  query GetParkMetaQuery($where: ParkWhereUniqueInput!) {
    park(where: $where) {
      title
      description
    }
  }
`;

export const GET_PARK_QUERY: TypedDocumentNode<
  GetParkData,
  WhereSlugVariables & PublicNoticeWhere & TakeVariable
> = gql`
  query Park(
    $where: ParkWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    park(where: $where) {
      id
      title
      slug
      body
      heroImage
      contacts {
        id
        title
        phone
        email
        name
      }
      services {
        title
        description
        slug
        id
      }
      address {
        title
        lineOne
        lineOne
        city
        state
        zip
      }
      hours {
        day
        open
        close
      }
      trails {
        title
        description
        slug
        id
      }
      facilities {
        title
        id
        description
        slug
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
