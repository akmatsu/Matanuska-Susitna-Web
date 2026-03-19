import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

export function Img({
  className,
  imageClassName,
  alt,
  ...props
}: Omit<ImageProps, 'fill'> & {
  imageClassName?: string;
}) {
  return (
    <div className={clsx('relative', className)}>
      <Image {...props} alt={alt} className={imageClassName} fill />
    </div>
  );
}
