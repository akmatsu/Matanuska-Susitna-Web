import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-6 prose prose-a:not-prose">
      <h1>Matanuska-Susitna Web Widgets</h1>
      <ul>
        <li>
          <Link href="/map" target="_parent">
            Map Widget
          </Link>
        </li>

        <li>
          <Link href="/document-collection" target="_parent">
            Document Collection Widget
          </Link>
        </li>
      </ul>
    </div>
  );
}
