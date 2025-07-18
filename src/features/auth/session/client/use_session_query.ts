import { useQuery } from '@tanstack/react-query'

import { routes } from '@/routes'

import { Session } from '../types'

export const SESSION_QUERY_KEY = ['session']

export const useSessionQuery = () => {
  const { data, error, isPending } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch(routes.API_SESSION)

      if (!response.ok) {
        throw new Error('Failed to fetch session')
      }

      const json = (await response.json()) as Session

      return json
    },
  })

  if (error) {
    return {
      session: null,
      error,
      isPending,
    }
  }

  if (isPending) {
    return {
      session: null,
      error: null,
      isPending,
    }
  }

  return {
    session: data,
    error: null,
    isPending,
  }
}
