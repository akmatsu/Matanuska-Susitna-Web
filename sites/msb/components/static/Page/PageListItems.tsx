import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui/Card';
import type { PageListItem } from '@msb/js-sdk';
import { PageSection } from './PageSection';

export function PageListItems(props: {
  items?: PageListItem[] | null;
  title: string;
}) {
  if (!!props.items?.length) {
    return (
      <PageSection title={props.title}>
        <ul>
          {props.items.map((fac) => (
            <LinkCard
              as="li"
              key={fac.slug}
              className="my-2"
              href={`/${props.title.toLowerCase().replace(/\s/gi, '-')}/${fac.slug}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <CardHeader>
                    <CardTitle>{fac.title}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="truncate">{fac.description}</p>
                  </CardBody>
                </div>
              </div>
            </LinkCard>
          ))}
        </ul>
      </PageSection>
    );
  }
}
