import { z } from 'zod'

export const validateGivenName = async (value: FormDataEntryValue | null) =>
  z
    .string()
    .min(1, {
      message: 'Given name must be at least 1 character long',
    })
    .max(30, {
      message: 'Given name must be at most 30 characters long',
    })
    .trim()
    .safeParseAsync(value)
