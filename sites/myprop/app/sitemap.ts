import type { MetadataRoute } from 'next';

const SITE_URL = 'https://myproperty.matsu.gov';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function toAbsoluteUrl(pathname: string): string {
  return new URL(`${basePath}${pathname}`, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: toAbsoluteUrl('/'),
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/search'),
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: toAbsoluteUrl('/taxmaps'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
