'use client';

import { checkLinkProps, NextLinkProps } from '@/utils/linkPropsChecker';
import NextLink from 'next/link';
import React from 'react';

export function ClientLink({
  href,
  target,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className,
  referrerPolicy,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hideExternalIcon,
  ...props
}: NextLinkProps & {
  hideExternalIcon?: boolean; // Optional prop to hide the external link icon
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isExternal, ...rest } = checkLinkProps({
    href,
    target,
    referrerPolicy,
  });

  const allProps = {
    ...rest,
    ...props,
  };

  return <NextLink href={href} {...allProps}></NextLink>;
}
