// 'use client';
import { GET_ALERTS_QUERY } from '@/utils/gql/queries/getAlerts';
import { MarkdownRenderer } from './MarkdownRenderer';
import { fetchGraphQL } from '@/utils/gql/fetchGraphQL';

export async function Alerts() {
  const data = await fetchGraphQL(GET_ALERTS_QUERY);

  return (
    <>
      {data && (
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
