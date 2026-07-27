'use client';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────
   SHARED SCROLL ANIMATIONS — same style as the homepage
   Use these everywhere to get consistent scroll-triggered animations.
───────────────────────────────────────────────────────────────────── */

/* ── Variants ──────────────────────────────────────────────────────── */

export const containerVariants = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInVariant = (direction = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
    y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const textRevealVariant = (delay = 0) => ({
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', duration: 1.25, delay },
  },
});

export const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Shared viewport config ────────────────────────────────────────── */
export const VP = { once: false, amount: 0.12 };

/* ─────────────────────────────────────────────────────────────────────
   ScrollSection — wraps a group of items with stagger animation.
   Triggers every time you scroll into view (once: false).

   Usage:
     <ScrollSection stagger={0.1} delay={0}>
       <AnimItem>...</AnimItem>
       <AnimItem>...</AnimItem>
     </ScrollSection>
───────────────────────────────────────────────────────────────────── */
export function ScrollSection({ children, stagger = 0.1, delay = 0, style = {}, className = '' }) {
  return (
    <motion.div
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VP}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AnimItem — a single animated child item.
   Use inside <ScrollSection> or standalone with whileInView.

   direction: 'up' | 'down' | 'left' | 'right' | 'scale'
───────────────────────────────────────────────────────────────────── */
export function AnimItem({ children, direction = 'up', delay = 0, style = {}, className = '' }) {
  const variant = direction === 'scale' ? scaleUpVariant : fadeInVariant(direction, delay);
  return (
    <motion.div
      variants={variant}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AnimHeading — big section heading with spring reveal
───────────────────────────────────────────────────────────────────── */
export function AnimHeading({ children, delay = 0, style = {}, as = 'h2', className = '' }) {
  const Tag = motion[as] ?? motion.h2;
  return (
    <Tag
      variants={textRevealVariant(delay)}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AnimStagger — standalone stagger container that also applies
   viewport detection itself (no parent ScrollSection needed).

   Use for grids where you want each card to pop in.
───────────────────────────────────────────────────────────────────── */
export function AnimStagger({ children, stagger = 0.08, delay = 0, style = {}, className = '' }) {
  return (
    <motion.div
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VP}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AnimCard — standalone card with slide-up on scroll.
   Does NOT need to be wrapped in ScrollSection.
───────────────────────────────────────────────────────────────────── */
export function AnimCard({ children, delay = 0, direction = 'up', style = {}, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'up' ? 40 : -40, x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AnimLine — horizontal slide-in rows (like the homepage spec rows)
───────────────────────────────────────────────────────────────────── */
export function AnimLine({ children, delay = 0, from = 'right', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'right' ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
