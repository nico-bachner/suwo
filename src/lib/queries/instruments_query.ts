import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

const schema = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
  }),
)

type Instruments = z.infer<typeof schema>

export const instrumentsQuery = (): UseQueryOptions<Instruments> => ({
  queryKey: queryKeys.INSTRUMENTS(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.INSTRUMENTS(), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        const { data, success } = schema.safeParse(response.data)

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
