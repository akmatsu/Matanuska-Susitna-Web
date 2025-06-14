import { gql, type TypedDocumentNode } from '@apollo/client';
import {
  GetFacilityMetaQuery,
  GetFacilityMetaQueryVariables,
  GetFacilityQuery,
  GetFacilityQueryVariables,
} from '../graphql/graphql';

export const GET_FACILITY_META: TypedDocumentNode<
  GetFacilityMetaQuery,
  GetFacilityMetaQueryVariables
> = gql`
  query GetFacilityMeta($where: FacilityWhereUniqueInput!) {
    facility(where: $where) {
      title
      description
    }
  }
`;

export const GET_FACILITY_QUERY: TypedDocumentNode<
  GetFacilityQuery,
  GetFacilityQueryVariables
> = gql`
  query GetFacility(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    facility(where: { slug: $slug }) {
      ...FacilityPage
    }

    publicNotices(
      where: { communities: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
