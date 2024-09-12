import { fetchGraphQL, gql } from '@/utils/graphql';
import { Alert } from '@trussworks/react-uswds';
import { DocumentRenderer } from './DocumentRenderer';
import Link from 'next/link';

export async function Alerts() {
  const data = await fetchAlerts();
  // const data = await fetchGraphQL(gql`
  //   query ExampleQuery {
  //     alerts {
  //       id
  //       title
  //       updatedAt
  //       urgency
  //       externalLinkTo
  //       createdAt
  //       message {
  //         document(hydrateRelationships: true)
  //       }
  //     }
  //   }
  // `);

  async function fetchAlerts() {
    try {
      return fetchGraphQL(gql`
        query ExampleQuery {
          alerts {
            id
            title
            updatedAt
            urgency
            externalLinkTo
            createdAt
            message {
              document(hydrateRelationships: true)
            }
          }
        }
      `);
    } catch (err) {
      console.error(err);
    }
  }

  if (data)
    return (
      <ul className="usa-list--unstyled">
        {data.data.alerts.map((alert: any) => (
          <li key={alert.id}>
            <div className="usa-alert usa-alert--warning usa-alert--slim">
              <div className="usa-alert__body">
                <DocumentRenderer
                  document={alert.message.document}
                  renderers={{
                    inline: {
                      relationship({ relationship, data }) {
                        console.log(data);
                        if (relationship === 'post') {
                          if (data === null || data.data === undefined) {
                            return <span>[not found]</span>;
                          } else {
                            return (
                              <Link href={`/posts/${data.data.id}`}>
                                {data.data.title}
                              </Link>
                            );
                          }
                        }
                        return null;
                      },
                    },
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );

  return null;
}
