import { z } from 'zod'

export const validateFamilyName = async (value: FormDataEntryValue | null) =>
  z
    .optional(
      z
        .string()
        .max(30, {
          message: 'Family name must be at most 30 characters long',
        })
        .trim(),
    )
    .safeParseAsync(value)
