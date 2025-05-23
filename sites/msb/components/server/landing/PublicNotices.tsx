import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { LinkButton } from '../LinkButton';
import {
  LinkCard,
  CardHeader,
  CardBody,
  CardMedia,
  CardTitle,
} from '@matsugov/ui';
import { PublicNotice } from '@msb/js-sdk/graphql';

export function PublicNotices({ items }: { items: PublicNotice[] }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {items.map((item, index) => (
          <LinkCard
            key={item.id}
            href={`/public-notices/${item.slug}`}
            as="li"
            linkAs={Link}
            className={clsx('h-full w-full', {
              'col-span-1 sm:col-span-2': index === 0,
            })}
          >
            {index === 0 ? (
              <>
                <div className="hidden sm:flex">
                  <CardMedia className="relative w-96 max-w-full aspect-video">
                    <Image
                      src={
                        item.heroImage?.split('?')[0] ||
                        'https://d1159zutbdy4l.cloudfront.net/public/uploads/7d2a895e-d867-4959-b953-80bf2ea95aa3/Borough-Seal.png'
                      }
                      alt={item.title!}
                      objectFit="cover"
                      fill
                    />
                  </CardMedia>
                  <div className="flex flex-col justify-center p-4 w-full">
                    <CardHeader className="mb-4 w-full">
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <p className="truncate">{item.description}</p>
                    </CardBody>
                  </div>
                </div>

                <CardMedia className="relative overflow-hidden aspect-[2] sm:hidden">
                  <Image
                    src={
                      item.heroImage?.split('?')[0] ||
                      'https://d1159zutbdy4l.cloudfront.net/public/uploads/7d2a895e-d867-4959-b953-80bf2ea95aa3/Borough-Seal.png'
                    }
                    alt={item.title!}
                    loading="lazy"
                    className="aspect-[2] object-cover h-full w-full"
                    objectFit="cover"
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
        ))}
      </ul>
      <LinkButton href="/public-notices" big>
        View All Announcements & Public Notices
      </LinkButton>
    </div>
  );
}
