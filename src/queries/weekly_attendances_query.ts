import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { WeeklyAttendances } from '@/features/attendance/types'
import { LogWeeklyAttendanceValidator } from '@/features/attendance/validators'
import { Attendance } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const weeklyAttendancesQuery = (
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
          throw new Error(z.prettifyError(error))
        }

        return data
      }
      default:
        throw new Error('Failed to fetch attendance data')
    }
  },
})
