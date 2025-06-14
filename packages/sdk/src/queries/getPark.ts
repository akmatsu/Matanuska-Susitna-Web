import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetParkMetaQuery,
  GetParkMetaQueryVariables,
  GetParkQuery,
  GetParkQueryVariables,
} from '../graphql/graphql';

export const GET_PARK_META_QUERY: TypedDocumentNode<
  GetParkMetaQuery,
  GetParkMetaQueryVariables
> = gql`
  query GetParkMeta($where: ParkWhereUniqueInput!) {
    park(where: $where) {
      title
      description
    }
  }
`;

export const GET_PARK_QUERY: TypedDocumentNode<
  GetParkQuery,
  GetParkQueryVariables
> = gql`
  query GetPark(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    park(where: { slug: $slug }) {
      ...ParkPage
    }

    publicNotices(
      where: { trails: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
