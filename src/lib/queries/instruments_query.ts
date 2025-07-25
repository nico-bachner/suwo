import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { Instrument } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const instrumentsQuery = (): UseQueryOptions<Instrument[]> => ({
  queryKey: queryKeys.INSTRUMENTS(),
  queryFn: async () => {
    const response = await parseResponse(await fetch(apiRoutes.INSTRUMENTS()))

    switch (response.status) {
      case StatusCode.OK: {
        const { data, success } = z
          .array(
            z.object({
              name: z.string(),
              slug: z.string(),
              description: z.string().nullable(),
            }),
          )
          .safeParse(response.data)

        if (!success) {
          throw new Error('Invalid instrument data format')
        }

        return data
      }
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
