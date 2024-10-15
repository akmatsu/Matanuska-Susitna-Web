import { gql } from '../fetchGraphQL';

export interface GetServiceContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface GetServiceProcessStep {
  id: string;
  label: string;
  body: string;
}

export interface GetServiceProcess {
  id: string;
  name: string;
  steps: GetServiceProcessStep[];
}

export interface GetServiceItem {
  id: string;
  title: string;
  body: string;
  actionUrl?: string;
  actionLabel?: string;
  primaryContact?: GetServiceContact;
  contacts: GetServiceContact[];
  processes: GetServiceProcess[];
}

export interface GetServiceData {
  service: GetServiceItem;
}

export interface GetServiceVariables {
  where: {
    slug: string;
  };
}

export const GET_SERVICE_META_QUERY = gql`
  query GetServiceMetaQuery($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      title
      description
    }
  }
`;

export const GET_SERVICE_QUERY = gql`
  query GetService($where: ServiceWhereUniqueInput!) {
    service(where: $where) {
      id
      slug
      title
      body
      actionUrl
      actionLabel
      primaryContact {
        id
        name
        phone
        email
      }
      contacts {
        id
        name
        phone
        email
      }
      processes {
        id
        name
        steps {
          id
          label
          body
        }
      }
    }
  }
`;
