import { toTitleCase } from '@/utils/stringHelpers';
import { Card, CardBody } from '@matsugov/ui/Card';
import { PageSection } from './PageSection';
import { PageMerged } from '@msb/js-sdk/types';

export function PageHours(props: { hours?: PageMerged['hours'] | null }) {
  if (!!props.hours?.length)
    return (
      <PageSection title="Hours">
        <div className="flex flex-col gap-4">
          <Card>
            <CardBody>
              <div className="flex flex-col gap-2">
                {props.hours.map((hour) => (
                  <div key={hour.day}>
                    <p className="font-bold">
                      {toTitleCase(hour.day!.replace(/-/g, ' '))}
                    </p>
                    <p className="text-sm">
                      {hour.open} - {hour.close}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </PageSection>
    );
}
