import { useQuery } from '@tanstack/react-query'

import { routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { Session } from '../types'

export const SESSION_QUERY_KEY = ['session']

export const useSessionQuery = () => {
  const { data, error, isPending } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const response = await parseResponse(await fetch(routes.API_SESSION))

      switch (response.status) {
        case StatusCode.OK:
          return response.data as Session
        default:
          throw new Error('Failed to fetch session data')
      }
    },
    staleTime: Infinity,
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
