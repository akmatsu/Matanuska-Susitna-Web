import { BasePage } from '@/components/static/BasePage';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';
import { PageListItems } from '@/components/static/Page';

const getService = gql(`
  query GetService($slug: String!, $now: DateTime!) {
    service(where: { slug: $slug}) {
      ...BasePageInfo
      trails {
        ...PageList
      }
      facilities {
        ...PageList
      }
      parks {
        ...PageList
      }
      boards {
        ...PageList
      } 
    }
  }
`);

export default async function ServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClientHandler({
    query: getService,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (errors) {
    console.error('Error fetching service page data:', JSON.stringify(errors));
    throw error;
  }

  if (!data?.service) {
    return notFound();
  }

  const page = data.service;

  return (
    <BasePage
      data={page}
      rightSide={
        <>
          <PageListItems items={page.parks} title="Parks" />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.facilities} title="Facilities" />
          <PageListItems items={page.boards} title="Boards" />
        </>
      }
    />
  );
}
