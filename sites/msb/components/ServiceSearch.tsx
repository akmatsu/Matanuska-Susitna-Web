'use client';
import { usePageParam } from '@/hooks/usePageParam';
import { Search } from '@trussworks/react-uswds';
import { useRouter } from 'next/navigation';
import React, { HTMLAttributes } from 'react';

export type ServiceSearchProps = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};

export function ServiceSearch(props: ServiceSearchProps) {
  const router = useRouter();
  const { search } = usePageParam();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (e.target?.[0]?.value) {
      router.push(`?search=${e.target[0].value}`);
    }
  }

  return (
    <div className={`display-flex flex-column ${props.className}`}>
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
