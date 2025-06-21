import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const AddressFields = gql(`
  fragment AddressFields on Location {
    title
    lineOne
    lineTwo
    city
    state
    zip
  }
`);

export function PageAddress(props: {
  address?: FragmentType<typeof AddressFields> | null;
}) {
  const address = getFragmentData(AddressFields, props.address);

  if (address) {
    return (
      <PageSection title="Address">
        <div className="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle as="h4">{address.title}</CardTitle>
            </CardHeader>
            <CardBody>
              <p>{address.lineOne},</p>
              {address.lineTwo && <p>{address.lineTwo}</p>}
              <p>
                {address.city}, {address.state}, {address.zip}
              </p>
            </CardBody>
          </Card>
        </div>
      </PageSection>
    );
  }
}
