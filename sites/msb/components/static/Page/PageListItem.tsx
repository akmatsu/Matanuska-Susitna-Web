import { getRedirectUrl } from '@/utils/stringHelpers';
import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ElementType } from 'react';
import slugify from 'voca/slugify';

const pageItemFragment = gql(`
  fragment PageItem on BasePageWithSlug {
    __typename
    title
    slug
    description
  }
`);

export function PageListItem(props: {
  item: FragmentType<typeof pageItemFragment>;
  as?: ElementType;
}) {
  const item = getFragmentData(pageItemFragment, props.item);
  const url = getRedirectUrl(item);
  return (
    <LinkCard as={props.as} className="my-2" href={url}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="truncate">{item.description}</p>
      </CardBody>
    </LinkCard>
  );
}
