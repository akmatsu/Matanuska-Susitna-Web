'use client';
import { Map } from '@msb/map';
import { ComponentProps } from 'react';

export function MapWrapper(props: ComponentProps<typeof Map>) {
  return <Map {...props} />;
}
