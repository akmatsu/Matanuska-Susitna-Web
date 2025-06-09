import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui/Card';
import { PageSection } from './PageSection';
import { PageMerged } from '@msb/js-sdk/types';

export function PageChildrenOrgUnits(props: {
  items?: PageMerged['children'] | null;
}) {
  if (props.items?.length)
    return (
      <PageSection title="Division">
        <ul className="flex flex-col gap-2">
          {props.items.map((child) => (
            <LinkCard href={`/departments/${child.slug}`} key={child.id}>
              <CardHeader>
                <CardTitle>{child.title}</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="truncate">{child.description}</p>
              </CardBody>
            </LinkCard>
          ))}
        </ul>
      </PageSection>
    );
}
