import { MetadataRoute } from 'next';

import { getBaseUrl } from '@/config';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#static-robotstxt

const makeRobots = (): MetadataRoute.Robots => ({
  // host: '',
  sitemap: `${getBaseUrl()}/sitemap.xml`,
  rules: {
    userAgent: '*',
    allow: ['/', '/api/og/*'],
    disallow: '/private/',
  },
});

export default makeRobots;
