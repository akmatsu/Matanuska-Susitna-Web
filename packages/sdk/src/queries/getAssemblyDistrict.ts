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
    $where: AssemblyDistrictWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]
  ) {
    assemblyDistrict(where: $where) {
      id
      heroImage
      title
      description
      slug
      body
      contacts {
        ...ContactFields
      }
      photo {
        ...ImageFields
      }
      memberName
      bio
      address
      email
      phone
      fax
      termStart
      termEnd
    }

    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
