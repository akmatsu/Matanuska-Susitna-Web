import { Highlight } from '@msb/js-sdk';
import { FeaturedCard } from './FeaturedCard';

export function Featured({
  featuredItems,
}: {
  featuredItems: (Partial<Highlight> & { icon: string })[];
}) {
  return (
    <section className="max-w-6xl mx-auto relative px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredItems.map((item) => (
          <FeaturedCard
            title={item.title || ''}
            imageUrl={item.image || ''}
            key={item.id}
            icon={item.icon}
            linkUrl={item.linkedItem?.item?.url || ''}
            text={item.linkedItem?.item?.description || ''}
          />
        ))}
      </div>
    </section>
  );
}
