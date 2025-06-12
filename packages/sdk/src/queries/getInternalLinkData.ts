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
      ...GetInternalLinkDataFields
    }
  }
`;
