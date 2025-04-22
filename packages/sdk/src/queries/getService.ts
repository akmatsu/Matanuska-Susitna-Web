import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  Contact,
  ExternalLink,
  PublicNoticeWhere,
  TakeVariable,
  WhereSlugVariables,
} from './baseTypes';

export interface GetServiceItem {
  id: string;
  title: string;
  body: string;
  heroImage?: string | null;
  primaryAction?: ExternalLink | null;
  primaryContact?: Contact | null;
  contacts?: Contact[] | null;
}

export interface GetServiceItemMeta {
  title: string;
  description: string;
}

export interface GetServiceItemMetaData {
  service: GetServiceItemMeta;
}

export interface GetServiceData {
  service: GetServiceItem;
}

export const GET_SERVICE_META_QUERY: TypedDocumentNode<
  GetServiceItemMetaData,
  WhereSlugVariables
> = gql`
  query GetServiceMetaQuery($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      title
      description
    }
  }
`;

export const GET_SERVICE_QUERY_NO_PN: TypedDocumentNode<
  GetServiceData,
  WhereSlugVariables
> = gql`
  query GetService(
    $where: ServiceWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    service(where: $where) {
      id
      slug
      title
      heroImage
      body
      primaryAction {
        id
        label
        url {
          id
          title
          url
        }
      }
      primaryContact {
        id
        name
        phone
        email
      }
      contacts {
        id
        name
        phone
        email
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

export const GET_SERVICE_QUERY: TypedDocumentNode<
  GetServiceData,
  WhereSlugVariables & PublicNoticeWhere & TakeVariable
> = gql`
  query GetService(
    $where: ServiceWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    service(where: $where) {
      id
      slug
      title
      heroImage
      body
      primaryAction {
        id
        label
        url {
          id
          title
          url
        }
      }
      primaryContact {
        id
        name
        phone
        email
      }
      contacts {
        id
        name
        phone
        email
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
