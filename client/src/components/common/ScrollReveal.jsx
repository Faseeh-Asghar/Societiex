import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal Component
 * -------------------------------------------------------------
 * A reusable, high-performance entrance animation wrapper using Framer Motion.
 * Triggers once when the element enters the viewport with smooth cubic-bezier easing.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  duration = 0.8,
  distance = 30,
}) {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Decisive smooth deceleration curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
