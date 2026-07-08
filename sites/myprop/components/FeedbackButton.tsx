'use client';
import { useFeedbackUrl } from '@/hooks/useFeedbackUrl';
import Link from 'next/link';

export function FeedbackButton() {
  const url = useFeedbackUrl();

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary hover:bg-primary-dark fixed right-4 bottom-4 rounded px-4 py-2 text-white shadow-lg transition-colors print:hidden"
    >
      Give Feedback
    </Link>
  );
}
