import { getClient } from '@/utils/apollo/ApolloClient';
import { PageMerged, PageType } from '@msb/js-sdk';
import { TypedDocumentNode } from '@msb/js-sdk/apollo';
import { redirect } from 'next/navigation';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ThreeColumnLayout } from './ThreeColumnLayout';
import { Hero, InPageNavigation } from '@matsugov/ui';
import { PageActions } from './PageActions';
import { PageContacts } from './PageContacts';

/**
 * The page controller is the primary component for controlling most pages.
 */
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

  const page: PageMerged | undefined = data?.[listName];

  if (!page) {
    redirect('/not-found');
  }

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        {page && (
          <ThreeColumnLayout
            left={<InPageNavigation />}
            right={
              <div className="flex flex-col gap-2">
                <PageActions primaryAction={page.primaryAction} />
                <PageContacts
                  primaryContact={page.primaryContact}
                  contacts={page.contacts}
                />
              </div>
            }
          >
            {page.body && (
              <MarkdownRenderer title={page.title}>
                {page.body}
              </MarkdownRenderer>
            )}
          </ThreeColumnLayout>
        )}
      </div>
    </>
  );
}
