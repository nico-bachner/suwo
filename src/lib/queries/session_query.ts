import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { Session } from '@/features/auth/session/types'
import { SessionValidator } from '@/features/auth/session/validator'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const sessionQuery = (): UseQueryOptions<Session | null> => ({
  queryKey: queryKeys.SESSION(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.SESSION(), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        // If the user is not authenticated, the response data will be null. This should not be handled as an error.
        if (response.data === null) {
          return null
        }

        // Validate the session data if it exists
        const { data, error, success } = SessionValidator.safeParse(
          response.data,
        )

        if (!success) {
          throw new Error(z.prettifyError(error))
        }

        return data
      }
      default:
        throw new Error('Failed to fetch session data')
    }
  },
  staleTime: Infinity,
})
