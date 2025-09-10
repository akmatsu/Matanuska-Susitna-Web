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
      id
      item {
        __typename
        ... on BasePageWithSlug {
          id
          slug
        }

        ... on ElectionsPage {
          id
          title
        }

        ... on Url {
          title
          url
        }

        ... on AssemblyDistrict {
          title
          slug
        }

        ... on BasePage {
          title
        }
      }
    }

    topPages: pageViews(
      orderBy: { views: desc }, 
      where: { date: { gte: $topPagesDate}}, 
      take: 10 
    ) {
      id
      item {
        __typename
        ... on BasePageWithSlug {
          id
          slug
        }

        ... on ElectionsPage {
          id
          title
        }

        ... on Url {
          title
          url
        }

        ... on AssemblyDistrict {
          title
          slug
        }

        ... on BasePage {
          title
        }
      }
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
    <PageContainer>
      <ProseWrapper>
        <h1 className="mb-6">{data.landingPage.title}</h1>
        <MarkdownRenderer>{data.landingPage.body}</MarkdownRenderer>
        <section>
          <h2 className="mt-12 mb-6">Top Pages</h2>
          <ol>
            {data.topPages?.map((page) => (
              <li key={page.id}>
                <Link href={getRedirectUrl(page.item) || ''}>
                  {page.item?.title}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="mt-12 mb-6">Trending Pages</h2>
          <ol>
            {data.trendingPages?.map((page) => (
              <li key={page.id}>
                <Link href={getRedirectUrl(page.item) || ''}>
                  {page.item?.title}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="mt-12 mb-6">Highlights</h2>
          <ul>
            {data.highlights?.map((item) => (
              <HomePageHighlightCard data={item} key={item.id} />
            ))}
          </ul>
        </section>
      </ProseWrapper>
    </PageContainer>
  );
}
