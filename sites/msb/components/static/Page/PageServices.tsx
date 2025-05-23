import { LinkCardGrid } from '@/components/static/LinkCardGrid';
import { LinkButton } from '@/components/static/LinkButton';
import { PageSection } from './PageSection';
import { Service } from '@msb/js-sdk/graphql';
import QueryString from 'qs';

export function PageServices(props: {
  services?: (Service | undefined | null)[] | null;
  filters?: { [key: string]: (string | undefined | null)[] } | null;
}) {
  if (props.services && props.services.length > 0) {
    return (
      <PageSection title="Services">
        <LinkCardGrid items={props.services.slice(0, 4)} listKey="services" />
        {props.services.length > 4 && (
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
