"use client";

import { m, type Variants } from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Fade + slide up. Under reduced motion, MotionConfig keeps only the fade. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/** Animates its children in once, when they scroll into view (§7). */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child. */
  gap?: number;
  as?: "div" | "ul" | "ol";
};

/** Parent that reveals each <StaggerItem> one after another. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  as = "div",
}: StaggerProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Component = m[as];
  return (
    <Component className={className} variants={revealVariants}>
      {children}
    </Component>
  );
}
