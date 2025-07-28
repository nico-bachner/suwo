import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { ProfileValidator } from '@/features/profile/validators'
import { Profile } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const profileQuery = ({
  user_id,
}: Pick<Profile, 'user_id'>): UseQueryOptions<Profile> => ({
  queryKey: queryKeys.PROFILE({ user_id }),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.PROFILE({ user_id }), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        const { data, error, success } = ProfileValidator.safeParse(
          response.data,
        )

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
