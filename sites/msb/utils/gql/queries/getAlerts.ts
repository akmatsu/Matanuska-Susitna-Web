import { gql } from '../fetchGraphQL';

export interface GetAlertsData {
  alerts: {
    id: string;
    title: string;
    urgency: string;
    body: string;
  }[];
}

export const GET_ALERTS_QUERY = gql`
  query GetAlerts {
    alerts {
      id
      title
      urgency
      body
    }
  }
`;
