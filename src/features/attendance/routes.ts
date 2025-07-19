import z from 'zod'

import {
  LogWeeklyAttendanceValidator,
  WeeklyAttendancesValidator,
} from './validators'

export const queryKeys = {
  WEEKLY_ATTENDANCES: (args: z.infer<typeof WeeklyAttendancesValidator>) => [
    'attendance',
    args.year,
    args.semester,
    args.week,
  ],
}

export const apiRoutes = {
  WEEKLY_ATTENDANCES: (args: z.infer<typeof WeeklyAttendancesValidator>) =>
    ['/api/attendance', args.year, args.semester, args.week].join('/'),
  LOG_WEEKLY_ATTENDANCE: (args: z.infer<typeof LogWeeklyAttendanceValidator>) =>
    ['/api/attendance', args.year, args.semester, args.week, args.user_id].join(
      '/',
    ),
}

export const routes = {
  ATTENDANCES: () => '/attendance',
  WEEKLY_ATTENDANCES: (args: z.infer<typeof WeeklyAttendancesValidator>) =>
    ['/attendance', args.year, args.semester, args.week].join('/'),
}
