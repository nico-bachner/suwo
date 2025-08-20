import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { UserRole, UserRoleValidator } from '../validators/user_role_validator'

export const userRolesQueryKey = (user_id: UserRole['user_id']) => [
  'roles',
  user_id,
]

export const userRolesQuery = (
  user_id: UserRole['user_id'],
): UseQueryOptions<UserRole[]> => ({
  queryKey: userRolesQueryKey(user_id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...userRolesQueryKey(user_id)] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return z.array(UserRoleValidator).parse(response.data)
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
