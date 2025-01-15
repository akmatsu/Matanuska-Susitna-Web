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

  const layerFillColor = layer_fill_color ? `#${layer_fill_color}` : undefined;
  const layerOutlineColor = layer_fill_color
    ? `#${layer_outline_color}`
    : undefined;
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
