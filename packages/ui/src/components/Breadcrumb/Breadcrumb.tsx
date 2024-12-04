import { BreadcrumbProps } from './type';

export function Breadcrumb({ LinkComponent = 'a', ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumbs" className="@container">
      <ol className="list-none truncate p-2 -mx-1 block">
        {props.items.map((item, index) => {
          if (index < props.items.length - 2) {
            return (
              <li
                className="inline-flex sr-only @mobile-lg:not-sr-only @mobile-lg:whitespace-nowrap"
                key={crypto.randomUUID()}
              >
                <LinkComponent href={item.url}>{item.label}</LinkComponent>

                <span aria-hidden="true" className="inline">
                  <span className="icon-[material-symbols--chevron-right] align-middle text-gray-50 size-4"></span>
                </span>
              </li>
            );
          }

          if (index === props.items.length - 2) {
            return (
              <li className="inline-flex" key={crypto.randomUUID()}>
                <span aria-hidden="true" className="@mobile-lg:hidden">
                  <span className="icon-[material-symbols--arrow-back] align-middle text-gray-50 size-4"></span>
                </span>
                <LinkComponent
                  href={item.url}
                  className="text-blue-60v visited:text-violet-70v hover:text-blue-70v focus:outline focus:outline-4 focus:outline-blue-40v underline"
                >
                  <span>{item.label}</span>
                </LinkComponent>
                <span aria-hidden="true" className="hidden @mobile-lg:inline">
                  <span className="icon-[material-symbols--chevron-right] align-middle text-gray-50 size-4"></span>
                </span>
              </li>
            );
          }

          return (
            <li
              className="inline sr-only @mobile-lg:not-sr-only"
              key={crypto.randomUUID()}
            >
              <span role="link" aria-disabled="true" aria-current="page">
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
