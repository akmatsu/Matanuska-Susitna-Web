import { cn } from '@matsugov/ui/lib';
import Link from 'next/link';

type TaxMap = {
  basemap_abbr: string;
  basemap_prefix: string;
  basemap_name: string;
  mapped_area: 0 | 1;
};

async function getData(): Promise<TaxMap[]> {
  const url = new URL(`${process.env.API_URL}/property/taxmapbase`);
  const res = await fetch(url.toString(), {
    headers: {
      ApiKey: process.env.API_KEY || '',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch tax maps: ' + res.status);

  return res.json();
}

export async function TaxMapTableBody() {
  const data = await getData();

  return (
    <section>
      <div className="bg-surface-primary mb-1 pb-1 text-center text-white">
        <h2 className="font-bold">Available Basemaps</h2>
        <p className="mb-1 text-sm italic">
          Items with a * denote areas outside the mapped area.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.map((map: TaxMap) => (
          <li
            key={map.basemap_abbr}
            className={cn(
              'sm:text-xs',
              map.mapped_area ? 'bg-neutral-50' : 'bg-neutral-200',
            )}
          >
            <Link href={`/taxmaps/${map.basemap_abbr}`}>
              {map.basemap_abbr} - {map.basemap_name}{' '}
              {map.mapped_area ? '' : '*'}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
