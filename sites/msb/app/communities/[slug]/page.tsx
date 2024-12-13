import { getClient } from '@/utils/apollo/ApolloClient';
import { GET_COMMUNITY_META_QUERY } from '@/utils/apollo/queries/getCommunity';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await getClient().query({
    query: GET_COMMUNITY_META_QUERY,
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
    title: `MSB - ${data?.community.title}`,
    description: data?.community.description,
  };
}

export default async function Community({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section
      className="usa-hero display-flex flex-column flex-justify-center flex-align-center text-black text-center"
      aria-label="introduction"
      style={{
        backgroundImage: `url(https://d1159zutbdy4l.cloudfront.net/public/uploads/b166b6bf-6cb2-43c9-9caf-4ada690d9099optimized_images/1920x1489_optimized_image.jpg)`,
        backgroundPosition: 'center',
      }}
    >
      <div style={{ height: '300px' }}></div>
    </section>
  );
}
