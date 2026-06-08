import { LinkButton } from '@/components/static/LinkButton';
import { PageSection } from './PageSection';
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
  const query = props.filters?.query?.find((value) => Boolean(value))?.trim();
  const params = new URLSearchParams();
  params.set('type', 'service');
  if (query) {
    params.set('query', query);
  }

  if (services?.length) {
    return (
      <PageSection title="Services">
        <ul className="grid grid-cols-2 gap-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard service={service} key={service.id} as="li" />
          ))}
        </ul>
        {services.length > 4 && (
          <div className="flex items-center justify-center">
            <LinkButton
              href={`/search?${params.toString()}`}
              className="mt-4"
              size="lg"
              color="primary"
            >
              View all
            </LinkButton>
          </div>
        )}
      </PageSection>
    );
  }
}
