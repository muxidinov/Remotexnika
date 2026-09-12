import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] text-balance',
          align === 'center' ? 'max-w-3xl' : 'max-w-2xl'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-base text-muted-foreground leading-relaxed text-pretty sm:text-lg',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function SectionWrapper({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-16 sm:py-20 md:py-28',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
