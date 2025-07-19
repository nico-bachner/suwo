import z from 'zod'

import { $Enums } from '@/generated/prisma'

import { AttendanceValidator } from './attendance_validator'

export const routes = {
  API_ATTENDANCE: ({
    user_id,
    year,
    semester,
    week,
  }: z.infer<typeof AttendanceValidator>) =>
    `/api/attendance/${user_id}/${year}/${semester}/${week}`,
  ROLL_CALL: '/roll-call',
  CURRENT_WEEK_ROLL_CALL: (
    year: number,
    semester: $Enums.Semester,
    week: number,
  ) => [routes.ROLL_CALL, year.toString(), semester, week.toString()].join('/'),
}
