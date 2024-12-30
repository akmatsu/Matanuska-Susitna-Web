import { Grid } from '@trussworks/react-uswds';
import {
  LinkCard,
  CardHeader,
  CardBody,
  CardMedia,
  CardTitle,
  CardFooter,
} from '@matsugov/ui';
import { LinkButton } from '../LinkButton';

export function FeaturedContent() {
  return (
    <Grid row gap="md" style={{ height: '100%' }}>
      <Grid col={7} style={{ height: '100%' }}>
        <LinkCard href="#">
          <CardMedia>
            <img src="https://d1159zutbdy4l.cloudfront.net/public/uploads/c3d08b9f-c8df-4114-ba60-529111438482optimized_images/1000x370_optimized_image.jpg"></img>
          </CardMedia>
          <CardHeader>
            <CardTitle>Magna ad ad eu ipsum.</CardTitle>
          </CardHeader>

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
      <Grid
        col={5}
        className="display-flex flex-column"
        style={{ justifyContent: 'space-between' }}
      >
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
        <LinkCard href="#">
          <CardHeader>
            <h4>Tempor non aliquip in fugiat nulla tempor.</h4>
          </CardHeader>
        </LinkCard>

        <LinkButton href="#see-all" block big>
          See all
        </LinkButton>
      </Grid>
    </Grid>
  );
}
