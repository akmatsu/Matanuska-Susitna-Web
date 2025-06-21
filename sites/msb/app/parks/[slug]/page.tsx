import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageActions,
  PageAddress,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageHours,
  PageListItems,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { gql } from '@msb/js-sdk/gql';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';

const getPark = gql(`
  query GetPark(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    park(where: { slug: $slug }) {
      ...PageBody
      ...HeroImage
      actions {
        ...ActionFields
      }
      documents {
        ...DocumentFields
      }
      contacts {
        ...ContactFields
      }
      services {
        ...ServiceFields
      }
      address {
        ...AddressFields
      }
      hours {
        ...HourFields
      }
      trails {
        ...PageList
      }
      facilities {
        ...PageList
      }
    }

    publicNotices(
      where: { trails: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeList
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

  const publicNotices = data.publicNotices;

  return (
    <>
      <PageHeroImage page={page} />
      <PageContainer className="relative">
        <PageTwoColumn
          rightSide={
            <>
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageAddress address={page.address} />
              <PageHours hours={page.hours} />
              <PageContacts contacts={page.contacts} />
              <PageListItems items={page.trails} title="Trails" />
              <PageListItems items={page.facilities} title="Facilities" />
            </>
          }
        >
          <PageBody page={page} />
          <PageServices services={page.services} />
          <PagePublicNotices items={publicNotices} />
          <PageEvents listName="Park" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
