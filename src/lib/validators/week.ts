import z from 'zod'

import { MAX_WEEK, MIN_WEEK } from '../usyd/config'

export const WeekValidator = z.int().min(MIN_WEEK).max(MAX_WEEK)
