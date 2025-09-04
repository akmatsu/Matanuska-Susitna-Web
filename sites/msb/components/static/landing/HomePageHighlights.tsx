import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { HomePageHighlightCard } from './HomePageHighlightCard';

const homePageHighlightsFragment = gql(`
  fragment HomePageHighlights on Query {
    highlights(orderBy:  {
       priority: asc
    }) {
      id
      createdAt
      priority
      ...HomePageHighlightCard 
    }
  }
`);

export function HomePageHighlights(props: {
  data: FragmentType<typeof homePageHighlightsFragment> | undefined | null;
}) {
  const data = getFragmentData(homePageHighlightsFragment, props.data);
  const items = data?.highlights;

  if (!items?.length) return null;

  const sorted = [...items]
    .sort((a, b) => {
      const aPriority = a.priority ?? Infinity;
      const bPriority = b.priority ?? Infinity;
      if (aPriority === bPriority) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return aPriority - bPriority;
    })
    .slice(0, 3);

  return (
    <section className="max-w-6xl mx-auto relative px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sorted.map((item) => (
          <HomePageHighlightCard data={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
