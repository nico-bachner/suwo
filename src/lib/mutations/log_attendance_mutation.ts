import { QueryClient, UseMutationOptions } from '@tanstack/react-query'

import { LogWeeklyAttendanceValidator } from '@/features/attendance/validators'
import { Attendance } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const logWeeklyAttendanceMutation = (
  queryClient: QueryClient,
): UseMutationOptions<
  Attendance | undefined,
  Error,
  Attendance,
  Attendance[]
> => ({
  mutationFn: async (data) => {
    const response = await parseResponse(
      await fetch(apiRoutes.LOG_WEEKLY_ATTENDANCE(data), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
      case StatusCode.Created:
        return LogWeeklyAttendanceValidator.parse(response.data)
      case StatusCode.BadRequest:
      case StatusCode.Unauthorized:
      case StatusCode.Forbidden:
      case StatusCode.NotFound:
      case StatusCode.InternalServerError:
        throw new Error(response.error)
    }
  },
  onMutate: async (variables) => {
    await queryClient.cancelQueries({
      queryKey: queryKeys.WEEKLY_ATTENDANCES(variables),
    })

    const snapshot = queryClient.getQueryData<Attendance[]>(
      queryKeys.WEEKLY_ATTENDANCES(variables),
    )

    queryClient.setQueryData<Attendance[]>(
      queryKeys.WEEKLY_ATTENDANCES(variables),
      (snapshot) => (snapshot ? [...snapshot, variables] : [variables]),
    )

    return snapshot
  },
  onError: (_, variables, context) => {
    queryClient.setQueryData<Attendance[]>(
      queryKeys.WEEKLY_ATTENDANCES(variables),
      context,
    )
  },
  onSettled: async (_, __, variables) => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.WEEKLY_ATTENDANCES(variables),
    })
  },
})
