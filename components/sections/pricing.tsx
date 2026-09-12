'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Info } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { StaggerContainer, StaggerItem } from '@/components/shared/reveal';
import { pricing } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

interface PricingProps {
  onBookClick: () => void;
}

export function Pricing({ onBookClick }: PricingProps) {
  const prefersReduced = useReducedMotion();
  const { t, language } = useLanguage();

  return (
    <SectionWrapper id="pricing" className="bg-muted/20">
      <SectionHeader
        eyebrow={t('pricing.eyebrow')}
        title={t('pricing.title')}
        description={t('pricing.description')}
      />

      <div className="mt-12 sm:mt-16">
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((item) => (
            <StaggerItem key={item.service}>
              <motion.div
                whileHover={prefersReduced ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'group relative flex h-full flex-col rounded-2xl border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover',
                  item.service === 'Диагностика'
                    ? 'border-primary/30 ring-1 ring-primary/10'
                    : 'border-border'
                )}
              >
                {item.service === 'Диагностика' && (
                  <span className="absolute -top-2.5 left-5 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                    {t('pricing.hit')}
                  </span>
                )}
                <h3 className="text-sm font-semibold text-foreground">{item.service}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">{t('services.from')}</span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    {item.priceFrom.toLocaleString(language === 'en' ? 'en-US' : 'ru-RU')}
                  </span>
                  <span className="text-xs text-muted-foreground">{t('services.currency')}</span>
                </div>
                {item.note && (
                  <p className="mt-2 text-xs text-primary">{item.note}</p>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Info note */}
      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <Info className="h-5 w-5 text-accent" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">
            {t('pricing.how')}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('pricing.howText')}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
