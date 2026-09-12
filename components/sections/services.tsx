'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/reveal';
import { services } from '@/lib/constants';
import { getApplianceIllustration } from '@/components/illustrations/appliances';
import { useLanguage } from '@/lib/i18n';

interface ServicesProps {
  onBookClick: (appliance?: string) => void;
}

export function Services({ onBookClick }: ServicesProps) {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <SectionWrapper id="services">
      <SectionHeader
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        description={t('services.description')}
      />

      <div className="mt-12 sm:mt-16">
        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Illustration = getApplianceIllustration(service.id);
            return (
              <StaggerItem key={service.id}>
                <motion.article
                  whileHover={prefersReduced ? undefined : { y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  {/* Hover gradient accent */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/5 group-hover:to-accent/5 group-hover:opacity-100" />

                  {/* Illustration */}
                  <div className="relative mb-5 flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 p-4">
                    <motion.div
                      whileHover={prefersReduced ? undefined : { scale: 1.08, rotate: -2 }}
                      transition={{ duration: 0.3 }}
                      className="h-20 w-20"
                    >
                      <Illustration className="h-full w-full" />
                    </motion.div>

                    {/* Floating price tag */}
                    <div className="absolute right-3 top-3 rounded-lg border border-border bg-background/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm">
                      {t('services.from')} {(service.priceFrom / 1000).toFixed(0)} 000 {t('services.currency')}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-4 flex flex-col gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Check className="h-4 w-4 text-success shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => onBookClick(service.id)}
                    className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5"
                  >
                    {t('services.order')}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-0" />
                  </button>

                  {/* Bottom accent line */}
                  <div className="mt-5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Other services note */}
      <Reveal delay={0.2} className="mt-10">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center sm:flex-row sm:justify-center sm:text-left">
          <p className="text-sm text-muted-foreground sm:text-base">
            {t('services.other')}
          </p>
          <button
            onClick={() => onBookClick('other')}
            className="shrink-0 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            {t('quick.submit')}
          </button>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
