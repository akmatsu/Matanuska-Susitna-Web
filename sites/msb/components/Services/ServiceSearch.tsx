'use client';

import React from 'react';
import { Search } from '@trussworks/react-uswds';
import { useRouter } from 'next/navigation';
import { ServiceSearchProps } from './types';

export function ServiceSearch({ search = '', className }: ServiceSearchProps) {
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
      <Search
        onSubmit={handleSearch}
        size="small"
        placeholder="Search services..."
        defaultValue={search || ''}
      />
    </div>
  );
}
