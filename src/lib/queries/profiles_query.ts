import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { ProfileQueryValidator } from './profile_query'

export const ProfilesQueryValidator = z.array(ProfileQueryValidator)

export type ProfilesQueryResult = z.infer<typeof ProfilesQueryValidator>

export const profilesQuery = (): UseQueryOptions<ProfilesQueryResult> => ({
  queryKey: queryKeys.PROFILES(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.PROFILES(), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        const { data, error, success } = ProfilesQueryValidator.safeParse(
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
