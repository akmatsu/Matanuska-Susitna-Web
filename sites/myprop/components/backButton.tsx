'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export function BackButton() {
  const searchParams = useSearchParams();

  return (
    <Link
      href={searchParams.get('returnTo') || '/'}
      className="before:icon-[mdi--arrow-left] before:mr-1 before:-mb-0.5 hover:underline"
    >
      Back
    </Link>
  );
}
