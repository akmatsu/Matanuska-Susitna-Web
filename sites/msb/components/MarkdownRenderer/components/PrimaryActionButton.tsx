'use client';
import { GET_SERVICE_QUERY } from '@/utils/apollo/queries/GetService';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function PrimaryActionButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const isLinkExternal = href.startsWith('http');

  return (
    <Link
      className={`usa-button ${isLinkExternal ? 'usa-link--external' : ''}`}
      target={isLinkExternal ? '_blank' : undefined}
      referrerPolicy="no-referrer"
      href={href}
    >
      {label}
    </Link>
  );
}

export function ActionButtonWrapper(props: { label: string }) {
  const params = useParams();
  const { data, loading } = useQuery(GET_SERVICE_QUERY, {
    variables: {
      where: { slug: params.slug as string },
    },
  });

  if (!loading && data)
    return (
      <PrimaryActionButton {...props} href={data.service.actionUrl || ''} />
    );
}
