import { MetadataRoute } from 'next';

import { getBaseUrl } from '@/config';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

const makeSitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  return [
    {
      url: `${getBaseUrl()}`,
      lastModified,
      changeFrequency: 'daily',
    },
    {
      url: `${getBaseUrl()}/legal`,
      changeFrequency: 'never',
    },
  ];
};

export default makeSitemap;
