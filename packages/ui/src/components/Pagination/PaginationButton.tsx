'use client';

import { useEffect, useState } from 'react';
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
  const [href, setHref] = useState(`page=${page}`);

  useEffect(() => {
    if (window) {
      setHref(
        `${window.location.search ? window.location.search.replace(/([?&])page=[^&]*(&|$)/, '$1') : '?'}${window.location.search.includes('?') ? '&' : ''}page=${page}`,
      );
    }
  }, []);

  return (
    <Button
      as={as}
      square
      color={active ? 'black' : 'transparent'}
      href={href}
      underline
      shadow={false}
    >
      {page}
    </Button>
  );
}
