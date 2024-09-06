import { appConfig } from '@/configs/config';
import { GridContainer } from '@trussworks/react-uswds';
import Link from 'next/link';

import { Carousel } from '../Carousel';

export function Hero() {
  return (
    <Carousel
      slides={[
        {
          title: 'Home',
          content: (
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

                  <p>
                    Your gateway to essential services and local resources in
                    the heart of Alaska. Explore all that the Matanuska-Susitna
                    Borough has to offer, and let us guide you to the services
                    you need.
                  </p>
                  <Link href="#services" className="usa-button">
                    Find a Service
                  </Link>
                </div>
              </GridContainer>
            </section>
          ),
        },
      ]}
    />
  );
}
