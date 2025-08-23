import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  ProfileDTO,
  ProfileDTOValidator,
} from '../validators/dtos/profile_dto_validator'

export const profileQueryKey = (user_id: ProfileDTO['user_id']) => [
  'members',
  user_id,
]

export const profileQuery = (
  user_id: ProfileDTO['user_id'],
): UseQueryOptions<ProfileDTO | null> => ({
  queryKey: profileQueryKey(user_id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...profileQueryKey(user_id)] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return ProfileDTOValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
