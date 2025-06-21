'use client';
import { LinkButton } from '@/components/static/LinkButton';
import { useQuery } from '@msb/js-sdk/apollo';
import { gql } from '@msb/js-sdk/gql';
import { useParams } from 'next/navigation';

const getServicePrimaryAction = gql(`
  query GetServicePrimaryAction($slug: String!) {
    service(where: { slug: $slug }) {
      primaryAction {
        label
        url {
          url
        }
      }
    }
  }
`);

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
  const { data, loading } = useQuery(getServicePrimaryAction, {
    variables: {
      slug: params.serviceSlug as string,
    },
  });

  if (!loading && data?.service?.primaryAction?.url?.url)
    return (
      <PrimaryActionButton
        {...props}
        href={data.service.primaryAction.url.url}
      />
    );
}
