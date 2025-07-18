import { z } from 'zod'

import { Semester } from '@/generated/prisma'
import { WeekValidator } from '@/lib/validators/week'
import { YearValidator } from '@/lib/validators/year'

export const AttendanceValidator = z.object({
  user_id: z.uuidv4(),
  year: YearValidator,
  semester: z.enum(Semester),
  week: WeekValidator,
})
