import Link from 'next/link';

export default function RootPage() {
  return (
    <>
      <p className="inline-block w-full text-center">
        Looking for DXF & PDF TaxMaps?{' '}
        <Link href="/taxmaps">Search Tax Maps</Link>
      </p>
    </>
  );
}
