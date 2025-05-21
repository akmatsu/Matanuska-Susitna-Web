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
        id
        name
        title
        email
        phone
      }
      documents {
        id
        title
        file {
          filename
          url
          filesize
        }
      }
      actions {
        item {
          __typename
          ... on Service {
            id
            title
            slug
            description
          }
          ... on Park {
            id
            title
            slug
            description
          }
          ... on Trail {
            id
            title
            slug
            description
          }
          ... on Facility {
            id
            title
            slug
            description
          }
          ... on Community {
            id
            title
            slug
            description
          }
          ... on AssemblyDistrict {
            id
            title
            slug
            description
          }
          ... on OrgUnit {
            id
            title
            slug
            description
          }
          ... on Url {
            id
            title
            description
            url
          }
        }
        label
      }
    }
  }
`;
