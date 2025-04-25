import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { PageListItem } from '@msb/js-sdk';
import { PageSection } from './PageSection';

export function PageParentOrgUnit(props: { item?: PageListItem }) {
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
