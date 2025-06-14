import { gql, type TypedDocumentNode } from '@apollo/client';

import {
  GetServiceMetaQuery,
  GetServiceMetaQueryVariables,
  GetServiceNoPnQuery,
  GetServiceNoPnQueryVariables,
  GetServiceQuery,
  GetServiceQueryVariables,
} from '../graphql/graphql';

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
  query GetServiceNoPn($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      ...ServicePage
    }
  }
`;

export const GET_SERVICE_QUERY: TypedDocumentNode<
  GetServiceQuery,
  GetServiceQueryVariables
> = gql`
  query GetService(
    $where: ServiceWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    service(where: $where) {
      ...ServicePage
    }
    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
