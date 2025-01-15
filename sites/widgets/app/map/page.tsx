import { MapWrapper } from '@/components/MapWrapper';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    item_id: itemId,
    item_key: itemKey,
    layer_id: layerId,
    layer_url: layerUrl,
    layer_opacity: layerOpacity,
    tile_layer_url: tileLayerUrl,
    layer_fill_color,
    layer_outline_color,
    layer_outline_width,
  } = await searchParams;

  function processColor(
    color: string | number[] | string[] | undefined,
  ): number[] | string | undefined {
    if (typeof color === 'string' && color.includes(',')) {
      // Split the comma-separated string into an array and convert to numbers
      return color.split(',').map((value) => Number(value));
    }
    if (Array.isArray(color)) {
      return color.map(function (value) {
        return typeof value === 'string' ? Number(value) : value;
      });
    }

    return color ? `#${color}` : undefined;
  }

  const layerFillColor = processColor(layer_fill_color);
  const layerOutlineColor = processColor(layer_outline_color);
  const layerOutlineWidth = layer_outline_width
    ? Number(layer_outline_width)
    : undefined;

  return (
    <div className="w-screen h-screen">
      <MapWrapper
        itemId={itemId as string | undefined}
        itemKey={itemKey as string | undefined}
        layerOpacity={layerOpacity as string | number | undefined}
        layerId={layerId as string | undefined}
        tileLayerUrl={tileLayerUrl as string | undefined}
        layerUrl={layerUrl as string | undefined}
        layerFillColor={layerFillColor as string | undefined}
        layerOutlineColor={layerOutlineColor as string | undefined}
        layerOutlineWidth={layerOutlineWidth as string | number | undefined}
      />
    </div>
  );
}
