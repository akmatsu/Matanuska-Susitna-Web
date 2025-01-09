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
  } = await searchParams;

  return (
    <div className="w-screen h-screen">
      <MapWrapper
        itemId={itemId as string | undefined}
        itemKey={itemKey as string | undefined}
        layerOpacity={layerOpacity as string | number | undefined}
        layerId={layerId as string | undefined}
        tileLayerUrl={tileLayerUrl as string | undefined}
        layerUrl={layerUrl as string | undefined}
      />
    </div>
  );
}
