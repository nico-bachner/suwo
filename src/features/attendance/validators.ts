import z from 'zod'

import { Semester } from '@/generated/prisma'
import { WeekCoerceValidator, WeekValidator } from '@/validators/week'
import { YearCoerceValidator, YearValidator } from '@/validators/year'

export const WeeklyAttendancesValidator = z.object({
  year: YearValidator,
  semester: z.enum(Semester),
  week: WeekValidator,
})
export const WeeklyAttendancesCoerceValidator = z.object({
  year: YearCoerceValidator,
  semester: z.enum(Semester),
  week: WeekCoerceValidator,
})

export const LogWeeklyAttendanceValidator = z.object({
  ...WeeklyAttendancesValidator.shape,
  user_id: z.uuidv4(),
})
export const LogWeeklyAttendanceCoerceValidator = z.object({
  ...WeeklyAttendancesCoerceValidator.shape,
  user_id: z.uuidv4(),
})
