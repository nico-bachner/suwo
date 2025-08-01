import z from 'zod'

import {
  WeekCoerceValidator,
  WeekValidator,
} from '@/lib/validators/suwo_week_validator'
import {
  YearCoerceValidator,
  YearValidator,
} from '@/lib/validators/suwo_year_validator'
import { Semester } from '@/utils/date_manupulation/semester'

export const WeeklyAttendancesValidator = z.object({
  year: YearValidator,
  semester: z.enum(Semester),
  week: WeekValidator,
})
export const WeeklyAttendancesCoerceValidator = z.object({
  year: YearCoerceValidator,
  semester: z.coerce.number(),
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
