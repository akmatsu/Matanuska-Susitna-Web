import { SearchField } from './SearchField';

export default function SearchableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SearchField />
      <div className="mx-auto max-w-4xl p-6">{children}</div>
    </main>
  );
}
