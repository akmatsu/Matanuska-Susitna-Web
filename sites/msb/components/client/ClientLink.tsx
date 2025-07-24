'use client';
import { checkLinkProps, NextLinkProps } from '@/utils/linkPropsChecker';
import NextLink from 'next/link';
import React from 'react';

export function ClientLink({
  href,
  target,
  className,
  referrerPolicy,
  hideExternalIcon,
  ...props
}: NextLinkProps & {
  hideExternalIcon?: boolean; // Optional prop to hide the external link icon
}) {
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
