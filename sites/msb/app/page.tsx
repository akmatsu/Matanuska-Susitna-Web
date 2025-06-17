import Link from 'next/link';
import { LinkButton } from '@/components/static/LinkButton';
import { Featured } from '@/components/static/landing/Featured';
import { Meetings } from '@/components/static/Meetings';
import { GET_HOME_PAGE } from '@msb/js-sdk';
import { type Highlight, OrderDirection } from '@msb/js-sdk/graphql';
import { plural } from 'pluralize';
import { SearchDynamicWrapper } from '../components/client/search/SearchDynamicWrapper';
import { PublicNotices } from '@/components/static/landing/PublicNotices';
import { Hero } from '@matsugov/ui';
import { getClientHandler } from '@/utils/apollo/utils';

export default async function Home() {
  const {data, error, errors} = await getClientHandler({
    query: GET_HOME_PAGE,
    variables: {
      take: 5,
      orderBy: [
        {
          urgency: OrderDirection.Desc,
        },
      ],
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

  function getUrlSection(str?: string) {
    if (!str) {
      return '/';
    }
    if (str === 'OrgUnit') {
      return '/departments/';
    }

    return `/${plural(str.toLocaleLowerCase())}/`;
  }

  const toolBeltItems = [
    {
      id: page?.toolbeltOne?.id,
      title: page?.toolbeltOne?.title,
      icon: 'icon-[mdi--pets]',
      url:
        page?.toolbeltOne?.linkedItem?.item?.__typename === 'Url'
          ? page?.toolbeltOne?.linkedItem?.item?.url
          : `${getUrlSection(page?.toolbeltOne?.linkedItem?.item?.__typename)}${page?.toolbeltOne?.linkedItem?.item?.slug}`,
    },
    {
      id: page?.toolbeltTwo?.id,
      title: page?.toolbeltTwo?.title,
      icon: 'icon-[mdi--message-alert]',
      url:
        page?.toolbeltTwo?.linkedItem?.item?.__typename === 'Url'
          ? page?.toolbeltTwo?.linkedItem?.item?.url
          : `${getUrlSection(page?.toolbeltTwo?.linkedItem?.item?.__typename)}${page?.toolbeltTwo?.linkedItem?.item?.slug}`,
    },
    {
      id: page?.toolbeltThree?.id,
      title: page?.toolbeltThree?.title,
      icon: 'icon-[mdi--home]',
      url:
        page?.toolbeltThree?.linkedItem?.item?.__typename === 'Url'
          ? page?.toolbeltThree?.linkedItem?.item?.url
          : `${getUrlSection(page?.toolbeltThree?.linkedItem?.item?.__typename)}${page?.toolbeltThree?.linkedItem?.item?.slug}`,
    },
    {
      id: page?.toolbeltFour?.id,
      title: page?.toolbeltFour?.title,
      icon: 'icon-[mdi--map]',
      url:
        page?.toolbeltFour?.linkedItem?.item?.__typename === 'Url'
          ? page?.toolbeltFour?.linkedItem?.item?.url
          : `${getUrlSection(page?.toolbeltFour?.linkedItem?.item?.__typename)}${page?.toolbeltFour?.linkedItem?.item?.slug}`,
    },
  ];

  return (
    <div>
      <Hero
        className="flex justify-center items-center"
        image={page?.heroImage}
      >
        <div className="max-w-[500px] w-full">
          <SearchDynamicWrapper />
        </div>
      </Hero>
      <section className="flex justify-center items-center bg-base-lightest py-4 px-2">
        <div className=" max-w-[900px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full">
            {toolBeltItems.map(
              (item) =>
                item.url &&
                item.title && (
                  <Link
                    href={item.url}
                    className="rounded-sm px-5 py-3 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold w-full no-underline"
                    key={item.id}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={`iconify size-9 ${item.icon} text-green-600`}
                      ></span>
                      <span>{item.title}</span>
                    </div>
                  </Link>
                ),
            )}
          </div>
        </div>
      </section>
      <Featured
        featuredItems={[
          {
            ...(page?.highlightOne as Highlight),
            icon: 'icon-[mdi--briefcase]',
          },
          { ...(page?.highlightTwo as Highlight), icon: 'icon-[mdi--legal]' },
          {
            ...(page?.highlightThree as Highlight),
            icon: 'icon-[mdi--excavator]',
          },
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

          <PublicNotices items={publicNotices} />
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">
          Can&apos;t find what you need?
        </h2>
        <p className="text-xl mb-4">
          Use the search bar or reach out to us directly — we&apos;re here to
          help.
        </p>

        <LinkButton href="#" color="primary">
          Contact us
        </LinkButton>
      </section>
    </div>
  );
}
