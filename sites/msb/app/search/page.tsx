import { InstantSearch } from './components/InstantSearch';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <InstantSearch />
    </div>
  );
}
