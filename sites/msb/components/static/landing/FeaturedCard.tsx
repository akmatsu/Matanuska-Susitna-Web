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
        <CardMedia className="aspect-[2] overflow-hidden relative">
          <Image
            src={props.imageUrl.split('?')[0]} // Remove query params
            alt={props.imageAlt || ''}
            loading="lazy"
            className="aspect-[2] object-cover h-full w-full"
            fill
          />
        </CardMedia>
      )}

      <CardHeader>
        <div className="flex items-center w-full gap-2">
          <div className="bg-secondary text-base-darkest rounded-full p-2 flex items-center justify-center">
            <span className={`iconify size-6 ${props.icon}`}></span>
          </div>
          <CardTitle>{props.title}</CardTitle>
        </div>
      </CardHeader>
    </LinkCard>
  );
}
