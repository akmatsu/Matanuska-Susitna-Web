import { Pagination } from '@matsugov/ui/Pagination';
import { useEffect } from 'react';
import { PaginationProps, usePagination } from 'react-instantsearch';

export function CoreSearchPagination(props: PaginationProps) {
  const { currentRefinement, nbPages, refine } = usePagination(props, {
    skipSuspense: true,
  });

  function handleLinkCLick(page: string | number) {
    refine((typeof page === 'number' ? page : parseInt(page)) - 1);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentRefinement]);

  return (
    <Pagination
      currentPage={currentRefinement + 1}
      totalPages={nbPages}
      onLinkClick={handleLinkCLick}
    />
  );
}
