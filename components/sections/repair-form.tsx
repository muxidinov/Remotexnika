'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  applianceTypes,
  getApplianceLabel,
  type ApplianceKey,
} from '@/lib/constants';
import { getApplianceIllustration } from '@/components/illustrations/appliances';
import { useLanguage } from '@/lib/i18n';
import { repairRequestSchema, type RepairRequest } from '@/lib/validation';
import { toast } from 'sonner';

interface RepairFormProps {
  open: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

export function RepairForm({ open, onClose }: RepairFormProps) {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState<Step>(1);
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceKey | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useLanguage();
  const stepTitles: Record<Step, string> = {
    1: t('form.step1'),
    2: t('form.step2'),
    3: t('form.step3'),
    4: t('form.successTitle'),
  };

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<RepairRequest>({
    resolver: zodResolver(repairRequestSchema),
    defaultValues: {
      appliance: undefined,
      problem: '',
      name: '',
      phone: '',
      address: '',
      preferredTime: '',
      comment: '',
    },
    mode: 'onChange',
  });

  const problemValue = watch('problem');
  const nameValue = watch('name');
  const phoneValue = watch('phone');
  const addressValue = watch('address');
  const timeValue = watch('preferredTime');
  const commentValue = watch('comment');

  const handleApplianceSelect = (key: ApplianceKey) => {
    setSelectedAppliance(key);
  };

  const handleStep1Next = async () => {
    if (!selectedAppliance) {
      toast.error(t('form.selectAppliance'));
      return;
    }
    // Set the appliance value in form
    // We need to manually set it since it's not a form input
    setStep(2);
  };

  const handleStep2Next = async () => {
    const valid = await trigger('problem');
    if (!valid) return;
    setStep(3);
  };

  const handleStep3Back = () => {
    setStep(2);
  };

  const handleStep2Back = () => {
    setStep(1);
  };

  const onValidSubmit = async (data: RepairRequest) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = { ...data, appliance: selectedAppliance || data.appliance };
      const response = await fetch('/api/repair-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('quick.submit'));
      }

      setSubmitSuccess(true);
      setStep(4);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t('quick.submit');
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      reset();
      setSelectedAppliance(null);
      setStep(1);
      setSubmitSuccess(false);
      setSubmitError(null);
    }, 300);
  };

  const canProceedStep3 =
    nameValue?.length >= 2 &&
    phoneValue?.length >= 9 &&
    addressValue?.length >= 5 &&
    timeValue?.length >= 3;

  const progress = (step / 4) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            {/* Header with progress bar */}
            {step !== 4 && (
              <div className="flex flex-col gap-4 border-b border-border p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Wrench className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-display text-base font-bold text-foreground sm:text-lg">
                      {t('form.title')}
                    </span>
                  </div>
                  <button
                    onClick={handleClose}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={t('action.close')}
                  >
                    <ChevronRight className="h-5 w-5 rotate-180" />
                  </button>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-all duration-500',
                        s <= step ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {stepTitles[step]}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {t('form.step')} {step} {t('form.of')}
                  </span>
                </div>
              </div>
            )}

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <form onSubmit={handleSubmit(onValidSubmit)} className="flex flex-col gap-5">
                {/* STEP 1: Appliance selection */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
                    >
                      {applianceTypes.map((appliance) => {
                        const Illustration = getApplianceIllustration(appliance.key);
                        const isSelected = selectedAppliance === appliance.key;
                        return (
                          <button
                            key={appliance.key}
                            type="button"
                            onClick={() => handleApplianceSelect(appliance.key)}
                            className={cn(
                              'group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-center transition-all duration-300 sm:p-4',
                              isSelected
                                ? 'border-primary bg-primary/5 shadow-card'
                                : 'border-border bg-card hover:border-primary/40 hover:shadow-card'
                            )}
                          >
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              >
                                <Check className="h-3 w-3 text-primary-foreground" />
                              </motion.div>
                            )}
                            <div className="h-16 w-16 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                              <Illustration className="h-full w-full" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-semibold text-foreground sm:text-sm">
                                {t(`appliance.${appliance.key}`)}
                              </span>
                              <span className="text-[10px] text-muted-foreground sm:text-xs">
                                {appliance.shortDesc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* STEP 2: Problem description */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Wrench className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{t('form.selected')}</span>
                          <span className="text-sm font-semibold text-foreground">
                            {selectedAppliance && getApplianceLabel(selectedAppliance)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="problem" className="text-sm font-medium text-foreground">
                          {t('form.problem')}
                        </Label>
                        <Textarea
                          id="problem"
                          {...register('problem')}
                          placeholder={t('form.problemPlaceholder')}
                          rows={5}
                          className={cn(
                            'resize-none text-sm',
                            errors.problem && 'border-destructive focus-visible:ring-destructive'
                          )}
                        />
                        <div className="flex items-center justify-between">
                          {errors.problem ? (
                            <span className="flex items-center gap-1.5 text-xs text-destructive">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {errors.problem.message}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {t('form.problemHint')}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {problemValue?.length || 0}/1000
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Contact info */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        id="name"
                        label={t('form.fullName')}
                        icon={<User className="h-4 w-4" />}
                        placeholder={t('form.fullNamePlaceholder')}
                        error={errors.name?.message}
                        {...register('name')}
                      />
                      <FormField
                        id="phone"
                        label={t('quick.phone')}
                        icon={<Phone className="h-4 w-4" />}
                        placeholder="+998 90 123 45 67"
                        type="tel"
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <FormField
                        id="address"
                        label={t('form.address')}
                        icon={<MapPin className="h-4 w-4" />}
                        placeholder={t('form.addressPlaceholder')}
                        error={errors.address?.message}
                        {...register('address')}
                      />
                      <FormField
                        id="preferredTime"
                        label={t('form.time')}
                        icon={<Clock className="h-4 w-4" />}
                        placeholder={t('form.timePlaceholder')}
                        error={errors.preferredTime?.message}
                        {...register('preferredTime')}
                      />
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="comment" className="text-sm font-medium text-foreground">
                          {t('form.comment')}{' '}
                          <span className="text-muted-foreground">({t('form.optional')})</span>
                        </Label>
                        <Textarea
                          id="comment"
                          {...register('comment')}
                          placeholder={t('form.commentPlaceholder')}
                          rows={3}
                          className="resize-none text-sm"
                        />
                        {errors.comment && (
                          <span className="flex items-center gap-1.5 text-xs text-destructive">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.comment.message}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Success confirmation */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center gap-6 py-8 text-center"
                    >
                      <motion.div
                        initial={prefersReduced ? { opacity: 1 } : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', damping: 15, stiffness: 200 }}
                        className="relative flex h-20 w-20 items-center justify-center"
                      >
                        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success/20" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-success">
                          <CheckCircle2 className="h-8 w-8 text-success-foreground" />
                        </div>
                      </motion.div>

                      <div className="flex flex-col gap-2">
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {t('form.successTitle')}
                        </h3>
                        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
                          {t('form.successText')}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/30 p-4 text-left sm:w-full sm:max-w-md">
                        <SummaryRow label={t('form.summaryAppliance')} value={selectedAppliance ? t(`appliance.${selectedAppliance}`) : ''} />
                        <SummaryRow label={t('form.summaryName')} value={nameValue || ''} />
                        <SummaryRow label={t('form.summaryPhone')} value={phoneValue || ''} />
                        {addressValue && <SummaryRow label={t('form.summaryAddress')} value={addressValue} />}
                        {timeValue && <SummaryRow label={t('form.summaryTime')} value={timeValue} />}
                      </div>

                      <Button
                        onClick={handleClose}
                        size="lg"
                        variant="outline"
                        className="w-full sm:max-w-xs"
                      >
                        {t('action.close')}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Footer — navigation buttons */}
            {step !== 4 && (
              <div className="flex items-center justify-between gap-3 border-t border-border p-5 sm:p-6">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      if (step === 2) handleStep2Back();
                      else if (step === 3) handleStep3Back();
                    }}
                    className="gap-1.5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t('action.back')}
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (step === 1) handleStep1Next();
                      else if (step === 2) handleStep2Next();
                    }}
                    className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {t('action.next')}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}

                {step === 3 && (
                  <Button
                    type="button"
                    onClick={handleSubmit(onValidSubmit)}
                    disabled={submitting || !canProceedStep3}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        {t('action.submit')}
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormField({
  id,
  label,
  icon,
  error,
  type = 'text',
  placeholder,
  ...props
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  type?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            'pl-10 text-sm',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </span>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
