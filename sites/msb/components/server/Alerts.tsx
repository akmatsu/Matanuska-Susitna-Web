import { getClientHandler } from '@/utils/apollo/utils';
import { MarkdownRenderer } from './MarkdownRenderer/MarkdownRenderer';
import { Alert } from '@matsugov/ui/Alert';
import { gql } from '@msb/js-sdk/gql';

const getAlerts = gql(`
  query GetAlerts {
    alerts {
      id
      title
      urgency
      body
    }
  }
`);

export async function Alerts() {
  try {
    const { data, error } = await getClientHandler({
      query: getAlerts,
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
        {!!data?.alerts?.length && (
          <ul>
            {data?.alerts.map((alert) => (
              <li key={alert.id}>
                <Alert
                  type={getAlertType(alert.urgency!)}
                  slim={!!alert.urgency && alert.urgency < 4}
                  title={
                    !!alert.urgency && alert.urgency >= 4
                      ? alert.title
                        ? alert.title
                        : undefined
                      : undefined
                  }
                >
                  {alert.body && (
                    <MarkdownRenderer>{alert.body}</MarkdownRenderer>
                  )}
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
