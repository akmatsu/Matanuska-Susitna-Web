import { BreadcrumbProps } from './type';

export function Breadcrumb({ LinkComponent = 'a', ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumbs" className="@container">
      <ol className="list-none truncate p-2 -mx-1 block">
        {props.items.map(
          (item) => (
            // index !== props.items.length - 1 ? (
            <li
              className="inline-flex sr-only @mobile-lg:not-sr-only @mobile-lg:whitespace-nowrap"
              key={crypto.randomUUID()}
            >
              {/* <LinkComponent href={item.url}>{item.label}</LinkComponent> */}
              <a href={item.url}>{item.label}</a>
              <span aria-hidden="true" className="inline">
                <span className="icon-[material-symbols--chevron-right] align-middle text-gray-50 size-4"></span>
              </span>
            </li>
          ),
          // ) : (
          //   <li className="inline-flex"></li>
          // ),
        )}
      </ol>
    </nav>
  );
}
