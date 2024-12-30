import { LinkCard, CardHeader, CardMedia } from '@matsugov/ui';

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
        <CardMedia>
          <img
            src={props.imageUrl}
            alt={props.imageAlt}
            loading="lazy"
            className="add-aspect-2x1"
          />
        </CardMedia>
      )}

      <CardHeader>
        <div className="display-flex flex-align-center width-full">
          {/* <CoreIcon
            icon={props.icon}
            className="margin-right-1 bg-secondary text-white padding-1 circle-5"
            size={3}
            ariaLabel={props.title}
          /> */}
          <h3 className="usa-card__heading margin-top-0">{props.title}</h3>
        </div>
      </CardHeader>
    </LinkCard>
  );
}
