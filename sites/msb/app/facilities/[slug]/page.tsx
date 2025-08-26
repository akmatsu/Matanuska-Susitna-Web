import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import { PageListItems, PageServices } from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';

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
      services {
        ...ServiceList
      }
      address {
        ...AddressFields
      }
      hours {
        ...HourFields
      }
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
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
      rightSide={
        <>{page.park && <PageListItems items={[page.park]} title="Park" />}</>
      }
    >
      <PageServices services={page.services} />
    </BasePage>
  );
}
