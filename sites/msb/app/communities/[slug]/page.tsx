import { BasePage } from '@/components/static/BasePage';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getCommunityPage = gql(`
  query GetCommunity(
    $slug: String!
    $now: DateTime!
  ) {
    community(where: { slug: $slug }) {
      ...BasePageInfo
      ...PageMap
      boards {
        ...PageList
      }      
    }
  }
`);

export default async function CommunityPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClient().query({
    query: getCommunityPage,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }
  if (!data?.community) {
    console.error('Community not found for slug:', slug);
    return notFound();
  }

  const page = data.community;

  return <BasePage data={page} />;
}
