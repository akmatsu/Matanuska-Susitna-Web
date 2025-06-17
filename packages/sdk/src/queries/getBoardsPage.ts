import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetBoardsPageMetaQuery,
  GetBoardsPageMetaQueryVariables,
  GetBoardsPageQuery,
  GetBoardsPageQueryVariables,
} from '../graphql/graphql';
import { ActionFields, ContactFields, DocumentFields } from './baseFragments';

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
  ${DocumentFields}
  ${ContactFields}
  ${ActionFields}

  query GetBoardsPage {
    boardPage {
      id
      title
      description
      body
      heroImage
      vacancyReport {
        ...DocumentFields
      }
      documents {
        ...DocumentFields
      }
      applicationForm {
        ...DocumentFields
      }

      contacts {
        ...ContactFields
      }

      actions {
        ...ActionFields
      }
    }
  }
`;
