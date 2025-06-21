import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ElementType } from 'react';

const pageItemFragment = gql(`
  fragment PageItem on BasePageWithSlug {
    title
    slug
    description
  }
`);

export function PageListItem(props: {
  item: FragmentType<typeof pageItemFragment>;
  title: string;
  as: ElementType;
}) {
  const item = getFragmentData(pageItemFragment, props.item);
  return (
    <LinkCard
      as={props.as}
      className="my-2"
      href={`/${props.title.toLowerCase().replace(/\s/gi, '-')}/${item.slug}`}
    >
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="truncate">{item.description}</p>
      </CardBody>
    </LinkCard>
  );
}
