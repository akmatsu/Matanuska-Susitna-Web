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
    <section className="flex justify-center  bg-base-lightest py-4 px-2">
      <div className="max-w-7xl w-full">
        <div className="flex flex-row flex-wrap justify-center gap-4 lg:gap-8 w-full h-full items-stretch">
          {items?.map((item) => {
            return <ToolbeltHighlight data={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
