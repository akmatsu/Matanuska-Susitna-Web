import React from 'react';

import { CoreSideNav } from '@/components/CoreSideNav';
import { fetchGraphQL, gql } from '@/utils/graphql';
import {
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
} from '@trussworks/react-uswds';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export default async function Service({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchGraphQL<{
    data: {
      service: {
        id: string;
        title: string;
        body: string;

        processes: {
          id: string;
          name: string;
          steps: {
            id: string;
            label: string;
            body: string;
          }[];
        }[];
      };
    };
  }>(
    gql`
      query GetServices($where: ServiceWhereUniqueInput!) {
        service(where: $where) {
          id
          slug
          title
          body
          processes {
            id
            name
            steps {
              id
              label
              body
            }
          }
        }
      }
    `,
    {
      where: {
        slug: params.slug,
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
          {/* <Markdown remarkPlugins={[remarkGfm]}>
            {data?.data?.service?.body}
          </Markdown> */}
          <MarkdownRenderer>{data?.data?.service?.body}</MarkdownRenderer>

          {data.data.service.processes.map((process) => (
            <div key={process.id}>
              <h2>{process.name}</h2>
              <ProcessList>
                {process.steps.map((step) => (
                  <ProcessListItem key={step.id}>
                    <ProcessListHeading type="h4">
                      {step.label}
                    </ProcessListHeading>
                    <MarkdownRenderer>{step.body}</MarkdownRenderer>
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
