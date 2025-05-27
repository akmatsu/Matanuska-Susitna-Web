import { GET_ALERTS_QUERY } from '@msb/js-sdk/getAlerts';
import { MarkdownRenderer } from './MarkdownRenderer/MarkdownRenderer';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Alert } from '@matsugov/ui/Alert';

export async function Alerts() {
  try {
    const { data, error } = await getClient().query({
      query: GET_ALERTS_QUERY,
    });

    if (error) {
      console.error('Error fetching alerts:', error);
      return;
    }

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
        {!!data.alerts?.length && (
          <ul>
            {data.alerts.map((alert) => (
              <li key={alert.id}>
                <Alert
                  type={getAlertType(alert.urgency!)}
                  slim={parseInt(alert.urgency) < 4}
                  title={parseInt(alert.urgency) >= 4 ? alert.title : undefined}
                >
                  <MarkdownRenderer>{alert.body}</MarkdownRenderer>
                </Alert>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  } catch (error) {
    console.error('Error occurred in alerts component: ', error);
  }
}
