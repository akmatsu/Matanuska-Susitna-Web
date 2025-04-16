import { gql, TypedDocumentNode } from '@apollo/client';
import { PageListItem, TakeVariable } from './baseTypes';

export interface ParkData<T = any> {
  park: T;
}

export const GET_PUBLIC_NOTICES: TypedDocumentNode<
  ParkData<PageListItem & { heroImage?: string | null }>,
  TakeVariable
> = gql`
  query PublicNotices($take: Int) {
    publicNotices(take: $take) {
      id
      slug
      title
      description
      heroImage
    }
  }
`;
