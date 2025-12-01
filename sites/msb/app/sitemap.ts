import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import { MetadataRoute } from 'next';

const query = gql(`
  query GetAllPages {
    boardPage {
      updatedAt
    }
    communities {
      slug
      updatedAt
    }
    electionsPage {
      updatedAt
    }
    facilities {
      slug
      updatedAt
    }
    homePage {
      updatedAt
    }
    orgUnits {
      slug
      updatedAt
    }
    parks {
      slug
      updatedAt
    }
    plans {
      slug
      updatedAt
    }
    publicNotices {
      slug
      updatedAt
    }
    services {
      slug
      updatedAt
    }
    topics {
      slug,
      updatedAt
    }
    trails {
      slug
      updatedAt
    }
  }
`);

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://matsu.gov';
  const { data } = await getClientHandler({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 * 60 * 24 }, // revalidate once a day
      },
    },
  });

  const pages = [
    {
      url: baseUrl,
      lastModified: data?.homePage?.updatedAt || new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/boards`,
      lastModified: data?.boardPage?.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/elections`,
      lastModified: data?.electionsPage?.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ] satisfies MetadataRoute.Sitemap;

  if (data?.communities)
    data?.communities.forEach((c) => {
      pages.push({
        url: `${baseUrl}/communities/${c.slug}`,
        lastModified: c.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });

  if (data?.facilities)
    data?.facilities.forEach((f) => {
      pages.push({
        url: `${baseUrl}/facilities/${f.slug}`,
        lastModified: f.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });

  if (data?.orgUnits)
    data?.orgUnits.forEach((o) => {
      pages.push({
        url: `${baseUrl}/departments/${o.slug}`,
        lastModified: o.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });

  if (data?.parks)
    data?.parks.forEach((p) => {
      pages.push({
        url: `${baseUrl}/parks/${p.slug}`,
        lastModified: p.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });

  if (data?.plans)
    data?.plans.forEach((p) => {
      pages.push({
        url: `${baseUrl}/plans/${p.slug}`,
        lastModified: p.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });

  if (data?.publicNotices)
    data?.publicNotices.forEach((pn) => {
      pages.push({
        url: `${baseUrl}/public-notices/${pn.slug}`,
        lastModified: pn.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });

  if (data?.services)
    data?.services.forEach((s) => {
      pages.push({
        url: `${baseUrl}/services/${s.slug}`,
        lastModified: s.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });

  if (data?.topics)
    data?.topics.forEach((t) => {
      pages.push({
        url: `${baseUrl}/${t.slug}`,
        lastModified: t.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

  if (data?.trails)
    data?.trails.forEach((t) => {
      pages.push({
        url: `${baseUrl}/trails/${t.slug}`,
        lastModified: t.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });

  return pages;
}
