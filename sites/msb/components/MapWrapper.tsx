'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const Map = dynamic(() => import('@matsugov/ui/map').then((mod) => mod.Map), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export function MapWrapper(props: ComponentProps<typeof Map>) {
  return <Map {...props}></Map>;
}
