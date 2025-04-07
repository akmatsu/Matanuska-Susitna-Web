import { gql, type TypedDocumentNode } from '@apollo/client';

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
  where: {
    OR?: [
      {
        title?: {
          contains?: string | null;
          mode?: 'insensitive' | 'default' | null;
        };
      },
      {
        description?: {
          contains?: string | null;
          mode?: 'insensitive' | 'default' | null;
        };
      },
    ];
  };
}

export const GET_SERVICES_QUERY: TypedDocumentNode<
  GetServicesData,
  GetServicesVariables
> = gql`
  query GetServices($take: Int, $skip: Int!, $where: ServiceWhereInput!) {
    services(take: $take, skip: $skip, where: $where) {
      id
      title
      slug
      description
    }
    servicesCount(where: $where)
  }
`;
