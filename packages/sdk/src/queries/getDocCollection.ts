import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetDocumentCollectionQuery,
  GetDocumentCollectionQueryVariables,
} from '../graphql/graphql';
import { DocumentFields } from './baseFragments';

export const GET_DOC_COLLECTION_QUERY: TypedDocumentNode<
  GetDocumentCollectionQuery,
  GetDocumentCollectionQueryVariables
> = gql`
  ${DocumentFields}

  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {
    documentCollection(where: $where) {
      id
      title
      documents {
        ...DocumentFields
      }
    }
  }
`;
