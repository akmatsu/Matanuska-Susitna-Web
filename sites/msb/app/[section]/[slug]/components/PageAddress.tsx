import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui';
import { Address } from '@msb/js-sdk';
import { PageSection } from './PageSection';

export function PageAddress(props: { address?: Address | null }) {
  if (!!props.address) {
    return (
      <PageSection title="Address">
        <div className="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle as="h4">{props.address.title}</CardTitle>
            </CardHeader>
            <CardBody>
              <p>{props.address.lineOne},</p>
              {props.address.lineTwo && <p>{props.address.lineTwo}</p>}
              <p>
                {props.address.city}, {props.address.state}, {props.address.zip}
              </p>
            </CardBody>
          </Card>
        </div>
      </PageSection>
    );
  }
}
