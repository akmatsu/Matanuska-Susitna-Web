'use client';

import { ImgHTMLAttributes, useEffect, useRef } from 'react';

interface MdImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imgSize: number;
}

export function MdImage({ imgSize, ...props }: MdImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  function applySize() {
    if (imgRef.current) {
      const naturalWidth = imgRef.current.naturalWidth;
      imgRef.current.style.width = `${naturalWidth * (imgSize / 100)}px`;
      imgRef.current.style.display = 'block';
    }
  }

  useEffect(() => {
    if (imgRef.current?.complete) {
      applySize();
    }
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      ref={imgRef}
      className="mx-auto mt-0 mb-0"
      style={{ height: 'auto', maxWidth: '100%', display: 'none' }}
      alt={props.alt || 'Image'}
      onLoad={applySize}
    />
  );
}
