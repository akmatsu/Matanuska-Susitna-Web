import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

type HeroProps = {
  image?: string | null;
  className?: string;
  position?: string;
  children?: React.ReactNode;
  height?: string;
};

export function Hero({
  image = 'https://d1159zutbdy4l.cloudfront.net/public/uploads/9a6d51bb-9b20-4008-ac82-4100120ed080/Butte-Fall-jumbo2.jpg',
  position,
  className,
  children,
}: HeroProps) {
  const pos = position || getPosition(image) || '50% 50%';
  const url = getImageBaseUrl(image);

  function getImageBaseUrl(value?: string | null) {
    if (!value) return;
    const [baseUrl] = value.split('?');

    return baseUrl;
  }

  function getPosition(value?: string | null) {
    if (!value) return;
    const [, search] = value.split('?');
    const params = new URLSearchParams(search);
    const position = params.get('position');

    return position || '50% 50%';
  }
  if (url)
    return (
      <section
        className={clsx(
          `relative h-37.5 w-full md:h-50 lg:h-62.5 xl:h-75`,
          className,
        )}
      >
        <Image
          src={url}
          fill
          alt="Hero Image"
          style={{ objectPosition: pos, objectFit: 'cover' }}
          className="absolute top-0 z-0"
        />
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      </section>
    );
}
