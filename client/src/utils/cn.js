/**
 * cn() — Conditional class name utility.
 * Combines clsx (conditional logic) with tailwind-merge (conflict resolution).
 * Usage: cn('px-4 py-2', isActive && 'bg-white', className)
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
