import { gql, type TypedDocumentNode } from '@apollo/client';

export interface GetDocCollectionData {
  documentCollection: {
    id: string;
    title: string;
    documents: {
      id: string;
      title: string;
      file: {
        filename: string;
        filesize: number;
        url: string;
      };
    }[];
  };
}

export interface GetDocCollectionVariables {
  where: {
    id: string;
  };
}

export const GET_DOC_COLLECTION_QUERY: TypedDocumentNode<
  GetDocCollectionData,
  GetDocCollectionVariables
> = gql`
  query DocumentCollection($where: DocumentCollectionWhereUniqueInput!) {
    documentCollection(where: $where) {
      id
      title
      documents {
        id
        title
        file {
          filename
          filesize
          url
        }
      }
    }
  }
`;
