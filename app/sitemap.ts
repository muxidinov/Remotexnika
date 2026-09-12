import type { MetadataRoute } from 'next';

const siteUrl = 'https://tehmaster.uz';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    '',
    '#services',
    '#pricing',
    '#how-it-works',
    '#reviews',
    '#faq',
    '#contact',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
