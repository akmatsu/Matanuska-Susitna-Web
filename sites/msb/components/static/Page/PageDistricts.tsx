import { PageSection } from './PageSection';
import { DistrictCard } from './DistrctCard';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const districtListFragment = gql(`
  fragment DistrictList on AssemblyDistrict {
    id
    ...DistrictDetailFields
  }
`);

export function PageDistricts(props: {
  items?: FragmentType<typeof districtListFragment>[] | null;
}) {
  const items = getFragmentData(districtListFragment, props.items);
  if (items?.length)
    return (
      <PageSection title="Districts" noMargins>
        <ul>
          {items.map((district) => (
            <DistrictCard key={district.id} district={district} />
          ))}
        </ul>
      </PageSection>
    );
}
