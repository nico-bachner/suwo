import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Attendance } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'

export const useLogAttendanceMutation = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async (data: Attendance) => {
      await fetch(apiRoutes.LOG_WEEKLY_ATTENDANCE(data), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSettled: async (_, __, vars) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.WEEKLY_ATTENDANCES(vars),
      })
    },
  })

  return {
    logAttendance: mutateAsync,
  }
}
