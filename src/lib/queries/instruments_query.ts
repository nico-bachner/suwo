import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const InstrumentsQueryValidator = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
  }),
)

export type InstrumentsQueryResult = z.infer<typeof InstrumentsQueryValidator>

export const instrumentsQuery =
  (): UseQueryOptions<InstrumentsQueryResult> => ({
    queryKey: queryKeys.INSTRUMENTS(),
    queryFn: async ({ signal }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.INSTRUMENTS(), { signal }),
      )

      switch (response.status) {
        case StatusCode.OK: {
          const { data, success } = InstrumentsQueryValidator.safeParse(
            response.data,
          )

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
