'use client';
import { Search } from '@trussworks/react-uswds';
import React, { HTMLAttributes } from 'react';

export type ServiceSearchProps = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};

export function ServiceSearch(props: ServiceSearchProps) {
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('search');
  }

  return (
    <div className={`display-flex flex-column ${props.className}`}>
      <h3>Search</h3>
      <Search
        onSubmit={handleSearch}
        size="small"
        placeholder="Search services..."
      />
    </div>
  );
}
