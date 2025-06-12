import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetDocumentCollectionQuery,
  GetDocumentCollectionQueryVariables,
} from '../graphql/graphql';

export const GET_DOC_COLLECTION_QUERY: TypedDocumentNode<
  GetDocumentCollectionQuery,
  GetDocumentCollectionQueryVariables
> = gql`
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
