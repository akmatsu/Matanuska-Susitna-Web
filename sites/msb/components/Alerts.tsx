import { GET_ALERTS_QUERY } from '@/utils/apollo/queries/getAlerts';
import { MarkdownRenderer } from './MarkdownRenderer/MarkdownRenderer';
import { getClient } from '@/utils/apollo/ApolloClient';

export async function Alerts() {
  const { data } = await getClient().query({ query: GET_ALERTS_QUERY });

  return (
    <>
      {!!data.alerts.length && (
        <ul className="usa-list--unstyled">
          {data.alerts.map((alert: any) => (
            <li key={alert.id}>
              <div className="usa-alert usa-alert--warning usa-alert--slim">
                <div className="usa-alert__body">
                  <MarkdownRenderer>{alert.body}</MarkdownRenderer>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
