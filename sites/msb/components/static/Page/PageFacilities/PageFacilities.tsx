import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageSection } from '../PageSection';
import { FacilityCard } from './PageFacilityCard';

const facilitiesListFragment = gql(`
  fragment FacilitiesList on Facility {
    id
    ...FacilityCard
  }
`);

export function PageFacilities({
  title = 'Facilities',
  ...props
}: {
  title?: string;
  facilities?: FragmentType<typeof facilitiesListFragment>[] | null;
}) {
  const facilities = getFragmentData(facilitiesListFragment, props.facilities);

  if (!facilities || facilities.length === 0) {
    return null;
  }

  return (
    <PageSection title={title} noMargins>
      <ul>
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </ul>
    </PageSection>
  );
}
