import { useQuery } from '@tanstack/react-query'
import z, { prettifyError } from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { WeeklyAttendances } from './types'
import { LogWeeklyAttendanceValidator } from './validators'

export const useWeeklyAttendancesQuery = (args: WeeklyAttendances) => {
  const { data, error, isPending } = useQuery({
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
  })

  if (error) {
    return {
      attendances: null,
      error,
      isPending,
    }
  }

  if (isPending) {
    return {
      attendances: null,
      error: null,
      isPending,
    }
  }

  return {
    attendances: data,
    error: null,
    isPending,
  }
}
