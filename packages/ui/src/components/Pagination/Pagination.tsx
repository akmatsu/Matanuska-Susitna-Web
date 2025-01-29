import React from 'react';
import { PaginationButton } from './PaginationButton';

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  linkAs?: React.ElementType;
  onLinkClick?: (page: string | number) => void;
};

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  linkAs = 'a',
  onLinkClick,
}: PaginationProps) {
  const maxSlots = 3;
  const showOverflow = totalPages > maxSlots;
  const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);
  let currentRange = pageList || [1];

  if (showOverflow) {
    const currentPageIndex = currentPage;
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
    <nav aria-label="Pagination">
      <ul className="flex gap-2 justify-center items-center">
        {currentPage >= maxSlots && showOverflow && (
          <PaginationButton
            page="1"
            currentPage={currentPage}
            as={linkAs}
            onClick={onLinkClick}
          />
        )}

        {currentPage > maxSlots && showOverflow && (
          <li>
            <div className="flex items-end justify-center size-9">
              <span>...</span>
            </div>
          </li>
        )}

        {currentRange.map((page) => (
          <PaginationButton
            key={page}
            page={page}
            currentPage={currentPage}
            as={linkAs}
            onClick={onLinkClick}
          />
        ))}

        {currentPage < totalPages - 2 && showOverflow && (
          <li>
            <div className="flex items-end justify-center size-9">
              <span>...</span>
            </div>
          </li>
        )}

        {currentPage < totalPages - 1 && showOverflow && (
          <PaginationButton
            page={totalPages}
            currentPage={currentPage}
            as={linkAs}
            onClick={onLinkClick}
          />
        )}
      </ul>
    </nav>
  );
}
