'use cache';

import { propertyApiCall } from '@/utils/apiHelpers';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

type SubMap = { map: string };

export async function TaxMapDetails(props: PageProps<'/taxmaps/[abbr]'>) {
  cacheLife('weeks');
  const { abbr } = await props.params;
  const data = await propertyApiCall<SubMap[]>(`/taxmapinset`, { abbr });

  return (
    <div className="flex flex-col items-center gap-1 md:grid md:grid-cols-2 md:items-start">
      <div className="relative aspect-469/431 w-full max-w-100">
        <Image
          src={`https://myproperty.matsugov.us/taxmaps/images/${abbr}index.jpg`}
          alt={`TaxMap index for ${abbr} including insets ${data.map((sub) => sub.map).join(', ')}`}
          fill
        />
      </div>
      <ul className="w-full space-y-1">
        {data.map((subMap) => (
          <li
            key={subMap.map}
            className="bg-surface grid gap-0.5 md:grid-cols-3"
          >
            <p className="text-center">Map #{subMap.map}</p>
            <Link
              href={`https://matsugov.us/taxmaps/pdf/${subMap.map.toUpperCase()}.pdf`}
              className="bg-primary flex items-center justify-center gap-2 px-2 py-1 text-center text-white no-underline"
            >
              <span className="icon-[gravity-ui--logo-acrobat]"></span>
              Download PDF
            </Link>
            <Link
              href={`https://matsugov.us/taxmaps/dxf/${data[0].map.toUpperCase()}.dxf`}
              className="bg-primary flex items-center justify-center gap-2 px-2 py-1 text-center text-white no-underline"
            >
              <span className="icon-[mdi--download]"></span>
              Download DXF
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
