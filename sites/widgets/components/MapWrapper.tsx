'use client';
import { Map } from '@matsugov/ui/map';
import { ComponentProps, useEffect } from 'react';

export function MapWrapper(props: ComponentProps<typeof Map>) {
  useEffect(() => {
    console.log('ran');
    console.log(props.layerFillColor);
    console.log(props.layerOutlineColor);
    console.log(props.layerOutlineWidth);
  }, [props.layerFillColor, props.layerOutlineColor, props.layerOutlineWidth]);
  return <Map {...props} />;
}
