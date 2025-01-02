import clsx from 'clsx';

type HeroProps = {
  image?: string;
  position?: string;
  className?: string;
  children?: React.ReactNode;
  height?: string;
};

export function Hero({
  image = 'https://d1159zutbdy4l.cloudfront.net/public/uploads/9a6d51bb-9b20-4008-ac82-4100120ed080/Butte-Fall-jumbo2.jpg',
  position = '50% 50%',
  height = '300px',
  className,
  children,
}: HeroProps) {
  return (
    <section
      className={clsx(`w-full bg-cover `, className)}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: position,
        height,
      }}
    >
      {children}
    </section>
  );
}
