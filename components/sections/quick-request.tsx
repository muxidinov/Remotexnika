'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Refrigerator, WashingMachine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionWrapper } from '@/components/shared/section';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

type QuickAppliance = 'refrigerator' | 'washing_machine';

export function QuickRequest() {
  const { t } = useLanguage();
  const [appliance, setAppliance] = useState<QuickAppliance>('refrigerator');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (name.trim().length < 2 || surname.trim().length < 2 || phone.trim().length < 9) {
      setError(t('quick.validation'));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/repair-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'quick', appliance, name: name.trim(), surname: surname.trim(), phone: phone.trim() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || t('quick.failed'));
      setSuccess(true);
      setName('');
      setSurname('');
      setPhone('');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : t('quick.failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const applianceOptions: Array<{ id: QuickAppliance; icon: typeof Refrigerator; label: string }> = [
    { id: 'refrigerator', icon: Refrigerator, label: t('quick.refrigerator') },
    { id: 'washing_machine', icon: WashingMachine, label: t('quick.washer') },
  ];

  return (
    <SectionWrapper id="quick-request" className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2 bg-gradient-to-r from-primary/8 via-accent/10 to-primary/8 blur-3xl" />
      <div className="overflow-hidden rounded-3xl border border-primary/15 bg-card p-5 shadow-float sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {t('quick.eyebrow')}
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{t('quick.title')}</h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{t('quick.description')}</p>
          </div>

          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm font-medium text-foreground">{t('quick.appliance')}</legend>
              <div className="grid grid-cols-2 gap-3">
                {applianceOptions.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setAppliance(id)}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-all',
                      appliance === id
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-left">{label}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <Label htmlFor="quick-name">{t('quick.name')}</Label>
              <Input id="quick-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('quick.namePlaceholder')} autoComplete="given-name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="quick-surname">{t('quick.surname')}</Label>
              <Input id="quick-surname" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder={t('quick.surnamePlaceholder')} autoComplete="family-name" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="quick-phone">{t('quick.phone')}</Label>
              <Input id="quick-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('quick.phonePlaceholder')} autoComplete="tel" />
            </div>

            {error && <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}
            {success && <p role="status" className="flex items-center gap-2 text-sm font-medium text-success sm:col-span-2"><CheckCircle2 className="h-4 w-4" />{t('quick.success')}</p>}

            <Button type="submit" disabled={submitting} className="h-12 w-full sm:col-span-2 sm:w-auto sm:justify-self-end">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('quick.sending')}</> : t('quick.submit')}
            </Button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
