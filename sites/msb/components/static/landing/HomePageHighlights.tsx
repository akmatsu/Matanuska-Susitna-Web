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

function normalizeDate(value: unknown): string | number | Date {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  ) {
    return value;
  }
  return new Date();
}

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
          new Date(normalizeDate(b.createdAt)).getTime() -
          new Date(normalizeDate(a.createdAt)).getTime()
        );
      }

      return aPriority - bPriority;
    })
    .slice(0, 3);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {sorted.map((item) => (
          <HomePageHighlightCard data={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
