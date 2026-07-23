import {
  CardBody,
  CardHeader,
  CardMedia,
  CardTitle,
  LinkCard,
} from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const PublicNoticeFields = gql(`
  fragment PublicNoticeFields on PublicNotice {
    id
    title
    description
    slug
    heroImage
    urgency
  }
`);

export function PublicNoticeCard({
  publicNotice,
  flag,
}: {
  publicNotice: FragmentType<typeof PublicNoticeFields>;
  flag?: boolean;
}) {
  const item = getFragmentData(PublicNoticeFields, publicNotice);
  return (
    <LinkCard
      key={item.id}
      href={`/public-notices/${item.slug}`}
      as="li"
      linkAs={Link}
      className={clsx('h-full w-full', {
        'col-span-1 sm:col-span-2': flag,
      })}
    >
      {flag ? (
        <>
          <div className="hidden sm:flex">
            <CardMedia className="relative aspect-video w-96 max-w-full">
              <Image
                src={
                  item.heroImage?.split('?')[0] ||
                  'https://d1159zutbdy4l.cloudfront.net/public/uploads/549025a4-d712-4f57-93b9-edcb2f6b1d6aoptimized_images/1920x248_optimized_image.jpg'
                }
                alt={item.title!}
                style={{ objectFit: 'cover' }}
                fill
              />
            </CardMedia>
            <div className="flex w-full flex-col justify-center p-4">
              <CardHeader className="mb-4 w-full">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="truncate">{item.description}</p>
              </CardBody>
            </div>
          </div>

          <CardMedia className="relative aspect-[2] overflow-hidden sm:hidden">
            <Image
              src={
                item.heroImage?.split('?')[0] ||
                'https://d1159zutbdy4l.cloudfront.net/public/uploads/549025a4-d712-4f57-93b9-edcb2f6b1d6aoptimized_images/1920x248_optimized_image.jpg'
              }
              alt={item.title!}
              loading="lazy"
              className="aspect-[2] h-full w-full object-cover"
              style={{ objectFit: 'cover' }}
              fill
            />
          </CardMedia>
          <CardHeader className="sm:hidden">
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardBody className="sm:hidden">
            <p className="truncate">{item.description}</p>
          </CardBody>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="truncate">{item.description}</p>
          </CardBody>
        </>
      )}
    </LinkCard>
  );
}
