import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { Equipment } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const equipmentQuery = (): UseQueryOptions<Equipment[]> => ({
  queryKey: queryKeys.EQUIPMENT(),
  queryFn: async () => {
    const response = await parseResponse(await fetch(apiRoutes.EQUIPMENT()))

    switch (response.status) {
      case StatusCode.OK: {
        const { data, success } = z
          .array(
            z.object({
              id: z.uuid(),
              name: z.string(),
              inventory: z.int(),
              condition: z.string(),
              acquisition_date: z.date(),
              acquisition_price: z.number().nullable(),
              description: z.string().nullable(),
              created_at: z.date(),
              updated_at: z.date(),
            }),
          )
          .safeParse(response.data)

        if (!success) {
          throw new Error('Invalid data format')
        }

        return data
      }
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
