import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { Role } from '@/generated/prisma'
import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const userRolesQuery = (): UseQueryOptions<
  Pick<Role, 'name' | 'email'>[]
> => ({
  queryKey: queryKeys.USER_ROLES(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(apiRoutes.USER_ROLES(), { signal }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        const { data, error, success } = z
          .array(
            z.object({
              name: z.string(),
              email: z.email().nullable(),
            }),
          )
          .safeParse(response.data)

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
