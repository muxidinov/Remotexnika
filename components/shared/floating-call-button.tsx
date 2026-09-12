'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { contactInfo } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

/**
 * Permanent floating "call us" button.
 *
 * A single tap/click opens the device's phone dialer with the company number
 * already filled in. This is a plain `<a href="tel:…">` link — no form, no
 * popup, no extra step — so it works on iPhone, Android, tablets and desktop
 * (where the OS/browser opens the default calling app if one is available).
 */
export function FloatingCallButton() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();
  const label = t('call.button');

  return (
    <motion.a
      href={`tel:${contactInfo.phoneHref}`}
      aria-label={`${label} ${contactInfo.phone}`}
      title={`${label} ${contactInfo.phone}`}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="group fixed bottom-24 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142_71%_45%)] text-white shadow-lg shadow-[hsl(142_71%_45%)]/40 ring-1 ring-white/20 transition-shadow duration-300 hover:bg-[hsl(142_71%_40%)] hover:shadow-xl hover:shadow-[hsl(142_71%_45%)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      {/* Soft pulsing ring — purely decorative, hidden for reduced-motion users */}
      {!prefersReduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[hsl(142_71%_45%)]/60 animate-pulse-ring"
        />
      )}

      <Phone className="relative h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
    </motion.a>
  );
}
