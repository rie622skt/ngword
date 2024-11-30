import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export function AnimatedPage({ children, className = "", delay = 0 }: AnimatedPageProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{
        ...pageTransition,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const listItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const buttonVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const modalVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
};

export const slideVariants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }
};

export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};