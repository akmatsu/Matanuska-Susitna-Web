import { BasePage } from '@/components/static/BasePage';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getService = gql(`
  query GetService($slug: String!, $now: DateTime!) {
    service(where: { slug: $slug}) {
      ...BasePageInfo      
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
      now: new Date().toISOString(),
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

  return <BasePage data={page} />;
}
