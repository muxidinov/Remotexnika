'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Phone, Send, Clock, MapPin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { contactInfo } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

interface ContactProps {
  onBookClick: () => void;
}

export function Contact({ onBookClick }: ContactProps) {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  const contactCards = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: contactInfo.phone,
      href: `tel:${contactInfo.phoneHref}`,
      accent: 'primary',
    },
    {
      icon: Send,
      label: 'Telegram',
      value: contactInfo.telegram,
      href: contactInfo.telegramHref,
      accent: 'accent',
    },
    {
      icon: Clock,
      label: t('contact.hours'),
      value: t('contact.hoursValue'),
      accent: 'success',
    },
    {
      icon: MapPin,
      label: t('contact.area'),
      value: t('contact.areaValue'),
      accent: 'primary',
    },
  ];

  return (
    <SectionWrapper id="contact" className="bg-muted/20">
      <SectionHeader
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        description={t('contact.description')}
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Contact cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
          {contactCards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.08}>
              <motion.a
                href={card.href || undefined}
                whileHover={prefersReduced ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className={
                  'group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover ' +
                  (card.href ? 'cursor-pointer' : 'cursor-default')
                }
              >
                <div
                  className={
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ' +
                    (card.accent === 'primary'
                      ? 'bg-primary/10 text-primary'
                      : card.accent === 'accent'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-success/10 text-success')
                  }
                >
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {card.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {card.value}
                  </span>
                  {card.href && (
                    <span className="mt-1 flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      {t('contact.go')} <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>

        {/* CTA card */}
        <Reveal delay={0.2} className="lg:col-span-2">
          <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-primary/80 p-8 text-center shadow-float">
            {/* Decorative elements */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-accent/20" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Phone className="h-7 w-7 text-white" />
            </div>

            <div className="relative flex flex-col gap-2">
              <h3 className="font-display text-xl font-bold text-white">
                {t('contact.urgent')}
              </h3>
              <p className="text-sm text-white/80">
                {t('contact.urgentText')}
              </p>
            </div>

            <Button
              onClick={onBookClick}
              size="lg"
              className="relative w-full bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              {t('action.book')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <a
              href={`tel:${contactInfo.phoneHref}`}
              className="relative flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {contactInfo.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
