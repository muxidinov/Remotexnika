'use client';

import { SectionWrapper } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { brands } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

export function Brands() {
  const { t } = useLanguage();
  // Duplicate for seamless marquee
  const marqueeBrands = [...brands, ...brands];

  return (
    <SectionWrapper className="py-12 sm:py-16">
      <Reveal className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {t('brands.title')}
        </p>
      </Reveal>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee gap-4">
          {marqueeBrands.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex h-16 shrink-0 items-center justify-center rounded-xl border border-border bg-card px-6 shadow-card sm:h-20 sm:px-10"
            >
              <span className="font-display text-lg font-bold text-foreground/70 transition-colors hover:text-foreground sm:text-xl">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
