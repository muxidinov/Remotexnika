'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { StaggerContainer, StaggerItem } from '@/components/shared/reveal';
import { benefits } from '@/lib/constants';
import { AnimatedCounter } from '@/components/shared/reveal';
import { useLanguage } from '@/lib/i18n';

export function WhyChooseUs() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();
  const localizedStats = [
    { value: 5000, suffix: '+', label: t('stat.repairs') },
    { value: 8, suffix: ' ' + (t('stat.experience') === 'Ish tajribasi' ? 'yil' : t('stat.experience') === 'Years of experience' ? 'years' : 'лет'), label: t('stat.experience') },
    { value: 12, suffix: ' ' + (t('stat.warranty') === 'Ishlarga kafolat' ? 'oy' : t('stat.warranty') === 'Warranty on repairs' ? 'mo.' : 'мес.'), label: t('stat.warranty') },
    { value: 15, suffix: ' ' + (t('stat.response') === 'O‘rtacha javob vaqti' ? 'daq' : t('stat.response') === 'Average response time' ? 'min' : 'мин'), label: t('stat.response') },
  ];

  return (
    <SectionWrapper id="why-us">
      <SectionHeader
        eyebrow={t('why.eyebrow')}
        title={t('why.title')}
        description={t('why.description')}
      />

      {/* Benefits grid */}
      <div className="mt-12 sm:mt-16">
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <motion.div
                whileHover={prefersReduced ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                {/* Decorative corner accent */}
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="relative flex flex-col gap-2">
                  <h3 className="font-display text-base font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Stats bar */}
      <div className="mt-12 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8 lg:grid-cols-4">
        {localizedStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-3xl font-bold text-primary sm:text-4xl"
            />
            <span className="text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
