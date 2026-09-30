
import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import Script from 'next/script';

import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import StructuredData from '@/components/structured-data';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
});

const siteUrl = 'https://remontexnika.uz';
const siteName = 'ТехМастер';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  title: {
    default:
      'ТехМастер — Ремонт бытовой техники на дому в Ташкенте',
    template: '%s | ТехМастер',
  },

  description:
    'Ремонт бытовой техники в Ташкенте с выездом мастера на дом. Холодильники, стиральные машины, посудомоечные машины, плиты, духовки и кондиционеры. Быстрый выезд, диагностика и гарантия на выполненные работы.',

  keywords: [
    'ремонт холодильник',
    'ремонт стиральных машин',
    'ремонт бытовой техники',
    'ремонт посудомоечных машин',
    'ремонт бытовой техники Ташкент',
    'ремонт бытовой техники на дому',
    'ремонт холодильников Ташкент',
    'ремонт стиральных машин Ташкент',
    'ремонт посудомоечных машин Ташкент',
    'ремонт электроплит Ташкент',
    'ремонт газовых плит Ташкент',
    'ремонт духовок Ташкент',
    'ремонт кондиционеров Ташкент',
    'мастер по ремонту бытовой техники',
    'вызов мастера на дом Ташкент',
    'сервис бытовой техники Ташкент',
    'ТехМастер',
  ],

  authors: [
    {
      name: siteName,
      url: siteUrl,
    },
  ],

  creator: siteName,
  publisher: siteName,

  category: 'Home Appliance Repair',

  alternates: {
    canonical: siteUrl,
    languages: {
      'ru-RU': siteUrl,
    },
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'NpbBQYpKtU_c27Nkb2IoVY6ojvxr16RzSABajAHU-xo',
  },

  openGraph: {
    type: 'website',
    locale: 'ru_UZ',
    url: siteUrl,

    siteName,

    title:
      'ТехМастер — Ремонт бытовой техники на дому в Ташкенте',

    description:
      'Профессиональный ремонт бытовой техники с выездом мастера на дом в Ташкенте. Быстро и качественно устраняем неисправности холодильников, стиральных машин, кондиционеров, газовых плит и другой техники. Опытные мастера проводят точную диагностику, используют качественные запчасти и предоставляют гарантию на выполненные работы. Прозрачные цены, оперативный выезд и внимательное отношение к каждому клиенту.',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt:
          'ТехМастер — ремонт бытовой техники в Ташкенте',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'ТехМастер — Ремонт бытовой техники в Ташкенте',

    description:
      'Ремонт бытовой техники с выездом мастера на дом в Ташкенте. Быстрый выезд, диагностика и гарантия.',

    images: ['/og-image.jpg'],
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  other: {
    'geo.region': 'UZ-TK',
    'geo.placename': 'Tashkent',
    'geo.position': '41.2995;69.2401',
    ICBM: '41.2995, 69.2401',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18449118530"
          strategy="afterInteractive"
        />
<Script
          id="google-ads-gtag"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'AW-18449118530');
          `}
        </Script>
      </head>

      <body className="font-sans antialiased">
        <StructuredData />

        {children}

        <Toaster
          position="top-center"
          richColors
        />
      </body>
    </html>
  );
}
