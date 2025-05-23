import { Pagination } from '@matsugov/ui';
import Link from 'next/link';
import { PaginationProps, usePagination } from 'react-instantsearch';

export function CoreSearchPagination(props: PaginationProps) {
  const { currentRefinement, nbPages, refine } = usePagination(props);

  function handleLinkCLick(page: string | number) {
    refine((typeof page === 'number' ? page : parseInt(page)) - 1);
  }

  return (
    <Pagination
      currentPage={currentRefinement + 1}
      totalPages={nbPages}
      linkAs={Link}
      onLinkClick={handleLinkCLick}
    />
  );
}
