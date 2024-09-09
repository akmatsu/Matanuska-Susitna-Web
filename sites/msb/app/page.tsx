'use client';
import { Featured, Hero, HighlightGrid, Toolbelt } from '@/components';
import { GridContainer, Search } from '@trussworks/react-uswds';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <Toolbelt /> */}
      <Featured />
      <HighlightGrid />
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
