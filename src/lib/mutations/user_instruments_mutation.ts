import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'
import {
  UserInstrument,
  UserInstrumentValidator,
} from '../validators/user_instrument_validator'

export const userInstrumentsMutation = (
  queryClient: QueryClient,
  user_id: UserInstrument['user_id'],
): UseMutationOptions<
  UserInstrument['instrument_id'][],
  Error,
  UserInstrument['instrument_id'][]
> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...queryKeys.USER_INSTRUMENTS(user_id)] }),
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
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
  onError: (error) => {
    // eslint-disable-next-line no-alert, no-undef
    alert(`${error.message}\n\nPlease try again`)
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.USER_INSTRUMENTS(user_id),
    })
    await queryClient.invalidateQueries({
      queryKey: queryKeys.PROFILE(user_id),
    })
  },
})
