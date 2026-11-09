import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import {
  PageListItemView,
  toPageListItemData,
  type PageListItemData,
} from './PageListItem';

const pageListFragment = gql(`
  fragment PageList on BasePageWithSlug {
    id
    ...PageItem
  }
`);

export type PageListData = PageListItemData & { id: string };

export function PageListItemsView(props: {
  items?: PageListData[] | null;
  title: string;
}) {
  const { items } = props;
  if (items?.length) {
    return (
      <PageSection title={props.title}>
        <ul>
          {items.map((item) => (
            <PageListItemView key={item.id} item={item} as="li" />
          ))}
        </ul>
      </PageSection>
    );
  }
}

type PageListRef = FragmentType<typeof pageListFragment>;

/** Maps the Keystone GraphQL page list fragment to view data. */
export function toPageListData(ref: PageListRef): PageListData {
  const item = getFragmentData(pageListFragment, ref);
  return { id: item.id, ...toPageListItemData(item) };
}

export function PageListItems(props: {
  items?: PageListRef[] | null;
  title: string;
}) {
  return (
    <PageListItemsView
      items={props.items?.map(toPageListData)}
      title={props.title}
    />
  );
}
