import { Suspense } from 'react';
import { SearchField } from './SearchField';

export default function SearchableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Suspense
        fallback={
          <div className="p-6 text-center">Loading search field...</div>
        }
      >
        <SearchField />
      </Suspense>
      {children}
    </main>
  );
}
