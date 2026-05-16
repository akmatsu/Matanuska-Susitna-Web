import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ToolbeltHighlight } from './toolbeltHighlight';

const toolbeltItemsFragment = gql(`
  fragment ToolbeltItems on HomePage {
    featuredItems(take: 9, orderBy: {order: asc}) {
      id
      ...ToolbeltHighlight
    }
  }
`);

export function PageToolbelt(props: {
  data?: FragmentType<typeof toolbeltItemsFragment> | null;
}) {
  if (!props.data) return null;
  const data = getFragmentData(toolbeltItemsFragment, props.data);

  const items = data.featuredItems;

  return (
    <section className="bg-msb-base-lightest flex justify-center px-2 py-4">
      <div className="w-full max-w-7xl">
        <div className="flex h-full w-full flex-row flex-wrap items-stretch justify-center gap-4 lg:gap-8">
          {items?.map((item) => {
            return <ToolbeltHighlight data={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
