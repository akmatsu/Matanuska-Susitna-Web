import { GET_ALERTS_QUERY } from '@/utils/apollo/queries/getAlerts';
import { MarkdownRenderer } from './MarkdownRenderer/MarkdownRenderer';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Alert } from '@matsugov/ui';

export async function Alerts() {
  const { data } = await getClient().query({ query: GET_ALERTS_QUERY });

  function getAlertType(urgency: number | string) {
    urgency = typeof urgency === 'string' ? parseInt(urgency) : urgency;
    switch (urgency) {
      case 1:
        return 'success';
      case 2:
        return 'info';
      case 3:
        return 'warning';
      case 4:
        return 'error';
      case 5:
        return 'emergency';
    }
  }

  return (
    <>
      {!!data.alerts.length && (
        <ul>
          {data.alerts.map((alert) => (
            <li key={alert.id}>
              <Alert
                type={getAlertType(alert.urgency)}
                slim={parseInt(alert.urgency) < 4}
                title={parseInt(alert.urgency) >= 4 ? alert.title : undefined}
              >
                <MarkdownRenderer noProse>{alert.body}</MarkdownRenderer>
              </Alert>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
