import { PageSection } from './PageSection';
import { OrgUnitFieldsFragmentDoc } from '@msb/js-sdk/graphql';
import { OrgUnitCard } from './OrgUnitCard';
import { FragmentType } from '@msb/js-sdk/gql';

export function PageParentOrgUnit(props: {
  item?: FragmentType<typeof OrgUnitFieldsFragmentDoc> | null;
}) {
  if (props.item) {
    return (
      <PageSection title="Parent Department">
        <OrgUnitCard orgUnit={props.item} />
      </PageSection>
    );
  }
}
