export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ТехМастер',
    description:
      'Профессиональный ремонт бытовой техники в Ташкенте. Ремонт холодильников, стиральных машин, посудомоечных машин, плит, духовок, кондиционеров. Быстрый выезд мастера на дом.',
    image: 'https://remontexnika.uz/og-image.jpg',
    url: 'https://remontexnika.uz',
    telephone: '+998901200796',
    priceRange: 'от 50 000 сум',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ташкент',
      addressCountry: 'UZ',
    },
    areaServed: 'Ташкент',
    openingHours: 'Mo-Su 00:00-24:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги по ремонту бытовой техники',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ремонт холодильников',
            description: 'Устранение утечек фреона, замена компрессоров, термостатов',
          },
          price: '100000',
          priceCurrency: 'UZS',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ремонт стиральных машин',
            description: 'Ремонт системы слива, замена подшипников и ТЭНов',
          },
          price: '100000',
          priceCurrency: 'UZS',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ремонт кондиционеров',
            description: 'Заправка фреона, чистка сплит-систем, замена компрессоров',
          },
          price: '120000',
          priceCurrency: 'UZS',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Диагностика',
            description: 'Профессиональная диагностика бытовой техники',
          },
          price: '50000',
          priceCurrency: 'UZS',
        },
      ],
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ТехМастер',
    url: 'https://remontexnika.uz',
    inLanguage: 'ru',
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Сколько стоит диагностика?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Диагностика стоит от 50 000 сум. Если вы заказываете ремонт у нас, диагностика проводится бесплатно.',
        },
      },
      {
        '@type': 'Question',
        name: 'Мастер приезжает домой?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, мы ремонтируем технику на дому у клиента. Большинство поломок устраняются на месте за один визит.',
        },
      },
      {
        '@type': 'Question',
        name: 'Есть ли гарантия?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, мы предоставляем гарантию до 12 месяцев на все виды работ и заменённые запчасти.',
        },
      },
      {
        '@type': 'Question',
        name: 'Можно ли вызвать мастера в выходной день?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, мы работаем круглосуточно — 24/7, без выходных. Вы можете оставить заявку в любое время.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
