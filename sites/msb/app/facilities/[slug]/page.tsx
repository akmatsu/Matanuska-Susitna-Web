import { notFound } from 'next/navigation';
import {
  PageAddress,
  PageHours,
  PageListItems,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';
import { getClientHandler } from '@/utils/apollo/utils';

const getFacilityPage = gql(`
  query GetFacility(
    $slug: String!
    $now: DateTime!
  ) {
    facility(where: { slug: $slug }) {
      ...BasePageInfo
      park {
        ...PageList
      }
      address {
        ...AddressFields
      }
      hours {
        ...HourList
      }
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClientHandler({
    query: getFacilityPage,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.facility;

  if (!page) {
    console.error('Facility not found for slug:', slug);
    return notFound();
  }

  return (
    <BasePage
      data={page}
      rightSide={
        <>
          <PageAddress address={page.address} />
          <PageHours hours={page.hours} />
          {page.park && <PageListItems items={[page.park]} title="Parks" />}
        </>
      }
    />
  );
}
