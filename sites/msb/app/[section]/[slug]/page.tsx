import { Metadata } from 'next';
import { type PageMerged, queryMap } from '@msb/js-sdk';
import pluralize, { singular } from 'pluralize';
import { notFound } from 'next/navigation';
import { getClient } from '@/utils/apollo/ApolloClient';
import { getPageMeta } from '@/utils/pageHelpers';
import { toCamelCase } from '@/utils/stringHelpers';
import { Hero } from '@matsugov/ui';
import {
  PageBody,
  PageEvents,
  PageServices,
  PageSideNavController,
  PagePublicNotices,
  PageSidebar,
} from './components';
import { PageContainer } from '@/components/PageContainer';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> => {
  const { section, slug } = await params;
  const config = queryMap[section as keyof typeof queryMap];

  const listName =
    section === 'departments'
      ? toCamelCase(singular('org-units'))
      : toCamelCase(singular(section));

  if (!config) {
    return {};
  }

  return getPageMeta(listName, config.metaQuery, slug);
};

export default async function Page(props: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await props.params;
  const config = queryMap[section as keyof typeof queryMap];
  const listName =
    section === 'departments'
      ? singular(toCamelCase('org-units'))
      : singular(toCamelCase(section));
  const sideNav = section === 'services';

  if (!config) {
    return notFound();
  }

  const { data, errors, error } = await getClient().query({
    query: config.query,
    variables: {
      where: { slug },
      ...(listName !== 'publicNotice' && {
        take: 5,
        publicNoticesWhere2: {
          [pluralize(listName)]: {
            some: {
              slug: {
                equals: slug,
              },
            },
          },
        },
        orderBy: [
          {
            urgency: 'desc',
          },
        ],
      }),
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  if (errors) {
    console.error('Apollo query failed: ', JSON.stringify(errors));
    throw error;
  }

  const page: PageMerged | undefined = data?.[listName];
  const publicNotices = data?.publicNotices;

  if (!page) {
    return notFound();
  }

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer className="relative">
        {page && (
          <PageSideNavController
            showSideNav={sideNav}
            rightSide={
              <PageSidebar config={config} page={page} listName={listName} />
            }
          >
            <PageBody
              title={page.title}
              description={page.description}
              body={page.body}
              pageType={listName}
            />

            <PageServices
              services={page.services}
              filters={{
                [listName === 'orgUnit' ? 'departments' : pluralize(listName)]:
                  [page.title],
              }}
            />
            <PagePublicNotices items={publicNotices} />
            <PageEvents listName={listName} />
          </PageSideNavController>
        )}
      </PageContainer>
    </>
  );
}
