import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { Profile, ProfileValidator } from '../validators/profile_validator'

export const profileQueryKey = (user_id: Profile['user_id']) => [
  'members',
  user_id,
]

export const profileQuery = (
  user_id: Profile['user_id'],
): UseQueryOptions<Profile | null> => ({
  queryKey: profileQueryKey(user_id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...profileQueryKey(user_id)] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return ProfileValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
