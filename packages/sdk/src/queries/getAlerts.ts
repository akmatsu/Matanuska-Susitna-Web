import { gql, type TypedDocumentNode } from '@apollo/client';

export interface GetAlertsData {
  alerts: {
    id: string;
    title: string;
    urgency: string;
    body: string;
  }[];
}

export const GET_ALERTS_QUERY: TypedDocumentNode<GetAlertsData> = gql`
  query GetAlerts {
    alerts {
      id
      title
      urgency
      body
    }
  }
`;
