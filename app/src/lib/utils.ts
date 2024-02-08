import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const oneYearAgo = () => {
  const now = new Date();
  const yearAgoValue = now.setFullYear(now.getFullYear() - 1);
  return new Date(yearAgoValue).toISOString().split('T')[0];
};
