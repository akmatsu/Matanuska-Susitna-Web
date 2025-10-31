import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { HomePageHighlightCard } from '@/components/static/landing/HomePageHighlightCard';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { gql } from '@msb/js-sdk/gql';
import { subDays } from 'date-fns';
import { notFound } from 'next/navigation';
import { PageViewsListWrapper } from './components/PageViewsListWrapper';
import { getClientHandler } from '@/utils/apollo/utils';

const metaQuery = gql(`
  query GetTopPagesMeta {
    landingPage(where: { title: "Top Pages" }) {
      title
      description
    }
  }
`);

export async function generateMetadata() {
  try {
    const { data } = await getClientHandler({
      query: metaQuery,
    });
    return {
      title: `MSB - ${data?.landingPage?.title || 'Top Pages'}`,
      description: data?.landingPage?.description,
    };
  } catch (error: any) {
    console.error('Apollo query failed: ', JSON.stringify(error));
    if (error.networkError?.result?.errors) {
      console.error(
        'Network error: ',
        JSON.stringify(error.networkError.result.errors, null, 2),
      );
    }

    throw error;
  }
}

const query = gql(`
  query GetTopPages($topPagesDate: DateTime!, $trendingPagesDate: DateTime!) {
    landingPage(where: { title: "Top Pages" }) {
      title
      heroImage
      body
      description
    }

    highlights(orderBy:  {
       priority: asc
    }, take: 8) {
      id
      createdAt
      priority
      ...HomePageHighlightCard
    }

    topPages: topPages(
      after: $topPagesDate
      take: 10 
    ) {
      ...PageViewsList
    }

    trendingPages: topPages(
      after: $trendingPagesDate
      take: 100 
    ) {
      ...PageViewsList
    }
  }
`);

export default async function TopPages() {
  const { data } = await getClientHandler({
    query,
    variables: {
      topPagesDate: subDays(new Date(), 30).toISOString(),
      trendingPagesDate: subDays(new Date(), 7).toISOString(),
    },
  });

  if (!data?.landingPage) return notFound();

  return (
    <PageContainer size="lg" breakPoint="sm">
      <ProseWrapper>
        <h1>{data.landingPage.title}</h1>
        <MarkdownRenderer>{data.landingPage.body}</MarkdownRenderer>
        <div className="md:grid grid-cols-5 gap-8">
          <div className="col-span-5 md:col-span-3">
            <PageViewsListWrapper data={data.topPages} title="Top Pages" />
            <PageViewsListWrapper
              data={data.trendingPages}
              title="Trending Pages"
            />
            <section className="md:hidden">
              <h2>Highlights</h2>
              <ul className="not-prose flex flex-col gap-4">
                {data.highlights?.map((item) => (
                  <HomePageHighlightCard data={item} key={item.id} />
                ))}
              </ul>
            </section>
          </div>
          <div className="hidden md:block col-span-2">
            <section>
              <h2>Highlights</h2>
              <ul className="not-prose flex flex-col gap-4">
                {data.highlights?.map((item) => (
                  <HomePageHighlightCard data={item} key={item.id} />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </ProseWrapper>
    </PageContainer>
  );
}
