import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui/Card';
import { PageSection } from './PageSection';
import { PageMerged } from '@msb/js-sdk/types';

export function PageParentOrgUnit(props: { item?: PageMerged['parent'] }) {
  if (!!props.item) {
    return (
      <PageSection title="Parent Department">
        <LinkCard href={`/departments/${props.item.slug}`}>
          <CardHeader>
            <CardTitle>{props.item.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="truncate">{props.item.description}</p>
          </CardBody>
        </LinkCard>
      </PageSection>
    );
  }
}
