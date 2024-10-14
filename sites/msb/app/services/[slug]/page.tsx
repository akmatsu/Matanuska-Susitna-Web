import React from 'react';

import { CoreSideNav } from '@/components/CoreSideNav';

import {
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
} from '@trussworks/react-uswds';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

import { ContactCard } from '@/components/ContactCard';
import Link from 'next/link';
import { fetchGraphQL } from '@/utils/gql/fetchGraphQL';
import { GET_SERVICE_QUERY } from '@/utils/gql/queries/GetService';

export default async function Service({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchGraphQL(GET_SERVICE_QUERY, {
    where: { slug: params.slug },
  });

  const service = data?.service;

  return (
    <section className="usa-section">
      {data?.service && (
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
                {service?.actionUrl && (
                  <Link
                    href={service.actionUrl}
                    className="margin-right-0 usa-button usa-button--big usa-link--external"
                    target="_blank"
                  >
                    {service.actionLabel || 'Primary Action'}
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
          <h1>{data?.service?.title}</h1>
          <MarkdownRenderer>{data?.service?.body}</MarkdownRenderer>

          {data.service.processes.map((process) => (
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
