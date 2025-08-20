import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  UserInstrument,
  UserInstrumentValidator,
} from '../validators/user_instrument_validator'

export const userInstrumentsQueryKey = (user_id: UserInstrument['user_id']) => [
  'instruments',
  user_id,
]

/**
 * Fetches the instruments associated with a specific user.
 *
 * @param user_id - The ID of the user whose instruments are being queried.
 * @returns A list of instruments associated with the user.
 */
export const userInstrumentsQuery = (
  user_id: UserInstrument['user_id'],
): UseQueryOptions<UserInstrument['instrument_id'][]> => ({
  queryKey: userInstrumentsQueryKey(user_id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...userInstrumentsQueryKey(user_id)] }),
        {
          signal,
        },
      ),
    )

    switch (response.status) {
      case StatusCode.OK:
        return z
          .array(UserInstrumentValidator.shape.instrument_id)
          .parse(response.data)
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
