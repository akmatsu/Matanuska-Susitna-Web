import { Metadata } from 'next';
import { PageConfig, PageMerged } from '@msb/js-sdk/types';
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
  PagePublicNotices,
  PageSidebar,
  PageContainer,
} from '@components/server';
import { PageSideNavController } from '@components/client/Page/PageSideNavController';

const queryMap: {
  [key: string]: () => Promise<PageConfig>;
} = {
  services: async () => {
    const { GET_SERVICE_QUERY, GET_SERVICE_META_QUERY } = await import(
      '@msb/js-sdk/queries'
    );
    return {
      query: GET_SERVICE_QUERY,
      metaQuery: GET_SERVICE_META_QUERY,
    };
  },
  communities: async () => {
    const { GET_COMMUNITY_QUERY, GET_COMMUNITY_META_QUERY } = await import(
      '@msb/js-sdk/queries'
    );
    return {
      query: GET_COMMUNITY_QUERY,
      metaQuery: GET_COMMUNITY_META_QUERY,
      map: {
        layerId: 'cc6808c179cc4f3ba282814afdc3882c',
        layerUrl:
          'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_Communities/FeatureServer',
        layerOpacity: 0.5,
        itemKey: 'CC_NAME',
      },
    };
  },
  departments: async () => {
    const { GET_ORG_UNIT_QUERY, GET_ORG_UNIT_META_QUERY } = await import(
      '@msb/js-sdk/queries'
    );
    return {
      query: GET_ORG_UNIT_QUERY,
      metaQuery: GET_ORG_UNIT_META_QUERY,
    };
  },
  facilities: async () => {
    const { GET_FACILITY_QUERY, GET_FACILITY_META } = await import(
      '@msb/js-sdk/queries'
    );
    return {
      query: GET_FACILITY_QUERY,
      metaQuery: GET_FACILITY_META,
    };
  },
  parks: async () => {
    const { GET_PARK_QUERY, GET_PARK_META_QUERY } = await import(
      '@msb/js-sdk/queries'
    );
    return {
      query: GET_PARK_QUERY,
      metaQuery: GET_PARK_META_QUERY,
    };
  },
  'public-notices': async () => {
    const { GET_PUBLIC_NOTICE, GET_PUBLIC_NOTICE_META } = await import(
      '@msb/js-sdk/queries'
    );
    return {
      query: GET_PUBLIC_NOTICE,
      metaQuery: GET_PUBLIC_NOTICE_META,
    };
  },
  trails: async () => {
    const { GET_TRAIL_QUERY, GET_TRAIL_META_QUERY } = await import(
      '@msb/js-sdk/queries'
    );
    return {
      query: GET_TRAIL_QUERY,
      metaQuery: GET_TRAIL_META_QUERY,
    };
  },
  'assembly-districts': async () => {
    const { GET_ASSEMBLY_DISTRICT_QUERY, GET_ASSEMBLY_DISTRICT_META_QUERY } =
      await import('@msb/js-sdk/queries');
    return {
      query: GET_ASSEMBLY_DISTRICT_QUERY,
      metaQuery: GET_ASSEMBLY_DISTRICT_META_QUERY,
    };
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> => {
  const { section, slug } = await params;
  const config = await queryMap[section as keyof typeof queryMap]();

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
  const config = await queryMap[section as keyof typeof queryMap]();
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
