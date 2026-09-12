'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { StaggerContainer, StaggerItem } from '@/components/shared/reveal';
import { processSteps } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

export function HowItWorks() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <SectionWrapper id="how-it-works" className="bg-muted/20">
      <SectionHeader
        eyebrow={t('how.eyebrow')}
        title={t('how.title')}
        description={t('how.description')}
      />

      <div className="relative mt-12 sm:mt-16">
        {/* Connecting path — desktop */}
        <div className="absolute left-0 right-0 top-[3.5rem] hidden h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 lg:block" />

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {processSteps.map((step, index) => (
            <StaggerItem key={step.number}>
              <div className="group relative flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Number circle */}
                <motion.div
                  whileHover={prefersReduced ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/20 bg-card font-display text-2xl font-bold text-primary shadow-card transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  {step.number}
                  {/* Pulse dot between steps */}
                  {index < processSteps.length - 1 && (
                    <span className="absolute -right-1 -bottom-1 hidden h-3 w-3 rounded-full bg-accent ring-2 ring-card lg:block" />
                  )}
                </motion.div>

                {/* Content */}
                <div className="mt-5 flex flex-col gap-2">
                  <h3 className="font-display text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connecting line */}
                {index < processSteps.length - 1 && (
                  <div className="mt-6 h-8 w-px bg-gradient-to-b from-primary/30 to-transparent sm:hidden" />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}
