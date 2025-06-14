import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui/Card';
import { PageSection } from './PageSection';
import { OrgUnitFieldsFragment } from '@msb/js-sdk/graphql';

export function PageParentOrgUnit(props: {
  item?: OrgUnitFieldsFragment | null;
}) {
  if (props.item) {
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
