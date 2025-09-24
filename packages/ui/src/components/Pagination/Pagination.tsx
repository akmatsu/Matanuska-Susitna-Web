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
  let currentRange: number[] = [];

  if (!showOverflow) {
    currentRange = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 2) {
      currentRange = [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      currentRange = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      currentRange = [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  return (
    <nav aria-label="Pagination">
      <ul className="flex gap-2 justify-center items-center">
        {/* Previous Arrow */}
        <PaginationButton
          page={currentPage - 1}
          currentPage={currentPage}
          as={linkAs}
          onClick={onLinkClick}
          disabled={currentPage <= 1}
          aria-label="Previous"
        >
          <span aria-hidden="true" className="icon-[mdi--arrow-left]"></span>
        </PaginationButton>

        {showOverflow && currentRange[0] > 1 && (
          <>
            <PaginationButton
              page={1}
              currentPage={currentPage}
              as={linkAs}
              onClick={onLinkClick}
            />
            <li>
              <div className="flex items-end justify-center size-9">
                <span>...</span>
              </div>
            </li>
          </>
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

        {showOverflow && currentRange[currentRange.length - 1] < totalPages && (
          <>
            <li>
              <div className="flex items-end justify-center size-9">
                <span>...</span>
              </div>
            </li>
            <PaginationButton
              page={totalPages}
              currentPage={currentPage}
              as={linkAs}
              onClick={onLinkClick}
            />
          </>
        )}

        {/* Next Arrow */}
        <PaginationButton
          page={currentPage + 1}
          currentPage={currentPage}
          as={linkAs}
          onClick={onLinkClick}
          disabled={currentPage >= totalPages}
          aria-label="Next"
        >
          <span aria-hidden="true" className="icon-[mdi--arrow-right]"></span>
        </PaginationButton>
      </ul>
    </nav>
  );
}
