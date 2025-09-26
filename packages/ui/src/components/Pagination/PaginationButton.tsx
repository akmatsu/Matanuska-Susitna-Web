'use client';
import React, { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
export function PaginationButton({
  page,
  currentPage,
  as = 'a',
  onClick,
  disabled = false,
  children,
  size,
}: {
  page: number | string;
  currentPage: number | string;
  as?: React.ElementType;
  onClick?: (page: string | number) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  size?: ComponentProps<typeof Button>['size'];
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
    e.preventDefault();
    if (onClick && !disabled) {
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
      disabled={disabled}
      size={size}
    >
      {children ?? page}
    </Button>
  );
}
