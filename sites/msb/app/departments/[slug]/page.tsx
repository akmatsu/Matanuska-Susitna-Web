import { getClient } from '@/utils/apollo/ApolloClient';
import { Hero } from '@matsugov/ui';
import { GET_ORG_UNIT_META_QUERY, GET_ORG_UNIT_QUERY } from '@msb/js-sdk';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { data } = await getClient().query({
    query: GET_ORG_UNIT_META_QUERY,
    variables: {
      where: { slug: params.slug },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return {
    title: `MSB - ${data?.orgUnit.title}`,
    description: data?.orgUnit.description,
  };
}

export default async function DepartmentPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { data, errors } = await getClient().query({
    query: GET_ORG_UNIT_QUERY,
    variables: {
      where: { slug: params.slug },
    },

    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  const department = data?.orgUnit;

  if (errors) {
    return (
      <div>
        <h1>Department Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <Hero image={department.heroImage || undefined} />
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-12 gap-16"></div>
    </div>
  );
}
