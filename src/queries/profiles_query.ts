import { UseQueryOptions } from '@tanstack/react-query'
import z, { prettifyError } from 'zod'

import { ProfileValidator } from '@/features/profile/validators'
import { Profile } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const profilesQuery = (): UseQueryOptions<Profile[]> => ({
  queryKey: queryKeys.PROFILES(),
  queryFn: async () => {
    const response = await parseResponse(await fetch(apiRoutes.PROFILES()))

    switch (response.status) {
      case StatusCode.OK: {
        const { data, error, success } = z
          .array(ProfileValidator)
          .safeParse(response.data)

        if (!success) {
          throw new Error(prettifyError(error))
        }

        return data
      }
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
