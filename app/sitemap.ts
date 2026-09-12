import type { MetadataRoute } from 'next';

const siteUrl = 'https://tehmaster.uz';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // The site is a single landing page — section links (#services, #pricing, …)
  // are anchors on this same page, not separate URLs, so they must not be
  // listed as distinct sitemap entries.
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];
}
