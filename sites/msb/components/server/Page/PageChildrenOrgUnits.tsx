import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { PageListItem } from '@msb/js-sdk';
import { PageSection } from './PageSection';

export function PageChildrenOrgUnits(props: { items?: PageListItem[] | null }) {
  if (!!props.items?.length)
    return (
      <PageSection title="Division">
        <ul className="flex flex-col gap-2">
          {props.items.map((child) => (
            <LinkCard href={`/departments/${child.slug}`}>
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
