import { SearchField } from '@/components/SearchField';
import { TaxMapMap } from './components/Taxmap/TaxmapMap';
import { TaxMapTable } from './components/TaxMapTable';

export default function TaxMapsPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-center text-xl font-bold">
          MSB Tax Map Viewer / DXF Downloads
        </h1>
        <div className="flex flex-col items-start md:flex-row">
          <TaxMapMap />
          <SearchField />
        </div>
        <TaxMapTable />
      </div>
    </main>
  );
}
