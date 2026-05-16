import { LinkCard, CardHeader, CardMedia, CardTitle } from '@matsugov/ui/Card';
import Image from 'next/image';

export type FeaturedCardProps = {
  icon: string;
  linkUrl: string;
  title: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function FeaturedCard(props: FeaturedCardProps) {
  return (
    <LinkCard href={props.linkUrl}>
      {props.imageUrl && (
        <CardMedia className="relative aspect-[2] overflow-hidden">
          <Image
            src={props.imageUrl.split('?')[0]} // Remove query params
            alt={props.imageAlt || 'Featured Image of ' + props.title}
            loading="lazy"
            className="aspect-[2] h-full w-full object-cover"
            fill
          />
        </CardMedia>
      )}

      <CardHeader>
        <div className="flex w-full items-center gap-2">
          <div className="bg-secondary text-msb-base-darkest flex items-center justify-center rounded-full p-2">
            <span className={`iconify size-6 ${props.icon}`}></span>
          </div>
          <CardTitle>{props.title}</CardTitle>
        </div>
      </CardHeader>
    </LinkCard>
  );
}
