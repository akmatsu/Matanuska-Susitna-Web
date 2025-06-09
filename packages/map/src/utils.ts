import React from 'react';

const isBrowser = () => typeof window !== 'undefined';
const hasResizeObserver = () => isBrowser() && 'ResizeObserver' in window;

async function ensureResizeObserver() {
  if (isBrowser() && !hasResizeObserver()) {
    const { default: ResizeObserver } = await import(
      'resize-observer-polyfill'
    );

    window.ResizeObserver = ResizeObserver;
  }
}

export async function initializeMap(
  opts: {
    root: React.RefObject<HTMLDivElement | null>;
    view: React.RefObject<__esri.MapView | null>;
    layerFillColor?: string | [number, number, number, number];
    layerOutlineColor?: string | [number, number, number, number];
    layerOutlineWidth?: string | number;
    layerUrl: string;
    layerId: string;
    tileLayerUrl: string;
    layerOpacity: number | string;
  },
  cb: () => void,
) {
  try {
    await ensureResizeObserver();

    const map = await _initMap(opts.root, opts.view);

    if (!map) throw new Error('Map not initialized');

    await _initLayer({
      map,
      layerUrl: opts.layerUrl,
      layerId: opts.layerId,
      layerOpacity: opts.layerOpacity,
      layerFillColor: opts.layerFillColor,
      layerOutlineColor: opts.layerOutlineColor,
      layerOutlineWidth: opts.layerOutlineWidth,
      tileLayerUrl: opts.tileLayerUrl,
    });

    cb();
  } catch (error) {
    console.error('Error initializing map', error);
  }
}

async function _initFillColor(
  layerFillColor?: string | [number, number, number, number],
  layerOutlineColor?: string | [number, number, number, number],
  layerOutlineWidth?: string | number,
) {
  try {
    if (layerFillColor) {
      const [{ default: SimpleFillSymbol }] = await Promise.all([
        import('@arcgis/core/symbols/SimpleFillSymbol'),
      ]);

      return new SimpleFillSymbol({
        color: layerFillColor,
        outline: {
          color: layerOutlineColor,
          width: layerOutlineWidth,
        },
      });
    }
  } catch (error) {
    console.error('Error initializing fill color', error);
  }
}

export async function filterAndZoom(opts: {
  view: __esri.MapView;
  animate?: boolean;
  layerId: string;
  itemId: string;
  itemKey: string;
}): Promise<void> {
  try {
    const layer = opts.view.map.findLayerById(
      opts.layerId,
    ) as __esri.FeatureLayer;
    const geo = await _filter(opts.itemId, opts.itemKey, layer);

    if (!geo) return;

    await _zoom(opts.view, geo, opts.animate);
  } catch (error) {
    console.error('Error filtering and zooming', error);
  }
}

async function _filter(
  itemId: string,
  itemKey: string,
  layer: __esri.FeatureLayer,
): Promise<nullish | __esri.GeometryUnion> {
  try {
    const isNumeric = !isNaN(Number(itemId));
    const formattedValue = isNumeric ? itemId : `'${itemId}'`;

    layer.definitionExpression =
      itemId === 'all' ? '' : `${itemKey} = ${formattedValue}`;

    const query = layer.createQuery();
    query.where = `${itemKey} = '${itemId}'`;
    query.returnGeometry = true;

    const res = await layer.queryFeatures(query);
    return res.features[0]?.geometry;
  } catch (error) {
    console.error('Error filtering features', error);
  }
}

async function _zoom(
  view: __esri.MapView,
  geo: __esri.Geometry,
  animate?: boolean,
): Promise<void> {
  try {
    if (geo.type === 'point') {
      await view.goTo({ target: geo, scale: 10000 }, { animate });
    } else {
      await view.goTo(geo, { animate });
    }
  } catch (error) {
    console.error('Error zooming to geometry', error);
  }
}

async function _initLayer(opts: {
  map: __esri.Map;
  layerUrl: string;
  layerId: string;
  layerOpacity: number | string;
  layerFillColor?: string | [number, number, number, number];
  layerOutlineColor?: string | [number, number, number, number];
  layerOutlineWidth?: string | number;
  tileLayerUrl: string;
}) {
  try {
    const [
      { default: FeatureLayer },
      { default: SimpleRenderer },
      { default: VectorTileLayer },
    ] = await Promise.all([
      import('@arcgis/core/layers/FeatureLayer'),
      import('@arcgis/core/renderers/SimpleRenderer'),
      import('@arcgis/core/layers/VectorTileLayer'),
    ]);

    const tileLayer = new VectorTileLayer({
      url: opts.tileLayerUrl,
    });

    const fillSymbol = await _initFillColor(
      opts.layerFillColor,
      opts.layerOutlineColor,
      opts.layerOutlineWidth,
    );

    const layer = new FeatureLayer({
      url: opts.layerUrl,
      id: opts.layerId,
      opacity: Number(opts.layerOpacity),
      ...(fillSymbol && {
        renderer: new SimpleRenderer({ symbol: fillSymbol }),
      }),
    });

    opts.map.add(tileLayer);
    opts.map.add(layer);
  } catch (error) {
    console.error('Error initializing layer', error);
  }
}

async function _initMap(
  root: React.RefObject<HTMLDivElement | null>,
  view: React.RefObject<__esri.MapView | null>,
) {
  try {
    if (!root.current) throw new Error('Root element not found');

    const [{ default: GISMap }, { default: MapView }] = await Promise.all([
      import('@arcgis/core/Map'),
      import('@arcgis/core/views/MapView'),
    ]);

    const map = new GISMap();

    view.current = new MapView({
      container: root.current,
      map,
    });

    return map;
  } catch (error) {
    console.error('Error initializing map', error);
  }
}
