import { Featured, FeaturedContent, Meetings, LinkButton } from '@/components';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Hero } from '@matsugov/ui';
import { GET_HOME_PAGE } from '@msb/js-sdk';
import { InstantSearchAutoComplete } from './search/components/InstantSearchAutoComplete';
import Link from 'next/link';

// TODO - Figure out how to dynamically load icons from CMS

export default async function Home() {
  const { data, errors, error } = await getClient().query({
    query: GET_HOME_PAGE,
    variables: {
      take: 5,
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 15,
        },
      },
    },
  });

  if (error) {
    console.error('Error fetching home page data:', JSON.stringify(errors));
    throw error;
  }

  const page = data.homePage;
  const publicNotices = data.publicNotices || [];

  return (
    <div>
      <Hero className="flex justify-center items-center" image={page.heroImage}>
        <div className="max-w-[500px] w-full">
          <InstantSearchAutoComplete />
        </div>
      </Hero>
      <section className="flex justify-center items-center bg-base-lightest py-4 px-2">
        <div className=" max-w-[900px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full">
            <Link
              href={page.toolbeltOne?.linkedItem.item?.url || ''}
              className="rounded px-5 py-3 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold w-full no-underline"
              key={page.toolbeltOne?.id}
            >
              <div className="flex flex-col items-center">
                <span
                  className={`iconify size-9 icon-[mdi--pets] text-green-600`}
                ></span>
                <span>{page.toolbeltOne?.title}</span>
              </div>
            </Link>
            <Link
              href={page.toolbeltTwo?.linkedItem.item?.url || ''}
              className="rounded px-5 py-3 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold w-full no-underline"
              key={page.toolbeltTwo?.id}
            >
              <div className="flex flex-col items-center">
                <span
                  className={`iconify size-9 icon-[mdi--message-alert] text-green-600`}
                ></span>
                <span>{page.toolbeltTwo?.title}</span>
              </div>
            </Link>
            <Link
              href={page.toolbeltThree?.linkedItem.item?.url || ''}
              className="rounded px-5 py-3 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold w-full no-underline"
              key={page.toolbeltThree?.id}
            >
              <div className="flex flex-col items-center">
                <span
                  className={`iconify size-9 icon-[mdi--home] text-green-600`}
                ></span>
                <span>{page.toolbeltThree?.title}</span>
              </div>
            </Link>
            <Link
              href={page.toolbeltFour?.linkedItem.item?.url || ''}
              className="rounded px-5 py-3 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold w-full no-underline"
              key={page.toolbeltFour?.id}
            >
              <div className="flex flex-col items-center">
                <span
                  className={`iconify size-9 icon-[mdi--map] text-green-600`}
                ></span>
                <span>{page.toolbeltFour?.title}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Featured
        featuredItems={[
          { ...page.highlightOne, icon: 'icon-[mdi--briefcase]' },
          { ...page.highlightTwo, icon: 'icon-[mdi--legal]' },
          { ...page.highlightThree, icon: 'icon-[mdi--excavator]' },
        ]}
      />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">Upcoming Meetings</h2>

        <Meetings />
      </section>
      {publicNotices.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="mb-4 text-3xl font-bold">
            Announcement & Public Notices
          </h2>

          <FeaturedContent items={publicNotices} />
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">Can't find what you need?</h2>
        <p className="text-xl mb-4">
          Use the search bar or reach out to us directly — we're here to help.
        </p>

        <LinkButton href="#" color="primary">
          Contact us
        </LinkButton>
      </section>
    </div>
  );
}
