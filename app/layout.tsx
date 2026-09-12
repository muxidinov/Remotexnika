import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import StructuredData from '@/components/structured-data';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const siteUrl = 'https://tehmaster.uz';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ТехМастер — Ремонт бытовой техники с выездом на дом | Ташкент',
    template: '%s | ТехМастер',
  },
  description:
    'Профессиональный ремонт бытовой техники в Ташкенте. Ремонт холодильников, стиральных машин, посудомоечных машин, плит, духовок, кондиционеров. Быстрый выезд мастера на дом, честные цены, гарантия на работу.',
  keywords: [
    'ремонт бытовой техники',
    'ремонт холодильника',
    'ремонт стиральной машины',
    'ремонт техники Ташкент',
    'ремонт посудомоечной машины',
    'ремонт плиты',
    'ремонт духовки',
    'ремонт кондиционера',
    'вызов мастера на дом',
    'ТехМастер',
  ],
  authors: [{ name: 'ТехМастер' }],
  creator: 'ТехМастер',
  openGraph: {
    type: 'website',
    locale: 'ru_UZ',
    url: siteUrl,
    siteName: 'ТехМастер',
    title: 'ТехМастер — Ремонт бытовой техники с выездом на дом | Ташкент',
    description:
      'Профессиональный ремонт бытовой техники в Ташкенте. Быстрый выезд мастера на дом, честные цены, гарантия на работу.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ТехМастер — Ремонт бытовой техники',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ТехМастер — Ремонт бытовой техники с выездом на дом',
    description:
      'Профессиональный ремонт бытовой техники в Ташкенте. Быстрый выезд, честные цены, гарантия.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
