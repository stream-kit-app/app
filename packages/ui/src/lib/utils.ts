import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Shared interactive item states (nav, menu, select, handler rows). */
export const itemBase = 'rounded-md transition-colors duration-150';
export const itemHover = 'hover:bg-item-hover hover:text-dark-50';
export const itemHighlighted = 'data-highlighted:bg-item-hover data-highlighted:text-dark-50';
export const itemActive = 'bg-item-active text-item-active-foreground';
