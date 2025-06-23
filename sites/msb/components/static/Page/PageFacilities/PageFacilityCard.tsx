import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ElementType } from 'react';

const facilityCardFragment = gql(`
  fragment FacilityCard on Facility {
    title
    slug
    description
  }
`);

export function FacilityCard(props: {
  facility?: FragmentType<typeof facilityCardFragment> | null;
  as?: ElementType;
  className?: string;
}) {
  const facilityData = getFragmentData(facilityCardFragment, props.facility);
  if (facilityData)
    return (
      <LinkCard
        as={props.as}
        className={props.className}
        href={`/facilities/${facilityData.slug}`}
      >
        <CardHeader>
          <CardTitle>{facilityData.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="truncate">{facilityData.description}</p>
        </CardBody>
      </LinkCard>
    );
}
