import { ThreeColumnLayout, MarkdownRenderer, ContactCard } from '@/components';
import Link from 'next/link';

import {
  GET_SERVICE_META_QUERY,
  GET_SERVICE_QUERY,
} from '@/utils/apollo/queries/GetService';
import { Metadata } from 'next';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Button, InPageNavigation } from '@matsugov/ui';

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
    <section className="max-w-6xl mx-auto px-4 py-16 relative">
      {data?.service && (
        <ThreeColumnLayout
          left={
            <nav
              aria-label="Secondary navigation"
              className="position-sticky"
              style={{ top: '144px' }}
            >
              <InPageNavigation borderPosition="left" />
            </nav>
          }
          right={
            <>
              <ul className="flex flex-col" style={{ gap: '8px' }}>
                {service?.actionUrl && (
                  <Button
                    as={Link}
                    href={service.actionUrl}
                    className="margin-right-0 usa-link--external"
                    target="_blank"
                    big
                    block
                  >
                    {service.actionLabel || 'Primary Action'}
                  </Button>
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
          <MarkdownRenderer title={data?.service?.title}>
            {data?.service?.body}
          </MarkdownRenderer>
        </ThreeColumnLayout>
      )}
    </section>
  );
}
