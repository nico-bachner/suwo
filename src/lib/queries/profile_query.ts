import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { Profile } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const ProfileQueryValidator = z.object({
  user_id: z.uuid(),
  given_name: z.string(),
  family_name: z.string().nullable(),
  display_name: z.string().nullable(),
  instruments: z.array(z.string()),
  roles: z.array(z.string()),
  attendances: z.array(
    z.object({
      year: z.number(),
      semester: z.number(),
      week: z.number(),
    }),
  ),
})

export type ProfileQueryResult = z.infer<typeof ProfileQueryValidator>

export const profileQuery = ({
  user_id,
}: Pick<Profile, 'user_id'>): UseQueryOptions<ProfileQueryResult | null> => ({
  queryKey: queryKeys.PROFILE({ user_id }),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.PROFILE({ user_id }), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        const { data, error, success } = ProfileQueryValidator.safeParse(
          response.data,
        )

        if (!success) {
          throw new Error(z.prettifyError(error))
        }

        return data
      }
      case StatusCode.NotFound: {
        return null
      }
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
