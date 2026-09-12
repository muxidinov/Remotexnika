'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote, PenLine, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { StaggerContainer, StaggerItem, Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { reviews as staticReviews, type Review } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

export function Reviews() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : { reviews: [] }))
      .then((data: { reviews?: Review[] }) => {
        if (active && Array.isArray(data.reviews)) setUserReviews(data.reviews);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const handleSubmitted = useCallback((review: Review) => {
    setUserReviews((prev) => [review, ...prev]);
    setFormOpen(false);
  }, []);

  // Show at most 9 reviews in total — newest (user-submitted) first.
  // Older reviews are dropped from the list automatically. The overall
  // rating shown above stays fixed and is NOT affected by this list.
  const MAX_VISIBLE_REVIEWS = 9;
  const allReviews: Review[] = [...userReviews, ...staticReviews].slice(0, MAX_VISIBLE_REVIEWS);

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

      {/* Leave-a-review CTA / form */}
      <Reveal delay={0.1} className="mt-8">
        {formOpen ? (
          <ReviewForm onSubmitted={handleSubmitted} onCancel={() => setFormOpen(false)} />
        ) : (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border-dashed border-primary/30 bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-lg font-bold text-foreground">
                {t('reviews.leaveTitle')}
              </h3>
              <p className="text-sm text-muted-foreground">{t('reviews.leaveText')}</p>
            </div>
            <Button
              onClick={() => setFormOpen(true)}
              size="lg"
              className="shrink-0 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <PenLine className="h-4 w-4" />
              {t('reviews.leave')}
            </Button>
          </div>
        )}
      </Reveal>

      {/* Reviews grid */}
      <div className="mt-12 sm:mt-16">
        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allReviews.map((review, i) => (
            <StaggerItem key={review.id ?? i}>
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
                <div className="flex items-center gap-2">
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
                  {review.id && (
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                      {t('reviews.new')}
                    </span>
                  )}
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
                    {review.location && (
                      <span className="text-xs text-muted-foreground">
                        {review.location}
                      </span>
                    )}
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

interface ReviewFormProps {
  onSubmitted: (review: Review) => void;
  onCancel: () => void;
}

function ReviewForm({ onSubmitted, onCancel }: ReviewFormProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [appliance, setAppliance] = useState('');
  const [location, setLocation] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (
      name.trim().length < 2 ||
      appliance.trim().length < 2 ||
      text.trim().length < 10 ||
      rating < 1 ||
      rating > 5
    ) {
      setError(t('reviews.formError'));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          appliance: appliance.trim(),
          location: location.trim(),
          text: text.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || t('reviews.formFailed'));

      setSuccess(true);
      onSubmitted(result.review as Review);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : t('reviews.formFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border-success/30 bg-success/5 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success">
          <CheckCircle2 className="h-7 w-7 text-success-foreground" />
        </div>
        <p className="text-base font-semibold text-foreground">{t('reviews.formSuccess')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <PenLine className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {t('reviews.leaveTitle')}
          </h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {t('reviews.cancel')}
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="review-name">{t('reviews.formName')}</Label>
          <Input
            id="review-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('reviews.formNamePlaceholder')}
            autoComplete="name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="review-appliance">{t('reviews.formAppliance')}</Label>
          <Input
            id="review-appliance"
            value={appliance}
            onChange={(e) => setAppliance(e.target.value)}
            placeholder={t('reviews.formAppliancePlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t('reviews.formRating')}</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`${value}`}
                aria-pressed={rating === value}
                className="rounded-lg p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    'h-7 w-7 transition-colors',
                    value <= rating ? 'fill-accent text-accent' : 'text-muted'
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="review-location">
            {t('reviews.formLocation')}{' '}
            <span className="text-muted-foreground">({t('reviews.formOptional')})</span>
          </Label>
          <Input
            id="review-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t('reviews.formLocationPlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="review-text">{t('reviews.formComment')}</Label>
          <Textarea
            id="review-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('reviews.formCommentPlaceholder')}
            rows={4}
            className="resize-none"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={submitting} size="lg" className="gap-2">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('reviews.formSending')}
            </>
          ) : (
            <>
              <PenLine className="h-4 w-4" />
              {t('reviews.formSubmit')}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
