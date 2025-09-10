import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { HomePageHighlightCard } from '@/components/static/landing/HomePageHighlightCard';
import { Link } from '@/components/static/Link';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { getClient } from '@/utils/apollo/ApolloClient';
import { getRedirectUrl } from '@/utils/stringHelpers';
import { gql } from '@msb/js-sdk/gql';
import { subDays } from 'date-fns';
import { notFound } from 'next/navigation';
import { PageViewsList } from './components/SortablePageList';

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
    }) {
      id
      createdAt
      priority
      ...HomePageHighlightCard
    }

    trendingPages: pageViews(
      orderBy: { views: desc },
      where: { date: { gte: $trendingPagesDate }},
      take: 100 
    ) {
      ...PageViewsList
    }

    topPages: pageViews(
      orderBy: { views: desc }, 
      where: { date: { gte: $topPagesDate}}, 
      take: 10 
    ) {
      ...PageViewsList
    }
  }
`);

export default async function TopPages() {
  const { data } = await getClient().query({
    query,
    variables: {
      topPagesDate: subDays(new Date(), 30).toISOString(),
      trendingPagesDate: subDays(new Date(), 7).toISOString(),
    },
  });

  if (!data.landingPage) return notFound();

  return (
    <PageContainer size="lg" breakPoint="sm">
      <ProseWrapper>
        <h1>{data.landingPage.title}</h1>
        <MarkdownRenderer>{data.landingPage.body}</MarkdownRenderer>
        <div className="lg:grid grid-cols-5 gap-8">
          <div className="col-span-3 lg:col-span-3">
            <PageViewsList data={data.topPages} title="Top Pages" />
            <PageViewsList data={data.trendingPages} title="Trending Pages" />
          </div>
          <div className="hidden lg:block col-span-2">
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
