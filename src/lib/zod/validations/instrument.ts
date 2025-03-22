import { z } from 'zod'

import { getInstruments } from '@/lib/db/instruments/get'

export const validateInstrument = async (value: FormDataEntryValue | null) => {
  const instruments = await getInstruments()

  return z
    .optional(
      z
        .string()
        .min(1)
        .max(30)
        .refine(
          (value) =>
            instruments.some((instrument) => instrument.name === value),
          {
            message: 'Not a known instrument',
          },
        ),
    )
    .safeParseAsync(value)
}
