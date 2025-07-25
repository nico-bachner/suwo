import { UseQueryOptions } from '@tanstack/react-query'

import { Week, WeekValidator } from '@/lib/validators/week'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const currentWeekQuery = (): UseQueryOptions<Week | null> => ({
  queryKey: queryKeys.CURRENT_WEEK(),
  queryFn: async () => {
    const response = await parseResponse(await fetch(apiRoutes.CURRENT_WEEK()))

    switch (response.status) {
      case StatusCode.OK: {
        const { data, success } = WeekValidator.safeParse(response.data)

        if (!success) {
          return null
        }

        return data
      }
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
