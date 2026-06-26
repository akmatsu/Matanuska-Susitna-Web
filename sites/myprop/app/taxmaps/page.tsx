import { SearchField } from '@/components/SearchField';
import { TaxMapMap } from './components/Taxmap/TaxmapMap';
import { TaxMapTable } from './components/TaxMapTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MSB Tax Map PDF / DXF Downloads',
  description:
    'View and download tax maps in PDF or DXF format for the Matanuska-Susitna Borough.',
};

export default function TaxMapsPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-center text-xl font-bold">
          MSB Tax Map PDF / DXF Downloads
        </h1>
        <div className="flex flex-col items-start md:flex-row print:flex-row">
          <TaxMapMap />
          <SearchField />
        </div>
        <TaxMapTable />
      </div>
    </main>
  );
}
