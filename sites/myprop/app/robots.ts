import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Stage serves real parcel data, so keep every non-production deploy out of search engines.
  if (process.env.DEPLOY_ENV !== 'production')
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://myproperty.matsu.gov/sitemap.xml',
  };
}
