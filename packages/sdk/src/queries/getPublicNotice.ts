import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetTrailMetaQuery,
  GetTrailMetaQueryVariables,
  GetTrailQuery,
  GetTrailQueryVariables,
} from '../graphql/graphql';

export const GET_PUBLIC_NOTICE_META: TypedDocumentNode<
  GetTrailMetaQuery,
  GetTrailMetaQueryVariables
> = gql`
  query GetPublicNoticeMeta($where: PublicNoticeWhereUniqueInput!) {
    publicNotice(where: $where) {
      title
      description
    }
  }
`;

export const GET_PUBLIC_NOTICE: TypedDocumentNode<
  GetTrailQuery,
  GetTrailQueryVariables
> = gql`
  query GetPublicNotice($where: PublicNoticeWhereUniqueInput!) {
    publicNotice(where: $where) {
      id
      slug
      title
      heroImage
      body
      description
      effectiveDate
      endDate
      contacts {
        ...ContactFields
      }
      documents {
        ...DocumentFields
      }
      actions {
        ...ActionFields
      }
    }
  }
`;
