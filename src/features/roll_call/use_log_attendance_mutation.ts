import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Attendance } from '@/generated/prisma'
import { routes } from '@/routes'

import { getWeeklyAttendancesQueryKey } from './use_attendance_query'

export const useLogAttendanceMutation = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async (data: Attendance) => {
      await fetch(routes.API_ATTENDANCE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSettled: async (_, __, vars) => {
      await queryClient.invalidateQueries({
        queryKey: getWeeklyAttendancesQueryKey(vars),
      })
    },
  })

  return {
    logAttendance: mutateAsync,
  }
}
