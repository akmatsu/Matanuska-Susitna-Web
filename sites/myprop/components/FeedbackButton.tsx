'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function FeedbackButton() {
  const pathname = usePathname();

  return (
    <Link
      href={`https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=uGgMhwxYG0uifqRGI-N5FgzebRJZ5WZMtW5SSvPgm_BUQUFKMUk2TlQ2WUQ1Vk5NRzg1SzJTMkFIQS4u&r8ed963fecbec4e548b4b39b838a5e5e2=${encodeURIComponent('https://main.d33k8nn71c973y.amplifyapp.com' + pathname)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary hover:bg-primary-dark fixed right-4 bottom-4 rounded px-4 py-2 text-white shadow-lg transition-colors"
    >
      Give Feedback
    </Link>
  );
}
