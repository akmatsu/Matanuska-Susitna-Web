import { PageSideNavController } from '@/components/client/Page/PageSideNavController';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PagePublicNotices,
} from '@/components/static/Page';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getService = gql(`
  query GetService(
    $slug: String!,
    $take: Int = 5,
    $orderDirection: OrderDirection = desc
  ) {
    service(where: { slug: $slug}) {
      ...PageBody
      ...HeroImage
      documents {
        ...DocumentList
      }
      primaryAction {
        ...ExternalActionFields
      }
      secondaryActions {
        ...ExternalActionFields
      }
      primaryContact {
        ...ContactList
      }
      contacts {
        ...ContactList
      }
    }

    publicNotices(
      where: { services: { some: { slug: { equals: $slug } } } }, 
      take: $take, 
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeList
    }
  }
`);

export default async function ServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClient().query({
    query: getService,
    variables: {
      slug,
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
    <>
      <PageHeroImage page={page} />
      <PageContainer className="relative">
        <PageSideNavController
          rightSide={
            <>
              <PageActions
                primaryAction={page.primaryAction}
                secondaryActions={page.secondaryActions}
              />
              <PageDocuments documents={page.documents} />
              <PageContacts
                primaryContact={page.primaryContact}
                contacts={page.contacts}
              />
            </>
          }
        >
          <PageBody page={page} />
          <PagePublicNotices />
        </PageSideNavController>
      </PageContainer>
    </>
  );
}
