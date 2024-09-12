import { Featured, Hero, HighlightGrid } from '@/components';
import { FeaturedContent } from '@/components/landing/FeatureContent';
import { GridContainer, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />
      <section className="usa-section grid-container position-relative">
        <Grid row className="usa-list--unstyled" gap>
          <Grid col={6}>
            <h2>Public Notices & Announcements</h2>
            <FeaturedContent />
          </Grid>
          <Grid col={6}>
            <h2>Meetings</h2>
            <FeaturedContent />
          </Grid>
        </Grid>
      </section>
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
