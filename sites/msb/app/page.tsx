'use client';
import { Featured, Hero, HighlightGrid } from '@/components';
import { GridContainer, Search } from '@trussworks/react-uswds';
import Link from 'next/link';

export default function Home() {
  function handleSearch() {
    console.log('search');
  }
  return (
    <div>
      <Hero />
      <Featured />
      <HighlightGrid />
      <section className="usa-section">
        <GridContainer>
          <h2>Can't find what you need?</h2>
          <p className="usa-intro">
            Use the search bar or reach out to us directly — we're here to help.
          </p>

          <Search
            onSubmit={handleSearch}
            size="big"
            className="margin-bottom-4"
          />

          <Link href="#" className="usa-button">
            Contact us
          </Link>
        </GridContainer>
      </section>
    </div>
  );
}
