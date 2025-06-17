import { TypedDocumentNode } from '@apollo/client';
import { GetBoardMetaQuery, GetBoardMetaQueryVariables } from '../types';

import { gql } from '../graphql';

export const GET_BOARD_META: TypedDocumentNode<
  GetBoardMetaQuery,
  GetBoardMetaQueryVariables
> = gql(`
  query GetBoardMeta($where: BoardWhereUniqueInput!) {
    board(where: $where) {
      title
      description
    }
  }
`);

export const GET_BOARD = gql(`
  query GetBoard($where: BoardWhereUniqueInput!) {
    board(where: $where) {
      id
      title
      slug
      description
      body
      heroImage
      meetingSchedule
      isActive
      communities {
        ...CommunityFields
      }
      districts {
        ...DistrictDetailFields
      }
      linkToAgendas {
        ...ExternalActionFieldsClient
      }
      linkToResolutions {
        ...ExternalActionFieldsClient
      }
      linkToPublicOpinionMessage {
        ...ExternalActionFieldsClient
      }
      contacts {
        ...ContactFields
      }
      actions {
        ...ActionFields
      }
      documents {
        ...DocumentFields
      }
    }
  }
`);
