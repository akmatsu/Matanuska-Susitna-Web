'use client';

import { ComponentProps, ElementType } from 'react';

export function AddressLink<T extends ElementType = 'a'>(
  props: Omit<ComponentProps<T>, 'href' | 'children'> & {
    address: string;
    as?: T;
    children?: React.ReactNode;
  },
) {
  const address = props.address?.replace(/^,\s+/, '').trim();
  const encoded = encodeURIComponent(
    address.replace(/^assembly\s+chambers,\s+/i, ''),
  );
  const userAgent = navigator.userAgent;
  const LinkAs = props.as || 'a';

  const isApple = /iPad|iPhone|iPod|Macintosh|Mac OS|MacIntel/gi.test(
    userAgent,
  );

  const url = isApple
    ? `https://maps.apple.com/?q=${encoded}`
    : `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  return <LinkAs href={url}>{props.children || address}</LinkAs>;
}
