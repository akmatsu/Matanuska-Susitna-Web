import { gql, TypedDocumentNode } from '@apollo/client';
import type {
  GetBoardsQuery,
  GetBoardsQueryVariables,
} from '../graphql/graphql';

export const GET_BOARDS: TypedDocumentNode<
  GetBoardsQuery,
  GetBoardsQueryVariables
> = gql`
  query GetBoards($take: Int, $skip: Int, $where: BoardWhereInput) {
    boards(take: $take, where: $where, skip: $skip) {
      id
      title
      slug
      description
      isActive
      type
      meetingSchedule
    }
  }
`;
