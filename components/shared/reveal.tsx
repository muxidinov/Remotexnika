'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

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
  once = true,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
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
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
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

import { useEffect, useState } from 'react';

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
