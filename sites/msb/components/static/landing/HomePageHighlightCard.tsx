import { CardHeader, CardMedia, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Image from 'next/image';
import { plural } from 'pluralize';
import slugify from 'voca/slugify';

const homePageHighlightCardFragment = gql(`
  fragment HomePageHighlightCard on Highlight {
    title
    image
    linkedItem {
      label
      item {
        __typename
        ... on BasePageWithSlug {
          slug
          title
        }
        ... on Url {
          url
          title
        }
      }
    }
  }
`);

export function HomePageHighlightCard(props: {
  data: FragmentType<typeof homePageHighlightCardFragment>;
  icon: string;
}) {
  const item = getFragmentData(homePageHighlightCardFragment, props.data);

  function getUrl() {
    if (item.linkedItem?.item) {
      if (
        'url' in item.linkedItem.item &&
        typeof item.linkedItem.item.url === 'string'
      )
        return item.linkedItem.item.url;
      if ('slug' in item.linkedItem.item) {
        const typename = item.linkedItem.item.__typename;
        if (typename === 'OrgUnit') {
          return `/departments/${item.linkedItem.item.slug}`;
        }
        return `/${plural(slugify(typename))}/${item.linkedItem.item.slug}`;
      }
    }
    return '';
  }

  return (
    <LinkCard href={getUrl()}>
      {item.image && (
        <CardMedia className="aspect-[2] overflow-hidden relative">
          <Image
            src={item.image.split('?')[0]} // Remove query params
            alt={'Featured Image of ' + item.title}
            loading="lazy"
            className="aspect-[2] object-cover h-full w-full"
            fill
          />
        </CardMedia>
      )}

      <CardHeader>
        <div className="flex items-center w-full gap-2">
          <div className="bg-secondary text-base-darkest rounded-full p-2 flex items-center justify-center">
            <span className={`iconify size-6 ${props.icon}`}></span>
          </div>
          <CardTitle>{item.title}</CardTitle>
        </div>
      </CardHeader>
    </LinkCard>
  );
}
