import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageListItems,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { gql } from '@msb/js-sdk/gql';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';

const getFacilityPage = gql(`
  query GetFacility(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    facility(where: { slug: $slug }) {
      ...HeroImage
      ...PageBody
      actions {
        ...ActionList
      }
      documents {
        ...DocumentList
      }

      topics {
        ...PageList
      }
      park {
        ...PageList
      }
      services {
        ...ServiceList
      }
      address {
        ...AddressFields
      }
      contacts {
        ...ContactList
      }
      hours {
        ...HourFields
      }
    }

    publicNotices(
      where: { communities: { some: { slug: { equals: $slug } } } }
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
    query: getFacilityPage,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.facility;

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
              <PageContacts contacts={page.contacts} />
              <PageListItems items={page.topics} title="Topics" />
              {page.park && <PageListItems items={[page.park]} title="Park" />}
            </>
          }
        >
          <PageBody page={page} />
          <PageServices services={page.services} />
          <PagePublicNotices items={publicNotices} />
          <PageEvents listName="Facility" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
