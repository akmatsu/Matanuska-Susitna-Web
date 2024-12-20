import React from 'react';

import { CoreSideNav } from '@/components/CoreSideNav';

import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

import { ContactCard } from '@/components/ContactCard';
import { LinkButton } from '@/components/LinkButton/LinkButton';

import {
  GET_SERVICE_META_QUERY,
  GET_SERVICE_QUERY,
} from '@/utils/apollo/queries/GetService';
import { Metadata } from 'next';
import { getClient } from '@/utils/apollo/ApolloClient';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await getClient().query({
    query: GET_SERVICE_META_QUERY,
    variables: {
      where: { slug: params.slug },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return {
    title: `MSB - ${data?.service.title}`,
    description: data?.service.description,
  };
}

export default async function Service({
  params,
}: {
  params: { slug: string };
}) {
  const { data } = await getClient().query({
    query: GET_SERVICE_QUERY,
    variables: {
      where: { slug: params.slug },
    },

    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
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
                  <LinkButton
                    href={service.actionUrl}
                    className="margin-right-0 usa-link--external"
                    target="_blank"
                    big
                    block
                  >
                    {service.actionLabel || 'Primary Action'}
                  </LinkButton>
                )}
                {service?.primaryContact && (
                  <ContactCard contact={service?.primaryContact} isPrimary />
                )}
                {service?.contacts.map((contact: any) => (
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
          <div className="msb-md-body">
            <h1>{data?.service?.title}</h1>
            <MarkdownRenderer>{data?.service?.body}</MarkdownRenderer>
          </div>
        </ThreeColumnLayout>
      )}
    </section>
  );
}
