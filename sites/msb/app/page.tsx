import { LinkButton } from '@/components/static/LinkButton';
import { Meetings } from '@/components/static/Meetings';
import { SearchDynamicWrapper } from '../components/client/search/SearchDynamicWrapper';
import { PublicNotices } from '@/components/static/landing/PublicNotices';
import { Hero } from '@matsugov/ui';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import { PageToolbelt } from '@/components/static/Page/PageToolbelt';
import { HomePageHighlights } from '@/components/static/landing/HomePageHighlights';

const getHomePage = gql(`
  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {
    homePage {
      id
      title
      description
      heroImage
      ...ToolbeltItems
    }

    publicNotices(take: $take, orderBy: $orderBy) {
      ...PublicNoticeList
    }

    ...HomePageHighlights
  }
`);

export default async function Home() {
  const { data, error } = await getClientHandler({
    query: getHomePage,
    variables: {
      take: 5,
      orderBy: [
        {
          urgency: 'desc',
        },
      ],
    },
  });

  if (error) {
    console.error('Error fetching home page data:', error);
    throw error;
  }

  const page = data?.homePage;
  const publicNotices = data?.publicNotices || [];

  return (
    <div>
      <Hero
        className="flex items-center justify-center"
        image={page?.heroImage}
      >
        <div className="w-full max-w-[500px] px-4">
          <SearchDynamicWrapper />
        </div>
      </Hero>
      <PageToolbelt data={page} />
      <HomePageHighlights data={data} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">Upcoming Meetings</h2>

        <Meetings />
      </section>
      {publicNotices.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-4 text-3xl font-bold">
            Announcement & Public Notices
          </h2>

          <PublicNotices items={publicNotices} />
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">
          Can&apos;t find what you need?
        </h2>
        <p className="mb-4 text-xl">
          Use the search bar or reach out to us directly — we&apos;re here to
          help.
        </p>

        <LinkButton href="/departments" color="primary">
          Contact us
        </LinkButton>
      </section>
    </div>
  );
}
