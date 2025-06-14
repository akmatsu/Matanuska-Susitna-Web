import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetPublicNoticeMetaQuery,
  GetPublicNoticeMetaQueryVariables,
  GetPublicNoticeQuery,
  GetPublicNoticeQueryVariables,
} from '../graphql/graphql';

export const GET_PUBLIC_NOTICE_META: TypedDocumentNode<
  GetPublicNoticeMetaQuery,
  GetPublicNoticeMetaQueryVariables
> = gql`
  query GetPublicNoticeMeta($slug: String!) {
    publicNotice(where: { slug: $slug }) {
      title
      description
    }
  }
`;

export const GET_PUBLIC_NOTICE: TypedDocumentNode<
  GetPublicNoticeQuery,
  GetPublicNoticeQueryVariables
> = gql`
  query GetPublicNotice($slug: String!) {
    publicNotice(where: { slug: $slug }) {
      ...PublicNoticePage
    }
  }
`;
