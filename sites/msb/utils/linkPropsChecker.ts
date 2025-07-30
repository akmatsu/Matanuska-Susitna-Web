import clsx from 'clsx';
import Link from 'next/link';
import { ComponentProps } from 'react';

export type NextLinkProps = ComponentProps<typeof Link>;

export function checkLinkProps(props: {
  href: NextLinkProps['href'];
  target?: NextLinkProps['target'];
  referrerPolicy?: NextLinkProps['referrerPolicy'];
  hideExternalIcon?: boolean;
  className?: string;
}) {
  const isExternal = props.href.toString().startsWith('http');
  const target = props.target
    ? props.target
    : isExternal
      ? '_blank'
      : undefined;
  const referrerPolicy = props.referrerPolicy
    ? props.referrerPolicy
    : isExternal
      ? 'no-referrer'
      : undefined;

  return {
    isExternal,
    target,
    referrerPolicy,
    className: linkClasses({
      isExternal,
      hideExternalIcon: props.hideExternalIcon,
      className: props.className,
    }),
  };
}

export function linkClasses({
  isExternal,
  hideExternalIcon,
  className,
}: {
  isExternal: boolean;
  hideExternalIcon?: boolean;
  className?: string;
}) {
  return clsx(
    {
      'after:icon-[mdi--external-link] after:ml-1 after:-mb-0.5':
        isExternal && !hideExternalIcon,
    },
    className,
  );
}
