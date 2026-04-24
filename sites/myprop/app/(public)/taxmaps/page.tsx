import { TaxMapMap } from './components/Taxmap/TaxmapMap';
import { TaxMapTable } from './components/TaxMapTable';

export default function TaxMapsPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-center text-xl font-bold">
          MSB Tax Map Viewer / DXF Downloads
        </h1>
        <TaxMapMap />
        <TaxMapTable />
      </div>
    </main>
  );
}
