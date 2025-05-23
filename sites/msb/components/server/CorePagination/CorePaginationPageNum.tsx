import Link from 'next/link';

export function CorePaginationPageNum(props: {
  page: string | number;
  currentPage: string | number;
}) {
  const active = props.page == props.currentPage;
  return (
    <li className="usa-pagination__item usa-pagination__page-no">
      <Link
        className={`usa-pagination__button ${active ? 'usa-current' : ''}`}
        aria-label={`Page ${props.page}`}
        href={`?page=${props.page}`}
      >
        {props.page}
      </Link>
    </li>
  );
}
