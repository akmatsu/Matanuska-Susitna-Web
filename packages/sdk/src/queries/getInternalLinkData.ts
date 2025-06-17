import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetInternalLinkDataQuery,
  GetInternalLinkDataQueryVariables,
} from '../types';
import { GetInternalLinkDataFields } from './baseFragments';

export const GET_INTERNAL_LINK_DATA: TypedDocumentNode<
  GetInternalLinkDataQuery,
  GetInternalLinkDataQueryVariables
> = gql`
  ${GetInternalLinkDataFields}
  query GetInternalLinkData($id: ID!, $list: String!) {
    getInternalLink(id: $id, type: $list) {
      ...GetInternalLinkDataFields
    }
  }
`;
