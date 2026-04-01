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
      <div className="mx-auto max-w-4xl p-6">{children}</div>
    </main>
  );
}
