import { LinkCard, CardHeader, CardMedia, CardTitle } from '@matsugov/ui';

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
        <CardMedia className="aspect-[2] overflow-hidden">
          <img
            src={props.imageUrl}
            alt={props.imageAlt}
            loading="lazy"
            className="aspect-[2] object-cover h-full w-full"
          />
        </CardMedia>
      )}

      <CardHeader>
        <div className="flex items-center w-full gap-2">
          <div className="bg-secondary text-white rounded-full p-2 flex items-center justify-center">
            <span className={`iconify size-6 ${props.icon}`}></span>
          </div>
          <CardTitle>{props.title}</CardTitle>
        </div>
      </CardHeader>
    </LinkCard>
  );
}
