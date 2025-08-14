import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import { PageListItems, PageServices } from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePageWithActions } from '@/components/static/BasePageWithActions';

const getPage = gql(`
  query GetPublicNotice($slug: String!) {
    publicNotice(where: { slug: $slug }) {
      ...BasePageWithActionsInfo
      communities {
        ...PageList
      }
      assemblyDistricts {
        ...PageList
      }
      parks {
        ...PageList
      }
      facilities {
        ...PageList
      }
      trails {
        ...PageList
      }
      orgUnits {
        ...PageList
      }
      boards {
        ...PageList
      }
      services {
        ...ServiceList
      }
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: getPage,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.publicNotice;

  if (!page) {
    console.error('Page not found for slug:', slug);
    return notFound();
  }

  return (
    <BasePageWithActions
      data={page}
      pageContainerProps={{ className: 'relative' }}
      rightSide={
        <>
          <PageListItems items={page.facilities} title="Facilities" />
          <PageListItems items={page.parks} title="Parks" />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.boards} title="Boards" />
          <PageListItems
            items={page.orgUnits}
            title="Departments & Divisions"
          />
          <PageListItems
            items={page.assemblyDistricts}
            title="Assembly Districts"
          />
          <PageListItems items={page.communities} title="Communities" />
        </>
      }
    >
      <PageServices services={page.services} />
    </BasePageWithActions>
  );
}
