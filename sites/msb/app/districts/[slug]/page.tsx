import { BasePageWithActions } from '@/components/static/BasePageWithActions';
import { PageAddress, PagePublicNotices } from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getAssemblyDistrict = gql(`
    query GetAssemblyDistrict(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    assemblyDistrict(where: { slug: $slug }) {
      ...BasePageWithActionsInfo
      ...AssemblyMemberInfo
      address {
        ...AddressFields
      }
    }

    publicNotices(
      where: { assemblyDistricts: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeList
    }
  }
`);

export default async function DistrictPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: getAssemblyDistrict,
    variables: { slug },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }
  if (!data?.assemblyDistrict) {
    console.error('Community not found for slug:', slug);
    return notFound();
  }

  const page = data.assemblyDistrict;
  const publicNotices = data.publicNotices;
  return (
    <BasePageWithActions
      data={page}
      rightSide={<PageAddress address={page.address} />}
    >
      <PagePublicNotices items={publicNotices} />
    </BasePageWithActions>
  );
}
