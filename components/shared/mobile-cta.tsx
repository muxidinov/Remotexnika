'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';

interface MobileCTAProps {
  onBookClick: () => void;
}

export function MobileCTA({ onBookClick }: MobileCTAProps) {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
    >
      <div className="bg-background/95 backdrop-blur-xl border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button
          onClick={onBookClick}
          size="lg"
          className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30"
        >
          <Wrench className="h-5 w-5 mr-2" />
          {t('action.book')}
        </Button>
      </div>
    </motion.div>
  );
}
