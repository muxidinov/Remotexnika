'use client';

import { Wrench, Phone, Send, Clock, MapPin, Mail } from 'lucide-react';
import { contactInfo, services } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

interface FooterProps {
  onBookClick: () => void;
}

export function Footer({ onBookClick }: FooterProps) {
  const { t } = useLanguage();
  const footerServices = services.slice(0, 6).map((service) => ({ label: service.title, href: '#services' }));
  const navLinks = [
    { label: t('nav.services'), href: '#services' }, { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.how'), href: '#how-it-works' }, { label: t('nav.reviews'), href: '#reviews' },
    { label: t('nav.faq'), href: '#faq' }, { label: t('nav.contact'), href: '#contact' },
  ];
  const legalLinks = [
    { label: t('footer.privacy'), href: '#privacy' }, { label: t('footer.terms'), href: '#terms' },
  ];
  return (
    <footer className="relative border-t border-border bg-foreground pt-16 pb-24 text-background lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent ring-2 ring-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-background">
                  ТехМастер
                </span>
                <span className="text-[10px] text-background/60">
                  {t('brand.tagline')}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-background/70">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-background/90">
              {t('footer.services')}
            </h4>
            <ul className="flex flex-col gap-2">
              {footerServices.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-background/90">
              {t('footer.navigation')}
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-background/90">
              {t('footer.contacts')}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${contactInfo.phoneHref}`}
                  className="flex items-center gap-2.5 text-sm text-background/70 transition-colors hover:text-background"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-background/70 transition-colors hover:text-background"
                >
                  <Send className="h-4 w-4 text-primary" />
                  {contactInfo.telegram}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-background/70">
                <Mail className="h-4 w-4 text-primary" />
                {contactInfo.email}
              </li>
              <li className="flex items-center gap-2.5 text-sm text-background/70">
                <Clock className="h-4 w-4 text-primary" />
                {t('contact.hoursValue')}
              </li>
              <li className="flex items-center gap-2.5 text-sm text-background/70">
                <MapPin className="h-4 w-4 text-primary" />
                {t('contact.areaValue')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 sm:flex-row">
          <p className="text-xs text-background/50">
            © 2026 ТехМастер. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-background/50 transition-colors hover:text-background/80"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
