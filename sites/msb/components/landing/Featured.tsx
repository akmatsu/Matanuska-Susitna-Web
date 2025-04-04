import { FeaturedCard, FeaturedCardProps } from './FeaturedCard';

export function Featured() {
  const featuredItems: FeaturedCardProps[] = [
    {
      icon: 'icon-[mdi--briefcase]',
      title: 'Career Opportunities',
      text: 'View Latest Updates',
      linkUrl: '#public-notices',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/05620280-c80f-4f5f-b1f6-14d89f12099foptimized_images/1000x667_optimized_image.jpg',
    },
    {
      icon: 'icon-[mdi--legal]',
      title: 'Legislation',
      text: 'View upcoming meetings',
      linkUrl: '#meetings',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/d34162a6-3bbd-4356-9e61-7f9f0e2e11c4optimized_images/500x185_optimized_image.jpg',
    },
    {
      icon: 'icon-[mdi--excavator]',
      title: 'Projects',
      text: 'View project plans',
      linkUrl: '#projects',
      imageUrl:
        'https://d1159zutbdy4l.cloudfront.net/public/uploads/e4347f71-2e34-4d7c-97b1-692fe80d61c3optimized_images/1000x562_optimized_image.jpg',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto relative px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredItems.map((item) => (
          <FeaturedCard {...item} key={item.title} />
        ))}
      </div>
    </section>
  );
}
