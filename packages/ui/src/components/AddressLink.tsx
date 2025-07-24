'use client';

import { ComponentProps, ElementType } from 'react';

export function AddressLink<T extends ElementType = 'a'>(
  props: Omit<ComponentProps<T>, 'href' | 'children'> & {
    address: string;
    as?: T;
    children?: React.ReactNode;
  },
) {
  const encoded = encodeURIComponent(props.address);
  const userAgent = navigator.userAgent;
  const LinkAs = props.as || 'a';

  const isApple = /iPad|iPhone|iPod|Macintosh|Mac OS|MacIntel/gi.test(
    userAgent,
  );

  const url = !isApple
    ? `https://maps.apple.com/?q=${encoded}`
    : `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  return <LinkAs href={url}>{props.children || props.address}</LinkAs>;
}
