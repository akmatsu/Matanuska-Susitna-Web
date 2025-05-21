'use client';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import clsx from 'clsx';
import { filterAndZoom, initializeMap } from './utils';

export function Map({
  layerId = 'cc6808c179cc4f3ba282814afdc3882c',
  layerUrl = 'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_Communities/FeatureServer',
  layerOpacity = 1,
  tileLayerUrl = 'https://tiles.arcgis.com/tiles/fX5IGselyy1TirdY/arcgis/rest/services/MSB_Streets_standard/VectorTileServer',
  itemId,
  itemKey,
  layerFillColor,
  layerOutlineColor,
  layerOutlineWidth,
  animate,
}: {
  layerId?: string;
  layerUrl?: string;
  layerOpacity?: number | string;
  layerFillColor?: string | [number, number, number, number];
  layerOutlineColor?: string | [number, number, number, number];
  layerOutlineWidth?: string | number;
  tileLayerUrl?: string;
  itemId?: string;
  itemKey?: string;
  animate?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const viewRef = useRef<__esri.MapView | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      initializeMap(
        {
          root,
          view: viewRef,
          layerFillColor,
          layerOutlineColor,
          layerOutlineWidth,
          layerUrl,
          layerId,
          tileLayerUrl,
          layerOpacity,
        },
        () => setInitialized(true),
      );
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, [tileLayerUrl, layerUrl, layerId]);

  useEffect(() => {
    if (itemId && itemKey && viewRef.current && initialized) {
      filterAndZoom({
        view: viewRef.current,
        layerId,
        itemId,
        itemKey,
        animate,
      });
    }
  }, [itemId, itemKey, layerOpacity, initialized]);

  return (
    <>
      <div
        className={clsx('w-full h-full', {
          hidden: isPending,
        })}
        ref={root}
      ></div>
      {isPending && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="icon-[mdi--loading] animate-spin" />
        </div>
      )}
    </>
  );
}
