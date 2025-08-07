import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const UserInstrumentsQueryValidator = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
  }),
)

export type UserInstrumentsQueryResult = z.infer<
  typeof UserInstrumentsQueryValidator
>

export const userInstrumentsQuery = (
  userId: string,
): UseQueryOptions<UserInstrumentsQueryResult> => ({
  queryKey: queryKeys.USER_INSTRUMENTS(userId),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.USER_INSTRUMENTS(userId), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        const { data, success } = UserInstrumentsQueryValidator.safeParse(
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
