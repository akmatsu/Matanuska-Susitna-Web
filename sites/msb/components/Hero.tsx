import { appConfig } from '@/configs/config';
import { GridContainer } from '@trussworks/react-uswds';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="usa-hero" aria-label="introduction">
      <GridContainer>
        <div className="usa-hero__callout">
          <h1 className="usa-hero__heading">
            The
            <span className="usa-hero__heading--alt">{appConfig.orgName}</span>
            Welcomes you
          </h1>

          <p>We'd love to help you. Start looking for a service.</p>
          <Link href="#services" className="usa-button">
            Find a Service
          </Link>
        </div>
      </GridContainer>
    </section>
  );
}
