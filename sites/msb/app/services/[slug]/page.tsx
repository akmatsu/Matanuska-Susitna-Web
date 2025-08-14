import { PageSideNavController } from '@/components/client/Page/PageSideNavController';
import { BasePageWithPrimaryAction } from '@/components/static/BasePageWithPrimaryAction';
import { PagePublicNotices } from '@/components/static/Page';
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
      ...BasePageWithPrimaryActionInfo      
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
  const publicNotices = data.publicNotices;

  return (
    <BasePageWithPrimaryAction
      data={page}
      columnControllerAs={PageSideNavController}
    >
      <PagePublicNotices items={publicNotices} />
    </BasePageWithPrimaryAction>
  );
}
