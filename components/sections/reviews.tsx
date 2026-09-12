'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { StaggerContainer, StaggerItem } from '@/components/shared/reveal';
import { reviews } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

export function Reviews() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <SectionWrapper id="reviews">
      <SectionHeader
        eyebrow={t('reviews.eyebrow')}
        title={t('reviews.title')}
        description={t('reviews.description')}
      />

      {/* Rating summary */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <span className="font-display text-2xl font-bold text-foreground">4.9</span>
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-2xl font-bold text-foreground">500+</span>
          <span className="text-sm text-muted-foreground">{t('reviews.count')}</span>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="mt-12 sm:mt-16">
        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <StaggerItem key={i}>
              <motion.article
                whileHover={prefersReduced ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                {/* Quote icon */}
                <div className="absolute right-5 top-5 text-primary/10 transition-colors group-hover:text-primary/20">
                  <Quote className="h-10 w-10" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={
                        idx < review.rating
                          ? 'h-4 w-4 fill-accent text-accent'
                          : 'h-4 w-4 text-muted'
                      }
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="relative text-sm leading-relaxed text-foreground/80">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 font-display text-sm font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {review.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {review.location}
                    </span>
                  </div>
                  <div className="ml-auto flex flex-col items-end">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {review.appliance}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}
