'use client';
import { GET_ALERTS_QUERY } from '@/utils/apollo/gqlQueries/getAlerts';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useSuspenseQuery } from '@apollo/client';

export function Alerts() {
  const { data } = useSuspenseQuery(GET_ALERTS_QUERY);

  return (
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
  );
}
