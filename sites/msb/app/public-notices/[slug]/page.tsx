import { notFound } from 'next/navigation';
import { PageListItems } from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';
import { getClientHandler } from '@/utils/apollo/utils';

const getPage = gql(`
  query GetPublicNotice($slug: String!, $now: DateTime!) {
    publicNotice(where: { slug: $slug }) {
      ...BasePageInfo
      parks {
        ...PageList
      }
      facilities {
        ...PageList
      }
      trails {
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
  const { data, errors, error } = await getClientHandler({
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
        </>
      }
    />
  );
}
