import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetBoardMetaQuery,
  GetBoardMetaQueryVariables,
  GetBoardQuery,
} from '../types';

export const GET_BOARD_META: TypedDocumentNode<
  GetBoardMetaQuery,
  GetBoardMetaQueryVariables
> = gql`
  query GetBoardMeta($where: BoardWhereUniqueInput!) {
    board(where: $where) {
      title
      description
    }
  }
`;

export const GET_BOARD: TypedDocumentNode<
  GetBoardQuery,
  GetBoardMetaQueryVariables
> = gql`
  query GetBoard($where: BoardWhereUniqueInput!) {
    board(where: $where) {
      ...BoardPage
    }
  }
`;
