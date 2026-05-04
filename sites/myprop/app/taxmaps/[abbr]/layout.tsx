import { PageTitle } from '@/components/PageTitle';
import Link from 'next/link';

export default function TaxmapPageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link
              href="/taxmaps"
              className="before:icon-[mdi--arrow-left] before:mr-1 before:-mb-0.5 hover:underline"
            >
              Back
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <PageTitle title="TaxMap Downloads" />
        {props.children}
      </main>
    </>
  );
}
