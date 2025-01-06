'use client';

import { useEffect, useRef } from 'react';
import GISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

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

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new GISMap();

    const view = new MapView({
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

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [tileLayerUrl, layerUrl, layerId]);

  useEffect(() => {
    if (itemId) {
      filterDistrict();
    }
  }, [itemId, itemKey, layerOpacity]);

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

  return <div className="w-full h-full" ref={mapRef}></div>;
}
