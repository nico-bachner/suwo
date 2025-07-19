import { useQuery } from '@tanstack/react-query'

import { Attendance } from '@/generated/prisma'
import { routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const WEEKLY_ATTENDANCES_BASE_QUERY_KEY = 'weekly-attendances'
export const getWeeklyAttendancesQueryKey = ({
  user_id,
  year,
  semester,
  week,
}: Attendance) => [
  WEEKLY_ATTENDANCES_BASE_QUERY_KEY,
  year,
  semester,
  week,
  user_id,
]

export const useAttendanceEntryQuery = (args: Attendance) => {
  const { data, error, isPending } = useQuery({
    queryKey: getWeeklyAttendancesQueryKey(args),
    queryFn: async () => {
      const response = await parseResponse(
        await fetch(routes.API_ATTENDANCE(args)),
      )

      switch (response.status) {
        case StatusCode.OK:
          return response.data as boolean
        default:
          throw new Error('Failed to fetch attendance data')
      }
    },
  })

  if (error) {
    return {
      present: null,
      error,
      isPending,
    }
  }

  if (isPending) {
    return {
      present: null,
      error: null,
      isPending,
    }
  }

  return {
    present: data,
    error: null,
    isPending,
  }
}
