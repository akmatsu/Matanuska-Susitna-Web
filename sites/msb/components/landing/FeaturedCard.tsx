'use client';
import {
  Card,
  CardHeader,
  Icon,
  CardBody,
  CardFooter,
  CardMedia,
} from '@trussworks/react-uswds';
import Image from 'next/image';

import Link from 'next/link';
import { LinkCard } from '../LinkCard';

export type FeaturedCardProps = {
  icon: keyof typeof Icon;
  linkUrl: string;
  title: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function FeaturedCard(props: FeaturedCardProps) {
  const MyIcon = Icon[props.icon] as (typeof Icon)['Add'];

  return (
    <LinkCard href={props.linkUrl} className="height-full border-0">
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

      <CardHeader className="padding-top-2">
        <div className="display-flex flex-align-center width-full">
          <MyIcon
            size={3}
            className="margin-right-1 bg-secondary text-white padding-1 circle-5"
          />
          <h3 className="usa-card__heading margin-top-0">{props.title}</h3>
        </div>
      </CardHeader>
    </LinkCard>
  );
}
