import { QueryClient, UseMutationOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'

import { queryKeys } from '../queries'
import { Instrument } from '../validators/instrument_validator'
import { UserInstrument } from '../validators/user_instrument_validator'

export const userInstrumentsMutation = (
  queryClient: QueryClient,
  user_id: UserInstrument['user_id'],
): UseMutationOptions<unknown, Error, Instrument['id'][]> => ({
  mutationFn: async (value) => {
    await fetch(
      createURL({ path: ['api', ...queryKeys.USER_INSTRUMENTS(user_id)] }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      },
    )
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
