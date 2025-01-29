'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
export function PaginationButton({
  page,
  currentPage,
  as = 'a',
  onClick,
}: {
  page: number | string;
  currentPage: number | string;
  as?: React.ElementType;
  onClick?: (page: string | number) => void;
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

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      e.preventDefault();
      onClick(page);
    }
  }

  return (
    <Button
      as={as}
      square
      color={active ? 'black' : 'transparent'}
      href={href}
      underline
      shadow={false}
      onClick={handleClick}
      disabled={active}
    >
      {page}
    </Button>
  );
}
