import { Card, CardBody } from '@matsugov/ui/Card';
import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { HourCard } from './HourCard';

const hourListFragment = gql(`
  fragment HourList on OperatingHour {
    id
    ...HourFields
  }
`);

export function PageHours(props: {
  hours?: FragmentType<typeof hourListFragment>[] | null;
}) {
  const hours = getFragmentData(hourListFragment, props.hours);
  if (hours?.length)
    return (
      <PageSection title="Hours">
        <div className="flex flex-col gap-4">
          <Card>
            <CardBody>
              <div className="flex flex-col gap-2">
                {hours.map((hour) => (
                  <HourCard hour={hour} key={hour.id} />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </PageSection>
    );
}
