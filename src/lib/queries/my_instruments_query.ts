import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const MyInstrumentsQueryValidator = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
  }),
)

export type MyInstrumentsQueryResult = z.infer<
  typeof MyInstrumentsQueryValidator
>

export const myInstrumentsQuery =
  (): UseQueryOptions<MyInstrumentsQueryResult> => ({
    queryKey: queryKeys.MY_INSTRUMENTS(),
    queryFn: async ({ signal }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.MY_INSTRUMENTS(), { signal }),
      )

      switch (response.status) {
        case StatusCode.OK: {
          const { data, success } = MyInstrumentsQueryValidator.safeParse(
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
