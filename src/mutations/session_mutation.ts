import { QueryClient, UseMutationOptions } from '@tanstack/react-query'

import { apiRoutes, queryKeys } from '@/routes'

export const deleteSessionMutation = (
  queryClient: QueryClient,
): UseMutationOptions => ({
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
