import { Featured, Hero, HighlightGrid } from '@/components';
import { Meetings } from '@/components/Meetings';
import { GridContainer, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />

      <section className="usa-section grid-container">
        <h2>Meetings</h2>

        <Meetings />
      </section>

      <section className="usa-section">
        <GridContainer>
          <h2>Can't find what you need?</h2>
          <p className="usa-intro">
            Use the search bar or reach out to us directly — we're here to help.
          </p>

          <Link href="#" className="usa-button">
            Contact us
          </Link>
        </GridContainer>
      </section>
    </div>
  );
}
