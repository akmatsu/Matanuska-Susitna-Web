import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { OrgUnitCard } from './OrgUnitCard';

const childrenOrgUnitsFragment = gql(`
  fragment ChildrenOrgUnits on OrgUnit {
    id
    ...OrgUnitFields
  }
`);

export function PageChildrenOrgUnits(props: {
  items?: FragmentType<typeof childrenOrgUnitsFragment>[] | null;
}) {
  const items = getFragmentData(childrenOrgUnitsFragment, props.items);
  if (items?.length)
    return (
      <PageSection title="Division">
        <ul className="flex flex-col gap-2">
          {items.map((child) => (
            <OrgUnitCard orgUnit={child} key={child.id} />
          ))}
        </ul>
      </PageSection>
    );
}
