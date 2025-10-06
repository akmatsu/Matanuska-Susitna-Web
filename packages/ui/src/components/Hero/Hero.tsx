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
          `w-full h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] relative`,
          className,
        )}
      >
        <Image
          src={url}
          layout="fill"
          objectFit="cover"
          alt="Hero Image"
          style={{ objectPosition: pos }}
          className="absolute top-0 z-0"
        />
        <div className="relative z-10 w-full h-full flex justify-center items-center">
          {children}
        </div>
      </section>
    );
}
