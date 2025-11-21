import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (process.env.DEPLOY_ENV === 'production')
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/'],
      },
      sitemap: 'https://matsu.gov/sitemap.xml',
    };
  else
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
}
