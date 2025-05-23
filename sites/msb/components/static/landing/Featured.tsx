import { FeaturedCard } from './FeaturedCard';
import { Highlight, LinkedItemUnion, Maybe } from '@msb/js-sdk/graphql';

export function Featured({
  featuredItems,
}: {
  featuredItems: (Highlight & { icon: string })[];
}) {
  function getUrlSection(str?: string) {
    if (!str) {
      return '/';
    }
    if (str === 'OrgUnit') {
      return '/departments/';
    }
    return `/${str.toLocaleLowerCase()}s/`;
  }

  function getUrl(item?: Maybe<LinkedItemUnion>) {
    if (!item) {
      return '';
    }

    return 'url' in item
      ? item.url!
      : 'slug' in item
        ? `${getUrlSection(item.__typename)}${item.slug}`
        : '';
  }

  return (
    <section className="max-w-6xl mx-auto relative px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredItems.map((item) => (
          <FeaturedCard
            title={item.title || ''}
            imageUrl={item.image || ''}
            key={item.id}
            icon={item.icon}
            linkUrl={getUrl(item.linkedItem?.item)}
            text={item.linkedItem?.item?.description || ''}
          />
        ))}
      </div>
    </section>
  );
}
