import {
  LinkCard,
  CardHeader,
  CardBody,
  CardMedia,
  CardTitle,
  Button,
} from '@matsugov/ui';
import Link from 'next/link';
import { PageListItem } from '@msb/js-sdk';
import Image from 'next/image';
import clsx from 'clsx';
import { LinkButton } from '../LinkButton';

export function FeaturedContent({
  items,
}: {
  items: (PageListItem & { heroImage?: string | null })[];
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <LinkCard
            key={item.id}
            href={`/public-notices/${item.slug}`}
            as="li"
            linkAs={Link}
            className={clsx('h-full', {
              'col-span-1 sm:col-span-2': index === 0,
            })}
          >
            {index === 0 ? (
              <div className="flex">
                <CardMedia className="relative w-2/3 aspect-video">
                  <Image
                    src={
                      item.heroImage?.split('?')[0] ||
                      'https://d1159zutbdy4l.cloudfront.net/public/uploads/7d2a895e-d867-4959-b953-80bf2ea95aa3/Borough-Seal.png'
                    }
                    alt={item.title}
                    objectFit="cover"
                    fill
                  />
                </CardMedia>
                <div className="flex flex-col justify-center">
                  <CardHeader className="mb-4">
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p>{item.description}</p>
                  </CardBody>
                </div>
              </div>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardBody>
                  <p>{item.description}</p>
                </CardBody>
              </>
            )}
          </LinkCard>
        ))}
      </ul>
      <LinkButton href="/public-notices" big>
        View All Announcements & Public Notices
      </LinkButton>
    </div>
  );
}
