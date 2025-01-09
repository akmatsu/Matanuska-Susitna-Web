'use client';
import { Map } from '@matsugov/ui';
import { ComponentProps } from 'react';

export function MapWrapper(props: ComponentProps<typeof Map>) {
  return <Map {...props} />;
}
