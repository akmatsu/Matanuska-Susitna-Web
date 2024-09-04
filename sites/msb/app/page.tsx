'use client';
import { appConfig } from '@/configs/config';
import {
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  CardHeader,
  Grid,
  GridContainer,
  Icon,
} from '@trussworks/react-uswds';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="usa-hero" aria-label="introduction">
        <GridContainer>
          <div className="usa-hero__callout">
            <h1 className="usa-hero__heading">
              The
              <span className="usa-hero__heading--alt">
                {appConfig.orgName}
              </span>
              Welcomes you
            </h1>
            <p>We'd love to help you. Start l ooking for a service.</p>
            <Link href="/" className="usa-button">
              Find a Service
            </Link>
          </div>
        </GridContainer>
      </section>
      <section className="usa-section grid-container">
        <Grid row gap="lg" className="usa-list--unstyled">
          <Grid col={12} tablet={{ col: 4 }}>
            <Card className="height-full">
              <CardHeader>
                <h3 className="display-flex flex-align-center">
                  <div>
                    <Icon.Campaign size={3} className="margin-right-05" />
                  </div>
                  Public Notices & Announcements
                </h3>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter>
                <Link href="#public-notices" className="usa-button">
                  View Latest Updates
                </Link>
              </CardFooter>
            </Card>
          </Grid>
          <Grid col={12} tablet={{ col: 4 }}>
            <Card className="height-full">
              <CardHeader>
                <h3 className="display-flex flex-align-center">
                  <Icon.Event
                    size={3}
                    className="margin-right-05 flex-align-center"
                  />
                  Meetings
                </h3>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter>
                <Link href="#public-notices" className="usa-button margin-x-0 ">
                  View upcoming meetings
                </Link>
              </CardFooter>
            </Card>
          </Grid>
          <Grid col={12} tablet={{ col: 4 }}>
            <Card className="height-full">
              <CardHeader>
                <h3 className="display-flex">
                  <Icon.Construction size={3} className="margin-right-05" />
                  Projects
                </h3>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter>
                <Link href="#public-notices" className="usa-button margin-x-0">
                  View planned projects
                </Link>
              </CardFooter>
            </Card>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}
