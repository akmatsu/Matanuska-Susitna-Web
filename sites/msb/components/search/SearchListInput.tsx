'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { SearchListInputProps } from './types';

export function SearchListInput({
  search = '',
  className,
}: SearchListInputProps) {
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement | null;
    router.push(`?search=${input?.value || ''}`);
  }

  return (
    <div className={`display-flex flex-column ${className}`}>
      <h3>Search</h3>
      {/* <Search
        onSubmit={handleSearch}
        size="small"
        placeholder="Search services..."
        defaultValue={search || ''}
      /> */}
    </div>
  );
}
