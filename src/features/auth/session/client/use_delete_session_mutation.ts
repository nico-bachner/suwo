import { useMutation, useQueryClient } from '@tanstack/react-query'

import { routes } from '@/routes'

import { SESSION_QUERY_KEY } from './use_session_query'

export const useDeleteSessionMutation = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await fetch(routes.API_SESSION, {
        method: 'DELETE',
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: SESSION_QUERY_KEY,
      })
    },
  })

  return {
    deleteSession: mutateAsync,
  }
}
