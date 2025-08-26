import { BasePage } from '@/components/static/BasePage';
import { PageAddress } from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getAssemblyDistrict = gql(`
    query GetAssemblyDistrict(
    $slug: String!
    $now: DateTime!
  ) {
    assemblyDistrict(where: { slug: $slug }) {
      ...BasePageInfo
      ...AssemblyMemberInfo
      address {
        ...AddressFields
      }
    }
  }
`);

export default async function DistrictPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: getAssemblyDistrict,
    variables: { slug, now: new Date().toISOString() },
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

  return (
    <BasePage
      data={page}
      rightSide={<PageAddress address={page.address} />}
    ></BasePage>
  );
}
