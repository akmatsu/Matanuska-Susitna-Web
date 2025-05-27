import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui/Card';
import Image from 'next/image';
import { PageSection } from './PageSection';
import { PageMerged } from '@msb/js-sdk/types';

export function PageDistricts(props: {
  items?: PageMerged['districts'] | null;
}) {
  if (props.items?.length)
    return (
      <PageSection title="Districts">
        <ul>
          {props.items.map((district) => (
            <LinkCard
              as="li"
              key={district.slug}
              className="my-2"
              href={`/districts/${district.slug}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <CardHeader>
                    <CardTitle>{district.title}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <p>{district.description}</p>
                    </div>
                  </CardBody>
                </div>
                <div className="pr-6 relative">
                  <Image
                    src={district.photo?.file?.url || ''}
                    alt={`${district.title} assembly member photo`}
                    className="rounded-full size-20"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </LinkCard>
          ))}
        </ul>
      </PageSection>
    );
}
