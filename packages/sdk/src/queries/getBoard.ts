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
      id
      title
      slug
      description
      body
      heroImage
      meetingSchedule
      isActive
      communities {
        id
        title
        slug
        description
      }
      districts {
        id
        title
        slug
        description
        memberName
        bio
        address
        email
        phone
        photo {
          id
          title
          file {
            width
            height
            url
          }
        }
      }
      linkToAgendas {
        id
        label
        url {
          id
          title
          url
        }
      }
      linkToResolutions {
        id
        label
        url {
          id
          title
          url
        }
      }
      linkToPublicOpinionMessage {
        id
        label
        url {
          id
          title
          url
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
      documents {
        id
        title
        file {
          url
          filename
          filesize
        }
      }
    }
  }
`;
