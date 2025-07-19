import z from 'zod'

import { Semester } from '@/generated/prisma'
import { WeekValidator } from '@/validators/week'
import { YearValidator } from '@/validators/year'

export const AttendanceValidator = z.object({
  user_id: z.uuidv4(),
  year: YearValidator,
  semester: z.enum(Semester),
  week: WeekValidator,
})
