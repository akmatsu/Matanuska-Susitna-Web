'use client';
import { LinkButton } from '@/components/LinkButton';
import { GET_SERVICE_QUERY } from '@/utils/apollo/queries/GetService';
import { useQuery } from '@apollo/client';
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
    <LinkButton
      className="not-prose"
      target={isLinkExternal ? '_blank' : undefined}
      referrerPolicy="no-referrer"
      href={href}
    >
      {label}
    </LinkButton>
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
