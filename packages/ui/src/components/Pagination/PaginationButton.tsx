'use client';

import { Button } from '../Button';
export function PaginationButton({
  page,
  currentPage,
  as = 'a',
}: {
  page: number | string;
  currentPage: number | string;
  as?: React.ElementType;
}) {
  const active = page == currentPage;

  return (
    <Button
      as={as}
      square
      color={active ? 'black' : 'transparent'}
      href={`${window.location.search ? window.location.search.replace(/([?&])page=[^&]*(&|$)/, '$1') : '?'}${window.location.search.includes('?') ? '&' : ''}page=${page}`}
      underline
      shadow={false}
    >
      {page}
    </Button>
  );
}
