'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Fail-safe "animate in when scrolled into view" hook.
 *
 * Framer Motion's built-in `whileInView` relies on IntersectionObserver and,
 * when that never fires, content is left stuck at `opacity: 0` and becomes
 * permanently invisible. This hook keeps the reveal animation but guarantees
 * that content always becomes visible:
 *  - it starts visible during SSR / before hydration (no flash of blank page),
 *  - it uses a native IntersectionObserver when available,
 *  - and it falls back to revealing after a short timeout as a safety net.
 */
function useRevealInView<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Hide then reveal so the animation still plays, but never leaves it hidden.
    setVisible(false);

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.01 }
    );
    observer.observe(el);

    // Safety net: if the observer never fires (some browsers/embeds), reveal
    // anyway so content is never permanently hidden.
    const fallback = window.setTimeout(reveal, 700 + delay * 1000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  return { ref, visible };
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const { ref, visible } = useRevealInView<HTMLDivElement>(delay);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: StaggerProps) {
  const prefersReduced = useReducedMotion();
  const { ref, visible } = useRevealInView<HTMLDivElement>(delay);

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial={false}
      animate={visible ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const prefersReduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className,
}: CounterProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <CountUp value={value} suffix={suffix} prefix={prefix} duration={duration} disabled={prefersReduced} />
      </motion.span>
    </motion.span>
  );
}

function CountUp({
  value,
  suffix,
  prefix,
  duration,
  disabled,
}: {
  value: number;
  suffix: string;
  prefix: string;
  duration: number;
  disabled: boolean | null;
}) {
  if (disabled) {
    return (
      <>
        {prefix}
        {value.toLocaleString('ru-RU')}
        {suffix}
      </>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onUpdate={(latest) => {
        // framer-motion doesn't have built-in count-up, use simple approach
      }}
    >
      <SimpleCountUp value={value} suffix={suffix} prefix={prefix} duration={duration} />
    </motion.span>
  );
}

function SimpleCountUp({
  value,
  suffix,
  prefix,
  duration,
}: {
  value: number;
  suffix: string;
  prefix: string;
  duration: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    const timer = setTimeout(() => {
      setStarted(true);
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.floor(eased * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplay(value);
        }
      };
      requestAnimationFrame(animate);
    }, 300);

    return () => clearTimeout(timer);
  }, [started, value, duration]);

  return (
    <>
      {prefix}
      {display.toLocaleString('ru-RU')}
      {suffix}
    </>
  );
}
