'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchListInputProps } from './types';
import { Search } from '@matsugov/ui';

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
      <h3 className="text-2xl font-bold mb-4">Search</h3>
      <Search
        placeholder="Search services..."
        useIcon
        onSubmit={handleSearch}
        defaultValue={search || ''}
      />
    </div>
  );
}
