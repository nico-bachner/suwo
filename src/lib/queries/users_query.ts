import { UseSuspenseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { UserDTO, UserDTOValidator } from '../dtos/user_dto_validator'

export const usersQueryKey = () => ['users']

export const usersQuery = (): UseSuspenseQueryOptions<UserDTO[]> => ({
  queryKey: usersQueryKey(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...usersQueryKey()] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return z.array(UserDTOValidator).parse(response.data)
      case StatusCode.Unauthorized:
        throw new Error('Unauthorized')
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
