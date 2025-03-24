import { gql, TypedDocumentNode } from '@apollo/client';
import { Contact, ExternalLink } from '../types';

export interface GetServiceItem {
  id: string;
  title: string;
  body: string;
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

export interface GetServiceVariables {
  where: {
    slug: string;
  };
}

export const GET_SERVICE_META_QUERY: TypedDocumentNode<
  GetServiceItemMetaData,
  GetServiceVariables
> = gql`
  query GetServiceMetaQuery($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      title
      description
    }
  }
`;

export const GET_SERVICE_QUERY: TypedDocumentNode<
  GetServiceData,
  GetServiceVariables
> = gql`
  query GetService($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      id
      slug
      title
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
  }
`;
