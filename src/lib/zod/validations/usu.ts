import { z } from 'zod'

export const validateUSU = async (value: FormDataEntryValue | null) =>
  z
    .optional(
      z
        .string()
        .regex(/^\d+$/, {
          message: 'USU number, if provided, must contain only digits',
        })
        .length(7, {
          message: 'USU number, if provided, must be 7 digits',
        })
        .transform(Number),
    )
    .safeParseAsync(value)
