import { getRedirectUrl } from '@/utils/stringHelpers';
import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import type { PageSummary } from '@msb/cms-sdk';
import { ElementType } from 'react';

const pageItemFragment = gql(`
  fragment PageItem on BasePageWithSlug {
    __typename
    title
    slug
    description
  }
`);

/** A linked page summary. Shaped like the CMS REST API's PageSummary. */
export type PageListItemData = Pick<
  PageSummary,
  'title' | 'description' | 'path'
>;

export function PageListItemView(props: {
  item: PageListItemData;
  as?: ElementType;
}) {
  const { item } = props;
  return (
    <LinkCard as={props.as} className="my-2" href={item.path}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="truncate">{item.description}</p>
      </CardBody>
    </LinkCard>
  );
}

/** Maps the Keystone GraphQL page item fragment to view data. */
export function toPageListItemData(
  ref: FragmentType<typeof pageItemFragment>,
): PageListItemData {
  const item = getFragmentData(pageItemFragment, ref);
  return {
    title: item.title ?? '',
    description: item.description ?? '',
    path: getRedirectUrl(item) ?? null,
  };
}

export function PageListItem(props: {
  item: FragmentType<typeof pageItemFragment>;
  as?: ElementType;
}) {
  return (
    <PageListItemView item={toPageListItemData(props.item)} as={props.as} />
  );
}
