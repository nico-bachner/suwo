import { twMerge } from 'tailwind-merge'

export const cn = (...args: unknown[]) =>
  twMerge(
    args
      .filter((x) => typeof x === 'string')
      .join(' ')
      .trim(),
  )
