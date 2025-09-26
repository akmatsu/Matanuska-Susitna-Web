import { AssemblyMemberInfo } from '@/components/static/AssemblyDistrictInfo';
import { BasePage } from '@/components/static/BasePage';
import { PageAddress, PageListItems } from '@/components/static/Page';
import { getClientHandler } from '@/utils/apollo/utils';
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
      parks {
        ...PageList
      }
      facilities {
        ...PageList
      }
      trails {
        ...PageList
      }
      boards {
        ...PageList
      }
    }
  }
`);

export default async function DistrictPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClientHandler({
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
      rightSide={
        <>
          <AssemblyMemberInfo page={page} />
          <PageAddress address={page.address} />
          <PageListItems items={page.boards} title="Boards" />
          <PageListItems items={page.facilities} title="Facilities" />
          <PageListItems items={page.parks} title="Parks" />
          <PageListItems items={page.trails} title="Trails" />
        </>
      }
    ></BasePage>
  );
}
