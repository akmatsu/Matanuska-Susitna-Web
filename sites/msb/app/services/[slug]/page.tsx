import React from 'react';

import { CoreSideNav } from '@/components/CoreSideNav';
import { fetchGraphQL, gql } from '@/utils/graphql';
import {
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
  Button,
} from '@trussworks/react-uswds';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

import { ContactCard } from '@/components/ContactCard';
import Link from 'next/link';

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
        primaryAction?: string;
        primaryActionLabel?: string;
        primaryContact?: {
          id: string;
          name: string;
          phone?: string;
          email?: string;
        };
        contacts: {
          id: string;
          name: string;
          phone?: string;
          email?: string;
        }[];
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
          primaryAction
          primaryActionLabel
          primaryContact {
            id
            name
            phone
            email
          }
          contacts {
            id
            name
            phone
            email
          }
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

  const service = data?.data?.service;

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
          right={
            <>
              <ul
                className="usa-list--unstyled display-flex flex-column"
                style={{ gap: '8px' }}
              >
                {service?.primaryAction && (
                  <Link
                    href={service.primaryAction}
                    className="margin-right-0 usa-button usa-button--big usa-link--external"
                    target="_blank"
                  >
                    {service.primaryActionLabel || 'Primary Action'}
                  </Link>
                )}
                {service?.primaryContact && (
                  <ContactCard contact={service?.primaryContact} isPrimary />
                )}
                {service?.contacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    isPrimary={
                      service.contacts.length === 1 && !service.primaryContact
                    }
                  />
                ))}
              </ul>
            </>
          }
        >
          <h1>{data?.data?.service?.title}</h1>
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
