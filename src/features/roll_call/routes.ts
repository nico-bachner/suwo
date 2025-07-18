import { $Enums } from '@/generated/prisma'

export const routes = {
  API_ATTENDANCE: '/api/attendance',
  ROLL_CALL: '/roll-call',
  CURRENT_WEEK_ROLL_CALL: (
    year: number,
    semester: $Enums.Semester,
    week: number,
  ) => [routes.ROLL_CALL, year.toString(), semester, week.toString()].join('/'),
}
