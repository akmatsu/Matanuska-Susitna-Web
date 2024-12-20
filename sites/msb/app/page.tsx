import { Featured, Hero, HighlightGrid } from '@/components';
import { FeaturedContent } from '@/components/landing/FeatureContent';
import { Meetings } from '@/components/Meetings';
import { GridContainer, Grid } from '@trussworks/react-uswds';
import { LinkButton } from '@/components/LinkButton/LinkButton';

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />

      <section className="usa-section grid-container">
        <h2>Upcoming Meetings</h2>

        <Meetings />
      </section>
      <section className="usa-section grid-container">
        <h2>Announcement & Public Notices</h2>

        <FeaturedContent />
      </section>

      <section className="usa-section">
        <GridContainer>
          <h2>Can't find what you need?</h2>
          <p className="usa-intro">
            Use the search bar or reach out to us directly — we're here to help.
          </p>

          <LinkButton href="#" color="primary">
            Contact us
          </LinkButton>
        </GridContainer>
      </section>
    </div>
  );
}
