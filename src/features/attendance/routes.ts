import { UseQueryOptions } from '@tanstack/react-query'
import z, { prettifyError } from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { Attendance, WeeklyAttendances } from './types'
import {
  LogWeeklyAttendanceValidator,
  WeeklyAttendancesValidator,
} from './validators'

export const routes = {
  ATTENDANCES: () => createURL({ path: ['attendance'] }),
  WEEKLY_ATTENDANCES: (args: z.infer<typeof WeeklyAttendancesValidator>) =>
    createURL({ path: ['attendance', args.year, args.semester, args.week] }),
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

export const queryKeys = {
  WEEKLY_ATTENDANCES: (args: z.infer<typeof WeeklyAttendancesValidator>) => [
    'attendance',
    args.year,
    args.semester,
    args.week,
  ],
}

export const queries = {
  WEEKLY_ATTENDANCES: (
    args: WeeklyAttendances,
  ): UseQueryOptions<Attendance[]> => ({
    queryKey: queryKeys.WEEKLY_ATTENDANCES(args),
    queryFn: async () => {
      const response = await parseResponse(
        await fetch(apiRoutes.WEEKLY_ATTENDANCES(args)),
      )

      switch (response.status) {
        case StatusCode.OK: {
          const { data, error, success } = z
            .array(LogWeeklyAttendanceValidator)
            .safeParse(response.data)

          if (!success) {
            throw new Error(prettifyError(error))
          }

          return data
        }
        default:
          throw new Error('Failed to fetch attendance data')
      }
    },
  }),
}
