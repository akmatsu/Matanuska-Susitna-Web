import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import clsx from 'clsx';
import Link from 'next/link';

const PublicNoticeFields = gql(`
  fragment PublicNoticeInfo on PublicNotice {
    id
    title
    description
    slug
    heroImage
    urgency
  }
`);

export function PublicNoticeInfo(props: {
  data: FragmentType<typeof PublicNoticeFields>;
}) {
  const item = getFragmentData(PublicNoticeFields, props.data);

  return (
    <LinkCard
      key={item.id}
      href={`/public-notices/${item.slug}`}
      as="li"
      linkAs={Link}
      className={clsx('h-full w-full')}
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
