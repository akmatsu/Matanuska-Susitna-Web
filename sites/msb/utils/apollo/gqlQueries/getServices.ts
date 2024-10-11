import { gql, TypedDocumentNode } from '@apollo/client';

export interface GetServicesItem {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface GetServicesData {
  services: GetServicesItem[];
  servicesCount: number;
}

export interface GetServicesVariables {
  take: number;
  skip: number;
}

export const GET_SERVICES_QUERY: TypedDocumentNode<
  GetServicesData,
  GetServicesVariables
> = gql`
  query GetServices($take: Int, $skip: Int!) {
    services(take: $take, skip: $skip) {
      id
      title
      slug
      description
    }
    servicesCount
  }
`;
