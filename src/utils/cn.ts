import { twMerge } from 'tailwind-merge'

export const cn = (...args: unknown[]) =>
  twMerge(
    args
      .filter((arg) => typeof arg === 'string')
      .join(' ')
      .trim(),
  )
