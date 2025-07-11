import { clsx } from 'clsx';
import NextLink from 'next/link';
import React from 'react';

type NextLinkProps = React.ComponentProps<typeof NextLink>;

export function Link({
  href,
  target,
  className,
  referrerPolicy,
  hideExternalIcon,
  ...props
}: NextLinkProps & {
  hideExternalIcon?: boolean; // Optional prop to hide the external link icon
}) {
  const isExternal = href.toString().startsWith('http');
  const linkTarget = target ? target : isExternal ? '_blank' : undefined;
  const linkReferrerPolicy = referrerPolicy
    ? referrerPolicy
    : isExternal
      ? 'no-referrer'
      : undefined;

  return (
    <NextLink
      href={href}
      target={linkTarget}
      referrerPolicy={linkReferrerPolicy}
      className={clsx(
        {
          'after:icon-[mdi--external-link] after:ml-1 after:-mb-0.5':
            isExternal && !hideExternalIcon,
        },
        className,
      )}
      {...props}
    ></NextLink>
  );
}
