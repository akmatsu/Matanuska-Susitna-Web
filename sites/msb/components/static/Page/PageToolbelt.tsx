import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ToolbeltHighlight } from './toolbeltHighlight';

const toolbeltItemsFragment = gql(`
  fragment ToolbeltItems on HomePage {
    featuredItems(take: 7, orderBy: {order: asc}) {
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
    <section className="flex justify-center items-center bg-base-lightest py-4 px-2">
      <div className=" max-w-[900px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full">
          {items?.map((item) => {
            return <ToolbeltHighlight data={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
