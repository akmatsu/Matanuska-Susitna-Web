import {
  LinkCard,
  CardHeader,
  CardBody,
  CardMedia,
  CardTitle,
} from '@matsugov/ui';
import { LinkButton } from '../LinkButton';
import Link from 'next/link';

export function FeaturedContent() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LinkCard href="#" as="li" linkAs={Link}>
        <CardMedia className="aspect-[2] overflow-hidden">
          <img
            loading="lazy"
            className="aspect-[2] object-cover h-full w-full"
            src="https://d1159zutbdy4l.cloudfront.net/public/uploads/329eb210-c21f-4049-b2e9-3e0c3bf7e62aoptimized_images/1000x750_optimized_image.jpg"
          ></img>
        </CardMedia>
        <CardHeader>
          <CardTitle>Magna ad ad eu ipsum.</CardTitle>
        </CardHeader>

        <CardBody>
          <p>
            Magna ad ad eu ipsum. Aliqua pariatur deserunt amet anim et. Enim eu
            reprehenderit sit cupidatat sunt ipsum quis ea labore reprehenderit
            in eu ad aliquip. Exercitation officia culpa consequat enim labore
            in pariatur.
          </p>
        </CardBody>
      </LinkCard>
      <div className="flex flex-col gap-4 justify-between">
        <LinkCard href="#" as="li" linkAs={Link}>
          <CardHeader>
            <CardTitle className="text-lg">
              Tempor non aliquip in fugiat nulla tempor.
            </CardTitle>
          </CardHeader>
        </LinkCard>

        <LinkCard href="#" as="li" linkAs={Link}>
          <CardHeader>
            <CardTitle className="text-lg">
              Tempor non aliquip in fugiat nulla tempor.
            </CardTitle>
          </CardHeader>
        </LinkCard>
        <LinkCard href="#" as="li" linkAs={Link}>
          <CardHeader>
            <CardTitle className="text-lg">
              Tempor non aliquip in fugiat nulla tempor.
            </CardTitle>
          </CardHeader>
        </LinkCard>
        <LinkCard href="#" as="li" linkAs={Link}>
          <CardHeader>
            <CardTitle className="text-lg">
              Tempor non aliquip in fugiat nulla tempor.
            </CardTitle>
          </CardHeader>
        </LinkCard>

        <LinkButton href="#see-all" block big>
          See all
        </LinkButton>
      </div>
    </ul>
  );
}
