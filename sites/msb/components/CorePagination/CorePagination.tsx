import { CorePaginationPageNum } from './CorePaginationPageNum';

export type CorePagination = {
  currentPage?: number;
  totalPages?: number;
};

export function CorePagination({
  currentPage = 1,
  totalPages = 1,
}: CorePagination) {
  const maxSlots = 3;
  const showOverflow = totalPages > maxSlots;
  const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);
  let currentRange = pageList || [1];

  if (showOverflow) {
    const currentPageIndex = currentPage - 1;
    const sideSlots = (maxSlots - 1) / 2;
    const rangeStart =
      currentPageIndex === 0 ? currentPageIndex : currentPageIndex - sideSlots;
    const rangeEnd =
      currentPageIndex === 0
        ? currentPageIndex + sideSlots + sideSlots
        : currentPageIndex + sideSlots;
    currentRange = pageList.slice(rangeStart, rangeEnd + 1);
  }

  return (
    <nav aria-label="Pagination" className="usa-pagination">
      <ul className="usa-pagination__list">
        {currentPage >= maxSlots && showOverflow && (
          <CorePaginationPageNum page="1" currentPage={currentPage} />
        )}

        {currentPage > maxSlots && showOverflow && (
          <li className="usa-usa-pagination__item usa-usa-pagination__overflow">
            <span>...</span>
          </li>
        )}

        {currentRange.map((page) => (
          <CorePaginationPageNum
            key={page}
            page={page}
            currentPage={currentPage}
          />
        ))}

        {currentPage < totalPages - 2 && showOverflow && (
          <li className="usa-usa-pagination__item usa-usa-pagination__overflow">
            <span>...</span>
          </li>
        )}

        {currentPage < totalPages - 1 && showOverflow && (
          <CorePaginationPageNum page={totalPages} currentPage={currentPage} />
        )}
      </ul>
    </nav>
  );
}
