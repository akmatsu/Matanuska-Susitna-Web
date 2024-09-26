import { CoreSideNav } from '@/components/CoreSideNav';
import { fetchGraphQL, gql } from '@/utils/graphql';
import {
  DocumentRenderer,
  DocumentRendererProps,
} from '@keystone-6/document-renderer';
import {
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
  GridContainer,
  Grid,
} from '@trussworks/react-uswds';

export default async function Service({ params }: { params: { id: string } }) {
  const data = await fetchGraphQL<{
    data: {
      service: {
        id: string;
        title: string;
        content: { document: DocumentRendererProps['document'] };
        processes: {
          id: string;
          name: string;
          steps: {
            id: string;
            label: string;
            content: { document: DocumentRendererProps['document'] };
          }[];
        }[];
      };
    };
  }>(
    gql`
      query GetServices($where: ServiceWhereUniqueInput!) {
        service(where: $where) {
          id
          title
          content {
            document(hydrateRelationships: true)
          }
          processes {
            id
            name
            steps {
              id
              label
              content {
                document(hydrateRelationships: true)
              }
            }
          }
        }
      }
    `,
    {
      where: {
        id: params.id,
      },
    },
  );

  return (
    <section className="usa-section">
      {data?.data?.service && (
        <GridContainer>
          <Grid row gap>
            <Grid className="usa-layout-docs__sidenav" desktop={{ col: 3 }}>
              <nav
                aria-label="Secondary navigation"
                className="position-sticky"
                style={{ top: '144px' }}
              >
                <CoreSideNav />
              </nav>
            </Grid>
            <Grid desktop={{ col: 6 }}>
              <h1>{data?.data?.service?.title}</h1>
              <DocumentRenderer
                document={data.data.service.content.document}
                componentBlocks={{
                  table: (props: {
                    headers: { props: { node: { children: [] } } }[];
                    rows: {
                      columns: { props: { node: { children: [] } } }[];
                    }[];
                  }) => {
                    return (
                      <table style={{ width: '100%' }}>
                        <thead>
                          {props.headers.map((header) => {
                            return (
                              <th>
                                <DocumentRenderer
                                  document={header.props.node.children}
                                />
                              </th>
                            );
                          })}
                        </thead>
                        <tbody>
                          {props.rows.map((row) => {
                            return (
                              <tr>
                                {row.columns.map((col) => (
                                  <td>
                                    <DocumentRenderer
                                      document={col.props.node.children}
                                    />
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  },
                }}
              />
              {data.data.service.processes.map((process) => (
                <>
                  <h2>{process.name}</h2>
                  <ProcessList>
                    {process.steps.map((step) => (
                      <ProcessListItem key={step.id}>
                        <ProcessListHeading type="h4">
                          {step.label}
                        </ProcessListHeading>
                        <DocumentRenderer document={step.content.document} />
                      </ProcessListItem>
                    ))}
                  </ProcessList>
                </>
              ))}
            </Grid>
          </Grid>
        </GridContainer>
      )}
    </section>
  );
}
