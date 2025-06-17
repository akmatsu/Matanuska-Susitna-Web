import { gql, type TypedDocumentNode } from '@apollo/client';

import {
  GetServiceMetaQuery,
  GetServiceMetaQueryVariables,
  GetServiceNoPnQuery,
  GetServiceNoPnQueryVariables,
  GetServiceQuery,
  GetServiceQueryVariables,
} from '../graphql/graphql';
import {
  ContactFields,
  DocumentFields,
  ExternalActionFields,
  PublicNoticeFields,
} from './baseFragments';

export const GET_SERVICE_META_QUERY: TypedDocumentNode<
  GetServiceMetaQuery,
  GetServiceMetaQueryVariables
> = gql`
  query GetServiceMeta($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      title
      description
    }
  }
`;

export const GET_SERVICE_QUERY_NO_PN: TypedDocumentNode<
  GetServiceNoPnQuery,
  GetServiceNoPnQueryVariables
> = gql`
  ${DocumentFields}
  ${ContactFields}
  ${ExternalActionFields}

  query GetServiceNoPn($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      id
      slug
      title
      heroImage
      body
      description
      documents {
        ...DocumentFields
      }
      primaryAction {
        ...ExternalActionFields
      }
      secondaryActions {
        ...ExternalActionFields
      }
      primaryContact {
        ...ContactFields
      }
      contacts {
        ...ContactFields
      }
    }
  }
`;

export const GET_SERVICE_QUERY: TypedDocumentNode<
  GetServiceQuery,
  GetServiceQueryVariables
> = gql`
  ${DocumentFields}
  ${ContactFields}
  ${ExternalActionFields}
  ${PublicNoticeFields}

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
      description
      documents {
        ...DocumentFields
      }
      primaryAction {
        ...ExternalActionFields
      }
      secondaryActions {
        ...ExternalActionFields
      }
      primaryContact {
        ...ContactFields
      }
      contacts {
        ...ContactFields
      }
    }
    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
