import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageAddress,
  PageHours,
  PageListItems,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';

const getPark = gql(`
  query GetPark(
    $slug: String!
    $now: DateTime!
  ) {
    park(where: { slug: $slug }) {
      ...BasePageInfo
      address {
        ...AddressFields
      }
      hours {
        ...HourList
      }
      trails {
        ...PageList
      }
      facilities {
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
    query: getPark,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.park;

  if (!page) {
    console.error('Park not found for slug:', slug);
    return notFound();
  }

  return (
    <BasePage
      pageContainerProps={{ className: 'relative' }}
      rightSide={
        <>
          <PageAddress address={page.address} />
          <PageHours hours={page.hours} />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.facilities} title="Facilities" />
        </>
      }
    />
  );
}
