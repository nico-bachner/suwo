import z from 'zod'

import { Semester } from '@/generated/prisma'
import { WeekCoerceValidator, WeekValidator } from '@/validators/week'
import { YearCoerceValidator, YearValidator } from '@/validators/year'

export const AttendanceValidator = z.object({
  user_id: z.uuidv4(),
  year: YearValidator,
  semester: z.enum(Semester),
  week: WeekValidator,
})

export const AttendanceCoerceValidator = z.object({
  user_id: z.uuidv4(),
  year: YearCoerceValidator,
  semester: z.enum(Semester),
  week: WeekCoerceValidator,
})
