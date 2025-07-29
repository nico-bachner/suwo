import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { Profile } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

const ProfileValidator = z.object({
  user_id: z.uuid(),
  given_name: z.string(),
  family_name: z.string().nullable(),
  display_name: z.string().nullable(),
  instrument_name: z.string().nullable(),
  bio: z.string().nullable(),
  role_names: z.array(z.string()),
})

export const profileQuery = ({
  user_id,
}: Pick<Profile, 'user_id'>): UseQueryOptions<
  z.infer<typeof ProfileValidator>
> => ({
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
