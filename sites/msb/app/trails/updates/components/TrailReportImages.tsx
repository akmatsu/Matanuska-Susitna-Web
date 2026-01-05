import { getTrailUpdateImages } from '../utils';
import { TrailReportImageDialog } from './TrailReportImageDialog';

export async function TrailReportImages(props: { id: string | number }) {
  const data = await getTrailUpdateImages(props.id);
  const images = data.attachmentGroups.flatMap((group) =>
    group.attachmentInfos.map((info) => info.url),
  );

  if (!images.length) {
    return null;
  }

  return <TrailReportImageDialog images={images} />;
}
