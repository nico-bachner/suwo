import z from 'zod'

import { MAX_WEEK, MIN_WEEK } from '@/features/usyd_api_wrapper/config'

export const WeekValidator = z.int().min(MIN_WEEK).max(MAX_WEEK)
export const WeekCoerceValidator = z.coerce
  .number()
  .int()
  .min(MIN_WEEK)
  .max(MAX_WEEK)

export type Week = z.infer<typeof WeekValidator>
