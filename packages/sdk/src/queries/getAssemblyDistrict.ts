import { gql, TypedDocumentNode } from '@apollo/client';

import {
  GetAssemblyDistrictMetaQuery,
  GetAssemblyDistrictMetaQueryVariables,
  GetAssemblyDistrictQuery,
  GetAssemblyDistrictQueryVariables,
} from '../graphql/graphql';

export const GET_ASSEMBLY_DISTRICT_META_QUERY: TypedDocumentNode<
  GetAssemblyDistrictMetaQuery,
  GetAssemblyDistrictMetaQueryVariables
> = gql`
  query GetAssemblyDistrictMeta($where: AssemblyDistrictWhereUniqueInput!) {
    assemblyDistrict(where: $where) {
      title
      description
    }
  }
`;

export const GET_ASSEMBLY_DISTRICT_QUERY: TypedDocumentNode<
  GetAssemblyDistrictQuery,
  GetAssemblyDistrictQueryVariables
> = gql`
  query GetAssemblyDistrict(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    assemblyDistrict(where: { slug: $slug }) {
      ...AssemblyDistrictPage
    }

    publicNotices(
      where: { assemblyDistricts: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeFields
    }
  }
`;
