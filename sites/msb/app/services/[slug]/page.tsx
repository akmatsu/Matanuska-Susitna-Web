import { PageSideNavController } from '@/components/client/Page/PageSideNavController';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PagePublicNotices,
} from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { GET_SERVICE_QUERY } from '@msb/js-sdk/getService';
import { OrderDirection } from '@msb/js-sdk/graphql';
import { notFound } from 'next/navigation';

export default async function ServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClient().query({
    query: GET_SERVICE_QUERY,
    variables: {
      where: {
        slug,
      },
      publicNoticesWhere2: {
        services: {
          some: {
            slug: {
              equals: slug,
            },
          },
        },
      },
      orderBy: [
        {
          urgency: OrderDirection.Desc,
        },
      ],
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
        <PageBody
          title={page.title}
          description={page.description}
          body={page.body}
        />
        <PagePublicNotices />
      </PageSideNavController>
    </PageContainer>
  );
}
