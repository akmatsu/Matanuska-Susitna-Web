import { LinkButton } from '@/components/static/LinkButton';
import { PageSection } from './PageSection';
import QueryString from 'qs';
import { ServiceCard } from './ServiceCard';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const serviceListFragment = gql(`
  fragment ServiceList on Service {
    id
    ...ServiceFields
  }
`);

export function PageServices(props: {
  services?: FragmentType<typeof serviceListFragment>[] | null;
  filters?: { [key: string]: (string | undefined | null)[] } | null;
}) {
  const services = getFragmentData(serviceListFragment, props.services);
  if (services?.length) {
    return (
      <PageSection title="Services">
        <ul className="grid grid-cols-2 gap-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard service={service} key={service.id} as="li" />
          ))}
        </ul>
        {services.length > 4 && (
          <div className="flex justify-center items-center">
            <LinkButton
              href={`/search?${QueryString.stringify({ pages: { refinementList: { ...props.filters, type: ['service'] } } })}`}
              className="mt-4"
              big
            >
              View all
            </LinkButton>
          </div>
        )}
      </PageSection>
    );
  }
}
