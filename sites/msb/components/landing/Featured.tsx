import { Grid } from '@trussworks/react-uswds';
import { FeaturedCard, FeaturedCardProps } from './FeaturedCard';

export function Featured() {
  const featuredItems: FeaturedCardProps[] = [
    {
      icon: 'Campaign',
      title: 'Career Opportunities',
      text: 'View Latest Updates',
      linkUrl: '#public-notices',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/05620280-c80f-4f5f-b1f6-14d89f12099foptimized_images/1000x667_optimized_image.jpg',
    },
    {
      icon: 'Event',
      title: 'Contract Opportunities',
      text: 'View upcoming meetings',
      linkUrl: '#meetings',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/85df212f-98a6-491c-b299-7173692be312optimized_images/1000x664_optimized_image.jpg',
    },
    {
      icon: 'Construction',
      title: 'Projects',
      text: 'View project plans',
      linkUrl: '#projects',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/e4347f71-2e34-4d7c-97b1-692fe80d61c3optimized_images/1000x562_optimized_image.jpg',
    },
  ];

  return (
    <section className="usa-section grid-container position-relative">
      <Grid row className="usa-list--unstyled" gap>
        {featuredItems.map((item) => (
          <Grid
            col={12}
            tablet={{ col: 4 }}
            className="margin-bottom-2"
            key={item.title}
          >
            <FeaturedCard {...item} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
