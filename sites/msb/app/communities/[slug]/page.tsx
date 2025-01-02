import { getClient } from '@/utils/apollo/ApolloClient';
import {
  GET_COMMUNITY_META_QUERY,
  GET_COMMUNITY_QUERY,
} from '@/utils/apollo/queries/getCommunity';
import { Metadata } from 'next';

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
  const { data } = await getClient().query({
    query: GET_COMMUNITY_QUERY,
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

  const community = data?.community;

  function getImageBaseUrl(value?: string | null) {
    if (!value) return;
    const [baseUrl, _] = value.split('?');

    return baseUrl;
  }

  function getPosition(value?: string | null) {
    if (!value) return;
    const [_, search] = value.split('?');
    const params = new URLSearchParams(search);
    const position = params.get('position');

    return position || '50% 50%';
  }

  return (
    <>
      <section
        className="usa-hero display-flex flex-column flex-justify-center flex-align-center text-black text-center"
        aria-label="introduction"
        style={{
          backgroundImage: `url(${getImageBaseUrl(community.heroImage)})`,
          backgroundPosition: getPosition(community.heroImage),
          height: '300px',
        }}
      ></section>
      {/* <section className="usa-section">
        <GridContainer>
          <MarkdownRenderer>{data?.community?.body}</MarkdownRenderer>
        </GridContainer>
      </section> */}
    </>
  );
}
