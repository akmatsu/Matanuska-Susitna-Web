'use client';
import {
  Card,
  CardHeader,
  Icon,
  CardBody,
  CardFooter,
} from '@trussworks/react-uswds';

import Link from 'next/link';

export type FeaturedCardProps = {
  icon: keyof typeof Icon;
  linkUrl: string;
  title: string;
  linkText: string;
};

export function FeaturedCard(props: FeaturedCardProps) {
  const MyIcon = Icon[props.icon] as (typeof Icon)['Add'];

  return (
    <Card className="height-full">
      <CardHeader>
        <h3 className="display-flex flex-align-center">
          <div>
            <MyIcon
              size={3}
              className="margin-right-1 bg-secondary text-base-lightest padding-1 circle-6"
            />
          </div>
          {props.title}
        </h3>
      </CardHeader>
      <CardBody>
        <p>Latest content</p>
      </CardBody>
      <CardFooter>
        <Link href={props.linkUrl} className="usa-button">
          {props.linkText}
        </Link>
      </CardFooter>
    </Card>
  );
}
