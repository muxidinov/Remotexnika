'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone, Wrench, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { contactInfo } from '@/lib/constants';
import { languages, languageNames, useLanguage } from '@/lib/i18n';

interface NavbarProps {
  onBookClick: () => void;
}

export function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const { language, setLanguage, t } = useLanguage();
  const links = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.how'), href: '#how-it-works' },
    { label: t('nav.reviews'), href: '#reviews' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5"
            aria-label="ТехМастер"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 lg:h-10 lg:w-10">
              <Wrench className="h-5 w-5 lg:h-6 lg:w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent ring-2 ring-background" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight text-foreground lg:text-xl">
                ТехМастер
              </span>
              <span className="text-[10px] font-medium text-muted-foreground lg:text-xs">
                {t('brand.tagline')}
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <a
              href={`tel:${contactInfo.phoneHref}`}
              className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              {contactInfo.phone}
            </a>
            <Button
              onClick={onBookClick}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              {t('action.book')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground lg:hidden"
            aria-label={mobileOpen ? t('menu.close') : t('menu.open')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <span className="font-display text-lg font-bold">{t('menu.title')}</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
                  aria-label={t('menu.close')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 p-5">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 border-t border-border p-5">
                <LanguageSwitcher language={language} setLanguage={setLanguage} fullWidth />
                <a
                  href={`tel:${contactInfo.phoneHref}`}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.phone}
                </a>
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    onBookClick();
                  }}
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t('action.book')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitcher({
  language,
  setLanguage,
  fullWidth = false,
}: {
  language: ReturnType<typeof useLanguage>['language'];
  setLanguage: ReturnType<typeof useLanguage>['setLanguage'];
  fullWidth?: boolean;
}) {
  return (
    <div className={cn('flex items-center rounded-xl border border-border bg-background/80 p-1 shadow-sm', fullWidth && 'w-full justify-center')}>
      {!fullWidth && <Languages className="mx-1.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />}
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-label={languageNames[code]}
          aria-pressed={language === code}
          title={languageNames[code]}
          className={cn(
            'rounded-lg px-2 py-1 text-xs font-bold uppercase transition-colors',
            language === code ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
