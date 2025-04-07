import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Address, Contact, Hour, PageListItem } from './baseTypes';

export interface GetParkItemMetaData {
  park: {
    title: string;
    description: string;
  };
}

export interface GetParkVariables {
  where: {
    slug: string;
  };
}

export interface GetParkItem {
  id: string;
  title: string;
  slug: string;
  body?: string | null;
  description?: string | null;
  heroImage?: string | null;
  contacts?: Contact[];
  services?: PageListItem[] | null;
  address?: Address | null;
  trails?: PageListItem[] | null;
  facilities?: PageListItem[] | null;
  hours?: Hour[] | null;
}

export interface GetParkData {
  park: GetParkItem;
}

export const GET_PARK_META_QUERY: TypedDocumentNode<
  GetParkItemMetaData,
  GetParkVariables
> = gql`
  query GetParkMetaQuery($where: ParkWhereUniqueInput!) {
    park(where: $where) {
      title
      description
    }
  }
`;

export const GET_PARK_QUERY: TypedDocumentNode<GetParkData, GetParkVariables> =
  gql`
    query Park($where: ParkWhereUniqueInput!) {
      park(where: $where) {
        id
        title
        slug
        body
        heroImage
        contacts {
          id
          title
          phone
          email
          name
        }
        services {
          title
          description
          slug
          id
        }
        address {
          title
          lineOne
          lineOne
          city
          state
          zip
        }
        hours {
          day
          open
          close
        }
        trails {
          title
          description
          slug
          id
        }
        facilities {
          title
          description
          slug
          id
        }
      }
    }
  `;
