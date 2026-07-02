'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function FeedbackButton() {
  const pathname = usePathname();

  return (
    <Link
      href={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=https://myproperty.matsu.gov${pathname}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary hover:bg-primary-dark fixed right-4 bottom-4 rounded px-4 py-2 text-white shadow-lg transition-colors print:hidden"
    >
      Give Feedback
    </Link>
  );
}
