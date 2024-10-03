import { Icon } from '@trussworks/react-uswds';
import Link from 'next/link';

export function CorePaginationItem(props: {
  text: 'Previous' | 'Next';
  currentPage: number | string;
}) {
  const page =
    (typeof props.currentPage === 'string'
      ? parseInt(props.currentPage)
      : props.currentPage) + (props.text === 'Next' ? 1 : -1);

  return (
    <li
      className="usa-pagination__item usa-pagination__arrow"
      aria-label={props.text + 'page'}
    >
      <Link
        href={`?page=${page}`}
        className={`usa-pagination__link ${props.text === 'Previous' ? 'usa-pagination__previous-page' : 'usa-pagination__next-page'}`}
      >
        {props.text === 'Previous' && <Icon.NavigateBefore />}
        <span className="usa-pagination__link-text">{props.text}</span>
        {props.text === 'Next' && <Icon.NavigateNext />}
      </Link>
    </li>
  );
}
