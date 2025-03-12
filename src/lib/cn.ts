export const cn = (...args: unknown[]) =>
  args
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
