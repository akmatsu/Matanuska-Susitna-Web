import { BasePage } from '@/components/static/BasePage';
import { getClientHandler } from '@/utils/apollo/utils';
import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const metaQuery = gql(`
    query GetPolicyMeta($slug: String!) {
        policy(where: { slug: $slug }) {
            title
            description
        }
    }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('policy', metaQuery, slug);
};

const PolicyQuery = gql(`
    query GetPolicy($slug: String!, $now: DateTime!) {
        policy(where: { slug: $slug }) {
          ...BasePageInfo
        }
    }
  `);

export default async function PolicyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, error } = await getClientHandler({
    query: PolicyQuery,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (error) {
    console.error('Error fetching policy page data:', error);
    throw error;
  }

  if (!data?.policy) {
    return notFound();
  }

  const page = data.policy;

  return <BasePage data={page} />;
}
