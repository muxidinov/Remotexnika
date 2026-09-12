'use client';

import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion';
import { ArrowRight, Phone, Star, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import {
  RefrigeratorIllustration,
  WashingMachineIllustration,
  AirConditionerIllustration,
  ScrewdriverIcon,
  WrenchIcon,
  GearIcon,
  SparkBolt,
  ToolBadge,
} from '@/components/illustrations/appliances';

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
}

export function Hero({ onBookClick, onServicesClick }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  const float = (delay: number, distance: number): TargetAndTransition => ({
    y: prefersReduced ? 0 : [0, -distance, 0],
    transition: {
      duration: 4 + delay * 0.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  });

  const floatRotate = (delay: number, distance: number, rotate: number): TargetAndTransition => ({
    y: prefersReduced ? 0 : [0, -distance, 0],
    rotate: prefersReduced ? 0 : [0, rotate, 0],
    transition: {
      duration: 5 + delay * 0.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  });

  return (
    <section id="hero" className="relative overflow-hidden bg-mesh pt-24 pb-16 sm:pt-28 md:pt-32 lg:pb-24">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: Text content */}
        <div className="flex flex-col items-start gap-6 pt-4 lg:pt-0">
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t('hero.open')} — {contactInfo.workingHoursShort}
          </motion.div>

          <motion.h1
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.75rem] text-balance"
          >
            {t('hero.title')}{' '}
            <span className="text-gradient">{t('hero.titleAccent')}</span>
          </motion.h1>

          <motion.p
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg text-pretty"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              onClick={onBookClick}
              size="lg"
              className="h-12 px-7 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25"
            >
              {t('action.book')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={onServicesClick}
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base font-semibold border-border bg-background/50 backdrop-blur-sm hover:bg-muted"
            >
              {t('hero.services')}
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>{t('hero.fast')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>{t('hero.warranty')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <span>{t('hero.reviews')}</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Floating illustration composition */}
        <div className="relative flex h-[380px] items-center justify-center sm:h-[460px] lg:h-[560px]">
          {/* Central background card */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 h-[300px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 to-accent/5 shadow-float backdrop-blur-sm sm:h-[360px] sm:w-[320px]"
          >
            <div className="absolute inset-0 rounded-3xl bg-dot-pattern opacity-40" />
          </motion.div>

          {/* Refrigerator — main appliance */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ ...float(0, 14), opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-[8%] top-[8%] h-[200px] w-[150px] sm:h-[240px] sm:w-[180px] lg:left-[10%] lg:top-[5%]"
          >
            <div className="h-full w-full rounded-2xl bg-background/80 backdrop-blur-sm shadow-card">
              <RefrigeratorIllustration className="h-full w-full p-3" />
            </div>
          </motion.div>

          {/* Washing machine */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ ...float(0.8, 10), opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute right-[5%] bottom-[10%] h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] lg:right-[8%] lg:bottom-[8%]"
          >
            <div className="h-full w-full rounded-2xl bg-background/80 backdrop-blur-sm shadow-card">
              <WashingMachineIllustration className="h-full w-full p-3" />
            </div>
          </motion.div>

          {/* Air conditioner — top right */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ ...float(1.2, 8), opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute right-[8%] top-[2%] h-[80px] w-[140px] sm:h-[100px] sm:w-[170px] lg:right-[6%] lg:top-[0%]"
          >
            <div className="h-full w-full rounded-2xl bg-background/80 backdrop-blur-sm shadow-card">
              <AirConditionerIllustration className="h-full w-full p-3" />
            </div>
          </motion.div>

          {/* Screwdriver — floating tool */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ ...floatRotate(0.5, 12, 5), opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute left-[2%] bottom-[20%] h-[70px] w-[40px] sm:h-[90px] sm:w-[50px]"
          >
            <ScrewdriverIcon className="h-full w-full" />
          </motion.div>

          {/* Wrench — floating tool */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ ...floatRotate(0.7, 10, -6), opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="absolute right-[0%] top-[40%] h-[70px] w-[50px] sm:h-[90px] sm:w-[60px]"
          >
            <WrenchIcon className="h-full w-full" />
          </motion.div>

          {/* Gear — decorative */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
            animate={{ ...float(1.5, 8), opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute left-[35%] bottom-[5%] h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]"
          >
            <GearIcon className="h-full w-full animate-spin-slow" />
          </motion.div>

          {/* Spark bolt */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
            animate={{ ...float(0.3, 14), opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="absolute left-[45%] top-[5%] h-[40px] w-[28px]"
          >
            <SparkBolt className="h-full w-full" />
          </motion.div>

          {/* Tool badge — trust seal */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ ...float(1.0, 10), opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
            className="absolute left-[40%] top-[35%] h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]"
          >
            <ToolBadge className="h-full w-full" />
          </motion.div>

          {/* Floating price tag */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -20 }}
            animate={{ ...float(1.8, 8), opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute left-[0%] top-[50%] hidden sm:block"
          >
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background/90 px-3 py-2 shadow-card backdrop-blur-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <Zap className="h-4 w-4 text-success" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-muted-foreground">{t('hero.diagnostics')}</span>
                <span className="text-sm font-semibold text-foreground">{t('hero.from50')}</span>
              </div>
            </div>
          </motion.div>

          {/* Floating rating tag */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ ...float(2.2, 7), opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute right-[2%] bottom-[35%] hidden sm:block"
          >
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background/90 px-3 py-2 shadow-card backdrop-blur-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <Star className="h-4 w-4 fill-accent text-accent" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-muted-foreground">{t('hero.rating')}</span>
                <span className="text-sm font-semibold text-foreground">4.9 / 5.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
