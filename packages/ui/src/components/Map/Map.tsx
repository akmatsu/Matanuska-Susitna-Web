'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import type MapView from '@arcgis/core/views/MapView';
import type FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import clsx from 'clsx';

const isBrowser = () => typeof window !== 'undefined';
const hasResiveObserver = () => isBrowser() && 'ResizeObserver' in window;

async function ensureResizeObserver() {
  if (isBrowser() && !hasResiveObserver()) {
    const { default: ResizeObserver } = await import(
      'resize-observer-polyfill'
    );

    window.ResizeObserver = ResizeObserver;
  }
}

export function Map({
  layerId = 'cc6808c179cc4f3ba282814afdc3882c',
  layerUrl = 'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_Communities/FeatureServer',
  layerOpacity = 1,
  tileLayerUrl = 'https://tiles.arcgis.com/tiles/fX5IGselyy1TirdY/arcgis/rest/services/MSB_Streets_standard/VectorTileServer',
  itemId,
  itemKey,
}: {
  layerId?: string;
  layerUrl?: string;
  layerOpacity?: number | string;
  tileLayerUrl?: string;
  itemId?: string;
  itemKey?: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let view: MapView;

    startTransition(async () => {
      if (!mapRef.current) return;

      await ensureResizeObserver();

      const [
        { default: GISMap },
        { default: MapView },
        { default: FeatureLayer },
        { default: VectorTileLayer },
      ] = await Promise.all([
        import('@arcgis/core/Map'),
        import('@arcgis/core/views/MapView'),
        import('@arcgis/core/layers/FeatureLayer'),
        import('@arcgis/core/layers/VectorTileLayer'),
      ]);

      const map = new GISMap();

      view = new MapView({
        container: mapRef.current,
        map: map,
      });

      const layer = new FeatureLayer({
        url: layerUrl,
        id: layerId,
        opacity: Number(layerOpacity),
      });

      const tileLayer = new VectorTileLayer({
        url: tileLayerUrl,
      });

      map.add(tileLayer);
      map.add(layer);

      viewRef.current = view;
      setInitialized(true);
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [tileLayerUrl, layerUrl, layerId]);

  useEffect(() => {
    if (itemId && initialized) {
      filterDistrict();
    }
  }, [itemId, itemKey, layerOpacity, initialized]);

  async function filterDistrict() {
    const map = viewRef.current?.map;
    const view = viewRef.current;
    const layer = map?.findLayerById(layerId) as FeatureLayer;

    if (layer && itemId) {
      const isNumeric = !isNaN(Number(itemId));
      const formattedValue = isNumeric ? itemId : `'${itemId}'`;

      layer.definitionExpression =
        itemId === 'all' ? '' : `${itemKey} = ${formattedValue}`;

      if (itemId !== 'all' && itemKey) {
        const query = layer.createQuery();

        query.where = `${itemKey} = ${formattedValue}`;
        query.returnGeometry = true;

        const response = await layer.queryFeatures(query);

        if (response.features.length) {
          const geometry = response.features[0].geometry;

          if (view && geometry) {
            view
              .goTo(geometry)
              .catch((error) =>
                console.error('Error zooming to geometry', error),
              );
          }
        }
      }
    }
  }

  return (
    <>
      <div
        className={clsx('w-full h-full', {
          hidden: isPending,
        })}
        ref={mapRef}
      ></div>
      {isPending && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="iconify mdi--loading animate-spin" />
        </div>
      )}
    </>
  );
}
