import { Semester } from '@/lib/db/types'

export const routes = {
  ROLL_CALL: '/roll-call',
  getCurrentWeekRollCall: (year: number, semester: Semester, week: number) =>
    [routes.ROLL_CALL, year.toString(), semester, week.toString()].join('/'),
}
