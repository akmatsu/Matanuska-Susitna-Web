import { gql, TypedDocumentNode } from '@apollo/client';

export interface GetServiceContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface GetServiceItem {
  id: string;
  title: string;
  body: string;
  actionUrl?: string;
  actionLabel?: string;
  primaryContact?: GetServiceContact;
  contacts: GetServiceContact[];
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
      actionUrl
      actionLabel
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
