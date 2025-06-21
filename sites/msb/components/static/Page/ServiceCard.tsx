import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Link from 'next/link';
import { ElementType } from 'react';

const ServiceCardFragment = gql(`
  fragment ServiceFields on Service {
    id
    title
    slug
    description
  }
`);

export function ServiceCard(props: {
  service: FragmentType<typeof ServiceCardFragment>;
  as?: React.ElementType;
  className?: string;
}) {
  const item = getFragmentData(ServiceCardFragment, props.service);

  return (
    <LinkCard
      as={props.as}
      linkAs={Link}
      href={`/services/${item?.slug}`}
      className={props.className}
    >
      <CardHeader>
        <CardTitle>{item?.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="truncate">{item?.description}</p>
      </CardBody>
    </LinkCard>
  );
}
