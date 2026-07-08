'use client';

import { useFeedbackUrl } from '@/hooks/useFeedbackUrl';
import Link from 'next/link';

export function FeedbackLink(props: { children: React.ReactNode }) {
  const url = useFeedbackUrl();

  return (
    <Link target="_blank" referrerPolicy="no-referrer" href={url}>
      {props.children}
    </Link>
  );
}
