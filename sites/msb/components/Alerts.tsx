import { fetchGraphQL, gql } from '@/utils/graphql';
import { MarkdownRenderer } from './MarkdownRenderer';

export async function Alerts() {
  const data = await fetchGraphQL(gql`
    query ExampleQuery {
      alerts {
        id
        title
        updatedAt
        urgency
        createdAt
        body
      }
    }
  `);

  if (data)
    return (
      <ul className="usa-list--unstyled">
        {data.data?.alerts.map((alert: any) => (
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

  return null;
}
