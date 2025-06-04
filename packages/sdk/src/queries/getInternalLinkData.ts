import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetInternalLinkDataQuery,
  GetInternalLinkDataQueryVariables,
} from '../types';

export const GET_INTERNAL_LINK_DATA: TypedDocumentNode<
  GetInternalLinkDataQuery,
  GetInternalLinkDataQueryVariables
> = gql`
  query GetInternalLinkData($id: ID!, $list: String!) {
    getInternalLink(id: $id, type: $list) {
      __typename
      ... on AssemblyDistrict {
        title
        slug
      }
      ... on Board {
        title
        slug
      }
      ... on BoardPage {
        title
      }
      ... on Community {
        title
        slug
      }
      ... on Facility {
        title
        slug
      }
      ... on HomePage {
        title
      }
      ... on OrgUnit {
        title
        slug
      }
      ... on Park {
        title
        slug
      }
      ... on PublicNotice {
        title
        slug
      }
      ... on Service {
        title
        slug
      }
      ... on Trail {
        title
        slug
      }
      ... on Url {
        title
        url
      }
    }
  }
`;
