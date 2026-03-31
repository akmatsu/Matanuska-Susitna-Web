import Link from 'next/link';

export default function RootPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <p className="inline-block w-full text-center">
        Looking for DXF & PDF TaxMaps?{' '}
        <Link href="/taxmaps">Search Tax Maps</Link>
      </p>
    </div>
  );
}
