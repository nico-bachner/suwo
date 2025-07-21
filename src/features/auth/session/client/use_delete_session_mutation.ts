import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiRoutes, queryKeys } from '@/routes'

export const useDeleteSessionMutation = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await fetch(apiRoutes.SESSION(), {
        method: 'DELETE',
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.SESSION(),
      })
    },
  })

  return {
    deleteSession: mutateAsync,
  }
}
