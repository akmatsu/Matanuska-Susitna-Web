import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { HomePageHighlightCard } from './HomePageHighlightCard';

const homePageHighlightsFragment = gql(`
  fragment HomePageHighlights on HomePage {
    highlightOne {
      id
      ...HomePageHighlightCard
    }
    highlightTwo {
      id
      ...HomePageHighlightCard
    }
    highlightThree {
      id
      ...HomePageHighlightCard
    }
  }
`);

export function HomePageHighlights(props: {
  data: FragmentType<typeof homePageHighlightsFragment> | undefined | null;
}) {
  const data = getFragmentData(homePageHighlightsFragment, props.data);
  const items = [
    {
      data: data?.highlightOne,
      icon: 'icon-[mdi--briefcase]',
    },
    { data: data?.highlightTwo, icon: 'icon-[mdi--legal]' },
    {
      data: data?.highlightThree,
      icon: 'icon-[mdi--excavator]',
    },
  ];
  return (
    <section className="max-w-6xl mx-auto relative px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map(
          (item) =>
            item.data && (
              <HomePageHighlightCard
                data={item.data}
                key={item.data.id}
                icon={item.icon}
              />
            ),
        )}
      </div>
    </section>
  );
}
