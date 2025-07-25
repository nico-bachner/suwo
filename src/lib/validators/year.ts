import z from 'zod'

import { FOUNDING_YEAR } from '@/config'

export const YearValidator = z
  .int()
  .min(FOUNDING_YEAR)
  .max(new Date().getFullYear())

export const YearCoerceValidator = z.coerce
  .number()
  .int()
  .min(FOUNDING_YEAR)
  .max(new Date().getFullYear())
