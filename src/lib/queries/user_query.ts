import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { UserDTO, UserDTOValidator } from '../dtos/user_dto_validator'

export const userQueryKey = (id: UserDTO['id']) => ['users', id]

export const userQuery = (
  id: UserDTO['id'],
): UseQueryOptions<UserDTO | null> => ({
  queryKey: userQueryKey(id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...userQueryKey(id)] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return UserDTOValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      case StatusCode.Unauthorized:
        throw new Error('Unauthorized')
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
