'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionWrapper, SectionHeader } from '@/components/shared/section';
import { faqItems } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

export function FAQ() {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="faq" className="bg-muted/20">
      <SectionHeader
        eyebrow={t('faq.eyebrow')}
        title={t('faq.title')}
        description={t('faq.description')}
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <AccordionItem
      value={`item-${index}`}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-card data-[state=open]:border-primary/30 data-[state=open]:shadow-card-hover"
    >
      <AccordionTrigger className="group flex items-center justify-between gap-4 p-5 text-left hover:no-underline sm:p-6">
        <span className="font-display text-base font-semibold text-foreground sm:text-lg">
          {question}
        </span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
