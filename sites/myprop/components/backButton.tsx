'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function BackButton() {
  const searchParams = useSearchParams();

  return (
    <Link
      href={searchParams.get('returnTo') || '/'}
      className="before:icon-[mdi--arrow-left] p-2 text-lg before:mr-1 before:-mb-0.5 hover:underline sm:text-[1rem]"
    >
      Back
    </Link>
  );
}
