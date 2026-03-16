'use client';
import React, { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import Link from 'next/link';

export function PaginationButton({
  page,
  currentPage,
  onClick,
  disabled = false,
  children,
  size,
}: {
  page: number | string;
  currentPage: number | string;
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
      square
      color={active ? 'black' : 'transparent'}
      underline
      shadow={false}
      onClick={handleClick}
      disabled={disabled}
      size={size}
      asChild
    >
      <Link href={href}>{children ?? page}</Link>
    </Button>
  );
}
