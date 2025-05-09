import type { Service } from '@msb/js-sdk';
import { LinkCardGrid } from '../../../../components/LinkCardGrid';
import { LinkButton } from '../../../../components/LinkButton';
import QueryString from 'qs';
import { PageSection } from './PageSection';

export function PageServices(props: {
  services?: Service[] | null;
  filters?: { [key: string]: string[] };
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
