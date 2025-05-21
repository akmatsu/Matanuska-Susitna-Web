import { gql, type TypedDocumentNode } from '@apollo/client';
import { GetAlertsQuery, GetAlertsQueryVariables } from '../graphql/graphql';

export const GET_ALERTS_QUERY: TypedDocumentNode<
  GetAlertsQuery,
  GetAlertsQueryVariables
> = gql`
  query GetAlerts {
    alerts {
      id
      title
      urgency
      body
    }
  }
`;
