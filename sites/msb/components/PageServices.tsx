import { Service } from '@msb/js-sdk';
import { LinkCardGrid } from './LinkCardGrid';
import { LinkButton } from './LinkButton';
import QueryString from 'qs';

export function PageServices(props: {
  services?: Service[] | null;
  filters?: { [key: string]: string[] };
}) {
  if (props.services && props.services.length > 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4">Services</h2>
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
      </section>
    );
  }
}
