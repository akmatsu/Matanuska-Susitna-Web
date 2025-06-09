import React from 'react';
import clsx from 'clsx';

type HeroProps = {
  image?: string | null;
  className?: string;
  position?: string;
  children?: React.ReactNode;
  height?: string;
};

export function Hero({
  image = 'https://d1159zutbdy4l.cloudfront.net/public/uploads/9a6d51bb-9b20-4008-ac82-4100120ed080/Butte-Fall-jumbo2.jpg',
  height = '300px',
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
        className={clsx(`w-full bg-cover `, className)}
        style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: pos,
          height,
        }}
      >
        {children}
      </section>
    );
}
