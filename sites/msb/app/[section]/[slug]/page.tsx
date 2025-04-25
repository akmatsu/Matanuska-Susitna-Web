import PageController from '@/components/PageController';
import { getPageMeta } from '@/utils/pageHelpers';
import { toCamelCase } from '@/utils/stringHelpers';
import {
  GET_COMMUNITY_META_QUERY,
  GET_COMMUNITY_QUERY,
  GET_FACILITY_META,
  GET_FACILITY_QUERY,
  GET_ORG_UNIT_META_QUERY,
  GET_ORG_UNIT_QUERY,
  GET_PARK_META_QUERY,
  GET_PARK_QUERY,
  GET_PUBLIC_NOTICE,
  GET_PUBLIC_NOTICE_META,
  GET_SERVICE_META_QUERY,
  GET_SERVICE_QUERY,
  GET_TRAIL_META_QUERY,
  GET_TRAIL_QUERY,
} from '@msb/js-sdk';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { singular } from 'pluralize';
import { ComponentProps } from 'react';

type PageControllerProps = ComponentProps<typeof PageController>;

const queryMap: {
  [key: string]: {
    query: PageControllerProps['query'];
    metaQuery: PageControllerProps['query'];
    map?: PageControllerProps['map'];
  };
} = {
  services: {
    query: GET_SERVICE_QUERY,
    metaQuery: GET_SERVICE_META_QUERY,
  },
  communities: {
    query: GET_COMMUNITY_QUERY,
    metaQuery: GET_COMMUNITY_META_QUERY,
    map: {
      layerId: 'cc6808c179cc4f3ba282814afdc3882c',
      layerUrl:
        'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_Communities/FeatureServer',
      layerOpacity: 0.5,
      itemKey: 'CC_NAME',
    },
  },
  departments: {
    query: GET_ORG_UNIT_QUERY,
    metaQuery: GET_ORG_UNIT_META_QUERY,
  },
  facilities: {
    query: GET_FACILITY_QUERY,
    metaQuery: GET_FACILITY_META,
  },
  parks: {
    query: GET_PARK_QUERY,
    metaQuery: GET_PARK_META_QUERY,
  },
  'public-notices': {
    query: GET_PUBLIC_NOTICE,
    metaQuery: GET_PUBLIC_NOTICE_META,
  },
  trails: {
    query: GET_TRAIL_QUERY,
    metaQuery: GET_TRAIL_META_QUERY,
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> => {
  const { section, slug } = await params;
  const config = queryMap[section as keyof typeof queryMap];
  if (!config) {
    return {};
  }

  return getPageMeta(singular(section), config.metaQuery, slug);
};

export default async function Page(props: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await props.params;

  const config = queryMap[section as keyof typeof queryMap];

  if (!config) {
    return notFound();
  }

  return (
    <PageController
      query={config.query}
      listName={
        singular(toCamelCase(section)) as PageControllerProps['listName']
      }
      params={{ slug }}
      sideNav={section === 'services'}
      map={config.map}
    />
  );
}
