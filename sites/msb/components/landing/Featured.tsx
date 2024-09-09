import { Grid } from '@trussworks/react-uswds';
import { FeaturedCard, FeaturedCardProps } from './FeaturedCard';

export function Featured() {
  const featuredItems: FeaturedCardProps[] = [
    {
      icon: 'Campaign',
      title: 'Public Notices & Announcements',
      text: 'View Latest Updates',
      linkUrl: '#public-notices',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/c3d08b9f-c8df-4114-ba60-529111438482optimized_images/1000x370_optimized_image.jpg',
    },
    {
      icon: 'Event',
      title: 'Meetings',
      text: 'View upcoming meetings',
      linkUrl: '#meetings',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/0043c208-7c1c-45ea-b3d0-7d6ac4c4c0f0optimized_images/1000x370_optimized_image.jpg',
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
      <Grid row className="usa-list--unstyled">
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
