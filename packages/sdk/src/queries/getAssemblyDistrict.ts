import { gql, TypedDocumentNode } from '@apollo/client';

import {
  GetAssemblyDistrictMetaQuery,
  GetAssemblyDistrictMetaQueryVariables,
  GetAssemblyDistrictQuery,
  GetAssemblyDistrictQueryVariables,
} from '../graphql/graphql';
import {
  ActionFields,
  AddressFields,
  ContactFields,
  DocumentFields,
  ImageFields,
  PublicNoticeFields,
  TopicFields,
} from './baseFragments';

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
  ${DocumentFields}
  ${ActionFields}
  ${TopicFields}
  ${ContactFields}
  ${ImageFields}
  ${AddressFields}
  ${PublicNoticeFields}

  query GetAssemblyDistrict(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    assemblyDistrict(where: { slug: $slug }) {
      id
      heroImage
      title
      description
      slug
      body
      documents {
        ...DocumentFields
      }
      actions {
        ...ActionFields
      }
      topics {
        ...TopicFields
      }
      contacts {
        ...ContactFields
      }
      photo {
        ...ImageFields
      }
      memberName
      bio
      address {
        ...AddressFields
      }
      email
      phone
      fax
      termStart
      termEnd
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
