import z from 'zod'

import { createURL } from '@/utils/http/create_url'

import { logWeeklyAttendanceMutation } from './log_attendance_mutation'
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

export const mutations = {
  LOG_WEEKLY_ATTENDANCE: logWeeklyAttendanceMutation,
}

export const apiRoutes = {
  WEEKLY_ATTENDANCES: (args: z.infer<typeof WeeklyAttendancesValidator>) =>
    createURL({
      path: ['api', 'attendance', args.year, args.semester, args.week],
    }),
  LOG_WEEKLY_ATTENDANCE: (args: z.infer<typeof LogWeeklyAttendanceValidator>) =>
    createURL({
      path: [
        'api',
        'attendance',
        args.year,
        args.semester,
        args.week,
        args.user_id,
      ],
    }),
}

export const routes = {
  ATTENDANCES: () => createURL({ path: ['attendance'] }),
  WEEKLY_ATTENDANCES: (args: z.infer<typeof WeeklyAttendancesValidator>) =>
    createURL({ path: ['attendance', args.year, args.semester, args.week] }),
}
