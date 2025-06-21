import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const OrgUnitFields = gql(`
  fragment OrgUnitFields on OrgUnit {
    id
    title
    slug
    description
  }
`);

export function OrgUnitCard(props: {
  orgUnit: FragmentType<typeof OrgUnitFields>;
}) {
  const orgUnit = getFragmentData(OrgUnitFields, props.orgUnit);
  return (
    <LinkCard href={`/departments/${orgUnit.slug}`} key={orgUnit.id}>
      <CardHeader>
        <CardTitle>{orgUnit.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="truncate">{orgUnit.description}</p>
      </CardBody>
    </LinkCard>
  );
}
