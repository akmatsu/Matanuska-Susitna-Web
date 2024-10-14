import { LinkCard } from '../LinkCard';
import { CardHeader, CardBody } from '@trussworks/react-uswds';

export function ServiceListItem({ service }: { service: any }) {
  return (
    <LinkCard className="margin-bottom-2" href={`/services/${service.slug}`}>
      <CardHeader className="padding-top-2">
        <h4 className="usa-card__heading margin-bottom-0">{service.title}</h4>
        <CardBody>
          <p>{service.description}</p>
        </CardBody>
      </CardHeader>
    </LinkCard>
  );
}
