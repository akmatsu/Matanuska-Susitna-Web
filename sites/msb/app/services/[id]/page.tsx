import React from 'react';
import { CoreDocumentRenderer } from '@/components/CoreDocumentRenderer';
import { CoreSideNav } from '@/components/CoreSideNav';
import { fetchGraphQL, gql } from '@/utils/graphql';
import { DocumentRendererProps } from '@keystone-6/document-renderer';
import {
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
} from '@trussworks/react-uswds';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';

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
        <ThreeColumnLayout
          left={
            <nav
              aria-label="Secondary navigation"
              className="position-sticky"
              style={{ top: '144px' }}
            >
              <CoreSideNav />
            </nav>
          }
        >
          <h1>{data?.data?.service?.title}</h1>
          <CoreDocumentRenderer document={data.data.service.content.document} />
          {data.data.service.processes.map((process) => (
            <div key={process.id}>
              <h2>{process.name}</h2>
              <ProcessList>
                {process.steps.map((step) => (
                  <ProcessListItem key={step.id}>
                    <ProcessListHeading type="h4">
                      {step.label}
                    </ProcessListHeading>
                    <CoreDocumentRenderer document={step.content.document} />
                  </ProcessListItem>
                ))}
              </ProcessList>
            </div>
          ))}
        </ThreeColumnLayout>
      )}
    </section>
  );
}
