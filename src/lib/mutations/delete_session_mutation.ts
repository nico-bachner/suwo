import { QueryClient, UseMutationOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'

import { queryKeys } from '../queries'

export const deleteSessionMutation = (
  queryClient: QueryClient,
): UseMutationOptions => ({
  mutationFn: async () => {
    await fetch(createURL({ path: ['api', ...queryKeys.SESSION()] }), {
      method: 'DELETE',
    })
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.SESSION(),
    })
  },
})
