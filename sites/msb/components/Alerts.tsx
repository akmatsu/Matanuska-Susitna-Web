import Link from 'next/link';
import { fetchGraphQL, gql } from '@/utils/graphql';
import { CoreDocumentRenderer } from './CoreDocumentRenderer';

export async function Alerts() {
  const data = await fetchGraphQL(gql`
    query ExampleQuery {
      alerts {
        id
        title
        updatedAt
        urgency
        createdAt
        message {
          document(hydrateRelationships: true)
        }
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
                <CoreDocumentRenderer
                  document={alert.message.document}
                  renderers={{
                    inline: {
                      relationship({ relationship, data }) {
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
