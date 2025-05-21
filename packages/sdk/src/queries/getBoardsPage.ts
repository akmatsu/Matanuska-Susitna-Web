import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetBoardsPageMetaQuery,
  GetBoardsPageMetaQueryVariables,
  GetBoardsPageQuery,
  GetBoardsPageQueryVariables,
} from '../graphql/graphql';

export const GET_BOARDS_PAGE_META: TypedDocumentNode<
  GetBoardsPageMetaQuery,
  GetBoardsPageMetaQueryVariables
> = gql`
  query GetBoardsPageMeta {
    boardPage {
      title
      description
    }
  }
`;

export const GET_BOARDS_PAGE: TypedDocumentNode<
  GetBoardsPageQuery,
  GetBoardsPageQueryVariables
> = gql`
  query GetBoardsPage {
    boardPage {
      id
      title
      description
      body
      heroImage
      vacancyReport {
        id
        title
        file {
          url
          filename
          filesize
        }
      }
      documents {
        id
        title
        file {
          url
          filename
          filesize
        }
      }
      applicationForm {
        id
        title
        file {
          url
          filename
          filesize
        }
      }

      contacts {
        id
        name
        title
        phone
        email
      }

      actions {
        id
        label
        selectItem
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
      }
    }
  }
`;
