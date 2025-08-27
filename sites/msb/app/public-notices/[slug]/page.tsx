import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import { PageListItems, PageServices } from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';

const getPage = gql(`
  query GetPublicNotice($slug: String!, $now: DateTime!) {
    publicNotice(where: { slug: $slug }) {
      ...BasePageInfo
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
      now: new Date().toISOString(),
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
    <BasePage
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
    />
  );
}
