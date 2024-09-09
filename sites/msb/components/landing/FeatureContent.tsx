import { CardBody, CardHeader, CardMedia, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { LinkCard } from '../LinkCard';

export function FeaturedContent() {
  return (
    <Grid row gap="md">
      <Grid col={7}>
        <LinkCard href="#" className="minh-15">
          <CardHeader>
            <h3 className="usa-card__heading">Magna ad ad eu ipsum.</h3>
          </CardHeader>
          <CardMedia>
            <img src="https://d1159zutbdy4l.cloudfront.net/public/uploads/c3d08b9f-c8df-4114-ba60-529111438482optimized_images/1000x370_optimized_image.jpg"></img>
          </CardMedia>
          <CardBody>
            <p>
              Magna ad ad eu ipsum. Aliqua pariatur deserunt amet anim et. Enim
              eu reprehenderit sit cupidatat sunt ipsum quis ea labore
              reprehenderit in eu ad aliquip. Exercitation officia culpa
              consequat enim labore in pariatur.
            </p>
          </CardBody>
        </LinkCard>
      </Grid>
      <Grid col={5} className="display-flex flex-column">
        <LinkCard href="#">
          <CardHeader>
            <h4>Tempor non aliquip in fugiat nulla tempor.</h4>
          </CardHeader>
        </LinkCard>

        <LinkCard href="#">
          <CardHeader>
            <h4>Tempor non aliquip in fugiat nulla tempor.</h4>
          </CardHeader>
        </LinkCard>
        <LinkCard href="#">
          <CardHeader>
            <h4>Tempor non aliquip in fugiat nulla tempor.</h4>
          </CardHeader>
        </LinkCard>

        <Link
          href="#see-all"
          className="radius-0 usa-button usa-button--big width-full"
        >
          See all
        </Link>
      </Grid>
    </Grid>
  );
}
