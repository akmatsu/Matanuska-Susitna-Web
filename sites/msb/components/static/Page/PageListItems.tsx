import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageListItem } from './PageListItem';

const pageListFragment = gql(`
  fragment PageList on BasePageWithSlug {
    id
    ...PageItem
  }
`);

export function PageListItems(props: {
  items?: FragmentType<typeof pageListFragment>[] | null;
  title: string;
}) {
  const items = getFragmentData(pageListFragment, props.items);
  if (items?.length) {
    return (
      <PageSection title={props.title} noMargins>
        <ul>
          {items.map((item) => (
            <PageListItem
              key={item.id}
              item={item}
              as="li"
              title={props.title}
            />
          ))}
        </ul>
      </PageSection>
    );
  }
}
