import { getClient } from '@/utils/apollo/ApolloClient';
import { PageMerged, PageType } from '@msb/js-sdk';
import { TypedDocumentNode } from '@msb/js-sdk/apollo';
import { redirect } from 'next/navigation';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ThreeColumnLayout } from './ThreeColumnLayout';
import { Button, InPageNavigation } from '@matsugov/ui';
import Link from 'next/link';
import { ContactCard } from './ContactCard';

export default async function PageController({
  query,
  listName,
  ...props
}: {
  query: TypedDocumentNode<any, { where: { slug: string } }>;
  listName: PageType;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data } = await getClient().query({
    query,
    variables: {
      where: { slug },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  const item: PageMerged | undefined = data?.[listName];

  if (!item) {
    redirect('/not-found');
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 relative">
      {item && (
        <ThreeColumnLayout
          left={<InPageNavigation />}
          right={
            <>
              <ul className="flex flex-col" style={{ gap: '8px' }}>
                {item.actionUrl && (
                  <Button
                    as={Link}
                    href={item.actionUrl}
                    className="margin-right-0 usa-link--external"
                    target="_blank"
                    big
                    block
                  >
                    {item.actionLabel || 'Primary Action'}
                  </Button>
                )}
                {item.primaryContact && (
                  <ContactCard contact={item.primaryContact} isPrimary />
                )}
                {item.contacts.map((contact: any) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </ul>
            </>
          }
        >
          <MarkdownRenderer title={item.title}>{item.body}</MarkdownRenderer>
        </ThreeColumnLayout>
      )}
    </div>
  );
}
