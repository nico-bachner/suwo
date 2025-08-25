import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'

export const deleteSessionMutation = (
  queryClient: QueryClient,
): UseMutationOptions => ({
  mutationFn: async () => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...queryKeys.SESSION()] }), {
        method: 'DELETE',
      }),
    )

    switch (response.status) {
      case StatusCode.NoContent:
        return null
      case StatusCode.Unauthorized:
        throw new Error(response.error)
      default:
        throw new Error('Failed to fetch data')
    }
  },
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: () => {
    toast.success(`Successfully logged out`)
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.SESSION(),
    })
  },
})
