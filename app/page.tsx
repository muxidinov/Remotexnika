'use client';

import { useState, useCallback } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { MobileCTA } from '@/components/shared/mobile-cta';
import { RepairForm } from '@/components/sections/repair-form';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Pricing } from '@/components/sections/pricing';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Brands } from '@/components/sections/brands';
import { FAQ } from '@/components/sections/faq';
import { Reviews } from '@/components/sections/reviews';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { QuickRequest } from '@/components/sections/quick-request';
import { LanguageProvider } from '@/lib/i18n';
import type { ApplianceKey } from '@/lib/constants';

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleServicesClick = useCallback(() => {
    const el = document.querySelector('#services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleBookWithAppliance = useCallback((appliance?: string) => {
    // The form handles appliance selection internally via step 1
    // If a specific appliance is passed from services, we could pre-select it
    // For now, we open the form and let the user confirm
    setFormOpen(true);
  }, []);

  return (
    <LanguageProvider>
      <Navbar onBookClick={openForm} />

      <main>
        <Hero onBookClick={openForm} onServicesClick={handleServicesClick} />
        <QuickRequest />
        <Services onBookClick={handleBookWithAppliance} />
        <Pricing onBookClick={openForm} />
        <WhyChooseUs />
        <HowItWorks />
        <Brands />
        <Reviews />
        <FAQ />
        <Contact onBookClick={openForm} />
      </main>

      <Footer onBookClick={openForm} />
      <MobileCTA onBookClick={openForm} />
      <RepairForm open={formOpen} onClose={() => setFormOpen(false)} />
    </LanguageProvider>
  );
}
