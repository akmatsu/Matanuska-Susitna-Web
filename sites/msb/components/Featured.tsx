import { Grid } from '@trussworks/react-uswds';
import { FeaturedCard, FeaturedCardProps } from './FeaturedCard';

export function Featured() {
  const featuredItems: FeaturedCardProps[] = [
    {
      icon: 'Campaign',
      title: 'Public Notices & Announcements',
      linkText: 'View Latest Updates',
      linkUrl: '#public-notices',
    },
    {
      icon: 'Event',
      title: 'Meetings',
      linkText: 'View upcoming meetings',
      linkUrl: '#meetings',
    },
    {
      icon: 'Construction',
      title: 'Projects',
      linkText: 'View project plans',
      linkUrl: '#projects',
    },
  ];

  return (
    <section className="usa-section grid-container">
      <Grid row className="usa-list--unstyled">
        {featuredItems.map((item) => (
          <Grid col={12} tablet={{ col: 4 }} className="margin-bottom-2">
            <FeaturedCard {...item} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
