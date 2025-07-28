import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const mailingListPreferenceQuery = (): UseQueryOptions<boolean> => ({
  queryKey: queryKeys.MAILING_LIST_PREFERENCE(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.MAILING_LIST_PREFERENCE(), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        const { data, error, success } = z.boolean().safeParse(response.data)

        if (!success) {
          throw new Error(z.prettifyError(error))
        }

        return data
      }
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
